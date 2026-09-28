import { createFileRoute, Link } from "@tanstack/react-router";
import { featuredTreks, variantTreks } from "@/lib/content";
import { TrekChooser } from "@/components/site/TrekChooser";

const TITLE = "Treks in Bhutan — compare seven camping treks · Bhutan Trekking Services";
const DESC = "Compare Bhutan treks by days, grade and season: Bumdra, Druk Path, Dagala, Jomolhari Round, Soi Yaksa, Laya–Lingzhi and the Snowman.";

export const Route = createFileRoute("/treks/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TreksIndex,
});

function TreksIndex() {
  return (
    <main id="main" className="mx-auto max-w-[88rem] px-5 pb-20 pt-12 md:px-10 md:pt-24">
      <p className="eyebrow text-muted-foreground">Treks</p>
      <h1 className="mt-5 max-w-4xl text-5xl font-light leading-[0.98] md:text-7xl lg:text-8xl">Choose by days and grade.</h1>
      <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
        Every trek is a full camping expedition with a cook, crew and pack horses. Private departures, tailored to your dates.
      </p>
      <div className="mt-16"><TrekChooser list={featuredTreks} /></div>

      <section className="mt-28 border-t border-foreground pt-16">
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-5xl">Snowman route variants</h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Three alternative Snowman itineraries, each with its own day plan. Shown separately so no route is merged into another.
          </p>
        </div>
        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {variantTreks.map((t) => (
            <li key={t.slug} className="border-t border-rule pt-6">
              <Link to="/treks/$slug" params={{ slug: t.slug }} className="group block">
                <span className="font-display text-2xl group-hover:underline group-hover:decoration-accent transition-colors">{t.title}</span>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground">
                  <span className="text-foreground">{t.facts.days.value} days</span>
                  <span>{t.facts.grade.value}</span>
                  <span>{t.facts.maxAltitude.value}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
