import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowUpRight, CalendarPlus, Check, MapPin, Plus, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRING_OPTIONS, EVENT, RSVP_ANSWERS, calendarUrl, rsvpMessage, whatsappUrl, type RsvpAnswer } from "@/lib/event";
import peacockArt from "@/assets/invite-art-7.png.asset.json";
import floralArt from "@/assets/invite-art-9.png.asset.json";
import lotusArt from "@/assets/invite-art-10.png.asset.json";
import { Marigold, MiniDiya, Sparkle } from "./Art";
import { diyaListOptions, extinguishDiya, lightDiya } from "@/lib/share";

const NAME_KEY = "diwali-guest-name";

/** The guest's name: remembered on this device so they only type it once. */
function useGuestName() {
  const [name, setName] = useState("");
  useEffect(() => {
    setName(window.localStorage.getItem(NAME_KEY) ?? "");
  }, []);
  const commit = (v: string) => {
    try {
      window.localStorage.setItem(NAME_KEY, v);
    } catch {}
  };
  return { name, setName, commit };
}

/** Row ids this device created, so the page can mark them as yours. */
function useMine(key: string) {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) setIds(JSON.parse(raw) as string[]);
    } catch {}
  }, [key]);
  const save = (next: string[]) => {
    setIds(next);
    try {
      window.localStorage.setItem(key, JSON.stringify(next));
    } catch {}
  };
  return { ids, save };
}

function Label({ n, children, tone = "text-marigold" }: { n: string; children: ReactNode; tone?: string }) {
  return <p className={`eyebrow mb-7 flex items-center gap-4 ${tone}`}><span>{n}</span><span className="h-px w-8 bg-current opacity-50" />{children}</p>;
}

export function Nav() {
  return <nav className="sticky top-0 z-40 border-b border-ink/15 bg-cream"><div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-4 sm:gap-4 sm:px-5"><span className="shrink-0 font-script text-base text-vermilion sm:text-xl">Diwali at ours.</span><div className="flex gap-0 sm:gap-4">{[["invite", "Invite"], ["rsvp", "RSVP"], ["venue", "The place"], ["diya", "The diyas"]].map(([id, label]) => <Button key={id} asChild variant="ghost" className="h-8 px-2 text-xs hover:bg-marigold/20"><a href={`#${id}`}>{label}</a></Button>)}</div></div></nav>;
}

export function Invite() {
  const wa = whatsappUrl(`Hi! Count me in for ${EVENT.eventName}!`);
  return <section id="invite" className="art-cover scroll-mt-16 bg-emerald px-6 py-20 text-cream md:py-28" style={{ backgroundImage: `url(${lotusArt.url})` }}><div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[1.1fr_1fr] md:gap-20">
    <div className="relative"><Marigold className="mb-5 w-16 animate-spin-slow" /><Label n="01">THE INVITATION</Label><h2 className="font-display text-6xl leading-none md:text-7xl">You better<br /><span className="font-script text-marigold">be there.</span></h2><p className="mt-7 max-w-sm leading-7 text-cream/85">Three friends, one celebration, and a place for you. Come dressed up, stay for seconds, and make a night of it.</p><p className="mt-7 font-script text-2xl text-marigold">The best part is who’s around the table.</p></div>
    <div className="self-center"><dl>{[["WHEN", EVENT.date], ["FROM", EVENT.time], ["WEAR", EVENT.dressCode]].map(([k, v]) => <div key={k} className="grid grid-cols-[4rem_1fr] gap-5 border-b border-cream/25 py-5"><dt className="eyebrow pt-1 text-marigold">{k}</dt><dd className="text-base leading-6">{v}</dd></div>)}</dl>
      <Button asChild variant="invitation" size="invitation" className="mt-7 w-full border-marigold bg-marigold text-ink"><a href="#rsvp">Count me in<ArrowUpRight /></a></Button>
      <div className="mt-4 flex flex-wrap gap-3"><Button asChild variant="invitation" size="invitation" className="border-cream/40 text-cream"><a href={calendarUrl()} target="_blank" rel="noreferrer"><CalendarPlus />Save the date</a></Button><Button asChild variant="ghost" size="invitation" className="text-cream hover:bg-cream/10 hover:text-cream"><a href="#venue">The place<ArrowUpRight /></a></Button></div>
      <p className="mt-4 text-sm leading-6 text-cream/80">Prefer to text? <a href={wa} target="_blank" rel="noreferrer" className="text-marigold underline">Send us a message</a> · {EVENT.rsvpContact}</p>
    </div>
  </div></section>;
}

