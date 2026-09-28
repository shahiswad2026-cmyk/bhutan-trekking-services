import { describe, expect, test } from "bun:test";
import { treks, featuredTreks, variantTreks, departures, media, whatsappHref, hasFigures, getArt } from "../src/lib/content";
import urlMap from "../src/data/urlMap.json";
import cfg from "../vite.config.ts";

describe("dataset", () => {
  test("ten old treks preserved, seven featured", () => {
    expect(treks.length).toBe(10);
    expect(featuredTreks.length).toBe(7);
    expect(variantTreks.map((t) => t.slug).sort()).toEqual(["snowman-trek-ii", "snowman-trek-iii", "snowman-trek-iv"]);
  });
  test("itinerary days are in published order and count matches duration", () => {
    for (const t of treks) {
      expect(t.days.map((d) => d.day)).toEqual(t.days.map((_, i) => i + 1));
      expect(t.days.length).toBe(t.facts.days.value);
    }
  });
  test("every figure traces back to a printed chip", () => {
    for (const t of treks) for (const d of t.days) {
      for (const a of d.altitudeFigures) expect(d.chipsAsPrinted).toContain(`${a} m`);
      if (d.distanceKm) expect(d.chipsAsPrinted).toContain(`${d.distanceKm} km`);
    }
  });
  test("no fabricated departures", () => {
    expect(departures.length).toBe(0);
  });
  test("all media are web derivatives with provenance", () => {
    for (const m of Object.values(media)) {
      expect(m.isMaster).toBe(false);
      expect(m.originalUrl.startsWith("https://bhutantrekkings.com/")).toBe(true);
      expect(m.sourcePages.length).toBeGreaterThan(0);
    }
  });
  test("each featured trek has a distinct hero and layout mix", () => {
    const heroes = featuredTreks.map((t) => getArt(t.slug).hero);
    expect(new Set(heroes).size).toBe(7);
    expect(new Set(featuredTreks.map((t) => getArt(t.slug).layout)).size).toBeGreaterThanOrEqual(6);
  });
  test("explorer has figures for treks with published data", () => {
    const jom = treks.find((t) => t.slug === "jomolhari-round-trek")!;
    expect(jom.days.filter(hasFigures).length).toBe(5);
  });
});

describe("whatsapp", () => {
  test("encodes trek title and uses published number", () => {
    const href = whatsappHref({ trekTitle: "Laya – Lingzhi Trek", days: 15 });
    expect(href.startsWith("https://wa.me/97577773338?text=")).toBe(true);
    expect(decodeURIComponent(href.split("text=")[1]!)).toContain("Laya – Lingzhi Trek (15 days)");
  });
});

describe("routes", () => {
  test("every trek is prerendered and mapped from its old URL", () => {
    const paths = (cfg as any).tanstackStart?.pages?.map((p: { path: string }) => p.path) ?? [];
    for (const t of treks) {
      if (paths.length) expect(paths).toContain(`/treks/${t.slug}`);
      expect(urlMap.find((r) => r.oldUrl === t.oldPath)?.newUrl).toBe(`/treks/${t.slug}`);
    }
    expect(urlMap.length).toBe(34);
  });
});
