# Cjenik — automatsko generiranje i objava

Sustav svakodnevno generira javno dostupan CSV cjenik iz jedinstvene konfiguracije proizvoda.
Nema baze podataka, nema admin panela — sve se uređuje ručno u jednoj JSON datoteci.

## Izvor istine

[src/data/products.json](../src/data/products.json) je jedini izvor istine za proizvode i cijene.
Web stranica (`/cjenik.html`), Node generator i PHP cron skripta svi čitaju (izravno ili neizravno) iz ove datoteke.

## Kako promijeniti cijenu

Otvori `src/data/products.json`, pronađi proizvod i izmijeni polje `"price"`:

```json
{
  "id": "kulin",
  "name": "Kulin",
  "price": 42.00
}
```

Commit + push (automatski, po standardnom workflowu ovog projekta). Od sljedećeg generiranja cjenika
(automatski svaki dan, ili ručno pokretanjem `npm run generate:prices`) nova cijena se koristi **trajno**,
dok se ručno ponovno ne promijeni. Automatika se nikad sama ne vraća na staru cijenu.

## Kako promijeniti dostupnost proizvoda

U istoj datoteci postavi `"available": false`. U generiranom CSV-u to se prikazuje kao `nedostupno`,
a na `/cjenik.html` proizvod je označen kao nedostupan.

## Kako dodati novi proizvod

Dodaj novi objekt u `products` niz u `src/data/products.json`. Obavezna polja:

| Polje | Opis |
|---|---|
| `id` | Interni jedinstveni identifikator (kebab-case), npr. `"nova-kobasica"`. |
| `name` | Naziv proizvoda kako se prikazuje javno. |
| `code` | Interna šifra proizvoda, npr. `"NOVA-KOBASICA-001"`. |
| `brand` | Marka — trenutno uvijek `"Kulin Ćorić"`. |
| `unit` | Jedinica mjere, trenutno uvijek `"kg"`. |
| `price` | Trenutna maloprodajna cijena (broj, npr. `18.00`). |
| `anchorPrice` | Sidrena (referentna) cijena na 02.05.2025. — `null` dok se ne potvrdi stvarna vrijednost (vidi upozorenje niže). |
| `anchorPriceDate` | Datum sidrene cijene — `null` dok se ne potvrdi. |
| `barcode` | EAN/GTIN barkod — `""` dok se ne doda stvarni barkod. |
| `available` | `true`/`false` — je li proizvod trenutno dostupan. |
| `specialSale` | `true`/`false` — je li proizvod trenutno na posebnoj prodaji/akciji. |
| `specialSaleName` | Naziv akcije (npr. `"Božićna akcija"`) — `""` ako nema akcije. |

Nakon dodavanja, generator će automatski uključiti novi proizvod u sljedeći cjenik.

## Ručno generiranje cjenika

```bash
npm run generate:prices
```

Generira/ažurira:
- `public/cjenici/cjenik-YYYY-MM-DD.csv` — arhivska datoteka za taj dan (Europe/Zagreb datum), nikad se ne prepisuje sljedeći dan. Namijenjena inspekcijskom nadzoru (zakonska obveza), ne kupcima — zato je na `/cjenik.html` diskretno ispod tablice.
- `public/cjenici/latest.csv` — uvijek odražava najnoviji cjenik (isti sadržaj kao dnevna arhiva za taj dan).
- `public/cjenici/latest.png` — vizualna slika cjenika (brend stil, generira se preko `sharp`), namijenjena kupcima za preuzimanje — gumb na vrhu `/cjenik.html`.
- `public/cjenici/latest.json` — metapodaci (`generatedAt`, `date`, `file`, `productCount`), koristi ih `/cjenik.html` za prikaz datuma ažuriranja.
- `public/cjenici/products-source.json` — kopija konfiguracije proizvoda, čita je PHP cron skripta na hostingu.

Arhivske datoteke starije od 30 dana automatski se brišu (osim `latest.csv`/`latest.json`/`latest.png`/`products-source.json`, koje se nikad ne brišu).