export function Rsvp() {
  const { name, setName, commit } = useGuestName();
  const [answer, setAnswer] = useState<RsvpAnswer>("yes");
  const [bringing, setBringing] = useState<string>(BRING_OPTIONS[0] ?? "");
  const [other, setOther] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim().slice(0, 40);
    if (!trimmed) { setError("Your name first, please."); return; }
    commit(trimmed);
    setError(null);
    const item = bringing === "Something else" ? other.trim().slice(0, 60) : bringing;
    window.open(whatsappUrl(rsvpMessage({ name: trimmed, answer, bringing: item, note: note.slice(0, 200) })), "_blank", "noopener");
  };
  return <><div className="overflow-hidden border-y-2 border-ink bg-marigold py-3"><div className="flex w-max animate-marquee whitespace-nowrap font-script text-2xl" aria-hidden="true">{Array.from({ length: 4 }, (_, i) => <span key={i} className="pr-8">a little mithai ✦ a lot of sparkle ✦ your favourite people ✦ Diwali at ours ✦ </span>)}</div></div>
  <section id="rsvp" className="scroll-mt-16 bg-cream px-4 py-14 text-ink md:py-20"><div className="art-panel mx-auto max-w-2xl" style={{ backgroundImage: `url(${floralArt.url})` }}>
    <Label n="02" tone="text-vermilion">THE RSVP</Label><h2 className="font-display text-5xl leading-none md:text-6xl">Tell us<br /><span className="font-script text-pink">you’re coming.</span></h2>
    <form onSubmit={submit} className="mt-8 grid gap-5 text-left">
      <label className="grid gap-2 text-sm font-semibold">Your name<input value={name} onChange={(e) => setName(e.target.value.slice(0, 40))} maxLength={40} placeholder="Your name" className="note-input" /></label>
      <fieldset className="grid gap-2"><legend className="mb-2 text-sm font-semibold">Are you coming?</legend><div className="flex flex-wrap gap-2">{RSVP_ANSWERS.map((o) => <Button key={o.value} type="button" onClick={() => setAnswer(o.value)} aria-pressed={answer === o.value} variant="invitation" className={answer === o.value ? "border-vermilion bg-vermilion text-cream" : "border-ink text-ink"}>{answer === o.value && <Check />}{o.label}</Button>)}</div></fieldset>
      {answer !== "no" && <label className="grid gap-2 text-sm font-semibold">Bringing anything?<select value={bringing} onChange={(e) => setBringing(e.target.value)} className="note-input">{BRING_OPTIONS.map((o) => <option key={o}>{o}</option>)}</select></label>}
      {answer !== "no" && bringing === "Something else" && <input value={other} onChange={(e) => setOther(e.target.value.slice(0, 60))} maxLength={60} placeholder="What are you bringing?" aria-label="What are you bringing?" className="note-input" />}
      <label className="grid gap-2 text-sm font-semibold">Anything else? <span className="font-normal text-muted-foreground">(optional)</span><textarea value={note} onChange={(e) => setNote(e.target.value.slice(0, 200))} maxLength={200} rows={2} className="note-input" /></label>
      {error && <p className="text-sm text-vermilion">{error}</p>}
      <Button type="submit" variant="invitation" size="invitation" className="w-full border-ink bg-marigold text-ink"><Send />Send on WhatsApp</Button>
      <p className="text-center text-xs leading-5 text-muted-foreground">Opens WhatsApp with your reply already typed — just hit send.</p>
    </form>
  </div></section></>;
}

