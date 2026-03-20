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
    priceFCFA: "98 400 FCFA",
    period: "/mois",
    target: "Petites exploitations · 20-100 ha",
    features: [
      "5–10 modules au choix",
      "Gestion parcellaire de base",
      "Paie & RH essentiels",
      "Support e-mail",
      "1 utilisateur admin",
    ],
    cta: "Démarrer mon essai gratuit",
    featured: false,
  },
  {
    name: "Professional",
    price: "À partir de 500",
    priceFCFA: "~328 000 FCFA",
    period: "/mois",
    target: "Moyennes exploitations · 100-1 000 ha",
    features: [
      "20–25 modules",
      "IA prédictive + chatbot agronomique",
      "Comptabilité OHADA + budget & trésorerie",
      "Traçabilité parcelle-export",
      "Gestion qualité (PDCA, 5S, Gemba)",
      "Support prioritaire (réponse < 4h)",
      "5 utilisateurs inclus",
    ],
    cta: "Essayer 60 jours gratuit",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Sur mesure",
    period: "",
    target: "Agro-industries · 1 000+ ha",
    features: [
      "30+ modules complets",
      "IA avancée + chatbot agronomique (12 outils)",
      "Excellence opérationnelle (PDCA, Kanban, SPC)",
      "API partenaires & webhooks",
      "Multi-sites, multi-devises",
      "SLA sur mesure",
      "Utilisateurs illimités",
      "Formation & onboarding dédié",
    ],
    cta: "Demander un devis",
    featured: false,
  },
  {
    name: "Public",
    price: "Sur mesure",
    period: "",
    target: "Institutionnels · Ministères, agences",
    features: [
      "Déploiement souverain dédié",
      "Tableau de bord filière nationale",
      "Intégration systèmes publics",
      "Conformité marchés publics",
      "Support & SLA gouvernemental",
    ],
    cta: "Demander un devis",
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
            Un investissement, pas une <em>dépense</em>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="body-lg" style={{ marginTop: "1rem", color: "var(--gris)" }}>
            60 jours d'essai gratuit. Aucun engagement. ROI mesurable dès le premier mois.
          </p>
          <p className="pricing-payments" style={{ marginTop: "0.5rem", fontSize: "0.8rem", color: "var(--gris)" }}>
            Paiement par virement ou carte bancaire. Mobile Money bientôt disponible.
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
              {plan.priceFCFA && <div className="pricing-fcfa">{plan.priceFCFA}/mois</div>}
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

      <Reveal delay={0.3}>
        <div className="pricing-compare">
          <h3 style={{ textAlign: "center", marginBottom: "1.5rem", fontSize: "1.1rem", fontWeight: 600 }}>
            Comparaison détaillée
          </h3>
          <div className="pricing-matrix">
            <table>
              <thead>
                <tr>
                  <th>Fonctionnalité</th>
                  <th>Starter</th>
                  <th className="pricing-matrix-featured">Pro</th>
                  <th>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Modules", "5–10", "20–25", "30+"],
                  ["Utilisateurs", "1", "5", "Illimité"],
                  ["Gestion parcellaire", "Base", "Avancée", "Complète"],
                  ["Comptabilité OHADA", "—", "Complète", "Complète"],
                  ["IA prédictive", "—", "Rendement + météo", "Tous modèles"],
                  ["Traçabilité", "—", "Parcelle-export", "ISO/HACCP"],
                  ["Mode hors-ligne", "Basique", "En dev", "En dev + ONNX"],
                  ["Support", "Email", "Prioritaire < 4h", "SLA + manager dédié"],
                  ["Multi-sites", "—", "—", "Illimité"],
                  ["API & webhooks", "—", "—", "Complet"],
                  ["Facturation annuelle", "—", "2 mois offerts", "Sur mesure"],
                ].map(([feature, s, p, e], i) => (
                  <tr key={i}>
                    <td>{feature}</td>
                    <td>{s}</td>
                    <td className="pricing-matrix-featured">{p}</td>
                    <td>{e}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.4}>
        <div className="pricing-compare" style={{ marginTop: "3rem" }}>
          <h3 style={{ textAlign: "center", marginBottom: "1.5rem", fontSize: "1.1rem", fontWeight: 600 }}>
            TerraFlow vs Alternatives
          </h3>
          <div className="pricing-matrix">
            <table>
              <thead>
                <tr>
                  <th>Critère</th>
                  <th className="pricing-matrix-featured">TerraFlow</th>
                  <th>Odoo</th>
                  <th>Excel</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Conformité OHADA", "Natif", "Module tiers", "Manuelle"],
                  ["Paie multi-pays", "Cameroun + extensible", "Par extension", "Non"],
                  ["Mode hors-ligne", "PWA (en dev)", "Non", "Fichier local"],
                  ["IA prédictive", "CatBoost/LightGBM", "Non", "Non"],
                  ["Agriculture spécialisé", "30+ modules", "Générique", "Non"],
                  ["Traçabilité lot", "Parcelle-export", "Module séparé", "Non"],
                  ["Mobile Money", "Bientôt", "Non natif", "Non"],
                  ["Temps de déploiement", "4 semaines", "3-6 mois", "Immédiat"],
                  ["Prix (PME)", "150-500 EUR/mois", "~1 000+ EUR/mois", "Gratuit*"],
                ].map(([feature, tf, odoo, excel], i) => (
                  <tr key={i}>
                    <td>{feature}</td>
                    <td className="pricing-matrix-featured">{tf}</td>
                    <td>{odoo}</td>
                    <td>{excel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ textAlign: "center", fontSize: "0.7rem", color: "var(--gris)", marginTop: "0.75rem" }}>
              * Excel : coût caché estimé ~15% du CA en inefficacités (source : FAO/World Bank)
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
