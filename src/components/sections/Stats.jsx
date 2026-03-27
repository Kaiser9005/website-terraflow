import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "../ui/LangToggle";

gsap.registerPlugin(ScrollTrigger);

export default function Stats() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const stats = t("stats.items");

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 75%", toggleActions: "play none none none" },
      }
    );

    const items = section.querySelectorAll(".stat-item");
    gsap.fromTo(items,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.6, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 65%", toggleActions: "play none none none" },
      }
    );

    const valueEls = section.querySelectorAll(".stat-value-num");
    valueEls.forEach((el) => {
      const target = parseFloat(el.dataset.target);
      if (target === 0) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
        onUpdate: () => { el.textContent = Math.floor(obj.val); },
      });
    });
  }, { scope: sectionRef });

  return (
    <section id="stats" className="section section-creme" ref={sectionRef}>
      <div ref={headerRef} className="section-header" style={{ textAlign: "center", margin: "0 auto", marginBottom: "clamp(3rem, 5vh, 5rem)", opacity: 0 }}>
        <div className="eyebrow">{t("stats.eyebrow")}</div>
        <h2 className="display-lg" style={{ marginTop: "1rem" }}>
          {(() => {
            const raw = t("stats.title");
            const parts = raw.split(/\{|\}/);
            return <>{parts[0]}<em>{parts[1]}</em>{parts[2]}</>;
          })()}
        </h2>
      </div>
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="stat-item" style={{ opacity: 0 }}>
            <div className="stat-value">
              <span className="stat-value-num" data-target={s.value}>
                0
              </span>
              {s.suffix}
            </div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-desc">{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
