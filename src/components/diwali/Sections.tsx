import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, CalendarPlus, Check, MapPin, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EVENT, calendarUrl, mapsUrl } from "@/lib/event";
import { Marigold, Sparkle } from "./Art";

const FIT_KEY = "diwali-fit";
const RSVP_KEY = "diwali-rsvp";
const GOSSIP_KEY = "diwali-gossip";

function Label({ n, children, tone = "text-marigold" }: { n: string; children: ReactNode; tone?: string }) {
  return <p className={`eyebrow mb-7 flex items-center gap-4 ${tone}`}><span>{n}</span><span className="h-px w-8 bg-current opacity-50" />{children}</p>;
}

export function Nav() {
  return <nav className="sticky top-0 z-40 border-b border-ink/15 bg-cream"><div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-4 sm:gap-4 sm:px-5"><span className="shrink-0 font-script text-base text-vermilion sm:text-xl">Diwali at ours.</span><div className="flex gap-0 sm:gap-4">{[["invite", "Invite"], ["fit", "The fit"], ["venue", "The place"], ["gossip", "Notes"]].map(([id, label]) => <Button key={id} asChild variant="ghost" className="h-8 px-2 text-xs hover:bg-marigold/20"><a href={`#${id}`}>{label}</a></Button>)}</div></div></nav>;
}

export function useLocal<T>(key: string, initial: T) {
  const [v, setV] = useState<T>(initial);
  useEffect(() => { try { const raw = localStorage.getItem(key); if (raw) setV(JSON.parse(raw)); } catch {} }, [key]);
  const set = (n: T) => { setV(n); try { localStorage.setItem(key, JSON.stringify(n)); } catch {} };
  return [v, set] as const;
}

export function Invite() {
  const [rsvp, setRsvp] = useLocal<string | null>(RSVP_KEY, null);
  const wa = `https://wa.me/${EVENT.rsvpWhatsApp}?text=${encodeURIComponent(`Count me in for ${EVENT.eventName}!`)}`;
  return <section id="invite" className="folk-band scroll-mt-16 bg-emerald px-6 py-20 text-cream md:py-28"><div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[1.1fr_1fr] md:gap-20">
    <div className="relative"><Marigold className="mb-5 w-16 animate-spin-slow" /><Label n="01">THE INVITATION</Label><h2 className="font-display text-6xl leading-none md:text-7xl">You better<br /><span className="font-script text-marigold">be there.</span></h2><p className="mt-7 max-w-sm leading-7 text-cream/85">Three friends, one celebration, and a place for you. Come dressed up, stay for seconds, and make a night of it.</p><p className="mt-7 font-script text-2xl text-marigold">The best part is who’s around the table.</p></div>
    <div className="self-center"><dl>{[["WHEN", EVENT.date], ["FROM", EVENT.time], ["WEAR", EVENT.dressCode]].map(([k, v]) => <div key={k} className="grid grid-cols-[4rem_1fr] gap-5 border-b border-cream/25 py-5"><dt className="eyebrow pt-1 text-marigold">{k}</dt><dd className="text-base leading-6">{v}</dd></div>)}</dl>
      <Button onClick={() => setRsvp(rsvp === "yes" ? null : "yes")} variant="invitation" size="invitation" className="mt-7 w-full border-marigold bg-marigold text-ink">{rsvp === "yes" ? <><Check />Count me in · Undo</> : <>Count me in<ArrowUpRight /></>}</Button>
      {rsvp === "yes" && <p className="mt-4 text-sm leading-6 text-cream/80">Saved on this device. <a href={wa} target="_blank" rel="noreferrer" className="text-marigold underline">Send your RSVP on WhatsApp</a> · {EVENT.rsvpContact}</p>}
      <div className="mt-4 flex flex-wrap gap-3"><Button asChild variant="invitation" size="invitation" className="border-cream/40 text-cream"><a href={calendarUrl()} target="_blank" rel="noreferrer"><CalendarPlus />Save the date</a></Button><Button asChild variant="ghost" size="invitation" className="text-cream hover:bg-cream/10 hover:text-cream"><a href="#venue">The place<ArrowUpRight /></a></Button></div>
    </div>
  </div></section>;
}

const FITS = [
  { name: "Vermilion", sub: "A little bold.", bg: "bg-vermilion text-cream" },
  { name: "Marigold", sub: "Pure sunshine.", bg: "bg-marigold text-ink" },
  { name: "Emerald", sub: "Quietly striking.", bg: "bg-emerald text-cream" },
  { name: "Peacock", sub: "Something blue.", bg: "bg-peacock text-cream" },
  { name: "Gulabi", sub: "A touch of pink.", bg: "bg-pink text-cream" },
  { name: "Saffron", sub: "Warm & golden.", bg: "bg-saffron text-ink" },
];

