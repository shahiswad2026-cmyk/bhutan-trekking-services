import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { getArt, GRADE_ORDER, type Trek } from "@/lib/content";
import { Photo } from "./Photo";
import { Button } from "@/components/ui/button";

type SortKey = "days" | "grade";

export function TrekChooser({ list }: { list: Trek[] }) {
  const [sort, setSort] = useState<SortKey>("days");
  const sorted = useMemo(
    () =>
      [...list].sort((a, b) =>
        sort === "days"
          ? a.facts.days.value - b.facts.days.value
          : GRADE_ORDER.indexOf(a.facts.grade.value) - GRADE_ORDER.indexOf(b.facts.grade.value) ||
            a.facts.days.value - b.facts.days.value,
      ),
    [list, sort],
  );

  return (
    <div>
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 sm:flex">
        <span className="eyebrow text-muted-foreground">Sort</span>
        <div role="group" aria-label="Sort treks" className="grid min-w-0 grid-cols-2 border border-border sm:inline-flex">
        {(
          [
            ["days", "Shortest first"],
            ["grade", "Gentlest first"],
          ] as const
        ).map(([k, label]) => (
          <Button
            key={k}
            type="button"
            aria-pressed={sort === k}
            onClick={() => setSort(k)}
            className={`h-11 min-w-0 rounded-none border-0 px-3 font-mono text-[0.66rem] font-normal uppercase tracking-[0.08em] shadow-none first:border-r first:border-border sm:px-4 ${
              sort === k 
                ? "bg-foreground text-background hover:bg-foreground" 
                : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {label}
          </Button>
        ))}
        </div>
      </div>

      <div className="mt-8 hidden grid-cols-12 gap-4 border-b border-foreground pb-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground md:grid">
        <span className="col-span-5">Trek</span>
        <span className="col-span-1 text-right">Days</span>
        <span className="col-span-2">Grade</span>
        <span className="col-span-2">Highest point</span>
        <span className="col-span-2">Season</span>
      </div>
      <ol className="mt-4 border-t border-foreground md:mt-0 md:border-t-0">
        {sorted.map((t) => {
          const a = getArt(t.slug);
          const altNote = t.verificationNotes.some((n) => n.field === "maxAltitude");
          return (
            <li key={t.slug} className="border-b border-rule transition-colors hover:bg-card/70 focus-within:bg-card/70">
              <Link
                to="/treks/$slug"
                params={{ slug: t.slug }}
                className="group grid grid-cols-[5.5rem_minmax(0,1fr)] gap-4 py-5 md:grid-cols-12 md:items-center md:px-2 md:py-5"
              >
                <div className="md:hidden">
                  <Photo
                    file={a.hero}
                    alt=""
                    focus={a.focus}
                    className="aspect-square w-full"
                  />
                </div>
                <div className="min-w-0 md:col-span-5 md:flex md:items-center md:gap-6">
                  <div className="hidden shrink-0 md:block">
                    <Photo
                      file={a.hero}
                      alt=""
                      focus={a.focus}
                      className="aspect-[4/3] w-24 [&_img]:transition-transform [&_img]:duration-500 group-hover:[&_img]:scale-[1.035]"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-2xl leading-tight group-hover:underline group-hover:decoration-accent group-hover:decoration-2 group-hover:underline-offset-4 md:text-[1.6rem]">
                      {t.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground md:max-w-xs">{a.tagline}</p>
                    <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 font-mono text-[0.65rem] md:hidden">
                      <div><dt className="text-muted-foreground">Duration</dt><dd className="mt-0.5 text-foreground">{t.facts.days.value} days</dd></div>
                      <div><dt className="text-muted-foreground">Difficulty</dt><dd className="mt-0.5 text-foreground">{t.facts.grade.value}</dd></div>
                      <div><dt className="text-muted-foreground">Highest point</dt><dd className="mt-0.5 text-foreground">{t.facts.maxAltitude.value}{altNote ? "*" : ""}</dd></div>
                      <div><dt className="text-muted-foreground">Season</dt><dd className="mt-0.5 text-foreground">{t.facts.bestSeason.value}</dd></div>
                    </dl>
                  </div>
                </div>
                <span className="hidden text-right font-mono text-lg md:col-span-1 md:block">{t.facts.days.value}</span>
                <div className="hidden md:col-span-2 md:block">
                  <GradeMark grade={t.facts.grade.value} />
                </div>
                <span className="hidden font-mono md:col-span-2 md:block">
                  {t.facts.maxAltitude.value}
                  {altNote && <span title="Figure as published; being re-checked" className="text-accent">*</span>}
                </span>
                <span className="hidden text-sm text-muted-foreground md:col-span-2 md:block">{t.facts.bestSeason.value}</span>
              </Link>
            </li>
          );
        })}
      </ol>
      {sorted.some((t) => t.verificationNotes.some((n) => n.field === "maxAltitude")) && (
        <p className="mt-4 font-mono text-[0.65rem] text-muted-foreground">* Figure as published by the operator; being re-checked.</p>
      )}
    </div>
  );
}

export function GradeMark({ grade }: { grade: string }) {
  const i = GRADE_ORDER.indexOf(grade);
  return (
    <span className="inline-flex items-center gap-2" aria-label={`Difficulty: ${grade}`}>
      <span aria-hidden="true" className="flex gap-[3px]">
        {GRADE_ORDER.map((g, n) => (
          <span key={g} className={`h-3 w-[5px] ${n <= i ? "bg-foreground" : "bg-rule"}`} />
        ))}
      </span>
      <span className="text-xs uppercase tracking-wider">{grade}</span>
    </span>
  );
}
