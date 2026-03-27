import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../ui/Reveal";
import MagneticButton from "../ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const personas = [
  {
    id: "pdg",
    label: "PDG / DG",
    icon: "\uD83C\uDFE2",
    title: "Vision stratégique & ROI",
    pain: "Vous passez des heures à consolider des rapports Excel pour prendre des décisions.",
    solution: "Dashboard temps réel avec KPIs consolidés, prévisions IA, et reporting automatique OHADA.",
    modules: ["Analytics & BI", "Comptabilité OHADA", "Planning"],
    result: "Décisions data-driven, clôture en 1 jour, visibilité 360°",
  },
  {
    id: "daf",
    label: "DAF / Comptable",
    icon: "\uD83D\uDCCA",
    title: "Conformité & automatisation",
    pain: "La conformité OHADA et les cotisations sociales prennent des semaines et le risque d'erreur est permanent.",
    solution: "Paie automatisée conforme multi-pays (CNPS, CNSS, INSS...). SYSCOHADA complet avec clôture automatique.",
    modules: ["Paie Multi-Pays", "Comptabilité OHADA", "Inventaire"],
    result: "Zéro erreur de paie, conformité garantie, audit-ready",
  },
  {
    id: "dt",
    label: "Dir. Technique",
    icon: "\u2699\uFE0F",
    title: "Terrain & traçabilité",
    pain: "Les données terrain arrivent avec 2-3 jours de retard. Impossible de réagir vite.",
    solution: "Saisie mobile hors-ligne, IoT temps réel, traçabilité GPS de la parcelle à l'export.",
    modules: ["Gestion Parcellaire", "GMAO & IoT", "Traçabilité"],
    result: "Données en temps réel, maintenance prédictive, certification HACCP",
  },
  {
    id: "investisseur",
    label: "Investisseur",
    icon: "\uD83D\uDCB0",
    title: "Marché & différenciateurs",
    pain: "Vous cherchez une solution agritech scalable pour le marché africain.",
    solution: "Multi-tenant, multi-devises, offline-first. Le seul ERP agricole avec IA et conformité OHADA intégrées.",
    modules: ["Multi-tenant", "API & Webhooks", "IA Prédictive"],
    result: "TAM $800M Afrique, CAGR +23%, 4% VC = faible concurrence",
  },
];

export default function UseCases({ scrollTo }) {
  const sectionRef = useRef(null);
  const [activePersona, setActivePersona] = useState(0);

  useGSAP(() => {
    const content = sectionRef.current?.querySelector(".uc-content");
    if (!content) return;
    gsap.fromTo(content,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    );
  }, { scope: sectionRef, dependencies: [activePersona] });

  const p = personas[activePersona];

  return (
    <section id="use-cases" className="section section-creme" ref={sectionRef}>
      <div className="section-header" style={{ textAlign: "center", margin: "0 auto", maxWidth: 700 }}>
        <Reveal>
          <div className="eyebrow">Cas d'Usage</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-lg" style={{ marginTop: "1rem" }}>
            Vous êtes <em>qui</em> ?
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="body-lg" style={{ marginTop: "1rem", color: "var(--gris)" }}>
            KALTIV s'adapte a votre role. Selectionnez votre profil.
          </p>
        </Reveal>
      </div>

      <div className="uc-tabs">
        {personas.map((per, i) => (
          <button
            key={per.id}
            className={`uc-tab ${activePersona === i ? "active" : ""}`}
            onClick={() => setActivePersona(i)}
          >
            <span className="uc-tab-icon">{per.icon}</span>
            <span className="uc-tab-label">{per.label}</span>
          </button>
        ))}
      </div>

      <div className="uc-content" key={activePersona}>
        <div className="uc-card">
          <div className="uc-card-left">
            <h3 className="uc-title">{p.title}</h3>
            <div className="uc-pain">
              <span className="uc-pain-label">Le problème</span>
              <p>{p.pain}</p>
            </div>
            <div className="uc-solution">
              <span className="uc-solution-label">La solution KALTIV</span>
              <p>{p.solution}</p>
            </div>
          </div>
          <div className="uc-card-right">
            <div className="uc-modules">
              <span className="uc-modules-label">Modules clés</span>
              {p.modules.map((m, i) => (
                <span key={i} className="uc-module-tag">{m}</span>
              ))}
            </div>
            <div className="uc-result">
              <span className="uc-result-label">Résultat</span>
              <p>{p.result}</p>
            </div>
            <MagneticButton className="btn btn-primary" onClick={() => scrollTo("demo")}>
              Voir la démo {p.label}
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
