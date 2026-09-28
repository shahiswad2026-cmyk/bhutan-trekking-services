import { useRef, useState } from "react";
import { hasFigures, type Trek, type Day } from "@/lib/content";

const nf = new Intl.NumberFormat("en-GB");

function shortName(title: string) {
  const parts = title.split(" — ");
  return (parts[parts.length - 1] ?? title).replace(/\(.*?\)/g, "").trim();
}

function Figures({ d }: { d: Day }) {
  const rows: [string, string][] = [
    ["Distance", d.distanceKm ? `${d.distanceKm} km` : "Not verified"],
    ["Walking time", d.walkingTime ?? "Not verified"],
    [
      d.altitudeFigures.length > 1 ? "Altitudes printed" : "Altitude printed",
      d.altitudeFigures.length ? d.altitudeFigures.map((a) => `${nf.format(a)} m`).join(" · ") : "Not verified",
    ],
  ];
  return (
    <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-3">
      {rows.map(([k, v]) => (
        <div key={k} className="border-t border-rule pt-2">
          <dt className="eyebrow text-muted-foreground">{k}</dt>
          <dd className={`mt-1 font-mono text-lg ${v === "Not verified" ? "text-muted-foreground" : ""}`}>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function Detail({ d }: { d: Day }) {
  return (
    <div className="space-y-4">
      <p className="font-display text-2xl leading-snug md:text-3xl">
        <span className="mr-3 font-mono text-base text-muted-foreground">Day {d.day}</span>
        {d.title}
      </p>
      <Figures d={d} />
      {d.altitudeFigures.length > 0 && (
        <p className="text-sm text-muted-foreground">
          The previous itinerary page prints this figure without saying whether it is the camp or a pass crossed that day.
        </p>
      )}
    </div>
  );
}

/**
 * Schematic stop-by-stop explorer. Evenly spaced — NOT to scale, NOT a map, NO elevation curve.
 * Only days with at least one printed figure are interactive.
 */
export function RouteExplorer({ trek }: { trek: Trek }) {
  const walkDays = trek.days.filter(hasFigures);
  const [sel, setSel] = useState<number>(walkDays[0]?.day ?? -1);
  const refs = useRef<Record<number, HTMLButtonElement | null>>({});

  if (walkDays.length < 2) {
    return (
      <div className="border border-border p-6">
        <p className="eyebrow text-muted-foreground">Route explorer</p>
        <p className="mt-3 max-w-prose">
          The previous site doesn't publish enough day-by-day distances, times or altitudes for this trek to build a
          stop explorer. The full itinerary below is shown exactly as published.
        </p>
      </div>
    );
  }

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (e.key === "Home" || e.key === "End" || dir) {
      e.preventDefault();
      const n = e.key === "Home" ? 0 : e.key === "End" ? walkDays.length - 1 : (i + dir + walkDays.length) % walkDays.length;
      const d = walkDays[n];
      if (!d) return;
      setSel(d.day);
      refs.current[d.day]?.focus();
    }
  };
  const current = (walkDays.find((d) => d.day === sel) ?? walkDays[0])!;

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="eyebrow text-muted-foreground">Schematic · not to scale · not a map</p>
        <p className="font-mono text-xs text-muted-foreground">
          {walkDays.length} of {trek.days.length} days have printed figures
        </p>
      </div>

      <ol role="list" aria-label={`${trek.title} — days with published figures`} className="relative mt-6 md:flex md:overflow-x-auto md:pb-4">
        <span aria-hidden="true" className="absolute left-[0.6rem] top-2 bottom-2 w-px bg-rule md:left-0 md:right-0 md:top-[0.6rem] md:bottom-auto md:h-px md:w-auto" />
        {walkDays.map((d, i) => {
          const active = d.day === current.day;
          return (
            <li key={d.day} className="relative md:min-w-[9.5rem] md:flex-1">
              <button
                ref={(el) => {
                  refs.current[d.day] = el;
                }}
                type="button"
                aria-pressed={active}
                aria-controls={`stop-detail-${trek.slug}`}
                tabIndex={active ? 0 : -1}
                onClick={() => setSel(d.day)}
                onKeyDown={(e) => onKey(e, i)}
                className="group flex w-full items-start gap-4 py-3 pr-2 text-left md:flex-col md:gap-3 md:py-0"
              >
                <span
                  aria-hidden="true"
                  className={`relative z-10 mt-1 h-[1.2rem] w-[1.2rem] shrink-0 rounded-full border-2 transition-colors md:mt-0 ${
                    active ? "border-accent bg-accent" : "border-foreground bg-background group-hover:bg-muted"
                  }`}
                />
                <span className="min-w-0">
                  <span className="block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">Day {d.day}</span>
                  <span className={`block font-display text-lg leading-tight md:text-xl ${active ? "" : "text-foreground/80"}`}>
                    {shortName(d.title)}
                  </span>
                </span>
              </button>
              {active && (
                <div className="mb-4 ml-9 border-l-2 border-accent pl-4 md:hidden">
                  <Figures d={d} />
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <div id={`stop-detail-${trek.slug}`} aria-live="polite" className="mt-8 hidden bg-tint p-6 md:block md:p-8">
        <Detail d={current} />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Distances, times and altitudes appear only where the operator's previous itinerary printed them. Nothing is
        estimated or interpolated. A measured elevation profile or geographic map needs verified stop data first.
      </p>
    </div>
  );
}
