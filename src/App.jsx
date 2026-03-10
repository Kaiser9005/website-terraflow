import { useState, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles.css";

import SmoothScroll, { getLenis } from "./components/ui/SmoothScroll";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

import Hero from "./components/sections/Hero";
import SocialProof from "./components/sections/SocialProof";
import Marquee from "./components/sections/Marquee";
import Problem from "./components/sections/Problem";
import Features from "./components/sections/Features";
import Stats from "./components/sections/Stats";
import UseCases from "./components/sections/UseCases";
import CaseStudy from "./components/sections/CaseStudy";
import Modules from "./components/sections/Modules";
import Pricing from "./components/sections/Pricing";
import Trust from "./components/sections/Trust";
import Testimonials from "./components/sections/Testimonials";
import ROICalculator from "./components/sections/ROICalculator";
import Coverage from "./components/sections/Coverage";
import Onboarding from "./components/sections/Onboarding";
import FAQ from "./components/sections/FAQ";
import Demo from "./components/sections/Demo";
import Preloader from "./components/ui/Preloader";
import CustomCursor from "./components/ui/CustomCursor";
import WhatsAppButton from "./components/ui/WhatsAppButton";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { id: "problem", label: "Problème" },
  { id: "features", label: "Solutions" },
  { id: "use-cases", label: "Cas d'Usage" },
  { id: "modules", label: "Modules" },
  { id: "pricing", label: "Tarifs" },
  { id: "demo", label: "Démo" },
];

const sectionColors = {
  hero: { bg: "#0a0a0a", text: "#FFFFFF" },
  problem: { bg: "#0a0a0a", text: "#FFFFFF" },
  features: { bg: "#FAFAF5", text: "#1A1A18" },
  stats: { bg: "#F5F0E8", text: "#1A1A18" },
  "use-cases": { bg: "#FAFAF5", text: "#1A1A18" },
  "case-study": { bg: "#FAFAF5", text: "#1A1A18" },
  modules: { bg: "#1A1A18", text: "#FFFFFF" },
  roi: { bg: "#FAFAF5", text: "#1A1A18" },
  pricing: { bg: "#F5F0E8", text: "#1A1A18" },
  coverage: { bg: "#F5F0E8", text: "#1A1A18" },
  onboarding: { bg: "#1A1A18", text: "#FFFFFF" },
  trust: { bg: "#1A1A18", text: "#FFFFFF" },
  testimonials: { bg: "#FAFAF5", text: "#1A1A18" },
  faq: { bg: "#FAFAF5", text: "#1A1A18" },
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
      <WhatsAppButton />
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
            <SocialProof />
            <Marquee />
            <Problem />
            <Features />
            <Stats />
            <UseCases scrollTo={scrollTo} />
            <CaseStudy scrollTo={scrollTo} />
            <ROICalculator scrollTo={scrollTo} />
            <Modules />
            <Pricing scrollTo={scrollTo} />
            <Coverage />
            <Onboarding />
            <Trust />
            <Testimonials />
            <FAQ />
            <Demo />
          </main>
          <Footer navItems={navItems} scrollTo={scrollTo} />
        </div>
      </SmoothScroll>
    </>
  );
}
