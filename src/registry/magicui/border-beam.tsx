import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
  borderWidth?: number;
}

export function BorderBeam({
  className,
  size = 200,
  duration = 15,
  delay = 0,
  borderWidth = 1.5,
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": duration,
          "--delay": `-${delay}s`,
          "--border-width": `${borderWidth}px`,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit]",
        "![mask-composite:subtract] [border:calc(var(--border-width))*1_solid_transparent]",
        "[mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        "after:absolute after:aspect-square after:w-[calc(var(--size)*1px)]",
        "after:animate-border-beam after:[animation-delay:var(--delay)]",
        "after:[background:linear-gradient(to_left,transparent,transparent,transparent)]",
        "after:[offset-anchor:calc(var(--size)*1px)_50%]",
        "after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",
        className
      )}
    />
  );
}
