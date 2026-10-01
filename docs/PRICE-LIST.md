# Cjenik — automatsko generiranje i objava

Sustav svakodnevno generira javno dostupan CSV cjenik iz jedinstvene konfiguracije proizvoda.
Nema baze podataka, nema admin panela — sve se uređuje ručno u jednoj JSON datoteci.

## Izvor istine

[src/data/products.json](../src/data/products.json) je jedini izvor istine za proizvode i cijene.
Web stranica (`/cjenik.html`), generator CSV-a i PHP fallback skripta svi čitaju (izravno ili neizravno) iz ove datoteke.

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
- `public/cjenici/products-source.json` — kopija konfiguracije proizvoda, čita je PHP fallback skripta na hostingu.

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

### Primarni mehanizam — GitHub Actions (preporučeno, ništa dodatno nije potrebno postaviti)

`.github/workflows/generate-prices.yml` svaki dan u 05:00 UTC **i** 09:00 UTC (dva termina kao sigurnosna mreža —
GitHub Actions `schedule` okidač zna povremeno preskočiti zakazani termin pod opterećenjem njihove infrastrukture;
ovo je potvrđeno u praksi, ne pretpostavka) pokreće `npm run generate:prices` i commita novonastale/izmijenjene
datoteke u `public/cjenici/` na `main`.

Taj commit koristi zadani `GITHUB_TOKEN`, pa **ne** okida `deploy.yml` preko običnog `push` eventa (GitHub-ova
zaštita od beskonačnih petlji). Zato `deploy.yml` dodatno sluša `workflow_run` dovršetak workflowa
"Generate daily price list" i tada checkout-a točno taj commit prije builda i FTPS deploya — bez obzira na to
je li taj commit okinuo običan push event ili ne. Ovaj mehanizam koristi isključivo infrastrukturu koja već
pouzdano radi za ovaj projekt (Node u GitHub Actions + FTPS deploy) i ne ovisi o tome ima li hosting
(MyDataKnox/cPanel) uopće Node.js runtime.

Ručno pokretanje bez čekanja na raspored: GitHub → Actions → "Generate daily price list" → Run workflow (deploy
će se automatski nastaviti nakon što taj run uspješno završi).

### Alternativa — cPanel Cron Job (opcionalno, ako je poželjna neovisnost o GitHubu)

Ako hosting ima PHP (standardno na cPanel/MyDataKnox), može se dodatno postaviti cron izravno na serveru
koji koristi `scripts/generate-price-list.php`. Ta skripta čita `public/cjenici/products-source.json`
(kopiju koju na svaki deploy zapisuje Node generator) pa ne treba Node.js na serveru.

U cPanel → **Cron Jobs**, postavi:

- **Minute:** `0`
- **Hour:** `6` *(cPanel cron obično koristi vrijeme servera; provjeri u cPanel → Server Information koja je vremenska
  zona servera i po potrebi prilagodi sat tako da izvršavanje bude oko 07:00 po srednjoeuropskom vremenu, a
  svakako prije 08:00)*
- **Day, Month, Weekday:** `*`
- **Command:**
  ```
  php /home/KORISNICKO_IME/public_html/scripts/generate-price-list.php
  ```
  (zamijeni `KORISNICKO_IME` i putanju stvarnom apsolutnom putanjom do `public_html` na hostingu — vidljivo u
  cPanel File Manageru ili u "Home Directory" na početnoj stranici cPanela)

**Napomena:** ovo je isključivo fallback. Ako je uključen i GitHub Actions mehanizam i cPanel cron, cjenik će se
jednostavno generirati dvaput dnevno bez štete (drugi poziv istog dana samo prepiše `latest.csv`/`latest.json`
identičnim sadržajem, arhivska datoteka za taj dan ostaje jedna).

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
