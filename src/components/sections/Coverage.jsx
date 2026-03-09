import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../ui/Reveal";

gsap.registerPlugin(ScrollTrigger);

const countries = [
  { name: "Cameroun", flag: "CM", zone: "CEMAC", social: "CNPS" },
  { name: "Sénégal", flag: "SN", zone: "UEMOA", social: "CSS" },
  { name: "Côte d'Ivoire", flag: "CI", zone: "UEMOA", social: "CNPS" },
  { name: "Gabon", flag: "GA", zone: "CEMAC", social: "CNSS" },
  { name: "Congo", flag: "CG", zone: "CEMAC", social: "CNSS" },
  { name: "Mali", flag: "ML", zone: "UEMOA", social: "INPS" },
  { name: "Burkina Faso", flag: "BF", zone: "UEMOA", social: "CNSS" },
  { name: "Bénin", flag: "BJ", zone: "UEMOA", social: "CNSS" },
  { name: "Togo", flag: "TG", zone: "UEMOA", social: "CNSS" },
  { name: "Niger", flag: "NE", zone: "UEMOA", social: "CNSS" },
  { name: "Tchad", flag: "TD", zone: "CEMAC", social: "CNPS" },
  { name: "Guinée", flag: "GN", zone: "—", social: "CNSS" },
  { name: "RCA", flag: "CF", zone: "CEMAC", social: "OCSS" },
  { name: "Guinée Équ.", flag: "GQ", zone: "CEMAC", social: "INSESO" },
  { name: "Comores", flag: "KM", zone: "—", social: "CNSS" },
  { name: "Guinée-Bissau", flag: "GW", zone: "UEMOA", social: "INSS" },
  { name: "RD Congo", flag: "CD", zone: "—", social: "CNSS" },
];

const filières = [
  { name: "Palmier à huile", emoji: "🌴" },
  { name: "Cacao", emoji: "🫘" },
  { name: "Café", emoji: "☕" },
  { name: "Hévéa", emoji: "🌳" },
  { name: "Coton", emoji: "🧶" },
  { name: "Banane", emoji: "🍌" },
  { name: "Manioc", emoji: "🥔" },
  { name: "Ananas", emoji: "🍍" },
];

export default function Coverage() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(section.querySelectorAll(".coverage-country"),
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1, scale: 1, duration: 0.4, stagger: 0.03, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 65%", toggleActions: "play none none none" },
      }
    );

    gsap.fromTo(section.querySelectorAll(".coverage-filiere"),
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power3.out",
        scrollTrigger: { trigger: section.querySelector(".coverage-filieres"), start: "top 80%", toggleActions: "play none none none" },
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="coverage" className="section section-creme" ref={sectionRef}>
      <div className="section-header" style={{ textAlign: "center", margin: "0 auto", maxWidth: 750 }}>
        <Reveal>
          <div className="eyebrow">Couverture</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-lg" style={{ marginTop: "1rem" }}>
            17 pays, une seule <em>plateforme</em>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="body-lg" style={{ marginTop: "1rem", color: "var(--gris)" }}>
            Conformité sociale et comptable adaptée à chaque juridiction de l'espace OHADA. Multi-devises FCFA, EUR, USD.
          </p>
        </Reveal>
      </div>

      <div className="coverage-grid">
        {countries.map((c, i) => (
          <div key={i} className="coverage-country" style={{ opacity: 0 }}>
            <img
              src={`https://flagcdn.com/w40/${c.flag.toLowerCase()}.png`}
              alt={c.name}
              className="coverage-flag"
              width="40"
              height="30"
              loading="lazy"
            />
            <div className="coverage-country-info">
              <span className="coverage-country-name">{c.name}</span>
              <span className="coverage-country-meta">{c.zone} · {c.social}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="coverage-filieres">
        <Reveal>
          <h3 style={{ textAlign: "center", marginBottom: "1.5rem", fontSize: "1.1rem", fontWeight: 600 }}>
            Filières agricoles supportées
          </h3>
        </Reveal>
        <div className="coverage-filieres-row">
          {filières.map((f, i) => (
            <div key={i} className="coverage-filiere" style={{ opacity: 0 }}>
              <span className="coverage-filiere-emoji">{f.emoji}</span>
              <span>{f.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
