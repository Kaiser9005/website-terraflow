import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../ui/Reveal";
import MagneticButton from "../ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Starter",
    price: "150",
    period: "/mois",
    target: "20-100 hectares",
    features: [
      "5-10 modules au choix",
      "Gestion parcellaire de base",
      "Paie & RH essentiels",
      "Support email",
      "1 utilisateur admin",
    ],
    cta: "Commencer",
    featured: false,
  },
  {
    name: "Professional",
    price: "500",
    period: "/mois",
    target: "100-1000 hectares",
    features: [
      "15-20 modules",
      "IA predictive (rendement, meteo)",
      "Comptabilite OHADA complete",
      "Tracabilite parcelle-export",
      "Support prioritaire",
      "5 utilisateurs inclus",
    ],
    cta: "Choisir Pro",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Sur mesure",
    period: "",
    target: "1000+ hectares",
    features: [
      "27 modules complets",
      "IA avancee + chatbot agronomique",
      "API partenaires & webhooks",
      "Multi-sites, multi-devises",
      "SLA 99.95% garanti",
      "Utilisateurs illimites",
      "Formation & onboarding dedie",
    ],
    cta: "Nous Contacter",
    featured: false,
  },
];

export default function Pricing({ scrollTo }) {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll(".pricing-card");
    if (!cards) return;

    gsap.fromTo(cards,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0,
        duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%", toggleActions: "play none none none" },
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="pricing" className="section section-creme" ref={sectionRef}>
      <div className="section-header" style={{ textAlign: "center", margin: "0 auto", maxWidth: 700 }}>
        <Reveal>
          <div className="eyebrow">Tarification</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-lg" style={{ marginTop: "1rem" }}>
            Un investissement, pas une <em>depense</em>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="body-lg" style={{ marginTop: "1rem", color: "var(--gris)" }}>
            60 jours d'essai gratuit. Aucun engagement. ROI mesurable des le premier mois.
          </p>
        </Reveal>
      </div>

      <div className="pricing-grid">
        {plans.map((plan, i) => (
          <div key={i} className={`pricing-card ${plan.featured ? "featured" : ""}`} style={{ opacity: 0 }}>
            {plan.featured && <div className="pricing-badge">Populaire</div>}
            <h3 className="pricing-name">{plan.name}</h3>
            <div className="pricing-target">{plan.target}</div>
            <div className="pricing-price">
              <span className="pricing-amount">{plan.price}</span>
              {plan.period && <span className="pricing-currency"> EUR{plan.period}</span>}
            </div>
            <ul className="pricing-features">
              {plan.features.map((f, j) => (
                <li key={j}>{f}</li>
              ))}
            </ul>
            <MagneticButton
              className={`btn ${plan.featured ? "btn-primary" : "btn-dark"} btn-full`}
              onClick={() => scrollTo("demo")}
            >
              {plan.cta}
            </MagneticButton>
          </div>
        ))}
      </div>
    </section>
  );
}
