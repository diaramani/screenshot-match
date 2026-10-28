import { describe, expect, it } from "vitest";
import { EVENT, calendarUrl } from "@/lib/event";

describe("Party details", () => {
  it("takes place on 30 October 2026", () => {
    expect(EVENT.date).toBe("Friday, 30 October 2026");
    expect(EVENT.startISO.slice(0, 8)).toBe("20261030");
  });
  it("starts at 5:30 PM India time in the calendar", () => {
    expect(EVENT.time).toBe("5:30 PM onwards");
    const dates = new URL(calendarUrl()).searchParams.get("dates");
    expect(dates?.split("/")[0]).toBe("20261030T120000Z");
  });
  it("does not attribute the event to an individual host", () => {
    expect(EVENT).not.toHaveProperty("host");
    const details = new URL(calendarUrl()).searchParams.get("details");
    expect(details?.toLowerCase()).not.toContain("hosted by");
  });
});
import { rsvpMessage, whatsappUrl } from "@/lib/event";
describe("RSVP WhatsApp message", () => {
  it("says yes with what they bring", () => {
    const m = rsvpMessage({ name: "Asha", answer: "yes", bringing: "Mithai" });
    expect(m).toContain("count me in");
    expect(m).toContain("I'll bring: Mithai.");
  });
  it("flags a late arrival", () => {
    expect(rsvpMessage({ name: "Asha", answer: "late" })).toContain("I'll be a little late");
  });
  it("a no never lists something to bring", () => {
    const m = rsvpMessage({ name: "Asha", answer: "no", bringing: "Drinks" });
    expect(m).toContain("can't make it");
    expect(m).not.toContain("bring");
  });
  it("opens WhatsApp to the hosts' number", () => {
    expect(whatsappUrl("hi")).toMatch(/^https:\/\/wa\.me\/\d+\?text=hi$/);
  });
  it("shows only the apartment, not a street address", () => {
    expect(EVENT.venueName).toBe("E-2002, Mantri Serenity");
    expect(EVENT).not.toHaveProperty("venueAddress");
  });
});
