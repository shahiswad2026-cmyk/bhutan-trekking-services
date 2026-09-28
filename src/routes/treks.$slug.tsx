import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getArt, featuredTreks, getTrek, img, SITE_URL, treks, variantOf, whatsappHref, type Art, type Trek } from "@/lib/content";
import { Photo } from "@/components/site/Photo";
import { RouteExplorer } from "@/components/site/RouteExplorer";
import { Departures } from "@/components/site/Departures";
import { WhatsAppButton } from "@/components/site/Chrome";
import { GradeMark } from "@/components/site/TrekChooser";

export const Route = createFileRoute("/treks/$slug")({
  loader: ({ params }) => {
    const trek = getTrek(params.slug);
    if (!trek) throw notFound();
    return { slug: trek.slug };
  },
  head: ({ loaderData }) => {
    const t = loaderData ? getTrek(loaderData.slug) : undefined;
    if (!t) return { meta: [{ title: "Trek not found" }, { name: "robots", content: "noindex" }] };
    const a = getArt(t.slug);
    const title = `${t.title} — ${t.facts.days.value} days · Bhutan Trekking Services`;
    const desc = `${a.tagline}. ${t.facts.grade.value} grade, ${t.facts.days.value} days, best ${t.facts.bestSeason.value}. Private departures, enquire on WhatsApp.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(t.featured ? [] : [{ name: "robots", content: "index, follow" }]),
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/treks/${t.slug}` }],
    };
  },
  notFoundComponent: () => (
    <main id="main" className="mx-auto max-w-3xl px-5 py-32 text-center">
      <h1 className="text-5xl font-light">We don't run that trek.</h1>
      <Link to="/treks" className="mt-8 inline-block font-mono text-sm uppercase tracking-widest underline decoration-accent underline-offset-8 hover:text-accent">See all treks</Link>
    </main>
  ),
  component: TrekPage,
});

function HeroPicture({ a, className, sizesClass }: { a: Art; className?: string; sizesClass: string }) {
  const d = img(a.hero);
  const m = img(a.heroMobile);
  return (
    <picture className={className}>
      <source media="(min-width: 768px)" srcSet={d.src} width={d.width} height={d.height} />
      <img
        src={m.src}
        width={m.width}
        height={m.height}
        alt={d.alt || m.alt || ""}
        fetchPriority="high"
        style={{ objectPosition: a.focus }}
        className={`h-full w-full bg-muted object-cover ${sizesClass}`}
      />
    </picture>
  );
}

