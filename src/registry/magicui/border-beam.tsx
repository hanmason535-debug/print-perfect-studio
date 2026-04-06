import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
}

export function BorderBeam({
  className,
  size = 200,
  duration = 6,
  delay = 0,
  borderWidth = 2,
  colorFrom = "hsl(var(--cyan))",
  colorTo = "hsl(var(--magenta))",
}: BorderBeamProps) {
  const beamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = beamRef.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    let start: number | null = null;
    let animId: number;

    const animate = (timestamp: number) => {
      if (start === null) start = timestamp;
      const elapsed = ((timestamp - start) / 1000 - delay);
      if (elapsed < 0) {
        animId = requestAnimationFrame(animate);
        return;
      }

      const progress = (elapsed % duration) / duration;
      const pw = parent.offsetWidth;
      const ph = parent.offsetHeight;
      const perimeter = 2 * (pw + ph);
      const dist = progress * perimeter;

      let x = 0, y = 0, angle = 0;

      if (dist < pw) {
        // top edge: left to right
        x = dist;
        y = 0;
        angle = 90;
      } else if (dist < pw + ph) {
        // right edge: top to bottom
        x = pw;
        y = dist - pw;
        angle = 180;
      } else if (dist < 2 * pw + ph) {
        // bottom edge: right to left
        x = pw - (dist - pw - ph);
        y = ph;
        angle = 270;
      } else {
        // left edge: bottom to top
        x = 0;
        y = ph - (dist - 2 * pw - ph);
        angle = 0;
      }

      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [duration, delay]);

  return (
    <div
      ref={beamRef}
      className={cn("absolute z-10 pointer-events-none", className)}
      style={{
        width: `${size}px`,
        height: `${borderWidth}px`,
        background: `linear-gradient(90deg, transparent, ${colorFrom}, ${colorTo}, transparent)`,
        borderRadius: "9999px",
        filter: "blur(0.5px)",
      }}
    />
  );
}
