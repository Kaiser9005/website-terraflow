import { useRef, useMemo } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../ui/Reveal";
import { useLang } from "../ui/LangToggle";

gsap.registerPlugin(ScrollTrigger);

const certStatuses = ["active", "active", "active", "in-progress", "in-progress"];
const securityIcons = ["🔒", "🛡️", "🌐", "🔑", "📊", "🌍"];

export default function Trust() {
  const sectionRef = useRef(null);
  const { t } = useLang();

  const certifications = useMemo(() => {
    const raw = t("trust.certifications");
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const securityLabels = useMemo(() => {
    const raw = t("trust.security");
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(section.querySelectorAll(".trust-cert"),
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 60%", toggleActions: "play none none none" },
      }
    );

    gsap.fromTo(section.querySelectorAll(".trust-security-item"),
      { opacity: 0, x: -20 },
      {
        opacity: 1, x: 0, duration: 0.5, stagger: 0.06, ease: "power3.out",
        scrollTrigger: { trigger: section.querySelector(".trust-security"), start: "top 75%", toggleActions: "play none none none" },
      }
    );
  }, { scope: sectionRef });

  const titleRaw = t("trust.title");
  const titleParts = titleRaw.split(/\{|\}/);

  return (
    <section id="trust" className="section section-dark" ref={sectionRef}>
      <div className="section-header" style={{ textAlign: "center", margin: "0 auto", maxWidth: 700 }}>
        <Reveal>
          <div className="eyebrow" style={{ color: "var(--accent)" }}>{t("trust.eyebrow")}</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-lg" style={{ marginTop: "1rem", color: "white" }}>
            {titleParts[0]}<em>{titleParts[1]}</em>{titleParts[2]}
          </h2>
        </Reveal>
      </div>

      <div className="trust-grid">
        <div className="trust-certs">
          <h3 className="trust-subtitle">{t("trust.certTitle")}</h3>
          {certifications.map((c, i) => (
            <div key={i} className={`trust-cert ${certStatuses[i]}`} style={{ opacity: 0 }}>
              <div className="trust-cert-status">
                {certStatuses[i] === "active" ? "\u2705" : "\u23F3"}
              </div>
              <div className="trust-cert-info">
                <h4>{c.name}</h4>
                <p>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="trust-security">
          <h3 className="trust-subtitle">{t("trust.secTitle")}</h3>
          <div className="trust-security-list">
            {securityLabels.map((label, i) => (
              <div key={i} className="trust-security-item" style={{ opacity: 0 }}>
                <span className="trust-security-icon">{securityIcons[i]}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className="trust-uptime">
            <div className="trust-uptime-bar">
              <div className="trust-uptime-fill" />
            </div>
            <div className="trust-uptime-info">
              <span className="trust-uptime-value">99.9%</span>
              <span className="trust-uptime-label">{t("trust.uptime")}</span>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
