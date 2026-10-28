// Edit your party details here — every section of the site reads from this file.
export const EVENT = {
  host: "Vartika",
  eventName: "Diwali at My Place",
  date: "Sunday, 8 November 2026",
  time: "7:00 PM onwards",
  // ISO start/end used for the "Add to calendar" button
  startISO: "20261108T133000Z",
  endISO: "20261108T183000Z",
  dressCode: "Desi festive — pick a colour, own the scene",
  rsvpBy: "Saturday, 31 October 2026",
  rsvpContact: "WhatsApp +91 00000 00000 (placeholder)",
  rsvpWhatsApp: "910000000000", // placeholder number, digits only
  venueName: "[Venue name placeholder]",
  venueAddress: "[Full address placeholder — street, area, city, PIN]",
};

export const mapsUrl = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export const calendarUrl = () =>
  `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    EVENT.eventName,
  )}&dates=${EVENT.startISO}/${EVENT.endISO}&details=${encodeURIComponent(
    "Hosted by " + EVENT.host + ". Dress code: " + EVENT.dressCode,
  )}&location=${encodeURIComponent(EVENT.venueName + ", " + EVENT.venueAddress)}`;
