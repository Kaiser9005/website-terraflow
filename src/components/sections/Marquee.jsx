import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "../ui/LangToggle";

gsap.registerPlugin(ScrollTrigger);

export default function Marquee() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        const skew = gsap.utils.clamp(-5, 5, velocity / -300);
        gsap.to(track, { skewX: skew, duration: 0.3, ease: "power2.out", overwrite: true });
      },
    });
  }, { scope: sectionRef });

  return (
    <div className="marquee-section" ref={sectionRef}>
      <div className="marquee-track" ref={trackRef}>
        {[...Array(2)].map((_, i) => (
          <div key={i} style={{ display: "flex" }}>
            {t("marquee.items").map((item, j) => (
              <span key={j}>
                <span className="marquee-item">{item}</span>
                <span className="marquee-dot">&#10022;</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
