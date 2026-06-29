# OPG Ćorić – Službena web stranica

Web stranica za OPG Ćorić iz Đakova. Stranica prezentira proizvode, priču o gospodarstvu te kontakt informacije.

**Tech stack:** React 19 · Vite 8 · CSS Modules · JavaScript (JSX)

---

## Struktura projekta

```
opg-coric-web/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx       # Navigacija
│   │   │   └── Footer.jsx       # Footer
│   │   ├── sections/
│   │   │   ├── Hero.jsx         # Hero sekcija
│   │   │   ├── About.jsx        # O nama
│   │   │   ├── Products.jsx     # Proizvodi
│   │   │   ├── Stats.jsx        # Statistike
│   │   │   ├── KulinInfo.jsx    # Info o kulinu
│   │   │   ├── FeatureBanner.jsx
│   │   │   ├── Media.jsx        # Mediji
│   │   │   └── Contact.jsx      # Kontakt
│   │   └── ui/
│   │       ├── Button.jsx
│   │       ├── Container.jsx
│   │       └── CathedralDivider.jsx
│   ├── assets/                  # Slike i statični resursi
│   ├── App.jsx                  # Root komponenta
│   └── App.css
├── public/                      # Javni statični resursi
├── index.html
├── vite.config.js
└── package.json
```

---

## Preduvjeti

- Node.js v18+
- npm v9+

---

## Instalacija

```bash
cd opg-coric-web
npm install
```

---

## Pokretanje lokalno

```bash
npm run dev
```

Otvorite [http://localhost:5173](http://localhost:5173) u browseru.

---

## Build (produkcija)

```bash
npm run build
```

Generirani statični fajlovi nalaze se u `/dist` mapi.

Preview produkcijskog builda:

```bash
npm run preview
```

---

## Linting

```bash
npm run lint
```

---

## Deploy

Stranica se gradi kao **statični site** (output u `/dist`). Može se hostati na:

- **Vercel** — povežite GitHub repozitorij, automatski detektira Vite
- **Netlify** — drag & drop `/dist` mape ili GitHub integracija
- **GitHub Pages** — uz `vite.config.js` `base` podešavanje
- **Bilo koji web hosting** — uploadajte sadržaj `/dist` mape

---

## Korisni linkovi

- [React dokumentacija](https://react.dev)
- [Vite dokumentacija](https://vite.dev)
- [CSS Modules](https://github.com/css-modules/css-modules)
