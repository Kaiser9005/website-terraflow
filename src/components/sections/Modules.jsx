import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../ui/Reveal";

gsap.registerPlugin(ScrollTrigger);

const moduleGroups = [
  {
    category: "Cœur de Métier",
    color: "var(--primary)",
    modules: [
      { name: "Gestion des Employés", desc: "Cycle de vie complet, contrats, documents" },
      { name: "Paie Multi-Pays", desc: "Cotisations sociales & fiscales adaptées par juridiction OHADA" },
      { name: "Congés & Absences", desc: "Validation multi-niveaux, soldes temps réel" },
      { name: "Présence & Pointage", desc: "Suivi quotidien, heures supplémentaires" },
      { name: "Formation & Compétences", desc: "Plans de développement, matrice de compétences, évaluations 360°" },
      { name: "Tâches & Planning", desc: "Attribution, suivi, rendement par équipe" },
    ],
  },
  {
    category: "Agriculture & Production",
    color: "var(--accent)",
    modules: [
      { name: "Gestion Parcellaire", desc: "Cartographie, cycles culturaux, GPS" },
      { name: "Production & Filières", desc: "Palmier, cacao, café, hévéa — suivi par filière" },
      { name: "Plantation", desc: "30+ unités de travail, tarification" },
      { name: "GMAO & IoT", desc: "Maintenance prédictive, capteurs temps réel" },
      { name: "Équipements", desc: "Gestion d'actifs, maintenance, amortissements" },
      { name: "Opérations", desc: "6 commandes entreprise, optimisation" },
    ],
  },
  {
    category: "Finance & Ventes",
    color: "var(--secondary)",
    modules: [
      { name: "Comptabilité OHADA", desc: "SYSCOHADA complet, clôture automatisée" },
      { name: "Budget & Trésorerie", desc: "Prévisions cash flow ML, budgets par département" },
      { name: "Ventes & CRM", desc: "Pipeline, scoring ML, multi-acheteurs" },
      { name: "Inventaire", desc: "6 services spécialisés, traçabilité lot" },
      { name: "Achats", desc: "Flux fournisseurs, approbations, export" },
      { name: "Tarification", desc: "Moteur de prix dynamique" },
    ],
  },
  {
    category: "Qualité & Excellence",
    color: "#8b5cf6",
    modules: [
      { name: "PDCA / 8D / QRQC", desc: "Résolution structurée de problèmes qualité" },
      { name: "Kanban & OKR", desc: "Gestion visuelle des flux, objectifs stratégiques" },
      { name: "SPC & AMDEC", desc: "Cartes de contrôle statistique, analyse de risques" },
      { name: "5S & Gemba Walk", desc: "Audits terrain géolocalisés, organisation postes" },
      { name: "VSM & SMED", desc: "Cartographie flux de valeur, réduction temps changement" },
      { name: "Chatbot IA Agronomique", desc: "12 outils Claude, 489 embeddings, conseils terrain" },
    ],
  },
];

export default function Modules() {
  const sectionRef = useRef(null);
  const [activeGroup, setActiveGroup] = useState(0);

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll(".module-card");
    if (!cards) return;

    gsap.fromTo(cards,
      { opacity: 0, x: 30 },
      {
        opacity: 1, x: 0,
        duration: 0.5, stagger: 0.05, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%", toggleActions: "play none none none" },
      }
    );
  }, { scope: sectionRef, dependencies: [activeGroup] });

  return (
    <section id="modules" className="section section-dark" ref={sectionRef}>
      <div className="section-header">
        <Reveal>
          <div className="eyebrow" style={{ color: "var(--accent)" }}>30+ Modules Intégrés</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-lg" style={{ marginTop: "1rem", color: "white" }}>
            Une plateforme, <em>zéro</em> compromis
          </h2>
        </Reveal>
      </div>

      <div className="modules-tabs">
        {moduleGroups.map((g, i) => (
          <button
            key={i}
            className={`module-tab ${activeGroup === i ? "active" : ""}`}
            onClick={() => setActiveGroup(i)}
          >
            {g.category}
          </button>
        ))}
      </div>

      <div className="modules-grid">
        {moduleGroups[activeGroup].modules.map((m, i) => (
          <div key={`${activeGroup}-${i}`} className="module-card" style={{ opacity: 0 }}>
            <h4>{m.name}</h4>
            <p>{m.desc}</p>
          </div>
        ))}
      </div>

      <Reveal delay={0.3}>
        <p className="modules-count" style={{ textAlign: "center", marginTop: "3rem", color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>
          + Documents/GED, Import de Données, Administration, Authentification 2FA, HR Analytics, Planning Génétique, Analytique & BI, TPM Maintenance
        </p>
      </Reveal>
    </section>
  );
}
