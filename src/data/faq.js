// Česta pitanja — jedinstveni izvor za:
// - sekciju "Kupnja i dostava" na stranici (src/components/sections/Buying.jsx)
// - FAQPage JSON-LD u index.html (generira ga Vite plugin u vite.config.js pri buildu)
//
// Google traži da FAQ schema odgovara vidljivom sadržaju stranice — zato se tekst
// piše samo ovdje. "link" se prikazuje na stranici ispod odgovora, a u schemu ne ide.

// Odgovaraju sadržaju sekcije "Što je kulin?" (KulinInfo.jsx).
export const kulinFaq = [
  {
    question: 'Što je kulin (kulen)?',
    answer: 'Kulin (kulen) je tradicionalna slavonska suhomesnata delicija — kobasica izrađena od svinjetine i svinjske leđne masnoće, začinjena mljevenom paprikom, češnjakom i solju, punjena u svinjsko crijevo i dimljena bukvom ili grabom. Zrije najmanje 5 do 6 mjeseci.',
  },
  {
    question: 'Koja je razlika između kulena i kulina?',
    answer: 'Kulin i kulen su naziv za isti tradicionalni slavonski proizvod. U Đakovu i okolici češće se kaže kulin, dok je kulen rašireniji naziv diljem Hrvatske. Zaštićeni naziv izvornosti na razini Europske unije glasi "Slavonski kulen / Slavonski kulin", čime su oba naziva službeno ravnopravna.',
  },
]

export const buyingFaq = [
  {
    question: 'Kako mogu naručiti?',
    answer: 'Najbrže je nazvati nas na 098 223 844 ili 098 169 2161. Možete poslati i upit preko obrasca na dnu stranice ili e-mailom na opgcoricvladimir@gmail.com, a mi ćemo vam se javiti da dogovorimo količinu i preuzimanje.',
    link: { href: '#kontakt', label: 'Pošaljite upit' },
  },
  {
    question: 'Kako dolazim do proizvoda?',
    answer: 'Proizvode možete preuzeti osobno kod nas u Đakovu, na adresi Miroslava Krleže 2. Po Đakovu i okolici dostavljamo sami, a u ostatak Hrvatske i u inozemstvo šaljemo dostavnom službom. Trošak i rok slanja dogovaramo pri narudžbi, ovisno o adresi i količini.',
  },
  {
    question: 'Kako se plaća?',
    answer: 'Gotovinom pri osobnom preuzimanju ili dostavi, pouzećem kad šaljemo paket, ili uplatom na račun. Podatke za uplatu dobit ćete uz potvrdu narudžbe.',
  },
  {
    question: 'Gdje mogu vidjeti cijene?',
    answer: 'Aktualne cijene po kilogramu za sve proizvode nalaze se u cjeniku, koji se ažurira svaki dan.',
    link: { href: '/cjenik.html', label: 'Otvori cjenik' },
  },
  {
    question: 'Kako čuvati kulin?',
    answer: 'Cijeli kulin čuvajte na hladnom, tamnom i prozračnom mjestu, dalje od sunca i izvora topline, ili u hladnjaku, dobro zaštićen od isušivanja. Nakon rezanja presjek zaštitite prehrambenom folijom, vakuumiranjem ili tankim slojem svinjske masti, a kulin čuvajte u hladnjaku na 2 do 4 °C.',
    link: { href: '/cuvanje-kulina.html', label: 'Pročitaj cijeli vodič' },
  },
  {
    question: 'Zašto neki proizvodi nisu dostupni?',
    answer: 'Naši proizvodi nastaju u sezonskoj proizvodnji, pa pojedini s vremenom budu rasprodani. Kod takvog proizvoda odaberite „Obavijesti me o dostupnosti" i javit ćemo vam se čim stigne nova tura.',
    link: { href: '#proizvodi', label: 'Pogledaj proizvode' },
  },
]

export function faqJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [...kulinFaq, ...buyingFaq].map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }
  // "<" se escapea da tekst nikad ne može zatvoriti <script> tag.
  return JSON.stringify(data, null, 2).replace(/</g, '\\u003c')
}
