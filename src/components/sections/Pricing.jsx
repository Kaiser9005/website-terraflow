import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../ui/Reveal";
import MagneticButton from "../ui/MagneticButton";
import { useLang } from "../ui/LangToggle";
import CurrencyToggle, { useCurrency } from "../ui/CurrencyToggle";

gsap.registerPlugin(ScrollTrigger);

export default function Pricing({ scrollTo }) {
  const { t } = useLang();
  const { format, tierPrice } = useCurrency();
  const sectionRef = useRef(null);
  const plans = t("pricing.plans");

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
          <div className="eyebrow">{t("pricing.eyebrow")}</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-lg" style={{ marginTop: "1rem" }}>
            {(() => {
              const raw = t("pricing.title");
              const parts = raw.split(/\{|\}/);
              return <>{parts[0]}<em>{parts[1]}</em>{parts[2]}</>;
            })()}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="body-lg" style={{ marginTop: "1rem", color: "var(--gris)" }}>
            {t("pricing.subtitle")}
          </p>
          <p className="pricing-payments" style={{ marginTop: "0.5rem", fontSize: "0.8rem", color: "var(--gris)" }}>
            {t("pricing.payments")}
          </p>
        </Reveal>
      </div>

      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <CurrencyToggle />
      </div>

      <div className="pricing-grid">
        {plans.map((plan, i) => {
          const amount = tierPrice(plan.name);
          return (
          <div key={i} className={`pricing-card ${plan.featured ? "featured" : ""}`} style={{ opacity: 0 }}>
            {plan.badge && <div className="pricing-badge">{plan.badge}</div>}
            <h3 className="pricing-name">{plan.name}</h3>
            <div className="pricing-target">{plan.target}</div>
            <div className="pricing-price">
              <span className="pricing-amount">{amount != null ? format(amount) : plan.price}</span>
              {amount != null && <span className="pricing-currency">{plan.period}</span>}
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
          );
        })}
      </div>

      <Reveal delay={0.3}>
        <div className="pricing-compare">
          <h3 style={{ textAlign: "center", marginBottom: "1.5rem", fontSize: "1.1rem", fontWeight: 600 }}>
            {t("pricing.compareTitle")}
          </h3>
          <div className="pricing-matrix">
            <table>
              <thead>
                <tr>
                  <th>{t("pricing.compareHeaders.feature")}</th>
                  <th>Foundation</th>
                  <th className="pricing-matrix-featured">Growth</th>
                  <th>Command</th>
                  <th>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {t("pricing.compareRows").map((row, i) => (
                  <tr key={i}>
                    <td>{row[0]}</td>
                    <td>{row[1]}</td>
                    <td className="pricing-matrix-featured">{row[2]}</td>
                    <td>{row[3]}</td>
                    <td>{row[4]}</td>
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
            {t("pricing.vsTitle")}
          </h3>
          <div className="pricing-matrix">
            <table>
              <thead>
                <tr>
                  <th>{t("pricing.vsHeaders.criteria")}</th>
                  <th className="pricing-matrix-featured">KALTIV</th>
                  <th>SAP B1</th>
                  <th>Odoo Ent.</th>
                  <th>Excel</th>
                </tr>
              </thead>
              <tbody>
                {t("pricing.vsRows").map((row, i) => (
                  <tr key={i}>
                    <td>{row[0]}</td>
                    <td className="pricing-matrix-featured">{row[1]}</td>
                    <td>{row[2]}</td>
                    <td>{row[3]}</td>
                    <td>{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ textAlign: "center", fontSize: "0.7rem", color: "var(--gris)", marginTop: "0.75rem" }}>
              {t("pricing.vsFootnote")}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
