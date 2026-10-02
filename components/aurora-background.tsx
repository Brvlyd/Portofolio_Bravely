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

      {/* Top wash — the page opens on a pool of light and falls into the base */}
      <div className="absolute inset-x-0 top-0 h-[70vh] bg-gradient-to-b from-[hsl(var(--glow)/0.22)] via-[hsl(var(--glow)/0.06)] to-transparent dark:from-[hsl(var(--glow)/0.09)] dark:via-[hsl(var(--glow)/0.03)]" />

      {/* Aurora blooms */}
      <div
        className="animate-aurora absolute -top-[20%] left-[5%] h-[45rem] w-[45rem] rounded-full opacity-40 blur-[110px] dark:opacity-30"
        style={{
          background:
            'radial-gradient(circle, hsl(var(--glow) / 0.6), transparent 65%)',
        }}
      />
      <div
        className="animate-aurora absolute -right-[10%] top-[25%] h-[40rem] w-[40rem] rounded-full opacity-35 blur-[110px] dark:opacity-25"
        style={{
          background:
            'radial-gradient(circle, hsl(var(--brand-2) / 0.3), transparent 65%)',
          animationDelay: '-7s',
        }}
      />
      <div
        className="animate-aurora absolute bottom-[-15%] left-[25%] h-[38rem] w-[38rem] rounded-full opacity-35 blur-[110px] dark:opacity-25"
        style={{
          background:
            'radial-gradient(circle, hsl(var(--brand-3) / 0.4), transparent 65%)',
          animationDelay: '-14s',
        }}
      />

      {/* Vignette to keep text contrast high in dark mode */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
    </div>
  );
}
