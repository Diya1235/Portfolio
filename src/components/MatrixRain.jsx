import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../hooks/useInView.js";

/** Subtle blue "matrix" rain behind the hero. Pauses when off-screen. */
export default function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const chars = "01{}[]<>/$#docker kubectl helm git push deploy".split("");
    const fontSize = 14;
    let drops = [];
    let raf;
    let last = 0;
    let visible = true;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drops = Array.from({ length: Math.ceil(canvas.width / fontSize) }, () =>
        Math.floor(Math.random() * -50)
      );
    };

    const draw = (t) => {
      raf = requestAnimationFrame(draw);
      if (!visible || t - last < 60) return;
      last = t;
      ctx.fillStyle = "rgba(5, 7, 13, 0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;
      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = Math.random() > 0.97 ? "#7fd8ff" : "#1f5fbf";
        ctx.fillText(ch, i * fontSize, y * fontSize);
        drops[i] = y * fontSize > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
      });
    };

    const obs = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    obs.observe(canvas);
    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix" aria-hidden="true" />;
}
