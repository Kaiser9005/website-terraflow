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
    title: "Comptabilité OHADA",
    desc: "Plan comptable SYSCOHADA automatisé. Clôturez votre exercice en 1 jour au lieu de 2 semaines. Conforme aux normes CEMAC.",
    size: "normal",
  },
  {
    icon: "\uD83E\uDD16",
    title: "IA Prédictive",
    desc: "Modèles CatBoost et LightGBM entraînés sur vos données réelles. Prédiction de rendements, alertes météo, détection d'anomalies.",
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
    title: "Paie & RH",
    desc: "Gestion complète des 9 sous-modules RH. Calcul automatique des cotisations sociales et fiscales. Conformité multi-pays Zone OHADA.",
    size: "normal",
  },
  {
    icon: "\uD83D\uDCF1",
    title: "PWA & Terrain",
    desc: "Application installable sur mobile. Mode hors-ligne avec synchronisation automatique en développement (ONNX + PowerSync).",
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
