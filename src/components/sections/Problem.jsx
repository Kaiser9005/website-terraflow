import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../ui/Reveal";

gsap.registerPlugin(ScrollTrigger);

const painPoints = [
  {
    icon: "\uD83D\uDCCB",
    stat: "72%",
    title: "Exploitations sans ERP",
    desc: "En Afrique subsaharienne, la gestion se fait encore sur papier et Excel. Données perdues, doublons, erreurs de paie.",
    cost: "~15% du CA perdu en inefficacités",
  },
  {
    icon: "\u26A0\uFE0F",
    stat: "3 sem.",
    title: "Clôture comptable",
    desc: "Sans automatisation OHADA/SYSCOHADA, la clôture mensuelle prend des semaines au lieu d'heures. Non-conformité = amendes.",
    cost: "Amendes CEMAC jusqu'à 5M FCFA",
  },
  {
    icon: "\uD83D\uDCF5",
    stat: "60%",
    title: "Zones sans Internet fiable",
    desc: "Les solutions cloud classiques sont inutilisables au champ. Vos superviseurs ne peuvent pas saisir les données terrain.",
    cost: "Données collectées 2-3 jours en retard",
  },
  {
    icon: "\uD83D\uDD17",
    stat: "0%",
    title: "Traçabilité certifiable",
    desc: "Sans chaîne de traçabilité numérique, impossible d'obtenir les certifications ISO/HACCP exigées par les acheteurs internationaux.",
    cost: "Exclusion des marchés premium",
  },
];

export default function Problem() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll(".problem-card");
    if (!cards) return;

    gsap.fromTo(cards,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.7, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%", toggleActions: "play none none none" },
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="problem" className="section section-dark" ref={sectionRef}>
      <div className="section-header" style={{ textAlign: "center", margin: "0 auto", maxWidth: 750 }}>
        <Reveal>
          <div className="eyebrow">Le Problème</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-lg" style={{ marginTop: "1rem", color: "white" }}>
            L'agriculture africaine mérite <em>mieux</em> qu'Excel
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="body-lg" style={{ marginTop: "1rem", color: "rgba(255,255,255,0.6)" }}>
            Les ERP occidentaux ignorent les réalités du terrain africain. Pas de conformité OHADA, pas de mode hors-ligne, pas de paie locale adaptée. Résultat :
          </p>
        </Reveal>
      </div>

      <div className="problem-grid">
        {painPoints.map((p, i) => (
          <div key={i} className="problem-card" style={{ opacity: 0 }}>
            <div className="problem-stat">{p.stat}</div>
            <div className="problem-icon">{p.icon}</div>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <div className="problem-cost">{p.cost}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
