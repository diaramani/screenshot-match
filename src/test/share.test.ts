import { describe, expect, it } from "vitest";
import { SHARE_ITEMS, guestToken } from "@/lib/share";

describe("The sharing table", () => {
  it("offers one clear thing per row, named once each", () => {
    expect(SHARE_ITEMS.length).toBeGreaterThan(3);
    expect(new Set(SHARE_ITEMS.map((item) => item.name)).size).toBe(SHARE_ITEMS.length);
  });

  it("only offers items the database will accept", () => {
    for (const item of SHARE_ITEMS) {
      expect(item.name.length).toBeGreaterThan(0);
      expect(item.name.length).toBeLessThanOrEqual(60);
    }
  });
});

describe("A guest's device key", () => {
  it("is created once and long enough for the database to accept", () => {
    const first = guestToken();
    expect(first.length).toBeGreaterThanOrEqual(16);
    expect(guestToken()).toBe(first);
  });
});
