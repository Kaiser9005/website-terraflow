import { useState, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../ui/Reveal";
import MagneticButton from "../ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const EUR_TO_FCFA = 656;

// Taux calibrés sur benchmarks FAO/World Bank/Nucleus Research (mars 2026)
// Total: 23% — aligné avec les données SSA (30-50% total, ~23% ERP-adressable)
const BASE_LOSS_RATES = [
  { key: "pertes_donnees", label: "Gestion manuelle des données", rate: 0.065 },
  { key: "pertes_recolte", label: "Pertes post-récolte", rate: 0.10 },
  { key: "surcharge_admin", label: "Surcharge administrative", rate: 0.03 },
  { key: "non_conformite", label: "Non-conformité OHADA", rate: 0.015 },
  { key: "pertes_stock", label: "Pertes de stock & intrants", rate: 0.02 },
];

const TERRAFLOW_REDUCTION = {
  pertes_donnees: 0.80,
  pertes_recolte: 0.60,
  surcharge_admin: 0.70,
  non_conformite: 0.90,
  pertes_stock: 0.75,
};

const ERP_MULTIPLIER = { aucun: 1.0, excel: 0.6, autre: 0.5 };

// Tiers alignés avec la page Tarifs du site
const PRICING_TIERS = [
  { max: 10, monthly: 150 },    // Starter
  { max: 50, monthly: 500 },    // Professional (base)
  { max: 200, monthly: 1500 },  // Enterprise
  { max: Infinity, monthly: 5000 }, // Enterprise+
];

function formatFCFA(n) {
  if (n < 0) return "-" + Math.round(Math.abs(n)).toLocaleString("fr-FR") + " FCFA";
  return Math.round(n).toLocaleString("fr-FR") + " FCFA";
}

function calculateROI(revenusAnnuels, nombreEmployes, erpActuel) {
  const multiplier = ERP_MULTIPLIER[erpActuel];

  let pertesTotales = 0;
  let gainsTotaux = 0;
  const details = BASE_LOSS_RATES.map((item) => {
    const loss = revenusAnnuels * item.rate * multiplier;
    const gain = loss * TERRAFLOW_REDUCTION[item.key];
    pertesTotales += loss;
    gainsTotaux += gain;
    return { ...item, loss, gain };
  });

  const tier = PRICING_TIERS.find((t) => nombreEmployes <= t.max);
  const coutAnnuel = tier.monthly * 12 * EUR_TO_FCFA;
  const economiesAnnuelles = gainsTotaux - coutAnnuel;
  const roiPercent = coutAnnuel > 0 ? Math.round((economiesAnnuelles / coutAnnuel) * 100) : 0;
  const breakEvenMonths = gainsTotaux > 0 ? Math.ceil(coutAnnuel / (gainsTotaux / 12)) : 99;

  return { details, pertesTotales, gainsTotaux, coutAnnuel, economiesAnnuelles, roiPercent, breakEvenMonths };
}

export default function ROICalculator({ scrollTo }) {
  const sectionRef = useRef(null);
  const [revenus, setRevenus] = useState(50);
  const [employes, setEmployes] = useState(40);
  const [erp, setErp] = useState("aucun");

  const result = useMemo(
    () => calculateROI(revenus * 1_000_000, employes, erp),
    [revenus, employes, erp]
  );

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;
    gsap.fromTo(section.querySelector(".roi-results"),
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 60%", toggleActions: "play none none none" },
      }
    );
  }, { scope: sectionRef });

  const isPositive = result.economiesAnnuelles > 0;
  const maxBar = Math.max(result.pertesTotales, result.gainsTotaux, 1);

  // Suggest the right tier based on revenue/employee ratio
  const suggestedTier = revenus < 20 ? "Starter" : revenus < 100 ? "Professional" : "Enterprise";

  return (
    <section id="roi" className="section" ref={sectionRef}>
      <div className="section-header" style={{ textAlign: "center", margin: "0 auto", maxWidth: 750 }}>
        <Reveal>
          <div className="eyebrow">Calculateur ROI</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-lg" style={{ marginTop: "1rem" }}>
            Combien <em>économisez</em>-vous ?
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="body-lg" style={{ marginTop: "1rem", color: "var(--gris)" }}>
            Estimez vos gains annuels en adoptant TerraFlow. Basé sur les benchmarks FAO et les données de nos clients.
          </p>
        </Reveal>
      </div>

      <div className="roi-layout">
        <div className="roi-inputs">
          <div className="roi-field">
            <label>Revenus annuels (M FCFA)</label>
            <input
              type="range"
              min="10"
              max="500"
              step="5"
              value={revenus}
              onChange={(e) => setRevenus(Number(e.target.value))}
            />
            <span className="roi-field-value">{revenus}M FCFA</span>
          </div>
          <div className="roi-field">
            <label>Nombre d'employés</label>
            <input
              type="range"
              min="1"
              max="300"
              step="1"
              value={employes}
              onChange={(e) => setEmployes(Number(e.target.value))}
            />
            <span className="roi-field-value">{employes}</span>
          </div>
          <div className="roi-field">
            <label>Système actuel</label>
            <div className="roi-radio-group">
              {[
                { val: "aucun", label: "Papier / Rien" },
                { val: "excel", label: "Excel" },
                { val: "autre", label: "Autre ERP" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  className={`roi-radio ${erp === opt.val ? "active" : ""}`}
                  onClick={() => setErp(opt.val)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="roi-results">
          {isPositive ? (
            <div className="roi-kpis">
              <div className="roi-kpi roi-kpi-savings">
                <span className="roi-kpi-value">{formatFCFA(result.economiesAnnuelles)}</span>
                <span className="roi-kpi-label">Économies annuelles nettes</span>
              </div>
              <div className="roi-kpi roi-kpi-roi">
                <span className="roi-kpi-value">{result.roiPercent}%</span>
                <span className="roi-kpi-label">Retour sur investissement</span>
              </div>
              <div className="roi-kpi roi-kpi-breakeven">
                <span className="roi-kpi-value">{result.breakEvenMonths} mois</span>
                <span className="roi-kpi-label">Rentabilité atteinte</span>
              </div>
            </div>
          ) : (
            <div className="roi-recommendation">
              <div className="roi-recommendation-icon">💡</div>
              <h3>Nous avons une offre adaptée pour vous</h3>
              <p>
                Pour votre profil ({revenus}M FCFA, {employes} employés),
                nous recommandons le plan <strong>{suggestedTier}</strong>.
                Contactez-nous pour une tarification personnalisée et un ROI garanti.
              </p>
              <div className="roi-kpis" style={{ marginTop: "1rem" }}>
                <div className="roi-kpi roi-kpi-savings">
                  <span className="roi-kpi-value">{formatFCFA(result.gainsTotaux)}</span>
                  <span className="roi-kpi-label">Gains bruts potentiels</span>
                </div>
                <div className="roi-kpi roi-kpi-breakeven">
                  <span className="roi-kpi-value">{formatFCFA(result.pertesTotales)}</span>
                  <span className="roi-kpi-label">Pertes actuelles estimées</span>
                </div>
              </div>
            </div>
          )}

          <div className="roi-bars">
            {result.details.map((d) => (
              <div key={d.key} className="roi-bar-row">
                <span className="roi-bar-label">{d.label}</span>
                <div className="roi-bar-track">
                  <div
                    className="roi-bar-loss"
                    style={{ width: `${(d.loss / maxBar) * 100}%` }}
                  />
                  <div
                    className="roi-bar-gain"
                    style={{ width: `${(d.gain / maxBar) * 100}%` }}
                  />
                </div>
              </div>
            ))}
            <div className="roi-bar-legend">
              <span><span className="roi-dot roi-dot-loss" /> Pertes actuelles</span>
              <span><span className="roi-dot roi-dot-gain" /> Gains TerraFlow</span>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <MagneticButton className="btn btn-primary" onClick={() => scrollTo("demo")}>
              {isPositive ? "Obtenir mon rapport ROI détaillé" : "Discuter de mon offre personnalisée"}
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
