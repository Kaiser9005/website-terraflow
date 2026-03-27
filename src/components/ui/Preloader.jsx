import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preloader({ onComplete }) {
  const preloaderRef = useRef(null);
  const counterRef = useRef(null);
  const logoRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    const counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.floor(counter.val);
        }
      },
    });

    tl.to(counterRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power2.in",
    });

    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" },
      "-=0.2"
    );

    tl.to(preloaderRef.current, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.8,
      ease: "power4.inOut",
      delay: 0.3,
    });
  }, { scope: preloaderRef });

  return (
    <div ref={preloaderRef} className="preloader">
      <div className="preloader-inner">
        <div ref={counterRef} className="preloader-counter">0</div>
        <div ref={logoRef} className="preloader-logo" style={{ opacity: 0 }}>
          <span>K</span>ALTIV
        </div>
      </div>
    </div>
  );
}
