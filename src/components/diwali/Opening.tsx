import { useState } from "react";
import { ArrowDown, Flame, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EVENT } from "@/lib/event";
import evening from "@/assets/diwali-evening.jpg";

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
  const [lit, setLit] = useState(false);
  const [sound, setSound] = useState(true);
  const light = () => {
    if (lit) return;
    setLit(true);
    if (sound) playChime();
    setTimeout(onDone, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 200 : 1100);
  };
  return (
    <section className={`invitation-opening relative isolate overflow-hidden bg-vermilion text-cream ${lit ? "is-lit" : ""}`}>
      <img src={evening} alt="Brass diyas, marigolds and mithai on a red tablecloth" width={1536} height={1024} className="absolute inset-0 -z-20 h-full w-full object-cover" fetchPriority="high" />
      <div className="opening-shade absolute inset-0 -z-10" />
      <header className="flex items-center justify-between gap-4 px-7 py-7 md:px-12">
        <span className="eyebrow">A LITTLE LIGHT. A LOT OF LOVE.</span>
        <Button variant="invitation" size="icon" onClick={() => setSound(!sound)} aria-pressed={sound} aria-label={sound ? "Mute sound" : "Enable sound"} title={sound ? "Mute sound" : "Enable sound"} className="shrink-0 rounded-full border-cream/40 text-cream">
          {sound ? <Volume2 /> : <VolumeX />}
        </Button>
      </header>
      <div className="opening-content mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <p className="eyebrow text-marigold">YOU’RE INVITED</p>
        <h1 className="mt-5 font-display text-7xl leading-[0.95] sm:text-8xl lg:text-9xl">Diwali<br /><span className="font-script text-marigold">at ours.</span></h1>
        <p className="mt-7 max-w-sm text-sm leading-7 sm:text-base">An evening with our favourite people.<br />A little mithai, a little sparkle, and a full house.</p>
        <p className="mt-6 text-sm">30 October <span className="mx-3 text-marigold">✦</span> {EVENT.time}</p>
        <Button onClick={light} variant="invitation" size="invitation" className="mt-7 min-w-48 border-marigold bg-marigold text-ink">
          <Flame className={lit ? "animate-flicker" : ""} /> {lit ? "Let there be light" : "Light the diya"}
        </Button>
      </div>
      <Button onClick={onDone} variant="ghost" className="opening-bottom absolute bottom-5 left-1/2 -translate-x-1/2 text-cream hover:bg-cream/10 hover:text-cream">The evening awaits <ArrowDown /></Button>
    </section>
  );
}
