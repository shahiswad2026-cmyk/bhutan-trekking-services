import { Link } from "@tanstack/react-router";
import { departures, fmtDate, getTrek, whatsappHref } from "@/lib/content";
import { WhatsAppButton } from "./Chrome";

/**
 * Renders the fixed-departure ledger ONLY when client-verified entries exist in departures.json.
 * Status is published by hand — it is not live capacity.
 */
export function Departures({ trekSlug, compact = false }: { trekSlug?: string; compact?: boolean }) {
  const rows = trekSlug ? departures.filter((d) => d.trekSlug === trekSlug) : departures;
  const trek = trekSlug ? getTrek(trekSlug) : undefined;

  if (rows.length === 0) {
    return (
      <div className={`relative border border-foreground/30 bg-card ${compact ? "p-6" : "p-8 md:p-12"}`}>
        <span aria-hidden="true" className="absolute left-0 top-0 h-1 w-16 bg-accent" />
        <p className="eyebrow text-muted-foreground">Fixed departures</p>
        <p className={`mt-4 font-display ${compact ? "text-2xl" : "text-3xl md:text-5xl"} leading-[1.1]`}>
          Ask about upcoming departures.
        </p>
        <p className="mt-5 max-w-prose text-muted-foreground leading-relaxed">
          Every trip runs as a private departure, priced on enquiry and tailored to your dates and group size.
          Fixed group dates will be listed here once they are confirmed.
        </p>
        <WhatsAppButton className="mt-8 w-full sm:w-auto" href={whatsappHref({ trekTitle: trek?.title, days: trek?.facts.days.value })}>
          Ask on WhatsApp
        </WhatsAppButton>
      </div>
    );
  }

  const latest = rows.reduce((a, d) => (d.publishedAt > a ? d.publishedAt : a), "");
  return (
    <div>
      <div className="overflow-x-auto scroll-hint">
        <table className="w-full min-w-[36rem] border-collapse text-left">
          <caption className="sr-only">Fixed departures</caption>
          <thead>
            <tr className="eyebrow border-b border-foreground text-muted-foreground">
              <th scope="col" className="py-4 pr-4 font-normal">Dates</th>
              {!trekSlug && <th scope="col" className="py-4 pr-4 font-normal">Trek</th>}
              <th scope="col" className="py-4 pr-4 font-normal">Status</th>
              <th scope="col" className="py-4 font-normal"><span className="sr-only">Enquire</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rule">
            {rows.map((d) => {
              const t = getTrek(d.trekSlug)!;
              return (
                <tr key={d.id} className="group transition-colors hover:bg-card/30">
                  <td className="py-5 pr-4 font-mono text-sm">{fmtDate(d.startDate)} – {fmtDate(d.endDate)}</td>
                  {!trekSlug && (
                    <td className="py-5 pr-4 font-display text-lg">
                      <Link to="/treks/$slug" params={{ slug: t.slug }} className="hover:text-accent transition-colors underline decoration-transparent hover:decoration-accent underline-offset-4">{t.title}</Link>
                    </td>
                  )}
                  <td className="py-5 pr-4">
                    <span className={`font-mono text-[0.7rem] uppercase tracking-widest ${d.status === "open" ? "text-foreground" : "text-muted-foreground line-through"}`}>
                      {d.status === "open" ? "Open" : "Closed"}
                    </span>
                    {d.statusNote && <span className="ml-3 text-xs text-muted-foreground italic">{d.statusNote}</span>}
                  </td>
                  <td className="py-5 text-right">
                    {d.status === "open" && (
                      <a href={whatsappHref({ trekTitle: t.title, days: t.facts.days.value, departure: d })} target="_blank" rel="noopener noreferrer" className="font-mono text-[0.65rem] uppercase tracking-widest underline decoration-accent underline-offset-8 transition-colors hover:text-accent">
                        Ask about this date
                      </a>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-5 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-muted-foreground">
        Status updated by hand · last updated {fmtDate(latest.slice(0, 10))}
      </p>
    </div>
  );
}