export function FitCheck() {
  const [fit, setFit] = useLocal<number | null>(FIT_KEY, null);
  const selected = fit === null ? undefined : FITS[fit];
  return <><div className="overflow-hidden border-y-2 border-ink bg-marigold py-3"><div className="flex w-max animate-marquee whitespace-nowrap font-script text-2xl" aria-hidden="true">{Array.from({ length: 4 }, (_, i) => <span key={i} className="pr-8">a little mithai ✦ a lot of sparkle ✦ your favourite people ✦ Diwali at ours ✦ </span>)}</div></div><section id="fit" className="scroll-mt-16 bg-cream px-6 py-20 md:py-28"><div className="mx-auto max-w-6xl"><Label n="02" tone="text-vermilion">DRESSED FOR THE OCCASION</Label><div className="flex flex-wrap items-end justify-between gap-6"><h2 className="font-display text-6xl leading-none md:text-7xl">A little <span className="font-script text-pink">festive.</span></h2><p className="max-w-xs text-sm leading-6 text-muted-foreground">Your favourite festive fit. A colour that feels like you. A little extra is always welcome.</p></div>
    <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">{FITS.map((f, i) => <Button key={f.name} onClick={() => setFit(i)} aria-pressed={fit === i} variant="ghost" className="group h-auto flex-col items-stretch gap-0 rounded-none p-0 text-left hover:bg-transparent"><span className={`flex aspect-[4/5] w-full items-center justify-center folk-swatch rounded-t-full transition-transform group-hover:-translate-y-2 group-hover:rotate-[-2deg] ${f.bg}`}>{fit === i ? <Check className="animate-ignite !h-8 !w-8" /> : <Sparkle className="!h-7 !w-7 opacity-70" />}</span><span className="mt-4 font-display text-2xl text-ink">{f.name}</span><span className="mt-1 whitespace-normal text-xs font-normal text-muted-foreground">{f.sub}</span></Button>)}</div>
    {selected && <p className="animate-rise mt-9 border-t border-ink/15 pt-6 text-sm"><Check className="mr-2 inline h-4 w-4 text-emerald" />Your colour: <span className="font-semibold">{selected.name}</span><span className="ml-3 font-script text-xl text-pink">See you in your finest.</span></p>}
  </div></section></>;
}

export function Venue() {
  return <section id="venue" className="folk-band scroll-mt-16 bg-vermilion px-6 py-20 text-cream md:py-28"><div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-20"><div><Marigold className="mb-5 w-16 animate-floaty" /><Label n="03">MEET US HERE</Label><h2 className="font-display text-6xl leading-none md:text-7xl">Our place.<br /><span className="font-script text-marigold">Your people.</span></h2><p className="mt-7 max-w-sm leading-7">Come for the lights. Stay for the company.<br />We’ll keep the mithai ready.</p></div><div className="self-center border-y border-cream/30 py-7"><MapPin className="mb-5 h-6 w-6 text-marigold" /><p className="font-display text-3xl">{EVENT.venueName}</p><p className="mt-3 leading-7 text-cream/85">{EVENT.venueAddress}</p><p className="mt-6 text-sm">{EVENT.date} · {EVENT.time}</p><div className="mt-7 flex flex-wrap gap-3"><Button asChild variant="invitation" size="invitation" className="border-marigold bg-marigold text-ink"><a href={mapsUrl(`${EVENT.venueName}, ${EVENT.venueAddress}`)} target="_blank" rel="noreferrer">Get directions<ArrowUpRight /></a></Button><Button asChild variant="invitation" size="invitation" className="border-cream/40 text-cream"><a href={calendarUrl()} target="_blank" rel="noreferrer"><CalendarPlus />Save the date</a></Button></div></div></div></section>;
}

type Post = { id: string; name: string; text: string; at: number; tone: number };
const TONES = ["bg-marigold text-ink", "bg-pink text-cream", "bg-cream text-ink", "bg-emerald text-cream", "bg-saffron text-ink"];
export function GossipWall() {
  const [posts, setPosts] = useLocal<Post[]>(GOSSIP_KEY, []);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = text.trim(); if (!t) return;
    setPosts([{ id: crypto.randomUUID(), name: name.trim().slice(0, 30) || "Anonymous", text: t.slice(0, 200), at: Date.now(), tone: Math.floor(Math.random() * TONES.length) }, ...posts]);
    setText("");
  };
  return <section id="gossip" className="scroll-mt-16 bg-cream px-6 pt-20 md:pt-28"><div className="mx-auto max-w-6xl"><Label n="04" tone="text-pink">A NOTE BEFORE THE NIGHT</Label><h2 className="font-display text-6xl leading-none md:text-7xl">Between <span className="font-script text-pink">friends.</span></h2><p className="mt-5 text-muted-foreground">A little gossip. A sweet thought. Who’s bringing the kaju katli?</p><form onSubmit={submit} className="mt-9 grid gap-4 md:grid-cols-[12rem_1fr_auto]"><input value={name} onChange={e => setName(e.target.value)} maxLength={30} placeholder="Your name" aria-label="Your name" className="note-input" /><input value={text} onChange={e => setText(e.target.value)} maxLength={200} placeholder="Leave a little note…" aria-label="Your gossip" className="note-input" /><Button type="submit" variant="invitation" size="invitation" className="border-ink bg-marigold text-ink">Leave a note<Plus /></Button></form><p className="mt-4 text-xs leading-5 text-muted-foreground">Notes stay in this browser, on this device—not on a shared guest wall.</p><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{posts.map(p => <article key={p.id} className={`folk-note rounded-md p-6 ${TONES[p.tone] ?? TONES[0]}`}><p className="font-script text-2xl leading-7">“{p.text}”</p><div className="mt-6 flex items-center justify-between gap-4 text-xs"><span>— {p.name}</span><Button onClick={() => setPosts(posts.filter(x => x.id !== p.id))} variant="ghost" size="icon" aria-label={`Remove note from ${p.name}`} title="Remove note" className="text-current hover:bg-ink/10 hover:text-current"><Trash2 /></Button></div></article>)}</div></div><footer className="mx-auto mt-20 flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-ink/20 py-7"><span className="font-script text-2xl text-vermilion">With love, from all three of us.</span><span className="eyebrow text-muted-foreground">SHUBH DEEPAVALI ✦</span></footer></section>;
}
