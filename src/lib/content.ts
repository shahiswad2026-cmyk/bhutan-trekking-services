import { z } from "zod";
import treksRaw from "@/data/treks.json";
import mediaRaw from "@/data/media.json";
import artRaw from "@/data/art.json";
import siteRaw from "@/data/site.json";
import departuresRaw from "@/data/departures.json";

/* ---------- Schemas: the build fails if the data files drift ---------- */
const Verification = z.enum(["verified", "as-stated", "conflict", "missing"]);
const Fact = <T extends z.ZodTypeAny>(v: T) =>
  z.object({ value: v, verification: Verification, source: z.string().url() });

const Day = z.object({
  day: z.number().int().positive(),
  title: z.string().min(1),
  description: z.string(),
  chipsAsPrinted: z.string(),
  distanceKm: z.string().nullable(),
  walkingTime: z.string().nullable(),
  altitudeFigures: z.array(z.number().int().min(1000).max(9000)),
  tags: z.array(z.string()),
});

const Trek = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  featured: z.boolean(),
  title: z.string(),
  subtitle: z.string(),
  sourceUrl: z.string().url(),
  oldPath: z.string().startsWith("/treks/show/"),
  facts: z.object({
    days: Fact(z.number().int()),
    grade: Fact(z.string()),
    maxAltitude: Fact(z.string()),
    bestSeason: Fact(z.string()),
    style: Fact(z.string()),
  }),
  overview: z.array(z.string()),
  highlights: z.array(z.string()),
  days: z.array(Day).min(1),
  included: z.array(z.string()),
  excluded: z.array(z.string()),
  heroImage: z.string(),
  gallery: z.array(z.string()),
  verificationNotes: z.array(z.object({ field: z.string(), verification: Verification, note: z.string() })),
});

const Asset = z.object({
  originalFilename: z.string(),
  originalUrl: z.string().url(),
  sourcePages: z.array(z.string().url()).min(1),
  alt: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  originalBytes: z.number().int(),
  webBytes: z.number().int(),
  src: z.string().startsWith("/media/"),
  isMaster: z.literal(false),
  rights: z.enum(["pending-client-confirmation", "confirmed", "do-not-use"]),
  credit: z.string(),
});

const Art = z.object({
  tagline: z.string(),
  region: z.string(),
  layout: z.enum(["band", "split", "split-reverse", "portrait", "panorama", "inset", "dark"]),
  hero: z.string(),
  heroMobile: z.string(),
  focus: z.string(),
  tint: z.string(),
});

export const DepartureSchema = z.object({
  id: z.string(),
  trekSlug: z.string(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  status: z.enum(["open", "closed"]),
  statusNote: z.string().optional(),
  publishedAt: z.string(),
  source: z.string(),
  verification: Verification,
});

export type Trek = z.infer<typeof Trek>;
export type Day = z.infer<typeof Day>;
export type Asset = z.infer<typeof Asset>;
export type Art = z.infer<typeof Art>;
export type Departure = z.infer<typeof DepartureSchema>;

export const treks: Trek[] = z.array(Trek).parse(treksRaw);
export const media: Record<string, Asset> = z.record(z.string(), Asset).parse(mediaRaw);
const { _note: _ignored, ...artOnly } = artRaw as Record<string, unknown>;
export const art: Record<string, Art> = z.record(z.string(), Art).parse(artOnly);
export const site = siteRaw;

/* Only client-verified departures are ever rendered publicly. Max eight. */
export const departures: Departure[] = z
  .array(DepartureSchema)
  .max(8)
  .parse(departuresRaw)
  .filter((d) => d.verification === "verified")
  .sort((a, b) => a.startDate.localeCompare(b.startDate));

/* Integrity checks */
for (const t of treks) {
  const a = art[t.slug];
  if (!a) throw new Error(`Missing art direction for ${t.slug}`);
  for (const f of [t.heroImage, a.hero, a.heroMobile, ...t.gallery])
    if (!media[f]) throw new Error(`Missing media ${f} for ${t.slug}`);
}
for (const d of departures)
  if (!treks.some((t) => t.slug === d.trekSlug)) throw new Error(`Departure ${d.id} → unknown trek`);

export const featuredTreks = treks.filter((t) => t.featured);
export const variantTreks = treks.filter((t) => !t.featured);
export const getTrek = (slug: string) => treks.find((t) => t.slug === slug);
export const getArt = (slug: string): Art => {
  const a = art[slug];
  if (!a) throw new Error(`Missing art for ${slug}`);
  return a;
};
export const img = (f: string) => {
  const m = media[f];
  if (!m) throw new Error(`Unknown media ${f}`);
  return m;
};

export const GRADE_ORDER = ["Easy", "Moderate", "Challenging", "Strenuous", "Expert"];

/** A day is "explorable" only if the old page printed at least one figure for it. */
export const hasFigures = (d: Day) => !!(d.distanceKm || d.walkingTime || d.altitudeFigures.length);

export function whatsappHref(opts: { trekTitle?: string | undefined; days?: number | undefined; departure?: Departure | undefined; pageUrl?: string | undefined } = {}) {
  const lines = ["Hello Bhutan Trekking Services,"];
  if (opts.trekTitle) lines.push(`I'd like to ask about the ${opts.trekTitle}${opts.days ? ` (${opts.days} days)` : ""}.`);
  else lines.push("I'd like to ask about a trek in Bhutan.");
  if (opts.departure) lines.push(`Departure: ${opts.departure.startDate} to ${opts.departure.endDate}.`);
  lines.push("Preferred dates: ", "Group size: ");
  if (opts.pageUrl) lines.push(`(Sent from ${opts.pageUrl})`);
  return `https://wa.me/${site.whatsapp.value}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export const SITE_URL = "https://bhutantrekkings.com";
export const variantOf = (slug: string) => (slug.startsWith("snowman-trek-") ? "snowman-trek" : null);

export const fmtDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
