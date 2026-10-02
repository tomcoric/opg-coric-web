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

if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    exit('Zabranjeno — ova skripta se pokreće samo preko cPanel Cron Joba.');
}

date_default_timezone_set('Europe/Zagreb');

$outputDir = __DIR__;
$sourcePath = $outputDir . '/products-source.json';
$retentionDays = 30;

function fail(string $message): void {
    fwrite(STDERR, "Greška: {$message}\n");
    exit(1);
}

if (!is_file($sourcePath)) {
    fail("nije pronađen {$sourcePath} — provjeri da je zadnji deploy uspješno objavio public/cjenici/products-source.json");
}

$raw = file_get_contents($sourcePath);
$data = json_decode($raw, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    fail('neispravan JSON u products-source.json — ' . json_last_error_msg());
}

$products = $data['products'] ?? null;
if (!is_array($products) || count($products) === 0) {
    fail('konfiguracija proizvoda je prazna ili nedostaje "products".');
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
    fwrite(STDERR, "Greška: konfiguracija proizvoda nije valjana:\n");
    foreach ($errors as $e) fwrite(STDERR, "  - {$e}\n");
    exit(1);
}

if (!is_dir($outputDir) && !mkdir($outputDir, 0755, true)) {
    fail("ne mogu kreirati direktorij {$outputDir}");
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

file_put_contents("{$outputDir}/{$datedFilename}", $csv);
file_put_contents("{$outputDir}/latest.csv", $csv);

$metadata = [
    'generatedAt' => date('c'),
    'date' => $date,
    'file' => $datedFilename,
    'productCount' => count($products),
];
file_put_contents("{$outputDir}/latest.json", json_encode($metadata, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");

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

echo "Cjenik uspješno generiran:\n";
echo "{$datedFilename}\n";
echo count($products) . " proizvoda\n";
if ($removed > 0) echo "Obrisano {$removed} arhivskih datoteka starijih od {$retentionDays} dana.\n";
