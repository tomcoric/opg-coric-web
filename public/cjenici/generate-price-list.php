<?php
/**
 * Primarni generator cjenika — pokreće se preko cPanel Cron Joba izravno na
 * hostingu, neovisno o GitHub Actions dostupnosti/rasporedu.
 *
 * Nalazi se u public/cjenici/ (ne u scripts/) jer se jedino taj direktorij
 * deploya na server — Vite build ne kopira scripts/ u dist/. Dio je javno
 * dostupnog direktorija, zato ispod ima zaštitu da se izvršava SAMO preko CLI-ja
 * (cron), nikad preko HTTP zahtjeva.
 *
 * Čita products-source.json (kopiju izvora istine src/data/products.json koju
 * na svaki deploy zapisuje scripts/generate-price-list.js) i generira
 * cjenik-YYYY-MM-DD.csv / latest.csv / latest.json. latest.png (slika za kupce)
 * i dalje generira isključivo Node skripta preko GitHub Actionsa.
 *
 * Pokretanje (cPanel Cron Jobs): php /puna/putanja/do/public_html/cjenici/generate-price-list.php
 */

// NAPOMENA: na ovom hostingu cron poziva "php" binarku koja interno prijavljuje
// PHP_SAPI === 'cgi-fcgi' (ne 'cli') iako se izvršava iz crona, pa provjera po SAPI
// imenu netočno blokira legitimna pokretanja. Pouzdaniji signal je postoje li
// HTTP-specifične $_SERVER varijable koje postavlja ISKLJUČIVO webserver pri
// stvarnom HTTP zahtjevu — pri pokretanju iz crona (bilo koje SAPI varijante) ih nema.
if (isset($_SERVER['REQUEST_METHOD']) || isset($_SERVER['HTTP_HOST'])) {
    http_response_code(403);
    header('Content-type: text/plain; charset=UTF-8');
    exit('Zabranjeno — ova skripta se pokreće samo preko cPanel Cron Joba.');
}

date_default_timezone_set('Europe/Zagreb');

$outputDir = __DIR__;
$sourcePath = $outputDir . '/products-source.json';
$logPath = $outputDir . '/cron-log.txt';
$retentionDays = 30;

// Dnevnik svakog pokretanja — javno čitljiv (dijagnostika, nema osjetljivih podataka), jer
// cPanel cron izlaz (STDOUT/STDERR) ide samo na e-mail koji ne provjeravamo redovito.
function log_line(string $logPath, string $message): void {
    $line = '[' . date('Y-m-d H:i:s') . '] ' . $message . "\n";
    @file_put_contents($logPath, $line, FILE_APPEND | LOCK_EX);
    $lines = @file($logPath);
    if ($lines !== false && count($lines) > 100) {
        @file_put_contents($logPath, implode('', array_slice($lines, -100)));
    }
}

log_line($logPath, 'Pokrenuto. PHP ' . PHP_VERSION . ', SAPI=' . PHP_SAPI
    . ', user=' . (function_exists('get_current_user') ? get_current_user() : '?')
    . ', cwd=' . getcwd() . ', writable=' . (is_writable($outputDir) ? 'da' : 'NE'));

set_error_handler(function ($severity, $message, $file, $line) use ($logPath) {
    log_line($logPath, "PHP upozorenje: {$message} u {$file}:{$line}");
    return false;
});

register_shutdown_function(function () use ($logPath) {
    $error = error_get_last();
    if ($error !== null && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR], true)) {
        log_line($logPath, "FATALNA GREŠKA: {$error['message']} u {$error['file']}:{$error['line']}");
    }
});

function fail(string $logPath, string $message): void {
    log_line($logPath, "Greška: {$message}");
    fwrite(STDERR, "Greška: {$message}\n");
    exit(1);
}

if (!is_file($sourcePath)) {
    fail($logPath, "nije pronađen {$sourcePath} — provjeri da je zadnji deploy uspješno objavio public/cjenici/products-source.json");
}

$raw = file_get_contents($sourcePath);
$data = json_decode($raw, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    fail($logPath, 'neispravan JSON u products-source.json — ' . json_last_error_msg());
}

$products = $data['products'] ?? null;
if (!is_array($products) || count($products) === 0) {
    fail($logPath, 'konfiguracija proizvoda je prazna ili nedostaje "products".');
}