export function Venue() {
  return <section id="venue" className="scroll-mt-16 bg-blush px-4 py-14 text-ink md:py-20"><div className="art-panel art-panel-peacock mx-auto max-w-xl" style={{ backgroundImage: `url(${peacockArt.url})` }}>
    <Marigold className="mx-auto mb-5 w-14 animate-floaty" /><Label n="03" tone="text-vermilion">MEET US HERE</Label><h2 className="font-display text-5xl leading-none md:text-6xl">Our place.<br /><span className="font-script text-vermilion">Your people.</span></h2><p className="mx-auto mt-6 max-w-xs leading-7">Come for the lights. Stay for the company. We’ll keep the mithai ready.</p>
    <MapPin className="mx-auto mt-8 h-6 w-6 text-vermilion" /><p className="mt-3 font-display text-3xl">{EVENT.venueName}</p><p className="mt-3 text-sm">{EVENT.date} · {EVENT.time}</p>
    <div className="mt-7 flex flex-wrap justify-center gap-3"><Button asChild variant="invitation" size="invitation" className="border-ink bg-marigold text-ink"><a href={EVENT.mapsLink} target="_blank" rel="noreferrer">Get directions<ArrowUpRight /></a></Button><Button asChild variant="invitation" size="invitation" className="border-ink text-ink"><a href={calendarUrl()} target="_blank" rel="noreferrer"><CalendarPlus />Save the date</a></Button></div>
  </div></section>;
}

export function DiyaWall() {
  const queryClient = useQueryClient();
  const { name, setName, commit } = useGuestName();
  const { ids: mine, save: saveMine } = useMine("diwali-my-diyas");
  const { data: diyas = [] } = useQuery(diyaListOptions);
  const [note, setNote] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const mineRow = diyas.find((d) => mine.includes(d.id));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim().slice(0, 40);
    if (!trimmed) {
      setNote("Your name first, please.");
      nameRef.current?.focus();
      return;
    }
    commit(trimmed);
    try {
      if (mineRow) {
        await extinguishDiya(mineRow.id);
        saveMine(mine.filter((id) => id !== mineRow.id));
      } else {
        saveMine([...mine, await lightDiya(trimmed)]);
      }
      setNote(null);
      queryClient.invalidateQueries({ queryKey: ["diyas"] });
    } catch {
      setNote("That didn’t save. Try once more.");
    }
  };

  const count = diyas.length;
  return <section id="diya" className="art-cover scroll-mt-16 bg-emerald px-6 py-20 text-cream md:py-28" style={{ backgroundImage: `url(${lotusArt.url})` }}><div className="mx-auto max-w-6xl"><div className="grid gap-12 md:grid-cols-[1.05fr_1fr] md:gap-20"><div><Marigold className="mb-5 w-16 animate-spin-slow" /><Label n="04">BEFORE THE NIGHT</Label><h2 className="font-display text-6xl leading-none md:text-7xl">Light a<br /><span className="font-script text-marigold">diya.</span></h2><p className="mt-7 max-w-sm leading-7 text-cream/85">Say you’re coming and your name goes on the row. One diya each — the more of you, the brighter the night.</p><form onSubmit={submit} className="mt-8 flex flex-wrap items-center gap-3"><input ref={nameRef} value={name} onChange={(e) => setName(e.target.value.slice(0, 40))} maxLength={40} placeholder="Your name" aria-label="Your name" className="note-input w-full max-w-xs" /><Button type="submit" variant="invitation" size="invitation" className="border-marigold bg-marigold text-ink">{mineRow ? <>Put mine out<X /></> : <>Light my diya<Plus /></>}</Button></form>{note && <p className="mt-3 text-sm text-marigold">{note}</p>}<p className="mt-5 text-sm text-cream/80">{count} {count === 1 ? "diya" : "diyas"} lit so far · {EVENT.date}</p></div>
    <ul className="flex flex-wrap content-start gap-x-6 gap-y-8 self-center border-y border-cream/30 py-9">{count === 0 && <li className="font-script text-2xl leading-8 text-cream/70">No diyas yet — be the first to light one.</li>}{diyas.map((d, i) => <li key={d.id} className="animate-rise w-20 text-center" style={{ animationDelay: `${Math.min(i, 14) * 70}ms` }}><MiniDiya className="mini-diya mx-auto w-14" /><span className="mt-1 block truncate font-script text-lg leading-5">{mine.includes(d.id) ? "You" : d.name}</span></li>)}</ul>
  </div><footer className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-cream/30 py-7"><span className="font-script text-2xl text-marigold">With love, from all three of us.</span><span className="eyebrow text-cream/70">SHUBH DEEPAVALI ✦</span></footer></div></section>;
}
