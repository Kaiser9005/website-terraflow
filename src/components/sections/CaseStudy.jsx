import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../ui/Reveal";
import MagneticButton from "../ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const beforeAfter = [
  { metric: "Clôture comptable", before: "3 semaines", after: "1 jour", icon: "\uD83D\uDCC5" },
  { metric: "Réconciliation paie", before: "3 jours", after: "Automatique", icon: "\u23F1\uFE0F" },
  { metric: "Traçabilité lots", before: "Papier", after: "100% numérique", icon: "\uD83D\uDD17" },
  { metric: "Données terrain", before: "J+2 à J+3", after: "Temps réel", icon: "\uD83D\uDCF1" },
  { metric: "Prédiction rendement", before: "Intuition", after: "R²=0.79 (IA)", icon: "\uD83E\uDD16" },
  { metric: "Conformité sociale", before: "Manuelle", after: "Automatisée", icon: "\u2705" },
];

export default function CaseStudy({ scrollTo }) {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const rows = sectionRef.current?.querySelectorAll(".cs-row");
    if (!rows) return;

    gsap.fromTo(rows,
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0,
        duration: 0.5, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 55%", toggleActions: "play none none none" },
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="case-study" className="section" ref={sectionRef}>
      <div className="cs-layout">
        <div className="cs-info">
          <Reveal>
            <div className="eyebrow">Étude de Cas</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-lg" style={{ marginTop: "1rem" }}>
              FOFAL : de la gestion papier à l'<em>excellence</em> opérationnelle
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="cs-context">
              <p className="body-lg" style={{ color: "var(--gris)" }}>
                Exploitation agro-industrielle de <strong>80 hectares</strong> au Centre du Cameroun.
                28 parcelles, 45+ employés, 3 cultures (palmier, papaye, vivrier).
              </p>
              <div className="cs-badges">
                <span className="cs-badge">Palmier à huile Tenera</span>
                <span className="cs-badge">Papayes F1 Horizon</span>
                <span className="cs-badge">Noix de palme</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="cs-quote">
              <blockquote>
                "On a recupere 2 semaines de productivite par mois. KALTIV a transforme notre facon de gerer l'exploitation."
              </blockquote>
              <cite>— Jean Paul FODJO, Fondateur FOFAL</cite>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <MagneticButton className="btn btn-primary" onClick={() => scrollTo("demo")}>
              Obtenir les mêmes résultats pour mon exploitation
            </MagneticButton>
          </Reveal>
        </div>

        <div className="cs-table">
          <div className="cs-table-header">
            <span></span>
            <span className="cs-header-before">Avant</span>
            <span className="cs-header-after">Avec KALTIV</span>
          </div>
          {beforeAfter.map((row, i) => (
            <div key={i} className="cs-row" style={{ opacity: 0 }}>
              <span className="cs-metric">
                <span className="cs-metric-icon">{row.icon}</span>
                {row.metric}
              </span>
              <span className="cs-before">{row.before}</span>
              <span className="cs-after">{row.after}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
