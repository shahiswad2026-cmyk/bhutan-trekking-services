import { createFileRoute } from "@tanstack/react-router";
import { site, whatsappHref } from "@/lib/content";
import { Photo } from "@/components/site/Photo";
import { WhatsAppButton } from "@/components/site/Chrome";

const TITLE = "Contact — plan a trek in Bhutan · Bhutan Trekking Services";
const DESC = "Message Bhutan Trekking Services on WhatsApp or email with your dates and group size. Based in Thimphu, Bhutan.";

export const Route = createFileRoute("/contact")({
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
  component: Contact,
});

function Contact() {
  const rows = [
    ["WhatsApp", site.whatsapp.display, whatsappHref()],
    ["Email", site.email.value, `mailto:${site.email.value}`],
    ["Phone", site.phone.display, `tel:${site.phone.value}`],
    ["Office", site.location.value, null],
  ] as const;
  return (
    <main id="main" className="mx-auto grid max-w-[88rem] gap-12 px-5 pt-12 md:grid-cols-12 md:px-10 md:pt-20">
      <div className="md:col-span-6">
        <p className="eyebrow text-muted-foreground">Contact</p>
        <h1 className="mt-4 text-5xl font-light leading-[0.98] md:text-7xl">Plan your trip.</h1>
        <p className="mt-6 max-w-lg text-lg text-muted-foreground">
          Tell us your dates, group size and what you'd like to see. You're writing to the team who runs the treks,
          based in Thimphu. WhatsApp is usually the fastest way to reach us.
        </p>
        <WhatsAppButton className="mt-8" />
        <dl className="mt-12 border-t border-foreground">
          {rows.map(([k, v, href]) => (
            <div key={k} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-rule py-4">
              <dt className="eyebrow pt-1 text-muted-foreground">{k}</dt>
              <dd className="min-w-0 break-all font-mono text-base md:text-lg">
                {href ? (
                  <a href={href} className="underline decoration-rule underline-offset-4 hover:decoration-accent" {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    {v}
                  </a>
                ) : (
                  v
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <Photo file="IMG_3272.jpg" className="aspect-[4/3] md:col-span-6 md:aspect-[3/4] md:self-start" priority credit />
    </main>
  );
}