function TitleBlock({ t, a, big = false }: { t: Trek; a: Art; big?: boolean }) {
  const parent = variantOf(t.slug);
  return (
    <div className="reveal">
      <p className="eyebrow text-muted-foreground">
        {parent ? (
          <>
            <Link to="/treks/$slug" params={{ slug: parent }} className="underline underline-offset-4 hover:text-accent transition-colors">Snowman Trek</Link> · route variant
          </>
        ) : (
          a.region
        )}
      </p>
      <h1 className={`mt-5 font-light leading-[0.95] ${big ? "text-[3.2rem] md:text-[6.5rem] lg:text-[7.5rem]" : "text-[2.8rem] md:text-[4.8rem] lg:text-[5.5rem]"}`}>
        {t.title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl md:leading-relaxed">{t.subtitle}</p>
    </div>
  );
}

function Opening({ t, a }: { t: Trek; a: Art }) {
  const wrap = "mx-auto max-w-[88rem] px-5 md:px-10";
  switch (a.layout) {
    case "band":
      return (
        <section>
          <HeroPicture a={a} className="block" sizesClass="aspect-[4/5] md:aspect-[21/9] max-h-[78vh]" />
          <div className={`${wrap} pt-12 md:pt-16`}>
            <TitleBlock t={t} a={a} big />
          </div>
        </section>
      );
    case "split":
    case "split-reverse":
      return (
        <section className={`${wrap} grid gap-10 pt-8 md:grid-cols-12 md:items-end md:gap-16 md:pt-16`}>
          <div className={`md:col-span-5 ${a.layout === "split-reverse" ? "md:order-2" : ""}`}>
            <TitleBlock t={t} a={a} />
          </div>
          <HeroPicture a={a} className={`block md:col-span-7 ${a.layout === "split-reverse" ? "md:order-1" : ""}`} sizesClass="aspect-[4/5] md:aspect-[4/3] max-h-[85vh]" />
        </section>
      );
    case "portrait":
      return (
        <section className={`${wrap} grid gap-10 pt-8 md:grid-cols-12 md:gap-16 md:pt-16`}>
          <HeroPicture a={a} className="block md:col-span-5" sizesClass="aspect-[4/5] md:aspect-[9/16] md:max-h-[88vh]" />
          <div className="md:col-span-7 md:flex md:flex-col md:justify-center">
            <TitleBlock t={t} a={a} big />
          </div>
        </section>
      );
    case "panorama":
      return (
        <section className="pt-8 md:pt-16">
          <div className={wrap}><TitleBlock t={t} a={a} big /></div>
          <HeroPicture a={a} className="mx-auto mt-12 block max-w-[100rem]" sizesClass="aspect-[4/5] md:aspect-[16/7]" />
        </section>
      );
    case "dark":
      return (
        <section className="ledger-dark bg-background text-foreground">
          <div className={`${wrap} grid gap-12 pb-20 pt-12 md:grid-cols-12 md:pt-20`}>
            <div className="md:col-span-12"><TitleBlock t={t} a={a} big /></div>
            <HeroPicture a={a} className="block md:col-span-8 shadow-2xl" sizesClass="aspect-[4/5] md:aspect-[4/3]" />
            <div className="md:col-span-4 md:self-end">
              <p className="font-mono text-sm leading-relaxed text-muted-foreground uppercase tracking-wider">
                {t.facts.days.value} days · {t.facts.grade.value} · {t.facts.maxAltitude.value}
              </p>
            </div>
          </div>
        </section>
      );
    default:
      return (
        <section style={{ background: a.tint }} className="pb-16 pt-8 md:pt-16">
          <div className={`${wrap} grid gap-10 md:grid-cols-12 md:items-center md:gap-16`}>
            <div className="md:col-span-6"><TitleBlock t={t} a={a} /></div>
            <div className="md:col-span-6">
              <HeroPicture a={a} className="block border-[12px] border-background shadow-xl" sizesClass="aspect-[4/5] md:aspect-[4/3]" />
            </div>
          </div>
        </section>
      );
  }
}

function TrekPage() {
  const { slug } = Route.useLoaderData();
  const t = getTrek(slug)!;
  const a = getArt(t.slug);
  const pageUrl = `${SITE_URL}/treks/${t.slug}`;
  const wa = whatsappHref({ trekTitle: t.title, days: t.facts.days.value, pageUrl });
  const altNote = t.verificationNotes.find((n) => n.field === "maxAltitude");
  const dayNotes = t.verificationNotes.filter((n) => n.field === "days");
  const siblings = t.slug.startsWith("snowman-trek") ? treks.filter((x) => x.slug.startsWith("snowman-trek") && x.slug !== t.slug) : [];
  const idx = featuredTreks.findIndex((x) => x.slug === t.slug);
  const next = (idx >= 0 ? featuredTreks[(idx + 1) % featuredTreks.length] : featuredTreks[featuredTreks.length - 1])!;
  const facts: [string, React.ReactNode][] = [
    ["Duration", `${t.facts.days.value} days`],
    ["Grade", <GradeMark key="g" grade={t.facts.grade.value} />],
    ["Highest point", <span key="a">{t.facts.maxAltitude.value}{altNote && <span className="text-accent">*</span>}</span>],
    ["Best season", t.facts.bestSeason.value],
    ["Style", t.facts.style.value],
  ];

  return (
    <main id="main" style={{ ["--tint" as string]: a.tint }}>
      <Opening t={t} a={a} />

      {/* Facts ledger */}
      <section className="mx-auto max-w-[88rem] px-5 md:px-10">
        <dl className="mt-12 grid grid-cols-2 border-t border-foreground md:grid-cols-5">
          {facts.map(([k, v]) => (
            <div key={k} className="border-b border-rule py-5 pr-4 md:border-b-0">
              <dt className="eyebrow text-muted-foreground">{k}</dt>
              <dd className="mt-2 font-mono text-base md:text-xl">{v}</dd>
            </div>
          ))}
        </dl>
        {altNote && <p className="mt-4 font-mono text-[0.65rem] text-muted-foreground uppercase tracking-wider">* Figure as published by the operator; being re-checked.</p>}
      </section>

      {/* Overview */}
      <section className="mx-auto grid max-w-[88rem] gap-12 px-5 py-20 md:grid-cols-12 md:px-10 md:py-32">
        <div className="space-y-6 text-lg leading-relaxed md:col-span-7 md:text-xl md:leading-relaxed">
          {t.overview.map((p, i) => (
            <p key={i} className={i === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-primary" : ""}>{p}</p>
          ))}
        </div>
        <aside className="md:col-span-4 md:col-start-9 md:border-l md:border-rule md:pl-10">
          <p className="eyebrow text-muted-foreground">Highlights</p>
          <ul className="mt-6 space-y-1">
            {t.highlights.map((h) => (
              <li key={h} className="border-t border-rule py-4 text-base">{h}</li>
            ))}
          </ul>
          <WhatsAppButton href={wa} className="mt-8 w-full">Ask about this trek</WhatsAppButton>
        </aside>
      </section>

      {/* Route explorer */}
      <section className="mx-auto max-w-[88rem] px-5 md:px-10">
        <div className="border-t border-foreground pt-16">
          <h2 className="text-4xl md:text-6xl">The route, stop by stop</h2>
          <div className="mt-10"><RouteExplorer trek={t} /></div>
        </div>
      </section>

      {/* Itinerary */}
      <section className="mx-auto grid max-w-[88rem] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <h2 className="text-4xl md:text-6xl">Day by day</h2>
            <p className="mt-5 text-muted-foreground md:text-lg">The itinerary as published by the operator. Tailored to your pace on request.</p>
            {dayNotes.map((n) => (
              <p key={n.note} className="mt-6 border-l-2 border-accent pl-4 text-sm text-muted-foreground">Being re-checked: {n.note}</p>
            ))}
            <div className="mt-10 hidden md:block">
              <Photo file={a.heroMobile === a.hero ? t.gallery[1] ?? a.hero : a.heroMobile} className="aspect-[3/4] shadow-lg" alt="" />
            </div>
          </div>
        </div>
        <ol className="md:col-span-8">
          {t.days.map((d) => (
            <li key={d.day} className="grid grid-cols-[4rem_1fr] gap-6 border-t border-rule py-8 first:border-t-0 md:first:border-t">
              <span className="font-mono text-sm text-muted-foreground">Day {d.day}</span>
              <div>
                <h3 className="text-2xl leading-snug md:text-3xl">{d.title}</h3>
                {d.description && <p className="mt-4 leading-relaxed text-foreground/85 md:text-lg">{d.description}</p>}
                {d.chipsAsPrinted && (
                  <p className="mt-6 flex flex-wrap gap-2 font-mono text-[0.65rem] uppercase tracking-wider">
                    {d.distanceKm && <span className="bg-muted px-2.5 py-1.5">{d.distanceKm} km</span>}
                    {d.walkingTime && <span className="bg-muted px-2.5 py-1.5">{d.walkingTime}</span>}
                    {d.altitudeFigures.map((x) => (
                      <span key={x} className="bg-muted px-2.5 py-1.5">{x.toLocaleString("en-GB")} m</span>
                    ))}
                    {d.tags.map((x) => (
                      <span key={x} className="border border-rule px-2.5 py-1.5 text-muted-foreground">{x}</span>
                    ))}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Gallery */}
      <section className="bg-card py-20 md:py-32">
        <div className="mx-auto max-w-[88rem] px-5 md:px-10">
          <h2 className="text-3xl md:text-5xl">On this trek</h2>
          <div className="scroll-hint mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 md:grid md:grid-cols-4 md:overflow-visible">
            {t.gallery.slice(0, 8).map((f, i) => {
              const m = img(f);
              const tall = m.height > m.width;
              return (
                <Photo
                  key={f}
                  file={f}
                  alt={`${t.title} — photograph ${i + 1} from the operator's archive`}
                  className={`w-[78vw] shrink-0 snap-start md:w-auto ${tall ? "aspect-[3/4] md:row-span-2 md:aspect-auto" : "aspect-[4/3]"}`}
                  credit
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Departures + inclusions */}
      <section className="mx-auto grid max-w-[88rem] gap-16 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <div className="md:col-span-5"><Departures trekSlug={t.slug} /></div>
        <div className="grid gap-12 sm:grid-cols-2 md:col-span-7">
          <div>
            <h2 className="text-2xl font-display uppercase tracking-tight">Included</h2>
            <ul className="mt-6 space-y-1">
              {t.included.map((x) => <li key={x} className="border-t border-rule py-3 text-sm">{x}</li>)}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-display uppercase tracking-tight text-muted-foreground">Not included</h2>
            <ul className="mt-6 space-y-1 text-muted-foreground">
              {t.excluded.map((x) => <li key={x} className="border-t border-rule py-3 text-sm">{x}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="mx-auto max-w-[88rem] px-5 md:px-10 pb-20">
        {siblings.length > 0 && (
          <div className="border-t border-foreground py-16">
            <p className="eyebrow text-muted-foreground">Snowman routes</p>
            <ul className="mt-8 grid gap-8 md:grid-cols-3">
              {siblings.map((s) => (
                <li key={s.slug}>
                  <Link to="/treks/$slug" params={{ slug: s.slug }} className="group block">
                    <span className="font-display text-2xl group-hover:underline group-hover:decoration-accent transition-colors">{s.title}</span>
                    <div className="mt-2 flex gap-3 font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground">
                      <span className="text-foreground">{s.facts.days.value} days</span>
                      <span>{s.facts.maxAltitude.value}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Link to="/treks/$slug" params={{ slug: next.slug }} className="group grid gap-10 border-t border-foreground py-20 md:grid-cols-12 md:items-center">
          <span className="eyebrow text-muted-foreground md:col-span-2">Next trek</span>
          <span className="font-display text-4xl group-hover:underline group-hover:decoration-accent transition-all md:col-span-7 md:text-6xl">{next.title}</span>
          <div className="md:col-span-3 overflow-hidden shadow-xl">
             <Photo file={getArt(next.slug).hero} alt="" className="aspect-[16/9]" />
          </div>
        </Link>
      </section>

      {/* Mobile sticky enquiry */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 p-4 backdrop-blur-md md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <WhatsAppButton href={wa} className="w-full">Ask about {t.title.split(" — ")[0]}</WhatsAppButton>
      </div>
      <div className="h-20 md:hidden" aria-hidden="true" />
    </main>
  );
}
