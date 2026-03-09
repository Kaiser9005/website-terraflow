import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    if (window.matchMedia("(pointer: coarse)").matches) {
      cursor.style.display = "none";
      return;
    }

    cursor.style.display = "block";
    document.documentElement.classList.add("has-custom-cursor");

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.5, ease: "power3" });

    const onMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onMouseEnter = (e) => {
      const target = e.target.closest("a, button, [data-cursor]");
      if (!target) return;
      gsap.to(cursor, { width: 60, height: 60, duration: 0.3, ease: "power2.out" });
    };

    const onMouseLeave = (e) => {
      const target = e.target.closest("a, button, [data-cursor]");
      if (!target) return;
      gsap.to(cursor, { width: 20, height: 20, duration: 0.3, ease: "power2.out" });
    };

    const onMouseDown = () => gsap.to(cursor, { scale: 0.8, duration: 0.15 });
    const onMouseUp = () => gsap.to(cursor, { scale: 1, duration: 0.15 });

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter, true);
    document.addEventListener("mouseleave", onMouseLeave, true);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter, true);
      document.removeEventListener("mouseleave", onMouseLeave, true);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" style={{ display: "none" }} />;
}
