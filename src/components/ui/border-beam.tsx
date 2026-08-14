import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export const BorderBeam = ({
  className,
  size = 200,
  duration = 15,
  borderWidth = 1.5,
  colorFrom = "var(--color-primary)",
  colorTo = "var(--color-ring)",
  delay = 0,
}: BorderBeamProps) => {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": duration,
          "--border-width": borderWidth,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
        } as CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",
        "[mask-clip:padding-box,border-box]! mask-intersect! [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        "after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-[border-beam-spin_calc(var(--duration)*1s)_linear_infinite] after:bg-[conic-gradient(from_90deg_at_50%_50%,var(--color-to),var(--color-from),transparent_20%)] after:[animation-delay:var(--delay)]",
        "after:[-inset-[calc(var(--border-width)*1px)]]",
        className,
      )}
    />
  );
};
