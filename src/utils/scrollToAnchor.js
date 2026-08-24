export async function scrollToAnchor(hash) {
  const el = document.querySelector(hash)
  if (!el) return

  if (history.pushState) history.pushState(null, '', hash)

  if (document.fonts?.ready) {
    try { await document.fonts.ready } catch { /* ignore */ }
  }
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))

  el.scrollIntoView({ behavior: 'smooth', block: 'start' })

  // Sigurnosna mreza: ako se meta jos pomakne (npr. kasno ucitana slika iznad),
  // ponovno poravnaj nakon sto se smooth scroll animacija stigne odraditi.
  setTimeout(() => {
    const stillTop = el.getBoundingClientRect().top
    if (Math.abs(stillTop) > 40) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, 700)
}
