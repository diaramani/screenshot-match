import { useEffect, useState, type ReactNode } from "react";
import { EVENT, calendarUrl, mapsUrl } from "@/lib/event";
import { Marigold, Sparkle } from "./Art";

const FIT_KEY = "diwali-fit";
const RSVP_KEY = "diwali-rsvp";
const GOSSIP_KEY = "diwali-gossip";

function Label({ n, children, tone = "text-marigold border-marigold" }: { n: string; children: ReactNode; tone?: string }) {
  return (
    <div className={`mb-6 flex items-center gap-3 font-display text-xs tracking-[0.2em] ${tone}`}>
      <span className={`grid h-8 w-8 place-items-center rounded-full border-2 ${tone}`}>{n}</span>
      {children}
    </div>
  );
}

export function Nav() {
  const items = [
    ["invite", "02 INVITE"],
    ["fit", "03 FIT"],
    ["venue", "04 VENUE"],
    ["gossip", "05 GOSSIP"],
  ];
  return (
    <nav className="sticky top-0 z-40 border-b-2 border-ink bg-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 overflow-x-auto px-4 py-3">
        <span className="shrink-0 font-display tracking-[0.15em]">DIWALI SCENE</span>
        <div className="flex gap-2">
          {items.map(([id, l]) => (
            <a key={id} href={`#${id}`} className="shrink-0 rounded-full border-2 border-ink px-3 py-1 font-display text-xs tracking-wider transition hover:bg-vermilion hover:text-cream">
              {l}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export function useLocal<T>(key: string, initial: T) {
  const [v, setV] = useState<T>(initial);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setV(JSON.parse(raw));
    } catch {}
  }, [key]);
  const set = (n: T) => {
    setV(n);
    try {
      localStorage.setItem(key, JSON.stringify(n));
    } catch {}
  };
  return [v, set] as const;
}

export function Invite() {
  const [rsvp, setRsvp] = useLocal<string | null>(RSVP_KEY, null);
  const rows = [
    ["EVENT", EVENT.eventName],
    ["DATE", EVENT.date],
    ["TIME", EVENT.time],
    ["DRESS", EVENT.dressCode],
    ["HOST", EVENT.host],
    ["RSVP BY", EVENT.rsvpBy],
  ];
  const wa = `https://wa.me/${EVENT.rsvpWhatsApp}?text=${encodeURIComponent(`Hi ${EVENT.host}! Daawat accepted for ${EVENT.eventName} 🪔`)}`;
  return (
    <section id="invite" className="dots relative scroll-mt-16 overflow-hidden bg-emerald px-5 py-20 text-cream">
      <div className="mx-auto max-w-6xl">
        <Label n="02">THE REVEAL</Label>
        <div className="grid items-start gap-10 md:grid-cols-[1fr_1fr]">
          <div className="card-pop animate-rise bg-cream p-4 text-ink">
            <div className="rounded-xl border-2 border-ink p-6">
              <div className="flex justify-between font-display text-[0.65rem] tracking-[0.2em]">
                <span>NO. 001</span><span>GHAR PE EDITION</span><span>LIMITED PRINT</span>
              </div>
              <div className="relative mt-6 grid h-48 place-items-center overflow-hidden rounded-t-full border-2 border-ink bg-saffron">
                <div className="sunburst absolute inset-0" />
                <div className="flex gap-1">
                  <Marigold className="w-24" /><Marigold className="mt-10 w-20" /><Marigold className="w-24" />
                </div>
                <span className="absolute left-3 top-6 -rotate-6 border-2 border-ink bg-pink px-2 font-display text-[0.65rem] tracking-wider text-cream">GHAR PE DIWALI HAI.</span>
              </div>
              <h2 className="mt-6 font-display text-6xl leading-[0.9] text-vermilion md:text-7xl">
                PLOT TWIST:<br />
                <span className="text-ink">TU </span>
                <span className="font-script text-emerald">invited</span>
                <br />HAI!
              </h2>
              <p className="mt-4 text-lg">Good food. Great fits. Questionable dance moves.</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="card-pop bg-ink p-6 shadow-[8px_10px_0_0_var(--marigold)]">
              <div className="mb-3 flex justify-between font-display text-xs tracking-[0.2em] text-marigold">
                ADMIT ONE • BEST FIT <Sparkle className="h-5 w-5 text-pink" />
              </div>
              {rows.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[6rem_1fr] border-t border-dashed border-cream/25 py-3">
                  <span className="font-display text-xs tracking-[0.2em] text-marigold">{k}</span>
                  <span className="font-semibold">{v}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setRsvp(rsvp === "yes" ? null : "yes")} className="btn-pop w-full justify-center bg-marigold py-4 text-lg text-ink">
              {rsvp === "yes" ? "✓ DAAWAT ACCEPTED (TAP TO UNDO)" : "DAAWAT ACCEPTED"}
            </button>
            {rsvp === "yes" && (
              <p className="text-sm text-cream/90">
                Saved on this device only. Let {EVENT.host} know:{" "}
                <a href={wa} target="_blank" rel="noreferrer" className="font-bold text-marigold underline">send RSVP on WhatsApp</a> · {EVENT.rsvpContact}
              </p>
            )}
            <div className="grid grid-cols-2 gap-4">
              <a href={calendarUrl()} target="_blank" rel="noreferrer" className="btn-pop justify-center bg-cream py-3 text-sm text-ink">ADD TO CALENDAR</a>
              <a href="#venue" className="btn-pop justify-center bg-pink py-3 text-sm text-cream">LOCATION DIKHAO</a>
            </div>
            <a href="#fit" className="block font-display text-xs tracking-[0.2em] text-marigold">NEXT: FIT CHECK ↓</a>
          </div>
        </div>
      </div>
    </section>
  );
}

const FITS = [
  { name: "LAAL TAMATAR", sub: "Poster Red", line: "Ketchup-coded confidence.", bg: "bg-vermilion text-cream" },
  { name: "HALDI GANG", sub: "Marigold Yellow", line: "Glowing before the diyas do.", bg: "bg-marigold text-ink" },
  { name: "HARI MIRCH", sub: "Emerald Green", line: "Spicy. Sharp. Slightly dangerous.", bg: "bg-emerald text-cream" },
  { name: "MOR PANKH", sub: "Peacock Blue", line: "Peacock confidence, on loop.", bg: "bg-peacock text-cream" },
  { name: "GULABI SCENE", sub: "Hot Pink", line: "Loud, lovely, a little extra.", bg: "bg-pink text-cream" },
  { name: "ORANGE BARFI", sub: "Saffron Orange", line: "Sweet, saffron, sorted.", bg: "bg-saffron text-ink" },
];

export function FitCheck() {
  const [fit, setFit] = useLocal<number | null>(FIT_KEY, null);
  const marquee = "FULL DIWALI SCENE ✦ good food ✦ GREAT FITS ✦ questionable dance moves ✦ GHAR PE DIWALI HAI ✦ THODA GLOW ✦ ";
  return (
    <section id="fit" className="scroll-mt-16 bg-cream">
      <div className="overflow-hidden border-y-2 border-ink bg-marigold py-3">
        <div className="flex w-max animate-marquee whitespace-nowrap font-display text-3xl">
          <span>{marquee}{marquee}</span><span>{marquee}{marquee}</span>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-5 py-20">
        <Label n="03" tone="text-vermilion border-vermilion">DRESS CODE</Label>
        <h2 className="font-display text-6xl leading-[0.9] md:text-8xl">
          FIT CHECK,<br /><span className="font-script text-pink">festive</span> EDITION.
        </h2>
        <p className="mt-3 text-lg">Pick your colour. Enter your <em className="font-script font-bold">main-character era.</em></p>
        <div className="mt-10 grid gap-8 md:grid-cols-[1.4fr_1fr]">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {FITS.map((f, i) => (
              <button
                key={f.name}
                onClick={() => setFit(i)}
                className={`card-pop min-h-44 p-4 text-left transition hover:-translate-y-1 hover:rotate-[-1deg] ${f.bg} ${fit === i ? "ring-4 ring-ink ring-offset-4 ring-offset-cream" : ""}`}
              >
                <span className="font-display text-xs">0{i + 1}</span>
                <span className="mt-6 block font-display text-3xl leading-none">{f.name}</span>
                <span className="font-script text-base">{f.sub}</span>
                <span className="mt-2 block text-xs">{f.line}</span>
              </button>
            ))}
          </div>
          <div className="grid place-items-center rounded-2xl border-2 border-dashed border-ink p-8 text-center">
            {fit === null ? (
              <div>
                <Marigold className="mx-auto w-14" />
                <p className="mt-3 font-display text-xl">YOUR FIT PASS PRINTS HERE</p>
                <p className="text-sm text-muted-foreground">Tap a colour to lock in your look.</p>
              </div>
            ) : (
              <div className={`card-pop w-full animate-rise p-6 ${FITS[fit].bg}`}>
                <p className="font-display text-xs tracking-[0.2em]">FIT PASS • LOCKED IN</p>
                <p className="mt-4 font-display text-5xl leading-none">{FITS[fit].name}</p>
                <p className="font-script text-2xl">{FITS[fit].sub}</p>
                <p className="mt-3 text-sm">{FITS[fit].line}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Venue() {
  const q = `${EVENT.venueName}, ${EVENT.venueAddress}`;
  return (
    <section id="venue" className="relative scroll-mt-16 overflow-hidden bg-vermilion px-5 py-20 text-cream">
      <div className="sunburst pointer-events-none absolute inset-0 opacity-70" />
      <Marigold className="absolute -right-8 -top-8 w-32 animate-floaty" />
      <div className="relative mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
        <div>
          <Label n="04">THE VENUE</Label>
          <h2 className="font-display text-6xl leading-[0.9] text-marigold md:text-8xl">
            SCENE SET HAI.<br /><span className="text-cream">TU BAS</span><br /><span className="font-script text-cream">aaja.</span>
          </h2>
          <p className="mt-4 text-lg">Outfit sorted. Plans locked. <em className="font-script font-bold">Ab mithai ka hisaab baad mein.</em></p>
        </div>
        <div className="card-pop bg-emerald p-7">
          <div className="mb-4 flex justify-between font-display text-xs tracking-[0.2em] text-marigold">WHERE TO FIND US <Sparkle className="h-5 w-5 text-marigold" /></div>
          <p className="font-display text-xs tracking-[0.2em] text-marigold">VENUE</p>
          <p className="mb-4 text-xl font-bold">{EVENT.venueName}</p>
          <p className="font-display text-xs tracking-[0.2em] text-marigold">ADDRESS</p>
          <p className="mb-4">{EVENT.venueAddress}</p>
          <p className="font-display text-xs tracking-[0.2em] text-marigold">WHEN</p>
          <p className="mb-6">{EVENT.date} · {EVENT.time}</p>
          <div className="flex flex-wrap gap-3">
            <a href={mapsUrl(q)} target="_blank" rel="noreferrer" className="btn-pop bg-marigold px-6 py-3 text-ink">OPEN IN GOOGLE MAPS →</a>
            <a href={calendarUrl()} target="_blank" rel="noreferrer" className="btn-pop bg-cream px-6 py-3 text-ink">ADD TO CALENDAR</a>
          </div>
        </div>
      </div>
    </section>
  );
}

type Post = { id: string; name: string; text: string; at: number; tone: number };
const TONES = ["bg-marigold text-ink", "bg-pink text-cream", "bg-cream text-ink", "bg-emerald text-cream", "bg-saffron text-ink"];

export function GossipWall() {
  const [posts, setPosts] = useLocal<Post[]>(GOSSIP_KEY, []);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    setPosts([{ id: crypto.randomUUID(), name: name.trim().slice(0, 30) || "Anonymous", text: t.slice(0, 200), at: Date.now(), tone: Math.floor(Math.random() * TONES.length) }, ...posts]);
    setText("");
  };
  return (
    <section id="gossip" className="dots scroll-mt-16 bg-cream px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="card-pop relative overflow-hidden bg-pink p-8 text-ink md:p-12">
          <Label n="05" tone="text-ink border-ink">GOSSIP WALL</Label>
          <h2 className="font-display text-6xl leading-[0.9] md:text-8xl">
            DIWALI KI<br /><span className="font-script text-cream">gossip</span> ARCHIVE
          </h2>
          <p className="mt-3 text-lg">Spill the chai. Keep it cute, keep it short.</p>
          <form onSubmit={submit} className="mt-6 grid gap-3 md:max-w-2xl md:grid-cols-[10rem_1fr_auto]">
            <input value={name} onChange={(e) => setName(e.target.value)} maxLength={30} placeholder="Your name" aria-label="Your name" className="rounded-full border-2 border-ink bg-cream px-4 py-3 outline-none focus:ring-4 focus:ring-marigold" />
            <input value={text} onChange={(e) => setText(e.target.value)} maxLength={200} placeholder="Who's bringing the kaju katli?" aria-label="Your gossip" className="rounded-full border-2 border-ink bg-cream px-4 py-3 outline-none focus:ring-4 focus:ring-marigold" />
            <button type="submit" className="btn-pop justify-center bg-marigold px-6 py-3 text-ink">PIN IT +</button>
          </form>
          <p className="mt-4 max-w-2xl rounded-xl border-2 border-ink bg-cream/90 px-4 py-2 text-sm">
            Heads up: notes are saved only in this browser on this device. Other guests won't see them.
          </p>
          <Marigold className="absolute -bottom-6 -right-6 w-28" />
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.length === 0 && <p className="text-muted-foreground">No gossip yet. Be the first to start drama (respectfully).</p>}
          {posts.map((p, i) => (
            <article key={p.id} className={`card-pop relative animate-rise p-5 ${TONES[p.tone]}`} style={{ rotate: `${(i % 3) - 1}deg` }}>
              <span className="absolute -top-3 left-1/2 h-5 w-20 -translate-x-1/2 rotate-[-3deg] border border-ink bg-marigold/90" />
              <p className="text-lg font-semibold">"{p.text}"</p>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="font-display tracking-wider">— {p.name}</span>
                <button onClick={() => setPosts(posts.filter((x) => x.id !== p.id))} className="underline opacity-70 hover:opacity-100">remove</button>
              </div>
            </article>
          ))}
        </div>
      </div>
      <footer className="mt-20 text-center font-display text-xs tracking-[0.2em] text-muted-foreground">
        HOSTED WITH LOVE BY {EVENT.host.toUpperCase()} · SHUBH DEEPAVALI ✦
      </footer>
    </section>
  );
}
