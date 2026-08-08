'use client';

/**
 * Ambient page backdrop: three slow aurora blooms over a dotted grid, plus a
 * grain overlay. Replaces the old multi-coloured bubble field — far calmer and
 * cheap to render (CSS animation only, no per-frame JS).
 */
export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden noise-overlay"
    >
      {/* Base wash */}
      <div className="absolute inset-0 bg-background" />

      {/* Dotted grid, faded toward the edges */}
      <div className="absolute inset-0 bg-dots mask-fade opacity-60" />

      {/* Aurora blooms */}
      <div
        className="animate-aurora absolute -top-[20%] left-[5%] h-[45rem] w-[45rem] rounded-full opacity-40 blur-[110px] dark:opacity-30"
        style={{
          background:
            'radial-gradient(circle, hsl(var(--brand-1) / 0.55), transparent 65%)',
        }}
      />
      <div
        className="animate-aurora absolute -right-[10%] top-[25%] h-[40rem] w-[40rem] rounded-full opacity-35 blur-[110px] dark:opacity-25"
        style={{
          background:
            'radial-gradient(circle, hsl(var(--brand-2) / 0.5), transparent 65%)',
          animationDelay: '-7s',
        }}
      />
      <div
        className="animate-aurora absolute bottom-[-15%] left-[25%] h-[38rem] w-[38rem] rounded-full opacity-35 blur-[110px] dark:opacity-25"
        style={{
          background:
            'radial-gradient(circle, hsl(var(--brand-3) / 0.5), transparent 65%)',
          animationDelay: '-14s',
        }}
      />

      {/* Vignette to keep text contrast high in dark mode */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
    </div>
  );
}
