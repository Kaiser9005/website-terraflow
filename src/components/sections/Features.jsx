import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../ui/Reveal";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: "\uD83C\uDF3E",
    title: "Gestion Parcellaire",
    desc: "Cartographiez vos parcelles, suivez les cycles culturaux et optimisez l'utilisation de chaque hectare avec des données GPS en temps réel.",
    highlight: "28+ parcelles gérées par FOFAL",
    size: "large",
  },
  {
    icon: "\uD83E\uDDEE",
    title: "Comptabilité OHADA & Budget",
    desc: "Plan comptable SYSCOHADA automatisé, clôture en 1 jour. Prévisions trésorerie ML, budgets par département, cash flow forecast.",
    size: "normal",
  },
  {
    icon: "\uD83E\uDD16",
    title: "IA Prédictive & Chatbot",
    desc: "6 modèles ML (rendement, qualité, prix, demande). Chatbot agronomique IA avec 12 outils Claude et 489 embeddings de connaissances terrain.",
    highlight: "R\u00B2 = 0.79 sur le rendement palmier",
    size: "large",
  },
  {
    icon: "\uD83D\uDD17",
    title: "Traçabilité Complète",
    desc: "De la parcelle à l'export : chaque lot, chaque étape, chaque certificat. Compatible ISO 9001 et HACCP.",
    size: "normal",
  },
  {
    icon: "\uD83D\uDCB0",
    title: "Paie & RH Avancé",
    desc: "11 sous-modules RH. Matrice de compétences, évaluations 360°, plans de succession. Cotisations multi-pays Zone OHADA.",
    size: "normal",
  },
  {
    icon: "\u2699\uFE0F",
    title: "Excellence Opérationnelle",
    desc: "14 outils qualité digitaux : PDCA, 8D, QRQC, Kanban, BSC, SPC, AMDEC, 5S, Gemba Walk GPS, VSM, SMED, TPM, OKR.",
    highlight: "Amélioration continue intégrée",
    size: "large",
  },
  {
    icon: "\uD83D\uDCF1",
    title: "PWA & Terrain",
    desc: "Application installable sur mobile. Synchronisation offline via PowerSync + 6 modèles ONNX embarqués pour prédictions hors-ligne.",
    size: "normal",
  },
  {
    icon: "\uD83D\uDEE1\uFE0F",
    title: "Sécurité & Conformité",
    desc: "Interface bilingue FR/EN (15 000+ clés). Monitoring Sentry, 900+ tests automatisés, résidence données Afrique/EU.",
    size: "normal",
  },
];

export default function Features() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll(".feature-card");
    if (!cards) return;

    gsap.fromTo(cards,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%", toggleActions: "play none none none" },
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="features" className="section" ref={sectionRef}>
      <div className="section-header" style={{ textAlign: "center", margin: "0 auto", maxWidth: 700 }}>
        <Reveal>
          <div className="eyebrow">Fonctionnalités</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-lg" style={{ marginTop: "1rem" }}>
            Tout ce dont votre exploitation a <em>besoin</em>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="body-lg" style={{ marginTop: "1rem", color: "var(--gris)" }}>
            Une plateforme unique qui remplace vos fichiers Excel, vos cahiers de terrain et vos logiciels fragmentés.
          </p>
        </Reveal>
      </div>

      <div className="features-bento">
        {features.map((f, i) => (
          <div key={i} className={`feature-card ${f.size === "large" ? "feature-card-lg" : ""}`} style={{ opacity: 0 }}>
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
            {f.highlight && <span className="feature-highlight">{f.highlight}</span>}
          </div>
        ))}
      </div>
    </section>
  );
}
