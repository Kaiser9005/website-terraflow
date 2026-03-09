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
    desc: "Cartographiez vos parcelles, suivez les cycles culturaux et optimisez l'utilisation de chaque hectare avec des donnees GPS en temps reel.",
  },
  {
    icon: "\uD83E\uDDEE",
    title: "Comptabilite OHADA",
    desc: "Plan comptable SYSCOHADA automatise. Cloturez votre exercice en 1 jour au lieu de 2 semaines. Conforme aux normes CEMAC.",
  },
  {
    icon: "\uD83E\uDD16",
    title: "IA Predictive",
    desc: "Modeles CatBoost et LightGBM entraines sur vos donnees reelles. Prediction de rendements, alertes meteo, detection d'anomalies.",
  },
  {
    icon: "\uD83D\uDD17",
    title: "Tracabilite Complete",
    desc: "De la parcelle a l'export : chaque lot, chaque etape, chaque certificat. Compatible ISO 9001 et HACCP.",
  },
  {
    icon: "\uD83D\uDCB0",
    title: "Paie & RH",
    desc: "Gestion complete des 9 sous-modules RH. Calcul automatique CNPS, IRPP, CFC, FNE, CRTV. Conformite Cameroun & Zone CEMAC.",
  },
  {
    icon: "\uD83D\uDCF1",
    title: "Mode Hors-Ligne",
    desc: "Les modeles IA tournent en local via ONNX. Synchronisation automatique quand la connexion revient. Fait pour le terrain.",
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
          <div className="eyebrow">Fonctionnalites</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-lg" style={{ marginTop: "1rem" }}>
            Tout ce dont votre exploitation a <em>besoin</em>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="body-lg" style={{ marginTop: "1rem", color: "var(--gris)" }}>
            Une plateforme unique qui remplace vos fichiers Excel, vos cahiers de terrain et vos logiciels fragmentes.
          </p>
        </Reveal>
      </div>

      <div className="features-grid">
        {features.map((f, i) => (
          <div key={i} className="feature-card" style={{ opacity: 0 }}>
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
