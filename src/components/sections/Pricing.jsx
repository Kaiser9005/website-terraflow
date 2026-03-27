import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../ui/Reveal";
import MagneticButton from "../ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Foundation",
    price: "$115",
    priceLocal: "75 000 FCFA · GHS 1 400 · KES 14 800",
    period: "/mo",
    target: "Small farms · < 50 ha",
    features: [
      "15 essential modules",
      "5 users included",
      "Payroll + regulatory compliance",
      "Real-time KPI dashboard",
      "Email + WhatsApp support",
      "Multi-channel notifications",
    ],
    cta: "Start — 30 days free",
    featured: false,
    badge: null,
  },
  {
    name: "Growth",
    price: "$305",
    priceLocal: "200 000 FCFA · GHS 3 700 · KES 39 300",
    period: "/mo",
    target: "Mid-size operations · 50-500 ha",
    features: [
      "25 modules",
      "15 users included",
      "Full regulatory compliance (OHADA/IFRS)",
      "Predictive AI (yield + quality)",
      "Kona chatbot (FAQ + actions)",
      "Kanban + PDCA",
      "Priority support < 8h",
    ],
    cta: "Try 60 days free",
    featured: true,
    badge: "Popular",
  },
  {
    name: "Command",
    price: "$762",
    priceLocal: "500 000 FCFA · GHS 9 300 · KES 98 200",
    period: "/mo",
    target: "Large operations · 500-2 000 ha",
    features: [
      "All modules",
      "50 users included",
      "Multi-regional (OHADA CEMAC/UEMOA + anglophone, 5 jurisdictions)",
      "Digital Chief of Staff (44 AI tools)",
      "Kona AI full (23 write actions)",
      "14 Lean tools",
      "Offline ONNX + PowerSync",
      "API & webhooks",
      "Support < 4h + phone",
    ],
    cta: "Request a demo",
    featured: false,
    badge: "Recommended",
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceLocal: "",
    period: "",
    target: "Agro-industries · 2 000+ ha · Multi-site",
    features: [
      "Custom modules + integrations",
      "Unlimited users",
      "Multi-jurisdiction + multi-currency",
      "Custom AI models",
      "Guaranteed SLA + dedicated manager",
      "On-site training",
      "Security audit + SOC 2",
    ],
    cta: "Contact sales",
    featured: false,
    badge: null,
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
            {plan.badge && <div className="pricing-badge">{plan.badge}</div>}
            <h3 className="pricing-name">{plan.name}</h3>
            <div className="pricing-target">{plan.target}</div>
            <div className="pricing-price">
              <span className="pricing-amount">{plan.price}</span>
              {plan.period && <span className="pricing-currency">{plan.period}</span>}
              {plan.priceLocal && <div className="pricing-fcfa">{plan.priceLocal}</div>}
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
                  <th>Fonctionnalite</th>
                  <th>Foundation</th>
                  <th className="pricing-matrix-featured">Growth</th>
                  <th>Command</th>
                  <th>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Modules", "15", "25", "Tous", "Custom"],
                  ["Utilisateurs", "5", "15", "50", "Illimite"],
                  ["Compliance", "Basique", "Complete", "Multi-pays", "Multi-juridictions"],
                  ["IA/ML", "Dashboard", "Predictif", "Complet + Chief of Staff", "Custom"],
                  ["Lean", "—", "Kanban+PDCA", "14 outils", "Custom"],
                  ["Offline", "PWA", "+ PowerSync", "+ ONNX", "Full suite"],
                  ["Chatbot", "FAQ", "+ Actions", "23 write actions", "Custom"],
                  ["Support", "Email+WA", "< 8h", "< 4h + tel", "SLA dedie"],
                  ["Facturation ann.", "—", "2 mois offerts", "2 mois offerts", "Sur mesure"],
                ].map(([feature, f, g, c, e], i) => (
                  <tr key={i}>
                    <td>{feature}</td>
                    <td>{f}</td>
                    <td className="pricing-matrix-featured">{g}</td>
                    <td>{c}</td>
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
            KALTIV vs Alternatives
          </h3>
          <div className="pricing-matrix">
            <table>
              <thead>
                <tr>
                  <th>Critere</th>
                  <th className="pricing-matrix-featured">KALTIV</th>
                  <th>SAP B1</th>
                  <th>Odoo Ent.</th>
                  <th>Excel</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Prix PME", "$115-$762/mo", "~$1 500+/mo", "~$1 000+/mo", "\"Free\""],
                  ["Compliance Afrique", "OHADA+CEMAC+UEMOA natif", "Non", "Module tiers", "Non"],
                  ["Chatbot IA agri", "Oui (Kona)", "Non", "Non", "Non"],
                  ["Offline", "ONNX + PowerSync", "Non", "Non", "Oui"],
                  ["Deploiement", "4 semaines", "6-12 mois", "3-6 mois", "Immediat"],
                  ["Multi-regional", "5 pays", "Extensible", "Par extension", "Non"],
                ].map(([feature, k, sap, odoo, excel], i) => (
                  <tr key={i}>
                    <td>{feature}</td>
                    <td className="pricing-matrix-featured">{k}</td>
                    <td>{sap}</td>
                    <td>{odoo}</td>
                    <td>{excel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ textAlign: "center", fontSize: "0.7rem", color: "var(--gris)", marginTop: "0.75rem" }}>
              * Excel : cout cache estime ~15% du CA en inefficacites (source : FAO/World Bank)
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
