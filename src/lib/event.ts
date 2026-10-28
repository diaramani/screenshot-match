// Edit your party details here — every section of the site reads from this file.
export const EVENT = {
  eventName: "Diwali at My Place",
  date: "Friday, 30 October 2026",
  time: "5:30 PM onwards",
  // ISO start/end used for the "Add to calendar" button
  startISO: "20261030T120000Z",
  endISO: "20261030T170000Z",
  dressCode: "Desi festive — pick a colour, own the scene",
  rsvpContact: "WhatsApp +91 00000 00000 (placeholder)",
  rsvpWhatsApp: "910000000000", // placeholder number, digits only
  venueName: "E-2002, Mantri Serenity",
  // Paste the Google Maps share link here; until then directions search the society name.
  mapsLink: "https://www.google.com/maps/search/?api=1&query=Mantri%20Serenity",
};

export const mapsUrl = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export const calendarUrl = () =>
  `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    EVENT.eventName,
  )}&dates=${EVENT.startISO}/${EVENT.endISO}&details=${encodeURIComponent(
    "You better be there. Dress code: " + EVENT.dressCode,
  )}&location=${encodeURIComponent(EVENT.venueName)}`;

export type RsvpAnswer = "yes" | "late" | "no";
export const RSVP_ANSWERS: { value: RsvpAnswer; label: string }[] = [
  { value: "yes", label: "Yes, I’ll be there" },
  { value: "late", label: "Yes, but I’ll be late" },
  { value: "no", label: "Sadly, no" },
];
export const BRING_OPTIONS = ["Nothing this time", "Mithai", "Namkeen", "Drinks", "Ice cream", "Flowers", "Diyas", "Something else"];

/** The pre-typed WhatsApp message a guest sends to the hosts. */
export function rsvpMessage(r: { name: string; answer: RsvpAnswer; bringing?: string; note?: string }) {
  const name = r.name.trim();
  const when = `${EVENT.date}, ${EVENT.time}`;
  const lines = [
    r.answer === "yes"
      ? `Hi! It's ${name} — count me in for Diwali at yours (${when}) 🪔`
      : r.answer === "late"
        ? `Hi! It's ${name} — I'm coming for Diwali at yours (${when}), but I'll be a little late 🪔`
        : `Hi! It's ${name} — sadly I can't make it to Diwali at yours (${when}). Have the best night!`,
  ];
  const bringing = r.bringing?.trim();
  if (r.answer !== "no" && bringing && bringing !== "Nothing this time") lines.push(`I'll bring: ${bringing}.`);
  if (r.note?.trim()) lines.push(r.note.trim());
  return lines.join("\n");
}

export const whatsappUrl = (text: string) => `https://wa.me/${EVENT.rsvpWhatsApp}?text=${encodeURIComponent(text)}`;
