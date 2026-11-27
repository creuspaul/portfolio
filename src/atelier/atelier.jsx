
import { useState } from "react";
import "./atelier.css";
import { atelierInfo, services, training, homeGallery } from "./atelierData";

export default function Atelier() { 
const [activeSlide, setActiveSlide] = useState(0);

const previousSlide = () => {
  setActiveSlide((current) =>
    (current - 1 + homeGallery.length) % homeGallery.length
  );
};

const nextSlide = () => {
  setActiveSlide((current) =>
    (current + 1) % homeGallery.length
  );
};
  return (
    <main className="atelier">
      {/* NAVIGATION */}
      <header className="atelier-header">
        <a href="/atelier" className="atelier-logo">
          PAUL CREUS
          <span>Soclage & Scénographie</span>
        </a>

        <nav className="atelier-nav">
          <a href="#activites">Activités</a>
          <a href="#formation">Formation</a>
          <a href="#apropos">À propos</a>
          <a href="#contact">Contact</a>
        </nav>

        <a href="/" className="portfolio-link">
          Portfolio artistique ↗
        </a>
      </header>

 
      {/* INTRODUCTION */}
      <section className="atelier-hero">

        {/* TEXTE À GAUCHE */}
        <div className="atelier-hero-text">
          <p className="eyebrow">ATELIER · NANTES · FRANCE</p>

          <h1>
            Soclage,
            <br />
            scénographie
            <br />
            & fabrication.
          </h1>

          <p className="atelier-intro">
            {atelierInfo.introduction}
          </p>

          <a href="#activites" className="text-link">
            Découvrir les activités ↓
          </a>
        </div>

        {/* CARROUSEL À DROITE */}
        <div className="atelier-carousel">

         <img
  key={activeSlide}
  src={homeGallery[activeSlide].image}
  alt={homeGallery[activeSlide].alt}
  className="atelier-carousel-image"
/>

{homeGallery[activeSlide].caption && (
  <p className="carousel-caption">
    {homeGallery[activeSlide].caption}
  </p>
)}

          <div className="carousel-controls">

            <button
              type="button"
              onClick={previousSlide}
              aria-label="Photographie précédente"
            >
              ←
            </button>

            <span>
              {String(activeSlide + 1).padStart(2, "0")}
              {" / "}
              {String(homeGallery.length).padStart(2, "0")}
            </span>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Photographie suivante"
            >
              →
            </button>

          </div>
        </div>

      </section>


      {/* ACTIVITÉS */}
      <section id="activites" className="atelier-section">
        <div className="section-heading">
          <p className="eyebrow">01 — SAVOIR-FAIRE</p>
          <h2>Activités</h2>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <article className="service-item" key={service.number}>
              <img src={service.image} alt={service.title} />

              <p className="eyebrow">{service.number}</p>
              <h3>{service.title}</h3>
              <p>{service.description}</p>

             
            </article>
          ))}
        </div>
      </section>

      {/* FORMATION */}
      <section id="formation" className="atelier-training">
        <div className="training-image">
          <img src={training.image} alt="Formation au soclage" />
        </div>

        <div className="training-text">
          <p className="eyebrow">02 — TRANSMISSION</p>
          <h2>{training.title}</h2>
          <p
  className="training-description"
  dangerouslySetInnerHTML={{ __html: training.description }}
/>
        </div>
      </section>

      {/* À PROPOS */}
      <section id="apropos" className="atelier-about">
        <p className="eyebrow">03 — À PROPOS</p>
        <h2>Paul Creus</h2>

        <p>
          Travaillant principalement l'acier, le laiton et le bois, je développe des projets de fabrication en soclage morphologique d'objets d'art, scénographie et dispositifs de présentation. 
        </p>

        <p>
          Fort de dix années d'expérience au sein de sociétés spécialisées et dans de nombreux musées en France et à l'étranger, j'accompagne désormais artistes, institutions et professionnels de l'exposition depuis l'atelier collaboratif Projéta à Nantes.
        </p>
      </section>

      {/* CONTACT */}
      <section id="contact" className="atelier-contact">
        <div>
          <p className="eyebrow">04 — CONTACT</p>
          <h2>On se dit quoi ?</h2>
        </div>

        <div className="contact-details">
          <a href={`mailto:${atelierInfo.email}`}>
            {atelierInfo.email}
          </a>
          <p>{atelierInfo.location}</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="atelier-footer">
        <span>© Paul Creus</span>
        <a href="/">Portfolio artistique ↗</a>
      </footer>
    </main>
  );
}