$errors = [];
foreach ($products as $i => $p) {
    $label = $p['id'] ?? $p['name'] ?? "proizvod na poziciji {$i}";
    if (empty($p['name'])) $errors[] = "{$label}: nedostaje \"name\".";
    if (empty($p['code'])) $errors[] = "{$label}: nedostaje \"code\".";
    if (empty($p['unit'])) $errors[] = "{$label}: nedostaje \"unit\".";
    if (!isset($p['price']) || !is_numeric($p['price']) || $p['price'] < 0) {
        $errors[] = "{$label}: \"price\" mora biti nenegativan broj.";
    }
    if (!isset($p['available']) || !is_bool($p['available'])) {
        $errors[] = "{$label}: \"available\" mora biti true/false.";
    }
}
if (!empty($errors)) {
    fail($logPath, 'konfiguracija proizvoda nije valjana: ' . implode(' | ', $errors));
}

if (!is_dir($outputDir) && !mkdir($outputDir, 0755, true)) {
    fail($logPath, "ne mogu kreirati direktorij {$outputDir}");
}

function csv_escape(string $value): string {
    if (str_contains($value, ';') || str_contains($value, '"') || str_contains($value, "\n")) {
        return '"' . str_replace('"', '""', $value) . '"';
    }
    return $value;
}

function format_price($value): string {
    return is_numeric($value) ? number_format((float) $value, 2, '.', '') : '';
}

$columns = [
    'naziv', 'sifra', 'marka', 'jedinica_mjere', 'cijena_po_jedinici',
    'maloprodajna_cijena', 'posebna_prodaja', 'naziv_posebne_prodaje',
    'sidrena_cijena', 'datum_sidrene_cijene', 'barkod', 'dostupnost',
];

$lines = [implode(';', $columns)];
foreach ($products as $p) {
    $row = [
        $p['name'],
        $p['code'],
        $p['brand'] ?? '',
        $p['unit'],
        format_price($p['price']),
        format_price($p['price']),
        !empty($p['specialSale']) ? 'true' : 'false',
        $p['specialSaleName'] ?? '',
        format_price($p['anchorPrice'] ?? null),
        $p['anchorPriceDate'] ?? '',
        $p['barcode'] ?? '',
        !empty($p['available']) ? 'dostupno' : 'nedostupno',
    ];
    $lines[] = implode(';', array_map('csv_escape', array_map('strval', $row)));
}
$csv = "\xEF\xBB\xBF" . implode("\r\n", $lines) . "\r\n";

$date = date('Y-m-d');
$datedFilename = "cjenik-{$date}.csv";

$w1 = file_put_contents("{$outputDir}/{$datedFilename}", $csv);
$w2 = file_put_contents("{$outputDir}/latest.csv", $csv);
if ($w1 === false || $w2 === false) {
    log_line($logPath, "UPOZORENJE: zapis CSV-a nije uspio (dated=" . var_export($w1, true) . ", latest=" . var_export($w2, true) . ")");
}

$metadata = [
    'generatedAt' => date('c'),
    'date' => $date,
    'file' => $datedFilename,
    'productCount' => count($products),
];
$w3 = file_put_contents("{$outputDir}/latest.json", json_encode($metadata, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
if ($w3 === false) {
    log_line($logPath, "UPOZORENJE: zapis latest.json nije uspio");
}

// Čišćenje arhive — briše samo datirane cjenik-YYYY-MM-DD.csv starije od $retentionDays dana.
$cutoff = time() - $retentionDays * 86400;
$removed = 0;
foreach (scandir($outputDir) as $filename) {
    if (!preg_match('/^cjenik-(\d{4}-\d{2}-\d{2})\.csv$/', $filename, $m)) continue;
    $fileTime = strtotime($m[1]);
    if ($fileTime === false || $fileTime >= $cutoff) continue;
    unlink("{$outputDir}/{$filename}");
    $removed++;
}

log_line($logPath, "Uspješno generirano: {$datedFilename}, " . count($products) . ' proizvoda'
    . ($removed > 0 ? ", obrisano {$removed} arhivskih" : ''));

echo "Cjenik uspješno generiran:\n";
echo "{$datedFilename}\n";
echo count($products) . " proizvoda\n";
if ($removed > 0) echo "Obrisano {$removed} arhivskih datoteka starijih od {$retentionDays} dana.\n";
