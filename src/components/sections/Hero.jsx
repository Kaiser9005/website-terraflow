import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "../ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 60;

function preloadFrames() {
  const frames = [];
  for (let i = 1; i <= FRAME_COUNT; i++) {
    const img = new Image();
    img.src = `/frames/frame_${String(i).padStart(4, "0")}.webp`;
    frames.push(img);
  }
  return frames;
}

export default function Hero({ scrollTo }) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const overlayRef = useRef(null);

  useEffect(() => {
    framesRef.current = preloadFrames();
  }, []);

  useGSAP(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const drawFrame = (index) => {
      const img = framesRef.current[index];
      if (!img || !img.complete) return;

      const cw = canvas.width / (window.devicePixelRatio || 1);
      const ch = canvas.height / (window.devicePixelRatio || 1);
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      const scale = Math.max(cw / iw, ch / ih);
      const w = iw * scale;
      const h = ih * scale;
      const x = (cw - w) / 2;
      const y = (ch - h) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, x, y, w, h);
    };

    // Draw first frame immediately
    const tryDraw = () => {
      if (framesRef.current[0]?.complete) {
        drawFrame(0);
      } else {
        framesRef.current[0]?.addEventListener("load", () => drawFrame(0), { once: true });
      }
    };
    tryDraw();

    // Scroll-driven frame animation
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      pin: ".hero-canvas-wrapper",
      scrub: 0.5,
      onUpdate: (self) => {
        const frameIndex = Math.min(
          FRAME_COUNT - 1,
          Math.floor(self.progress * FRAME_COUNT)
        );
        requestAnimationFrame(() => drawFrame(frameIndex));

        // Fade overlay
        if (overlayRef.current) {
          const opacity = Math.max(0, 1 - self.progress * 3);
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

    return () => window.removeEventListener("resize", resize);
  }, { scope: sectionRef });

  return (
    <section id="hero" ref={sectionRef} className="hero-section">
      <div className="hero-canvas-wrapper">
        <canvas ref={canvasRef} className="hero-canvas" />
        <div className="hero-grain" />
        <div ref={overlayRef} className="hero-overlay">
          <div className="hero-content">
            <div className="hero-eyebrow" style={{ opacity: 0 }}>
              ERP Agricole Intelligent pour l'Afrique
            </div>
            <h1 className="display-xl hero-title">
              <span className="kinetic-line"><span className="hero-title-line">Cultivez la</span></span>
              <span className="kinetic-line"><span className="hero-title-line"><em>performance</em></span></span>
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
          <div className="scroll-indicator">
            <span>Scroll</span>
            <div className="scroll-line" />
          </div>
        </div>
      </div>
      <div className="hero-scroll-spacer" />
    </section>
  );
}
