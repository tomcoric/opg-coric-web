import heroImg from '../assets/hero.png';

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-content">
        <h1>Dobrodošli u OPG Ćorić</h1>
        <p>Svježi, domaći proizvodi direktno s naše farme.</p>
        <a href="#products" className="btn">Pogledaj proizvode</a>
      </div>
      <div className="hero-image">
        <img src={heroImg} alt="OPG Ćorić" />
      </div>
    </section>
  );
}
