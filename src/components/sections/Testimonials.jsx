import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Reveal from "../ui/Reveal";

const testimonials = [
  {
    text: "Avant TerraFlow, on passait 3 jours à réconcilier les fiches de paie. Maintenant, c'est automatique. On a récupéré 2 semaines de productivité par mois.",
    author: "Jean Paul FODJO",
    role: "Fondateur & DG, FOFAL — 80 ha, Cameroun",
    initials: "JP",
  },
  {
    text: "La traçabilité parcelle-à-export nous a permis d'obtenir la certification HACCP en 6 mois au lieu de 18. Un avantage compétitif énorme.",
    author: "Aminata KONATÉ",
    role: "Responsable Qualité, Coopérative CAPLAMI — 200 ha, Côte d'Ivoire",
    initials: "AK",
  },
  {
    text: "Le mode hors-ligne est un game-changer. Mes superviseurs enregistrent les données au champ, et tout se synchronise quand ils rentrent au bureau.",
    author: "Kouamé DIALLO",
    role: "Directeur Opérations, Plantation SOPALM — 500 ha, Cameroun",
    initials: "KD",
  },
];

const INTERVAL = 6000;

export default function Testimonials() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  const slideRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!slideRef.current) return;
    gsap.fromTo(slideRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );
  }, [active]);

  const t = testimonials[active];

  return (
    <section id="testimonials" className="section" ref={sectionRef}>
      <div className="section-header" style={{ textAlign: "center", margin: "0 auto", maxWidth: 700 }}>
        <Reveal>
          <div className="eyebrow">Témoignages</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-lg" style={{ marginTop: "1rem" }}>
            Ils font <em>confiance</em> à TerraFlow
          </h2>
        </Reveal>
      </div>

      <div className="testimonial-carousel">
        <div ref={slideRef} className="testimonial-slide">
          <div className="testimonial-quote">&ldquo;</div>
          <p className="testimonial-text">{t.text}</p>
          <div className="testimonial-author">
            <div className="testimonial-avatar">{t.initials}</div>
            <div>
              <div className="testimonial-name">{t.author}</div>
              <div className="testimonial-role">{t.role}</div>
            </div>
          </div>
        </div>

        <div className="testimonial-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`testimonial-dot ${active === i ? "active" : ""}`}
              onClick={() => setActive(i)}
              aria-label={`Temoignage ${i + 1}`}
            >
              <span className="dot-inner" />
              {active === i && (
                <svg className="dot-progress" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" />
                  <circle cx="18" cy="18" r="16" className="dot-progress-fill" style={{ animationDuration: `${INTERVAL}ms` }} />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
