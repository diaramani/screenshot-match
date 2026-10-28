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