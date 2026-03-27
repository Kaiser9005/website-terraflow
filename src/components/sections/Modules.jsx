import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../ui/Reveal";

gsap.registerPlugin(ScrollTrigger);

const moduleGroups = [
  {
    category: "Coeur de Metier",
    color: "var(--primary)",
    modules: [
      { name: "Gestion des Employes", desc: "Cycle de vie complet, contrats, documents" },
      { name: "Paie Multi-Pays", desc: "Cotisations sociales & fiscales adaptees par juridiction" },
      { name: "Conges & Absences", desc: "Validation multi-niveaux, soldes temps reel" },
      { name: "Presence & Pointage", desc: "Suivi quotidien, heures supplementaires" },
      { name: "Formation & Competences", desc: "Plans de developpement, matrice de competences, evaluations 360 deg." },
      { name: "Taches & Planning", desc: "Attribution, suivi, rendement par equipe" },
      { name: "Notifications Multicanal", desc: "Email, WhatsApp, in-app, push mobile" },
    ],
  },
  {
    category: "Agriculture & Production",
    color: "var(--accent)",
    modules: [
      { name: "Gestion Parcellaire", desc: "Cartographie, cycles culturaux, GPS" },
      { name: "Production & Filieres", desc: "Palmier, cacao, cafe, hevea — suivi par filiere" },
      { name: "Plantation", desc: "30+ unites de travail, tarification" },
      { name: "GMAO & IoT", desc: "Maintenance predictive, capteurs temps reel" },
      { name: "Equipements", desc: "Gestion d'actifs, maintenance, amortissements" },
      { name: "Operations", desc: "6 commandes entreprise, optimisation" },
      { name: "Fuel Management", desc: "Suivi carburant, consommation par equipement" },
    ],
  },
  {
    category: "Finance & Ventes",
    color: "var(--secondary)",
    modules: [
      { name: "Comptabilite OHADA", desc: "SYSCOHADA complet, cloture automatisee" },
      { name: "Budget & Tresorerie", desc: "Previsions cash flow ML, budgets par departement" },
      { name: "Ventes & CRM", desc: "Pipeline, scoring ML, multi-acheteurs" },
      { name: "Inventaire", desc: "6 services specialises, tracabilite lot" },
      { name: "Achats", desc: "Flux fournisseurs, approbations, export" },
      { name: "Tarification", desc: "Moteur de prix dynamique" },
      { name: "Multi-Devises", desc: "XAF, XOF, GHS, KES, EUR — conversion temps reel" },
    ],
  },
  {
    category: "Qualite & Excellence",
    color: "#8b5cf6",
    modules: [
      { name: "PDCA / 8D / QRQC", desc: "Resolution structuree de problemes qualite" },
      { name: "Kanban & OKR", desc: "Gestion visuelle des flux, objectifs strategiques" },
      { name: "SPC & AMDEC", desc: "Cartes de controle statistique, analyse de risques" },
      { name: "5S & Gemba Walk", desc: "Audits terrain geolocalises, organisation postes" },
      { name: "VSM & SMED", desc: "Cartographie flux de valeur, reduction temps changement" },
      { name: "TPM", desc: "Total Productive Maintenance, taux rendement synthetique" },
    ],
  },
  {
    category: "Intelligence & IA",
    color: "#22d3ee",
    modules: [
      { name: "Kona Chatbot", desc: "23 actions d'ecriture, 4 personas, memoire contextuelle" },
      { name: "Digital Chief of Staff", desc: "44 outils IA, conseils proactifs, rapports automatiques" },
      { name: "RAG Knowledge Base", desc: "489 embeddings, recherche semantique, connaissances terrain" },
      { name: "Predictive Analytics", desc: "6 modeles ML : rendement, qualite, prix, demande, meteo, risques" },
      { name: "Sentiment Analysis", desc: "Analyse de satisfaction, feedback employes et clients" },
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
          <div className="eyebrow" style={{ color: "var(--accent)" }}>27+ Modules Integres</div>
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
