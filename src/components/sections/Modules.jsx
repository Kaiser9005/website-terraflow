import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../ui/Reveal";
import { useLang } from "../ui/LangToggle";

gsap.registerPlugin(ScrollTrigger);

const groupColors = ["var(--primary)", "var(--accent)", "var(--secondary)", "#8b5cf6", "#22d3ee"];

export default function Modules() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const [activeGroup, setActiveGroup] = useState(0);
  const moduleGroups = t("modules.groups");

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll(".module-card");
    if (!cards) return;

    gsap.fromTo(cards,
      { opacity: 0, x: 30 },
      {
        opacity: 1, x: 0,
        duration: 0.5, stagger: 0.05, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%", toggleActions: "play none none none" },
      }
    );
  }, { scope: sectionRef, dependencies: [activeGroup] });

  return (
    <section id="modules" className="section section-dark" ref={sectionRef}>
      <div className="section-header">
        <Reveal>
          <div className="eyebrow" style={{ color: "var(--accent)" }}>{t("modules.eyebrow")}</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-lg" style={{ marginTop: "1rem", color: "white" }}>
            {(() => {
              const raw = t("modules.title");
              const parts = raw.split(/\{|\}/);
              return <>{parts[0]}<em>{parts[1]}</em>{parts[2]}</>;
            })()}
          </h2>
        </Reveal>
      </div>

      <div className="modules-tabs">
        {moduleGroups.map((g, i) => (
          <button
            key={i}
            className={`module-tab ${activeGroup === i ? "active" : ""}`}
            onClick={() => setActiveGroup(i)}
          >
            {g.category}
          </button>
        ))}
      </div>

      <div className="modules-grid">
        {moduleGroups[activeGroup].modules.map((m, i) => (
          <div key={`${activeGroup}-${i}`} className="module-card" style={{ opacity: 0 }}>
            <h4>{m.name}</h4>
            <p>{m.desc}</p>
          </div>
        ))}
      </div>

      <Reveal delay={0.3}>
        <p className="modules-count" style={{ textAlign: "center", marginTop: "3rem", color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>
          {t("modules.moreModules")}
        </p>
      </Reveal>
    </section>
  );
}