Testovi (provjera generiranja, brojanja proizvoda, cijena, dostupnosti, ponašanja nakon promjene cijene, čišćenja arhive):

```bash
npm run test:prices
```

## Gdje je cjenik javno dostupan

- Stranica: **https://www.kulin-coric.hr/cjenik.html**
- CSV za preuzimanje: **https://www.kulin-coric.hr/cjenici/latest.csv**
- Dnevna arhiva: `https://www.kulin-coric.hr/cjenici/cjenik-YYYY-MM-DD.csv`

## Automatsko dnevno generiranje

Dva mehanizma rade usporedno, svaki odgovoran za drugi dio izlaza — **ne dupliciraju se**, nego se nadopunjuju:

| Što | Generira | Kad |
|---|---|---|
| `cjenik-YYYY-MM-DD.csv`, `latest.csv`, `latest.json` (datum za "Cjenik ažuriran") | **cPanel Cron (PHP)** | točno 08:00 po hrvatskom vremenu, izravno na serveru |
| `latest.png` (slika za kupce), `products-source.json` (sinkronizacija cijena za PHP) | **GitHub Actions (Node)** | svaki dan, vrijeme može varirati (vidi napomenu niže) |

### Primarni mehanizam za datum/CSV — cPanel Cron Job

**Zašto PHP, a ne GitHub Actions, za ovaj dio:** GitHub Actions `schedule` okidač pokazao se nepouzdanim za ovu
svrhu — u praksi je jednom potpuno preskočio zakazani termin, drugi put kasnio ~6 sati. cPanel cron radi izravno
na hostingu, neovisno o GitHub-ovoj dijeljenoj infrastrukturi, pa pouzdano pogađa točno vrijeme.

Skripta `public/cjenici/generate-price-list.php` nalazi se namjerno u `public/cjenici/` (ne u `scripts/`) jer se
jedino taj direktorij deploya na server — Vite build ne kopira `scripts/` u `dist/`. Čita
`public/cjenici/products-source.json` (kopiju koju na svaki deploy zapisuje Node generator) pa ne treba Node.js
na serveru. Zaštićena je da se izvršava samo preko CLI-ja (cron), ne i preko HTTP zahtjeva, iako joj je putanja
tehnički javno dostupna.

**Preduvjet — PHP verzija:** skripta koristi `str_contains()` i typed properties, dostupno od **PHP 8.0**. U
cPanel → **MultiPHP Manager** (ili slično) provjeri/postavi PHP 8.0 ili noviji za domenu, inače će cron javljati
grešku. Ako cPanel za cron poslove koristi drugu (stariju) verziju PHP-a od one postavljene za domenu, u
komandi niže možda treba koristiti puniju putanju do PHP 8 binarnog izvršnog file-a (vidljivo u MultiPHP
Manageru ili uz pomoć hosting podrške) umjesto samo `php`.

**Postavljanje — jednom, u cPanelu:**

U cPanel → **Cron Jobs**, postavi:

- **Minute:** `0`
- **Hour:** `8` *(cPanel cron obično koristi vrijeme servera; provjeri u cPanel → Server Information koja je
  vremenska zona servera — ako nije Europe/Zagreb, prilagodi sat tako da izvršavanje bude točno u 08:00 po
  srednjoeuropskom vremenu)*
- **Day, Month, Weekday:** `*`
- **Command:**
  ```
  php /home/KORISNICKO_IME/public_html/cjenici/generate-price-list.php
  ```
  (zamijeni `KORISNICKO_IME` stvarnim korisničkim imenom/putanjom do `public_html` na hostingu — vidljivo u
  cPanel File Manageru ili na početnoj stranici cPanela pod "Home Directory")

**Provjera da radi:** ako cPanel ima Terminal (File Manager → Terminal, ili zasebna ikona), ručno pokreni istu
komandu jednom i provjeri ispis (`Cjenik uspješno generiran: ...`). Ako Terminal nije dostupan, jednostavno
pričekaj prvo zakazano izvršavanje i provjeri sutradan da se `https://www.kulin-coric.hr/cjenici/latest.json`
promijenio na novi datum.

