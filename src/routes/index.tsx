import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { featuredTreks, img, variantTreks, whatsappHref } from "@/lib/content";
import { Photo } from "@/components/site/Photo";
import { TrekChooser } from "@/components/site/TrekChooser";
import { Departures } from "@/components/site/Departures";
import { WhatsAppButton } from "@/components/site/Chrome";
import { Button } from "@/components/ui/button";

const TITLE = "Bhutan Trekking Services — camping treks in Bhutan's high country";
const DESC =
  "Small-group camping treks and cultural journeys in Bhutan, run from Thimphu. Compare seven treks from the 4-day Bumdra to the 28-day Snowman.";

export const Route = createFileRoute("/")({
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
  component: Home,
});

const STATS = [
  ["5,470 m", "Highest pass we cross"],
  ["28 days", "Longest traverse"],
  ["100%", "Local guides and crew"],
];
const STEPS = [
  ["Tell us your dates", "Send your rough dates, group size and how hard you want to walk. We suggest a route that fits."],
  ["We tailor the trip", "You get a day-by-day plan and one price covering the SDF, visa, guide, crew and camp."],
  ["We handle the paperwork", "Visa and permits are arranged for you. All you book is your flight into Paro."],
  ["You walk, we carry", "Meet your guide in Paro. Horses and yaks carry the loads; you carry a daypack and a camera."],
];
const FILMS = [
  { id: "kIWam_aTQ2Y", title: "In the Himalayas of Bhutan" },
  { id: "FcknJcIsCBM", title: "Snowman race team" },
];

