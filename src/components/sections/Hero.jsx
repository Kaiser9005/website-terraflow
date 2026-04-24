import { useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "../ui/MagneticButton";
import { useLang } from "../ui/LangToggle";
import screenshots from "../../data/screenshots";

gsap.registerPlugin(ScrollTrigger);

const HERO_SCREENSHOTS = screenshots.slice(0, 4);
const ROTATE_INTERVAL = 5000;

export default function Hero({ scrollTo }) {
  const { t, lang } = useLang();
  const sectionRef = useRef(null);
  const overlayRef = useRef(null);
  const imgRef = useRef(null);
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  // Auto-rotate screenshots
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveScreenshot((prev) => (prev + 1) % HERO_SCREENSHOTS.length);
    }, ROTATE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  // Crossfade animation on screenshot change
  useEffect(() => {
    if (!imgRef.current) return;
    gsap.fromTo(imgRef.current,
      { opacity: 0.3, scale: 1.02 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
    );
  }, [activeScreenshot]);

  const currentShot = HERO_SCREENSHOTS[activeScreenshot];
  const altText = lang === "en" ? currentShot.altEn : currentShot.altFr;

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Parallax on the gradient orbs
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const orbs = section.querySelectorAll(".hero-orb");
        orbs.forEach((orb, i) => {
          const speed = 0.3 + i * 0.15;
          gsap.set(orb, { y: self.progress * 200 * speed });
        });
        if (overlayRef.current) {
          const opacity = Math.max(0, 1 - self.progress * 2.5);
          overlayRef.current.style.opacity = opacity;
        }
      },
    });

    // Hero text entrance
    const tl = gsap.timeline({ delay: 2.2 });
    tl.fromTo(".hero-eyebrow", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
    tl.fromTo(".hero-title-line", { yPercent: 120, rotate: 2 }, { yPercent: 0, rotate: 0, stagger: 0.12, duration: 1, ease: "power4.out" }, "-=0.5");
    tl.fromTo(".hero-subtitle", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5");
    tl.fromTo(".hero-cta-row", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4");
    tl.fromTo(".hero-mockup", { opacity: 0, y: 60, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }, "-=0.6");

    // Animate orbs floating
    section.querySelectorAll(".hero-orb").forEach((orb, i) => {
      gsap.to(orb, {
        x: `random(-40, 40)`,
        y: `random(-30, 30)`,
        duration: 6 + i * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, { scope: sectionRef });

  return (
    <section id="hero" ref={sectionRef} className="hero-section">
      <div className="hero-canvas-wrapper">
        <div className="hero-gradient-bg">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />
        </div>
        <div className="hero-grain" />
        <div ref={overlayRef} className="hero-overlay">
          <div className="hero-content">
            <div className="hero-eyebrow" style={{ opacity: 0 }}>
              {t("hero.eyebrow")}
            </div>
            <h1 className="display-xl hero-title">
              {(() => {
                const raw = t("hero.title");
                const parts = raw.split(/\{|\}/);
                return (
                  <>
                    <span className="kinetic-line"><span className="hero-title-line">{parts[0]}</span></span>
                    <span className="kinetic-line"><span className="hero-title-line"><em>{parts[1]}</em></span></span>
                  </>
                );
              })()}
            </h1>
            <p className="hero-subtitle" style={{ opacity: 0 }}>
              {t("hero.subtitle")}
            </p>
            <div className="hero-cta-row" style={{ opacity: 0 }}>
              <MagneticButton className="btn btn-primary" onClick={() => scrollTo("demo")}>
                {t("hero.ctaPrimary")}
              </MagneticButton>
              <MagneticButton className="btn btn-outline" onClick={() => scrollTo("demo")}>
                {t("hero.ctaSecondary")}
              </MagneticButton>
            </div>
          </div>
          <div className="hero-mockup" style={{ opacity: 0 }}>
            <div className="hero-browser-chrome">
              <div className="hero-browser-dots">
                <span /><span /><span />
              </div>
              <span className="hero-browser-url">app.kaltiv.com</span>
              <div className="hero-screenshot-dots">
                {HERO_SCREENSHOTS.map((s, i) => (
                  <button
                    key={s.id}
                    className={`hero-dot ${activeScreenshot === i ? "active" : ""}`}
                    onClick={() => setActiveScreenshot(i)}
                    aria-label={s.module}
                  />
                ))}
              </div>
            </div>
            <img
              ref={imgRef}
              src={currentShot.src}
              alt={altText}
              className="hero-screenshot"
              loading="eager"
              width="1920"
              height="1080"
            />
          </div>
          <div className="scroll-indicator">
            <span>{t("hero.scroll")}</span>
            <div className="scroll-line" />
          </div>
        </div>
      </div>
    </section>
  );
}
