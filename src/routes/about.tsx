import { createFileRoute } from "@tanstack/react-router";
import { Photo } from "@/components/site/Photo";
import { WhatsAppButton } from "@/components/site/Chrome";

const TITLE = "About — a Thimphu trekking company · Bhutan Trekking Services";
const DESC = "Bhutan Trekking Services is a Thimphu-based operator running Himalayan camping treks, cultural and festival tours, birding tours and rural homestays.";

export const Route = createFileRoute("/about")({
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
  component: About,
});

/* All copy quoted from https://bhutantrekkings.com/about. Guide-language lists and the licensing
   authority are omitted because the source page contradicts itself (pending client decision). */
const REASONS = [
  ["Schedule of your choice", "You set the schedule on your own terms; we handle every arrangement to make the tour a special one."],
  ["Quality services", "We place you in the country's most recommended hotels, or in a homestay if you want the authentic Bhutanese way of living. Camping and hiking put you under the starry sky, and meals are at your command."],
  ["Expansive destinations", "Travel from the major towns of the west to Merak and Sakteng, the remotest villages of the east."],
  ["Assurance of individual security", "We look after the security of every visitor, so you can tour the country without a worry on your mind."],
  ["Itineraries of your choice", "Every trip is planned in close consultation with you. Our published itineraries are refined from past visitors' feedback."],
];
const SERVICES = ["Himalayan treks", "Cultural tours", "Festival tours", "Birding tours", "Rural homestays"];

function About() {
  return (
    <main id="main">
      <section className="mx-auto grid max-w-[88rem] gap-10 px-5 pt-12 md:grid-cols-12 md:px-10 md:pt-20">
        <div className="md:col-span-6">
          <p className="eyebrow text-muted-foreground">About</p>
          <h1 className="mt-4 text-5xl font-light leading-[0.98] md:text-7xl">A Thimphu company that runs its own treks.</h1>
          <p className="mt-8 text-lg leading-relaxed">
            Bhutan Trekking Services is owned and managed by a dedicated group of professionals with years of experience
            and equipped with an excellent infrastructure.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            We specialise in trekking in the Himalayas, some exotic cultural tours, festival tours, birding tours, and
            home stays to experience Bhutanese rural life. Our tour leaders and guides share innumerable insights into
            the living arts and culture of Bhutan.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {SERVICES.map((s) => (
              <li key={s} className="border border-border px-3 py-1 font-mono text-xs uppercase tracking-wider">{s}</li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-5 gap-3 md:col-span-6">
          <Photo file="IMG_3849.jpg" className="col-span-2 aspect-[9/16]" priority />
          <Photo file="IMG_3271.jpg" className="col-span-3 aspect-[3/4] self-end" credit />
        </div>
      </section>

      <section className="mx-auto max-w-[88rem] px-5 py-20 md:px-10 md:py-28">
        <h2 className="text-4xl md:text-5xl">Why travellers choose us</h2>
        <ol className="mt-10 grid gap-x-12 md:grid-cols-2">
          {REASONS.map(([h, p], i) => (
            <li key={h} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-rule py-6">
              <span className="font-mono text-sm text-muted-foreground">0{i + 1}</span>
              <div>
                <h3 className="text-2xl">{h}</h3>
                <p className="mt-2 text-muted-foreground">{p}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-[88rem] px-5 md:px-10">
        <div className="border border-dashed border-rule p-6 md:p-8">
          <p className="eyebrow text-muted-foreground">Guides and credentials</p>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Guide profiles, languages and licence details will appear here once confirmed by the company.
          </p>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-foreground pt-10">
          <p className="max-w-xl font-display text-3xl leading-tight md:text-4xl">Tell us what you're dreaming of and we'll plan it with you.</p>
          <WhatsAppButton />
        </div>
      </section>
    </main>
  );
}