**Važno — bez ovog koraka cjenik se više neće dnevno ažurirati.** `deploy.yml` sad namjerno isključuje
`cjenici/latest.csv`, `cjenici/latest.json` i `cjenici/cjenik-*.csv` iz FTPS sinkronizacije (vidi niže zašto) —
jedini preostali pisac tih datoteka na serveru je ovaj cPanel cron.

### Sekundarni mehanizam — GitHub Actions (za sliku i sinkronizaciju cijena)

`.github/workflows/generate-prices.yml` svaki dan (06:00 i 06:30 UTC, bez garancije točnog vremena zbog gore
opisane nepouzdanosti) pokreće `npm run generate:prices` i commita izmjene u `public/cjenici/` na `main`, što
okida `deploy.yml` (preko `workflow_run`, jer commit s `GITHUB_TOKEN`-om ne okida običan `push` event).

Budući da `latest.csv`/`latest.json`/dnevna arhiva sad isključivo pripadaju cPanel cronu, ovaj mehanizam i dalje
služi za dvije stvari koje PHP ne radi:
- **`latest.png`** — sliku cjenika za kupce generira isključivo Node (`sharp`); PHP to ne radi.
- **`products-source.json`** — kad se cijena ručno promijeni u `src/data/products.json`, ovaj mehanizam (ili
  sljedeći obični deploy nakon commita) prenosi tu promjenu na server, odakle je cPanel cron sljedeće jutro čita.

Ručno pokretanje bez čekanja na raspored: GitHub → Actions → "Generate daily price list" → Run workflow.

### Zašto deploy.yml isključuje dio datoteka iz sinkronizacije

`.github/workflows/deploy.yml` FTPS korak ima `exclude` za `cjenici/latest.csv`, `cjenici/latest.json` i
`cjenici/cjenik-*.csv`. Bez toga bi SVAKI sljedeći deploy (npr. zbog posve nepovezane izmjene na stranici)
prepisao te datoteke onim što trenutno stoji u gitu — a to bi mogla biti jučerašnja verzija ako GitHub Actions
generiranje toga dana još nije (ili uopće nije) prošlo, čime bi se poništio jutarnji cPanel upis. `latest.png`
i `products-source.json` NISU isključeni i dalje se normalno deployaju.

## Zaštita od zastarjelog (cached) cjenika

`public/cjenici/.htaccess` postavlja:
- `latest.csv`, `latest.json` i `latest.png` → `Cache-Control: no-cache, no-store, must-revalidate` (preglednik i
  cPanel NGINX Caching sloj nikad ne smiju posluživati zastarjelu verziju).
- Datirane arhivske datoteke (`cjenik-YYYY-MM-DD.csv`) → `Cache-Control: public, max-age=31536000, immutable`
  (sigurno se trajno cachaju jer se nikad ne mijenjaju nakon nastanka).

Stranica `/cjenik.html` dodatno dohvaća `latest.csv`/`latest.json` s `cache: 'no-store'` u JavaScriptu, kao
dodatna zaštita neovisno o HTTP headerima.

## Što je još potrebno ručno popuniti

- **Sidrene (referentne) cijene na 02.05.2025.** — potvrđeno: cijene se od 02.05.2025. nisu mijenjale, pa je
  `anchorPrice` postavljen jednako trenutnoj `price` vrijednosti za sve proizvode, a `anchorPriceDate` je
  `"2025-05-02"`. **Važno:** ako se cijena ubuduće promijeni, `anchorPrice`/`anchorPriceDate` se ne mijenjaju
  automatski (namjerno — to je fiksna povijesna referenca) — ostaju kakvi jesu dok se ručno ne odluči drugačije.
- **Barkodovi** — `barcode` je prazan string za sve proizvode jer stvarni EAN/GTIN kodovi nisu bili dostupni
  (namjerno nisu izmišljeni). Kad postanu dostupni, unijeti ih ručno u `src/data/products.json`.

Dok `barcode` ostane prazan, generirani CSV za taj stupac ispisuje praznu vrijednost (nije popunjeno izmišljenim
brojevima).
