import { useState, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../ui/Reveal";
import MagneticButton from "../ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const EUR_TO_FCFA = 656;

const BASE_LOSS_RATES = [
  { key: "pertes_donnees", label: "Pertes de données", rate: 0.065 },
  { key: "pertes_recolte", label: "Pertes de récolte", rate: 0.04 },
  { key: "surcharge_admin", label: "Surcharge administrative", rate: 0.025 },
  { key: "non_conformite", label: "Non-conformité", rate: 0.015 },
  { key: "pertes_stock", label: "Pertes de stock", rate: 0.015 },
];

const TERRAFLOW_REDUCTION = {
  pertes_donnees: 0.80,
  pertes_recolte: 0.60,
  surcharge_admin: 0.70,
  non_conformite: 0.90,
  pertes_stock: 0.75,
};

const ERP_MULTIPLIER = { aucun: 1.0, excel: 0.6, autre: 0.5 };

const PRICING_TIERS = [
  { max: 10, monthly: 150 },
  { max: 50, monthly: 450 },
  { max: 200, monthly: 1200 },
  { max: Infinity, monthly: 10000 },
];

function formatFCFA(n) {
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

  const maxBar = Math.max(result.pertesTotales, result.gainsTotaux, 1);

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
            Estimez vos gains annuels en adoptant TerraFlow. Basé sur les données réelles de nos clients.
          </p>
        </Reveal>
      </div>

      <div className="roi-layout">
        <div className="roi-inputs">
          <div className="roi-field">
            <label>Revenus annuels (M FCFA)</label>
            <input
              type="range"
              min="5"
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
              Obtenir mon rapport ROI détaillé
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
