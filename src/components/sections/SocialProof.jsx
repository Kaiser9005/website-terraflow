import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "../ui/LangToggle";

gsap.registerPlugin(ScrollTrigger);

export default function SocialProof() {
  const { t } = useLang();
  const sectionRef = useRef(null);

  const metrics = t("socialProof.metrics");
  const logos = t("socialProof.logos");
  const poweredBy = t("socialProof.poweredBy");

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(section.querySelectorAll(".sp-metric"),
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none none" },
      }
    );

    gsap.fromTo(section.querySelectorAll(".sp-logo"),
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 75%", toggleActions: "play none none none" },
      }
    );
  }, { scope: sectionRef });

  return (
    <section className="sp-section" ref={sectionRef}>
      <div className="sp-metrics">
        {metrics.map((m, i) => (
          <div key={i} className="sp-metric" style={{ opacity: 0 }}>
            <span className="sp-value">{m.value}<span className="sp-unit">{m.unit}</span></span>
            <span className="sp-label">{m.label}</span>
          </div>
        ))}
      </div>
      <div className="sp-divider" />
      <div className="sp-logos">
        <span className="sp-trust-label">{t("socialProof.trustLabel")}</span>
        <div className="sp-logo-row">
          {logos.map((l, i) => (
            <div key={i} className="sp-logo" style={{ opacity: 0 }}>
              <span className="sp-logo-name">{l.name}</span>
              <span className="sp-logo-sub">{l.sub}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="sp-powered">
        <span className="sp-trust-label">{t("socialProof.poweredByLabel")}</span>
        <div className="sp-logo-row">
          {poweredBy.map((p, i) => (
            <div key={i} className="sp-logo sp-powered-logo" style={{ opacity: 0 }}>
              <span className="sp-logo-name">{p.name}</span>
              <span className="sp-logo-sub">{p.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
