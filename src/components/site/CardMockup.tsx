import { useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { deferMotion } from "@/lib/defer-motion";

interface Props {
  className?: string;
  interactive?: boolean;
  last4?: string;
}

/** CSS/SVG virtual card. Tilts toward the cursor when interactive (disabled for reduced motion). */
export function CardMockup({ className, interactive = true, last4 = "4471" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const ready = useRef(false);
  const frame = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!interactive) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { ready.current = !media.matches; };
    const cancel = deferMotion(update);
    media.addEventListener("change", update);
    return () => {
      cancel();
      ready.current = false;
      media.removeEventListener("change", update);
      if (frame.current !== undefined) cancelAnimationFrame(frame.current);
    };
  }, [interactive]);

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      if (!ready.current || frame.current !== undefined) return;
      const { clientX, clientY } = e;
      frame.current = requestAnimationFrame(() => {
        frame.current = undefined;
        const el = ref.current;
        if (!el || !ready.current) return;
        const r = el.getBoundingClientRect();
        const x = (clientX - r.left) / r.width - 0.5;
        const y = (clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--rx", `${(-y * 16).toFixed(2)}deg`);
        el.style.setProperty("--ry", `${(x * 20).toFixed(2)}deg`);
        el.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
        el.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
      });
    },
    [interactive],
  );
  const onLeave = () => {
    if (frame.current !== undefined) cancelAnimationFrame(frame.current);
    frame.current = undefined;
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      className={cn("relative [perspective:1200px]", className)}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      role="img"
      aria-label={`Cryptswipe virtual card ending in ${last4}, funded by SOL, USDC and ETH`}
    >
      <div aria-hidden className="absolute -inset-10 rounded-full opacity-90 blur-2xl" style={{ background: "var(--glow-violet)" }} />
      <div
        ref={ref}
        className="relative aspect-[1.586] w-full overflow-hidden rounded-[22px] border border-border transition-transform duration-300 ease-out"
        style={{
          transform: "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
          transformStyle: "preserve-3d",
          background:
            "radial-gradient(120% 90% at 0% 0%, rgb(124 58 237 / 0.55), transparent 55%), radial-gradient(90% 80% at 100% 100%, rgb(34 211 238 / 0.35), transparent 60%), linear-gradient(160deg, #141a33, #070a14)",
          boxShadow: "0 40px 80px -30px rgb(124 58 237 / 0.6), inset 0 1px 0 rgb(255 255 255 / 0.12)",
        }}
      >
        {/* sheen */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60 mix-blend-soft-light"
          style={{ background: "radial-gradient(40% 50% at var(--gx,30%) var(--gy,20%), rgb(255 255 255 / 0.5), transparent 70%)" }}
        />
        <div className="absolute inset-0 flex flex-col justify-between p-[6.5%] font-sans">
          <div className="flex items-center gap-2.5">
            <img src="/brand/cryptswipe-mark.svg" alt="" width={36} height={36} className="h-auto w-[12%] min-w-7" />
            <span className="text-[clamp(0.85rem,3.4cqw,1.15rem)] font-bold tracking-tight text-foreground">Cryptswipe</span>
          </div>
          {/* chip */}
          <svg aria-hidden viewBox="0 0 48 36" className="w-[14%]">
            <defs>
              <linearGradient id="chipg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#f3d98b" />
                <stop offset="0.5" stopColor="#c99a3b" />
                <stop offset="1" stopColor="#f0d27e" />
              </linearGradient>
            </defs>
            <rect x="1" y="1" width="46" height="34" rx="7" fill="url(#chipg)" />
            <path d="M1 12h14M1 24h14M33 12h14M33 24h14M15 1v34M33 1v34M15 18h18" stroke="#8a6a24" strokeWidth="1.2" fill="none" opacity="0.7" />
          </svg>
          <div>
            <p className="font-mono text-[clamp(0.95rem,4.2cqw,1.5rem)] tracking-[0.14em] text-foreground">
              •••• •••• •••• {last4}
            </p>
            <div className="mt-3 flex items-end justify-between text-[clamp(0.6rem,2.2cqw,0.8rem)] font-semibold tracking-[0.18em]">
              <span className="text-muted-foreground">SOL · USDC · ETH</span>
              <span className="text-lime">VIRTUAL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
