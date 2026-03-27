import { useState, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../ui/Reveal";
import MagneticButton from "../ui/MagneticButton";
import { useLang } from "../ui/LangToggle";

gsap.registerPlugin(ScrollTrigger);

// Loss rates calibrated on FAO/World Bank/Nucleus Research benchmarks (March 2026)
// Total: 23% — aligned with SSA data (30-50% total, ~23% ERP-addressable)
const BASE_LOSS_RATES = [
  { key: "pertes_donnees", label: "Gestion manuelle des données", rate: 0.065 },
  { key: "pertes_recolte", label: "Pertes post-récolte", rate: 0.10 },
  { key: "surcharge_admin", label: "Surcharge administrative", rate: 0.03 },
  { key: "non_conformite", label: "Non-conformité OHADA", rate: 0.015 },
  { key: "pertes_stock", label: "Pertes de stock & intrants", rate: 0.02 },
];

const KALTIV_REDUCTION = {
  pertes_donnees: 0.80,
  pertes_recolte: 0.60,
  surcharge_admin: 0.70,
  non_conformite: 0.90,
  pertes_stock: 0.75,
};

const ERP_MULTIPLIER = { aucun: 1.0, excel: 0.6, autre: 0.5 };

// Tiers alignes avec la page Tarifs du site (en FCFA)
const PRICING_TIERS = [
  { max: 20, monthly: 75000, name: "Foundation" },
  { max: 100, monthly: 200000, name: "Growth" },
  { max: 500, monthly: 500000, name: "Command" },
  { max: Infinity, monthly: 500000, name: "Enterprise" },
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
    const gain = loss * KALTIV_REDUCTION[item.key];
    pertesTotales += loss;
    gainsTotaux += gain;
    return { ...item, loss, gain };
  });

  const tier = PRICING_TIERS.find((t) => nombreEmployes <= t.max);
  const coutAnnuel = tier.monthly * 12;
  const economiesAnnuelles = gainsTotaux - coutAnnuel;
  const roiPercent = coutAnnuel > 0 ? Math.round((economiesAnnuelles / coutAnnuel) * 100) : 0;
  const breakEvenMonths = gainsTotaux > 0 ? Math.ceil(coutAnnuel / (gainsTotaux / 12)) : 99;

  return { details, pertesTotales, gainsTotaux, coutAnnuel, economiesAnnuelles, roiPercent, breakEvenMonths };
}

export default function ROICalculator({ scrollTo }) {
  const { t } = useLang();
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
  const suggestedTier = revenus < 20 ? "Foundation" : revenus < 100 ? "Growth" : revenus < 500 ? "Command" : "Enterprise";

  return (
    <section id="roi" className="section" ref={sectionRef}>
      <div className="section-header" style={{ textAlign: "center", margin: "0 auto", maxWidth: 750 }}>
        <Reveal>
          <div className="eyebrow">{t("roi.eyebrow")}</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-lg" style={{ marginTop: "1rem" }}>
            {(() => {
              const raw = t("roi.title");
              const parts = raw.split(/\{|\}/);
              return <>{parts[0]}<em>{parts[1]}</em>{parts[2]}</>;
            })()}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="body-lg" style={{ marginTop: "1rem", color: "var(--gris)" }}>
            {t("roi.subtitle")}
          </p>
        </Reveal>
      </div>

      <div className="roi-layout">
        <div className="roi-inputs">
          <div className="roi-field">
            <label>{t("roi.revenueLabel")}</label>
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
            <label>{t("roi.employeesLabel")}</label>
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
            <label>{t("roi.systemLabel")}</label>
            <div className="roi-radio-group">
              {t("roi.systemOptions").map((opt) => (
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
                <span className="roi-kpi-label">{t("roi.netSavings")}</span>
              </div>
              <div className="roi-kpi roi-kpi-roi">
                <span className="roi-kpi-value">{result.roiPercent}%</span>
                <span className="roi-kpi-label">{t("roi.returnOnInvestment")}</span>
              </div>
              <div className="roi-kpi roi-kpi-breakeven">
                <span className="roi-kpi-value">{result.breakEvenMonths} {t("roi.months")}</span>
                <span className="roi-kpi-label">{t("roi.breakEven")}</span>
              </div>
            </div>
          ) : (
            <div className="roi-recommendation">
              <div className="roi-recommendation-icon">💡</div>
              <h3>{t("roi.recommendTitle")}</h3>
              <p>
                {t("roi.recommendText", { revenus, employes, tier: suggestedTier })}
              </p>
              <div className="roi-kpis" style={{ marginTop: "1rem" }}>
                <div className="roi-kpi roi-kpi-savings">
                  <span className="roi-kpi-value">{formatFCFA(result.gainsTotaux)}</span>
                  <span className="roi-kpi-label">{t("roi.grossGains")}</span>
                </div>
                <div className="roi-kpi roi-kpi-breakeven">
                  <span className="roi-kpi-value">{formatFCFA(result.pertesTotales)}</span>
                  <span className="roi-kpi-label">{t("roi.currentLosses")}</span>
                </div>
              </div>
            </div>
          )}

          <div className="roi-bars">
            {result.details.map((d, idx) => (
              <div key={d.key} className="roi-bar-row">
                <span className="roi-bar-label">{t("roi.lossLabels")[idx]}</span>
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
              <span><span className="roi-dot roi-dot-loss" /> {t("roi.legendLoss")}</span>
              <span><span className="roi-dot roi-dot-gain" /> {t("roi.legendGain")}</span>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <MagneticButton className="btn btn-primary" onClick={() => scrollTo("demo")}>
              {isPositive ? t("roi.ctaPositive") : t("roi.ctaNegative")}
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
