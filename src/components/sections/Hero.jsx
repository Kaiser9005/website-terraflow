import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "../ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ scrollTo }) {
  const sectionRef = useRef(null);
  const overlayRef = useRef(null);

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
              De la Parcelle au Profit
            </div>
            <h1 className="display-xl hero-title">
              <span className="kinetic-line"><span className="hero-title-line">L'ERP Agricole</span></span>
              <span className="kinetic-line"><span className="hero-title-line">de Référence en</span></span>
              <span className="kinetic-line"><span className="hero-title-line"><em>Afrique</em></span></span>
            </h1>
            <p className="hero-subtitle" style={{ opacity: 0 }}>
              27 modules. IA prédictive. Conformité OHADA.
              La plateforme qui transforme chaque exploitation agricole en entreprise connectée.
            </p>
            <div className="hero-cta-row" style={{ opacity: 0 }}>
              <MagneticButton className="btn btn-primary" onClick={() => scrollTo("demo")}>
                Demander une Démo
              </MagneticButton>
              <MagneticButton className="btn btn-outline" onClick={() => scrollTo("modules")}>
                Explorer les Modules
              </MagneticButton>
            </div>
          </div>
          <div className="hero-mockup" style={{ opacity: 0 }}>
            <div className="hero-browser-chrome">
              <div className="hero-browser-dots">
                <span /><span /><span />
              </div>
              <span className="hero-browser-url">app.terraflow.cm</span>
            </div>
            <img
              src="/screenshots/dashboard.png"
              alt="TerraFlow ERP — Tableau de bord"
              className="hero-screenshot"
              loading="eager"
            />
          </div>
          <div className="scroll-indicator">
            <span>Scroll</span>
            <div className="scroll-line" />
          </div>
        </div>
      </div>
    </section>
  );
}
