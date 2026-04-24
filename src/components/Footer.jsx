export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-info">
          <h3>OPG Ćorić</h3>
          <p>Svježi domaći proizvodi</p>
        </div>
        <div className="footer-links">
          <h4>Brze veze</h4>
          <ul>
            <li><a href="#hero">Početna</a></li>
            <li><a href="#about">O nama</a></li>
            <li><a href="#products">Proizvodi</a></li>
            <li><a href="#contact">Kontakt</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Kontakt</h4>
          <p>Email: info@opg-coric.hr</p>
          <p>Tel: +385 XX XXX XXXX</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} OPG Ćorić. Sva prava pridržana.</p>
      </div>
    </footer>
  );
}
