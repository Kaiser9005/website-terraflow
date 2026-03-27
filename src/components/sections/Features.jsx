import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../ui/Reveal";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: "\uD83C\uDFAF",
    title: "Digital Chief of Staff",
    desc: "44 outils IA pour piloter votre exploitation — conseils proactifs, rapports automatiques, alertes intelligentes.",
    highlight: "Votre directeur de cabinet numérique",
    size: "large",
  },
  {
    icon: "\uD83E\uDD16",
    title: "Kona AI",
    desc: "Chatbot agentic avec 23 actions d'écriture, 4 personas, mémoire contextuelle. Posez une question, obtenez une action.",
    size: "normal",
  },
  {
    icon: "\uD83C\uDF0D",
    title: "Conformité Multi-Régionale",
    desc: "OHADA (CEMAC/UEMOA) + Companies Act (anglophone). 5 pays : Cameroun, Sénégal, Ghana, Kenya, Côte d'Ivoire.",
    highlight: "Multi-juridictions natif",
    size: "large",
  },
  {
    icon: "\uD83D\uDCF4",
    title: "Offline-First",
    desc: "PowerSync + 6 modèles ONNX embarqués. Travaillez sans Internet, synchronisez quand le réseau revient.",
    size: "normal",
  },
  {
    icon: "\u2699\uFE0F",
    title: "Lean Digital",
    desc: "PDCA, Kanban, BSC, OKR, VSM, SMED, TPM, SPC — 14 outils d'excellence opérationnelle intégrés.",
    highlight: "Amélioration continue intégrée",
    size: "large",
  },
  {
    icon: "\uD83D\uDCF1",
    title: "WhatsApp Intelligence",
    desc: "Parsing automatique de conversations terrain, notifications multicanal, rapports WhatsApp.",
    size: "normal",
  },
  {
    icon: "\uD83D\uDD17",
    title: "Traçabilité Complète",
    desc: "De la parcelle à l'export — ISO 9001, HACCP, blockchain. Chaque lot, chaque étape, chaque certificat.",
    size: "normal",
  },
  {
    icon: "\uD83D\uDCB0",
    title: "Paie & RH Avancé",
    desc: "11 sous-modules RH, 5 juridictions fiscales, matrice de compétences, évaluations 360°.",
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
