import { useEffect, useRef, useState } from "react";
import { EVENT } from "@/lib/event";
import { Diya, DiyaLogo, Marigold } from "./Art";

function playChime() {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    [659.25, 987.77, 1318.5].forEach((f, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = f;
      const t = ctx.currentTime + i * 0.12;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.15, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
      o.connect(g).connect(ctx.destination);
      o.start(t);
      o.stop(t + 1.7);
    });
  } catch {
    /* sound is optional */
  }
}

export function Opening({ onDone }: { onDone: () => void }) {
  const [lit, setLit] = useState(false);
  const [sound, setSound] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      setTilt({ x, y });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const light = () => {
    if (lit) return;
    setLit(true);
    if (sound) playChime();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(onDone, reduced ? 300 : 2200);
  };

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[600px] overflow-hidden bg-vermilion text-cream transition-[filter] duration-1000"
      style={{ filter: lit ? "brightness(1.12) saturate(1.1)" : undefined }}
    >
      <div
        className="sunburst pointer-events-none absolute -inset-[20%] transition-opacity duration-1000"
        style={{
          opacity: lit ? 1 : 0.75,
          transform: `translate(${tilt.x * -20}px, ${tilt.y * -20}px)`,
        }}
      >
        <div className="sunburst h-full w-full animate-spin-slow" style={{ opacity: lit ? 0.9 : 0 }} />
      </div>
      {/* double border */}
      <div className="pointer-events-none absolute inset-3 rounded-[2rem] border-2 border-cream/60 md:inset-6" />
      <div className="pointer-events-none absolute inset-5 rounded-[1.6rem] border border-cream/30 md:inset-8" />

      <Marigold className="absolute -right-10 top-16 w-28 animate-floaty md:w-40" />
      <Marigold className="absolute -bottom-10 -left-10 w-36 animate-floaty md:w-52" />

      <header className="relative z-10 flex items-center justify-between px-8 pt-8 md:px-24 md:pt-12">
        <div className="flex items-center gap-3">
          <DiyaLogo />
          <span className="font-display text-lg tracking-[0.15em] text-cream">DIWALI SCENE</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSound((s) => !s)}
            className="hidden rounded-full border-2 border-cream/70 px-4 py-2 font-display text-xs tracking-widest text-cream transition hover:bg-cream/10 sm:block"
            aria-pressed={sound}
          >
            SOUND {sound ? "ON" : "OFF"}
          </button>
          <button
            onClick={onDone}
            className="rounded-full border-2 border-cream px-6 py-2 font-display tracking-widest text-cream transition hover:bg-cream hover:text-vermilion"
          >
            SKIP →
          </button>
        </div>
      </header>

      <div className="relative z-10 grid h-[calc(100%-6rem)] items-center gap-4 px-8 md:grid-cols-[1.1fr_1fr] md:px-24">
        <div className="animate-rise">
          <h1 className="leading-[0.85]">
            <span className="block font-display text-[clamp(3.5rem,11vw,10rem)] text-cream" style={{ transform: `translate(${tilt.x * 8}px, ${tilt.y * 8}px)` }}>
              DIL WAALI
            </span>
            <span className="-mt-2 block font-script text-[clamp(4rem,12vw,11rem)] text-marigold" style={{ transform: `translate(${tilt.x * 14}px, ${tilt.y * 14}px)` }}>
              Diwali
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-lg font-medium md:text-2xl">
            This Diwali, we're skipping the small talk and going straight to the{" "}
            <em className="font-script font-bold">mithai, masti and main character moments</em>
          </p>
          <p className="mt-4 font-display text-sm tracking-[0.25em] text-marigold">HOSTED BY {EVENT.host.toUpperCase()}</p>
          <button onClick={light} className="btn-pop mt-8 bg-marigold px-8 py-4 text-xl text-ink">
            JALAO DIYA →
          </button>
          <p className="mt-4 text-sm md:text-base">Tap the Diya to Confirm Your Shubh Aagman</p>
        </div>

        <button
          onClick={light}
          aria-label="Light the diya"
          className="group absolute bottom-6 right-0 w-[70%] max-w-[620px] cursor-pointer md:static md:w-full"
          style={{ transform: `perspective(900px) rotateY(${tilt.x * 14}deg) rotateX(${-tilt.y * 10}deg)` }}
        >
          <div className="transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-[1.03]">
            <Diya lit={lit} className="w-full overflow-visible drop-shadow-[0_20px_30px_oklch(0.2_0.05_30/0.4)]" />
          </div>
        </button>
      </div>

      {lit && (
        <div className="pointer-events-none absolute inset-0 z-20 animate-[rise_2.2s_ease_forwards] bg-[radial-gradient(circle_at_72%_45%,var(--marigold)_0%,transparent_60%)] opacity-60 mix-blend-screen" />
      )}
    </section>
  );
}
