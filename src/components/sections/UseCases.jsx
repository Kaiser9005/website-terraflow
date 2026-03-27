import { useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../ui/Reveal";
import MagneticButton from "../ui/MagneticButton";
import { useLang } from "../ui/LangToggle";

gsap.registerPlugin(ScrollTrigger);

const personaIcons = ["🏢", "📊", "⚙️", "💰"];
const personaIds = ["pdg", "daf", "dt", "investisseur"];

export default function UseCases({ scrollTo }) {
  const sectionRef = useRef(null);
  const [activePersona, setActivePersona] = useState(0);
  const { t } = useLang();

  const personas = useMemo(() => {
    const raw = t("useCases.personas");
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  useGSAP(() => {
    const content = sectionRef.current?.querySelector(".uc-content");
    if (!content) return;
    gsap.fromTo(content,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    );
  }, { scope: sectionRef, dependencies: [activePersona] });

  const p = personas[activePersona];
  if (!p) return null;

  const titleRaw = t("useCases.title");
  const titleParts = titleRaw.split(/\{|\}/);

  return (
    <section id="use-cases" className="section section-creme" ref={sectionRef}>
      <div className="section-header" style={{ textAlign: "center", margin: "0 auto", maxWidth: 700 }}>
        <Reveal>
          <div className="eyebrow">{t("useCases.eyebrow")}</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-lg" style={{ marginTop: "1rem" }}>
            {titleParts[0]}<em>{titleParts[1]}</em>{titleParts[2]}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="body-lg" style={{ marginTop: "1rem", color: "var(--gris)" }}>
            {t("useCases.subtitle")}
          </p>
        </Reveal>
      </div>

      <div className="uc-tabs">
        {personas.map((per, i) => (
          <button
            key={personaIds[i]}
            className={`uc-tab ${activePersona === i ? "active" : ""}`}
            onClick={() => setActivePersona(i)}
          >
            <span className="uc-tab-icon">{personaIcons[i]}</span>
            <span className="uc-tab-label">{per.label}</span>
          </button>
        ))}
      </div>

      <div className="uc-content" key={activePersona}>
        <div className="uc-card">
          <div className="uc-card-left">
            <h3 className="uc-title">{p.title}</h3>
            <div className="uc-pain">
              <span className="uc-pain-label">{t("useCases.painLabel")}</span>
              <p>{p.pain}</p>
            </div>
            <div className="uc-solution">
              <span className="uc-solution-label">{t("useCases.solutionLabel")}</span>
              <p>{p.solution}</p>
            </div>
          </div>
          <div className="uc-card-right">
            <div className="uc-modules">
              <span className="uc-modules-label">{t("useCases.modulesLabel")}</span>
              {p.modules.map((m, i) => (
                <span key={i} className="uc-module-tag">{m}</span>
              ))}
            </div>
            <div className="uc-result">
              <span className="uc-result-label">{t("useCases.resultLabel")}</span>
              <p>{p.result}</p>
            </div>
            <MagneticButton className="btn btn-primary" onClick={() => scrollTo("demo")}>
              {t("useCases.viewDemo")} {p.label}
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