function Home() {
  const desk = img("IMG_2797.jpg");
  const mob = img("IMG_3849.jpg");
  return (
    <main id="main">
      {/* 1 — Opening: text column + documentary photo, no overlay */}
      <section className="mx-auto grid max-w-[88rem] gap-8 px-5 pb-14 pt-10 md:grid-cols-12 md:gap-12 md:px-10 md:pb-16 md:pt-14">
        <div className="reveal md:col-span-5 md:flex md:flex-col md:justify-end md:pb-6">
          <p className="eyebrow text-muted-foreground">Guide-owned · Thimphu, Bhutan</p>
          <h1 className="mt-5 max-w-[11ch] text-[3.05rem] font-light leading-[0.94] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.25rem]">
            Walk the last Himalayan kingdom.
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            Small-group camping treks and cultural journeys, run by the guides who grew up on these trails.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:flex">
            <Button asChild className="h-11 rounded-none bg-primary px-5 font-mono text-[0.75rem] font-medium uppercase tracking-[0.12em] text-primary-foreground shadow-none hover:bg-accent hover:text-accent-foreground"><a href="#choose">Choose a trek</a></Button>
            <WhatsAppButton variant="line" />
          </div>
        </div>
        <figure className="md:col-span-7">
          <Photo
            file="IMG_2797.jpg"
            alt={desk.alt}
            priority
            className="aspect-[4/5] w-full md:aspect-[16/10] md:max-h-[72vh]"
          />
          <figcaption className="mt-2 grid grid-cols-[minmax(0,1fr)_auto] gap-4 font-mono text-[0.68rem] leading-relaxed text-muted-foreground">
            <span className="min-w-0">{desk.alt}</span>
            <span className="shrink-0 text-right">BTS archive</span>
          </figcaption>
        </figure>
      </section>

      <section aria-label="In numbers" className="border-y border-border">
        <dl className="mx-auto grid max-w-[88rem] grid-cols-3 divide-x divide-border px-5 md:px-10">
          {STATS.map(([v, k]) => (
            <div key={k} className="py-6 pl-3 pr-2 first:pl-0 md:py-9 md:pl-8">
              <dd className="font-mono text-lg leading-none sm:text-xl md:text-3xl">{v}</dd>
              <dt className="mt-2 max-w-[11rem] text-[0.72rem] leading-snug text-muted-foreground md:text-sm">{k}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* 2 — Trek chooser */}
      <section id="choose" className="mx-auto max-w-[88rem] scroll-mt-24 px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <p className="eyebrow text-muted-foreground">Seven treks</p>
            <h2 className="mt-4 text-4xl leading-tight md:text-5xl">From a night on a ridge to a month in Lunana.</h2>
            <p className="mt-6 text-muted-foreground">
              Compare by days and grade. Every trip runs as a private departure, tailored to your dates and group.
            </p>
            <p className="mt-6 text-sm text-muted-foreground">
              Also: the Snowman route variants —{" "}
              {variantTreks.map((t, i) => (
                <span key={t.slug}>
                  <Link to="/treks/$slug" params={{ slug: t.slug }} className="underline decoration-rule underline-offset-4 transition-colors hover:decoration-accent hover:text-accent">
                    {t.title.replace("Snowman Trek ", "").split(" — ")[0]}
                  </Link>
                  {i < variantTreks.length - 1 ? ", " : "."}
                </span>
              ))}
            </p>
          </div>
          <div className="md:col-span-8">
            <TrekChooser list={featuredTreks} />
          </div>
        </div>
      </section>

      {/* 3 — How a camping trek works (client copy) */}
      <section className="bg-card">
        <div className="mx-auto grid max-w-[88rem] gap-12 px-5 py-20 md:grid-cols-12 md:px-10 md:py-28">
          <div className="md:col-span-6 md:pr-8">
            <p className="eyebrow text-muted-foreground">Why Bhutan</p>
            <h2 className="mt-4 max-w-[15ch] text-4xl leading-[1.08] md:text-[3.4rem]">
              There are no tea-houses here. Every trek is a proper camping expedition.
            </h2>
            <p className="mt-6 text-lg">
              Tents, a dining tent, mattresses and a trek cook travel with you, carried by horses and yaks. You walk with
              a daypack. The trails run through rhododendron forest and yak pasture to snow passes above 5,000 metres,
              past villages that see a handful of walkers a year.
            </p>
            <p className="mt-4 text-muted-foreground">
              We are a small, guide-owned company based in Thimphu. Write to us and you reach the people who will be on
              the mountain with you — not a reseller a continent away.
            </p>
            <Link to="/about" className="mt-8 inline-block font-mono text-xs uppercase tracking-wider underline decoration-accent underline-offset-4 transition-colors hover:text-accent">
              About the company
            </Link>
          </div>
          <div className="grid grid-cols-5 gap-2 md:col-span-6 md:gap-3">
            <Photo file="IMG_2910.jpg" className="col-span-5 aspect-[4/3] [&_img]:transition-transform [&_img]:duration-700 hover:[&_img]:scale-[1.02]" credit />
            <Photo file="IMG_2804.jpg" className="col-span-3 aspect-square [&_img]:transition-transform [&_img]:duration-700 hover:[&_img]:scale-[1.02]" />
            <Photo file="IMG_3271.jpg" className="col-span-2 aspect-[3/4] [&_img]:transition-transform [&_img]:duration-700 hover:[&_img]:scale-[1.02]" />
          </div>
        </div>
      </section>

      {/* 4 — Departures (conditional) + process */}
      <section className="mx-auto grid max-w-[88rem] gap-12 px-5 py-20 md:grid-cols-12 md:px-10 md:py-28">
        <div className="md:col-span-5">
          <Departures />
        </div>
        <div className="md:col-span-7">
          <p className="eyebrow text-muted-foreground">How it works</p>
          <h2 className="mt-4 text-4xl leading-tight">From first message to the trailhead.</h2>
          <ol className="mt-8">
            {STEPS.map(([h, p], i) => (
              <li key={h} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 border-t border-rule py-6 md:grid-cols-[3rem_minmax(0,1fr)]">
                <span className="font-mono text-sm text-accent">0{i + 1}</span>
                <div>
                  <h3 className="text-2xl">{h}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{p}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 — From the archive: tall frames */}
      <section className="ledger-dark bg-background text-foreground">
        <div className="mx-auto max-w-[88rem] px-5 py-20 md:px-10 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-4xl md:text-5xl">From the archive</h2>
            <p className="max-w-sm text-sm text-muted-foreground">Photographs from the operator's own treks, shown uncropped where the frame allows.</p>
          </div>
          <div className="scroll-hint mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 md:grid md:grid-cols-6 md:overflow-visible">
            {["g0054.jpg", "IMG_3456.jpg", "g0057.jpg", "g0283.jpg", "IMG_3272.jpg", "g0489.jpg"].map((f) => {
              const tall = img(f).height > img(f).width;
              return (
                <Photo
                  key={f}
                  file={f}
                  alt={img(f).alt || "Photograph from the Bhutan Trekking Services archive"}
                  className={`w-[68vw] shrink-0 snap-start [&_img]:transition-transform [&_img]:duration-700 hover:[&_img]:scale-[1.025] md:w-auto ${tall ? "aspect-[9/16]" : "aspect-[9/16]"}`}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* 6 — Films */}
      <section className="mx-auto max-w-[88rem] px-5 py-20 md:px-10 md:py-24">
        <p className="eyebrow text-muted-foreground">Films</p>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          {FILMS.map((f) => (
            <Film key={f.id} {...f} />
          ))}
        </div>
      </section>

      {/* 7 — Closing */}
      <section className="mx-auto max-w-[88rem] px-5 pb-20 md:px-10">
        <div className="grid gap-10 border-t border-foreground pt-16 md:grid-cols-12">
          <h2 className="text-4xl leading-tight md:col-span-7 md:text-6xl lg:text-7xl">A local outfit, not a call centre.</h2>
          <div className="md:col-span-5 md:flex md:flex-col md:justify-center">
            <p className="text-lg md:text-xl">
              We run these routes ourselves, from the Druk Path to the full Snowman traverse. The guide who answers your
              message is the one who meets you in Paro.
            </p>
            <WhatsAppButton className="mt-8 self-start" href={whatsappHref()}>Start on WhatsApp</WhatsAppButton>
          </div>
        </div>
      </section>
    </main>
  );
}

function Film({ id, title }: { id: string; title: string }) {
  const [on, setOn] = useState(false);
  return (
    <figure className="group">
      <div className="relative aspect-video overflow-hidden bg-muted">
        {on ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <Button type="button" variant="ghost" onClick={() => setOn(true)} className="group absolute inset-0 h-full w-full rounded-none p-0">
            <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" width="480" height="360" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
            <span className="absolute bottom-4 left-4 inline-flex min-h-10 items-center gap-2 border border-foreground/30 bg-background px-4 py-2 font-mono text-xs font-normal uppercase tracking-wider text-foreground transition-colors group-hover:bg-accent">
              <span aria-hidden="true">▶</span> Play film<span className="sr-only">: {title}</span>
            </span>
          </Button>
        )}
      </div>
      <figcaption className="mt-4 font-display text-2xl">{title}</figcaption>
    </figure>
  );
}
