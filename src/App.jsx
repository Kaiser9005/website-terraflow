import { useState, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles.css";

import SmoothScroll, { getLenis } from "./components/ui/SmoothScroll";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

import Hero from "./components/sections/Hero";
import Marquee from "./components/sections/Marquee";
import Features from "./components/sections/Features";
import Stats from "./components/sections/Stats";
import Modules from "./components/sections/Modules";
import Pricing from "./components/sections/Pricing";
import Testimonials from "./components/sections/Testimonials";
import Demo from "./components/sections/Demo";
import Preloader from "./components/ui/Preloader";
import CustomCursor from "./components/ui/CustomCursor";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { id: "features", label: "Fonctionnalités" },
  { id: "stats", label: "Chiffres" },
  { id: "modules", label: "Modules" },
  { id: "pricing", label: "Tarifs" },
  { id: "testimonials", label: "Témoignages" },
  { id: "demo", label: "Démo" },
];

const sectionColors = {
  hero: { bg: "#0a0a0a", text: "#FFFFFF" },
  features: { bg: "#FAFAF5", text: "#1A1A18" },
  stats: { bg: "#F5F0E8", text: "#1A1A18" },
  modules: { bg: "#1A1A18", text: "#FFFFFF" },
  pricing: { bg: "#F5F0E8", text: "#1A1A18" },
  testimonials: { bg: "#FAFAF5", text: "#1A1A18" },
  demo: { bg: "#0D3B1F", text: "#FFFFFF" },
};

export default function TerraFlowSite() {
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const mainRef = useRef(null);

  useGSAP(() => {
    if (loading) return;

    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: () => setScrollY(window.scrollY),
    });

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSection(item.id),
        onEnterBack: () => setActiveSection(item.id),
      });
    });

    ScrollTrigger.refresh();

    const progressBar = document.querySelector(".scroll-progress");
    if (progressBar) {
      gsap.to(progressBar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }

    Object.entries(sectionColors).forEach(([id, colors]) => {
      const el = document.getElementById(id);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => gsap.to(document.body, { backgroundColor: colors.bg, color: colors.text, duration: 0.6, ease: "power2.inOut" }),
        onEnterBack: () => gsap.to(document.body, { backgroundColor: colors.bg, color: colors.text, duration: 0.6, ease: "power2.inOut" }),
      });
    });
  }, { scope: mainRef, dependencies: [loading] });

  const scrollTo = useCallback((id) => {
    setMenuOpen(false);
    const lenis = getLenis();
    const el = document.getElementById(id);
    if (el && lenis) {
      lenis.scrollTo(el, { offset: -80, duration: 1.2 });
    } else if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <CustomCursor />
      <SmoothScroll>
        <div className="scroll-progress" />
        <div ref={mainRef}>
          <a href="#main-content" className="skip-to-content">Aller au contenu principal</a>
          <Navigation
            scrollY={scrollY}
            navItems={navItems}
            activeSection={activeSection}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            scrollTo={scrollTo}
          />
          <main id="main-content">
            <Hero scrollTo={scrollTo} />
            <Marquee />
            <Features />
            <Stats />
            <Modules />
            <Pricing scrollTo={scrollTo} />
            <Testimonials />
            <Demo />
          </main>
          <Footer navItems={navItems} scrollTo={scrollTo} />
        </div>
      </SmoothScroll>
    </>
  );
}
