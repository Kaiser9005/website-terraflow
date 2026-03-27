import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../ui/Reveal";
import { useLang } from "../ui/LangToggle";

gsap.registerPlugin(ScrollTrigger);

const icons = ["\uD83D\uDCCB", "\u26A0\uFE0F", "\uD83D\uDCF5", "\uD83D\uDD17"];

export default function Problem() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const painPoints = t("problem.cards");

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll(".problem-card");
    if (!cards) return;

    gsap.fromTo(cards,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.7, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%", toggleActions: "play none none none" },
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="problem" className="section section-dark" ref={sectionRef}>
      <div className="section-header" style={{ textAlign: "center", margin: "0 auto", maxWidth: 750 }}>
        <Reveal>
          <div className="eyebrow">{t("problem.eyebrow")}</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-lg" style={{ marginTop: "1rem", color: "white" }}>
            {(() => {
              const raw = t("problem.title");
              const parts = raw.split(/\{|\}/);
              return <>{parts[0]}<em>{parts[1]}</em>{parts[2]}</>;
            })()}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="body-lg" style={{ marginTop: "1rem", color: "rgba(255,255,255,0.6)" }}>
            {t("problem.subtitle")}
          </p>
        </Reveal>
      </div>

      <div className="problem-grid">
        {painPoints.map((p, i) => (
          <div key={i} className="problem-card" style={{ opacity: 0 }}>
            <div className="problem-stat">{p.stat}</div>
            <div className="problem-icon">{icons[i]}</div>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <div className="problem-cost">{p.cost}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
