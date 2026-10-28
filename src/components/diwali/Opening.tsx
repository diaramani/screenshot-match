import { useEffect, useRef, useState } from "react";
import { ArrowDown, Flame, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EVENT } from "@/lib/event";
import folk from "@/assets/diwali-folk.jpg";
import folkMobile from "@/assets/diwali-folk-mobile.jpg";
import { Diya, Sparkle } from "./Art";

function playChime() {
  try {
    const ctx = new AudioContext();
    [659.25, 987.77, 1318.5].forEach((frequency, i) => {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = ctx.currentTime + i * 0.12;
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.12, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.6);
      oscillator.connect(gain).connect(ctx.destination);
      oscillator.start(start);
      oscillator.stop(start + 1.7);
    });
  } catch { /* Sound is optional. */ }
}

export function Opening({ onDone }: { onDone: () => void }) {
  const scene = useRef<HTMLElement>(null);
  useEffect(() => {
    const node = scene.current;
    if (!node) return;
    const move = (e: PointerEvent) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const box = node.getBoundingClientRect();
      node.style.setProperty("--tilt-x", `${(e.clientX - box.left - box.width / 2) / box.width * 10}deg`);
      node.style.setProperty("--tilt-y", `${-(e.clientY - box.top - box.height / 2) / box.height * 8}deg`);
    };
    node.addEventListener("pointermove", move);
    return () => node.removeEventListener("pointermove", move);
  }, []);
  const [lit, setLit] = useState(false);
  const [sound, setSound] = useState(true);
  const light = () => {
    if (lit) return;
    setLit(true);
    if (sound) playChime();
    setTimeout(onDone, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 200 : 2200);
  };
  return (
    <section ref={scene} className={`invitation-opening relative isolate overflow-hidden bg-vermilion text-cream ${lit ? "is-lit" : ""}`}>
      <picture className="absolute inset-0 -z-20"><source media="(max-width: 639px)" srcSet={folkMobile} /><img src={folk} alt="Hand-painted marigolds and peacocks surrounding a festive green arch" width={1536} height={1024} className="h-full w-full object-fill" fetchPriority="high" /></picture>
      <div className="opening-shade pointer-events-none absolute inset-0 -z-10" />
      <div className="folk-sparkles pointer-events-none absolute inset-0" aria-hidden="true">{Array.from({ length: 8 }, (_, i) => <Sparkle key={i} className={`folk-star folk-star-${i} text-marigold`} />)}</div>
      <header className="flex items-center justify-between gap-4 px-7 py-7 md:px-16">
        <span className="eyebrow">MITHAI. SPARKLE. YOUR PEOPLE.</span>
        <Button variant="invitation" size="icon" onClick={() => setSound(!sound)} aria-pressed={sound} aria-label={sound ? "Mute sound" : "Enable sound"} title={sound ? "Mute sound" : "Enable sound"} className="shrink-0 rounded-full border-cream/40 text-cream">
          {sound ? <Volume2 /> : <VolumeX />}
        </Button>
      </header>
      <div className="opening-content animate-rise mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <p className="eyebrow text-marigold">YOU’RE INVITED</p>
        <h1 className="mt-3 font-display text-6xl leading-[1.05] sm:text-7xl lg:text-8xl">Diwali<br /><span className="font-script text-marigold">at ours.</span></h1>
        <p className="mt-4 max-w-sm text-sm leading-6 sm:text-base">An evening with our favourite people.<br />A little mithai, a little sparkle, and a full house.</p>
        <p className="mt-4 text-sm">30 October <span className="mx-3 text-marigold">✦</span> {EVENT.time}</p>
        <Button onClick={light} aria-label="Light the diya" variant="ghost" className="folk-diya group mt-3 h-auto w-52 p-0 hover:bg-transparent"><Diya lit={lit} className="!h-auto !w-full overflow-visible transition-transform group-hover:-translate-y-2" /></Button>
        <Button onClick={light} variant="invitation" size="invitation" className="mt-2 min-w-44 border-marigold bg-marigold text-ink">
          <Flame className={lit ? "animate-flicker" : ""} /> {lit ? "Let there be light" : "Light the diya"}
        </Button>
      </div>
      <Button onClick={onDone} variant="ghost" className="opening-bottom absolute bottom-5 left-1/2 -translate-x-1/2 text-cream hover:bg-cream/10 hover:text-cream">The evening awaits <ArrowDown className="animate-floaty" /></Button>
    </section>
  );
}
