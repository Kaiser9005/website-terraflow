import { useRef, useMemo } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../ui/Reveal";
import MagneticButton from "../ui/MagneticButton";
import { useLang } from "../ui/LangToggle";

gsap.registerPlugin(ScrollTrigger);

const metricIcons = ["📅", "⏱️", "🔗", "📱", "🤖", "✅"];

export default function CaseStudy({ scrollTo }) {
  const sectionRef = useRef(null);
  const { t } = useLang();

  const metrics = useMemo(() => {
    const raw = t("caseStudy.metrics");
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const badges = useMemo(() => {
    const raw = t("caseStudy.badges");
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  useGSAP(() => {
    const rows = sectionRef.current?.querySelectorAll(".cs-row");
    if (!rows) return;

    gsap.fromTo(rows,
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0,
        duration: 0.5, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 55%", toggleActions: "play none none none" },
      }
    );
  }, { scope: sectionRef });

  const titleRaw = t("caseStudy.title");
  const titleParts = titleRaw.split(/\{|\}/);

  const contextRaw = t("caseStudy.context");
  const contextParts = contextRaw.split(/\{|\}/);

  return (
    <section id="case-study" className="section" ref={sectionRef}>
      <div className="cs-layout">
        <div className="cs-info">
          <Reveal>
            <div className="eyebrow">{t("caseStudy.eyebrow")}</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-lg" style={{ marginTop: "1rem" }}>
              {titleParts[0]}<em>{titleParts[1]}</em>{titleParts[2]}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="cs-context">
              <p className="body-lg" style={{ color: "var(--gris)" }}>
                {contextParts[0]}<strong>{contextParts[1]}</strong>{contextParts[2]}
              </p>
              <div className="cs-badges">
                {badges.map((b, i) => (
                  <span key={i} className="cs-badge">{b}</span>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="cs-quote">
              <blockquote>
                {t("caseStudy.quote")}
              </blockquote>
              <cite>{t("caseStudy.author")}</cite>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <MagneticButton className="btn btn-primary" onClick={() => scrollTo("demo")}>
              {t("caseStudy.cta")}
            </MagneticButton>
          </Reveal>
        </div>

        <div className="cs-table">
          <div className="cs-table-header">
            <span></span>
            <span className="cs-header-before">{t("caseStudy.before")}</span>
            <span className="cs-header-after">{t("caseStudy.after")}</span>
          </div>
          {metrics.map((row, i) => (
            <div key={i} className="cs-row" style={{ opacity: 0 }}>
              <span className="cs-metric">
                <span className="cs-metric-icon">{metricIcons[i]}</span>
                {row.metric}
              </span>
              <span className="cs-before">{row.before}</span>
              <span className="cs-after">{row.after}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
