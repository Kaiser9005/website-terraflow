import { useRef, useCallback } from "react";
import { gsap } from "gsap";

export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  onClick,
  as: Tag = "button",
  ...props
}) {
  const ref = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.4, ease: "power2.out" });
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      {...props}
    >
      {children}
    </Tag>
  );
}
