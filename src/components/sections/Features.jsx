import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../ui/Reveal";
import { useLang } from "../ui/LangToggle";

gsap.registerPlugin(ScrollTrigger);

const featureIcons = ["\uD83C\uDFAF", "\uD83E\uDD16", "\uD83C\uDF0D", "\uD83D\uDCF4", "\u2699\uFE0F", "\uD83D\uDCF1", "\uD83D\uDD17", "\uD83D\uDCB0"];

export default function Features() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const features = t("features.cards");

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll(".feature-card");
    if (!cards) return;

    gsap.fromTo(cards,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%", toggleActions: "play none none none" },
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="features" className="section" ref={sectionRef}>
      <div className="section-header" style={{ textAlign: "center", margin: "0 auto", maxWidth: 700 }}>
        <Reveal>
          <div className="eyebrow">{t("features.eyebrow")}</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-lg" style={{ marginTop: "1rem" }}>
            {(() => {
              const raw = t("features.title");
              const parts = raw.split(/\{|\}/);
              return <>{parts[0]}<em>{parts[1]}</em>{parts[2]}</>;
            })()}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="body-lg" style={{ marginTop: "1rem", color: "var(--gris)" }}>
            {t("features.subtitle")}
          </p>
        </Reveal>
      </div>

      <div className="features-bento">
        {features.map((f, i) => (
          <div key={i} className={`feature-card ${f.size === "large" ? "feature-card-lg" : ""}`} style={{ opacity: 0 }}>
            <div className="feature-icon">{featureIcons[i]}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
            {f.highlight && <span className="feature-highlight">{f.highlight}</span>}
          </div>
        ))}
      </div>
    </section>
  );
}
