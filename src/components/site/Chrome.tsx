import { Link } from "@tanstack/react-router";
import { featuredTreks, site, whatsappHref } from "@/lib/content";

const nav = [
  { to: "/treks", label: "Treks" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function WhatsAppButton({
  href = whatsappHref(),
  children = "WhatsApp us",
  variant = "solid",
  className = "",
}: {
  href?: string;
  children?: React.ReactNode;
  variant?: "solid" | "line";
  className?: string;
}) {
  const base =
    "inline-flex min-h-11 items-center justify-center gap-2 px-5 py-3 font-mono text-[0.75rem] font-medium uppercase tracking-[0.12em] transition-colors duration-200";
  const v =
    variant === "solid"
      ? "border border-accent bg-accent text-accent-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground"
      : "border border-foreground/60 hover:border-foreground hover:bg-foreground hover:text-background";
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${v} ${className}`}>
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.2.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3Z" />
      </svg>
      {children}
      <span className="sr-only"> (opens WhatsApp)</span>
    </a>
  );
}

function BrandLockup() {
  return (
    <span className="flex items-center gap-3">
      <span aria-hidden="true" className="relative grid h-9 w-9 shrink-0 place-items-center border border-foreground/30 font-display text-sm font-semibold leading-none">
        <span>B</span>
        <span className="absolute -bottom-px -right-px h-2.5 w-2.5 border-l border-t border-accent bg-background" />
      </span>
      <span className="grid leading-none">
        <span className="font-display text-[1.05rem] font-medium">Bhutan Trekking</span>
        <span className="mt-1 font-mono text-[0.56rem] uppercase tracking-[0.18em] text-muted-foreground">Services · Thimphu</span>
      </span>
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-foreground">
        Skip to content
      </a>
      <div className="mx-auto grid h-[4.5rem] max-w-[88rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 md:flex md:justify-between md:gap-8 md:px-10">
        <Link to="/" className="min-w-0 shrink-0 transition-opacity hover:opacity-75" aria-label="Bhutan Trekking Services — home">
          <BrandLockup />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="font-mono text-[0.78rem] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground underline decoration-accent decoration-2 underline-offset-8" }}
            >
              {n.label}
            </Link>
          ))}
          <WhatsAppButton className="min-h-10 !py-2">WhatsApp</WhatsAppButton>
        </nav>
        <div className="flex items-center gap-1 md:hidden">
          <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" aria-label="Open WhatsApp enquiry" title="WhatsApp" className="grid h-11 w-11 place-items-center text-foreground transition-colors hover:text-accent">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[1.15rem] w-[1.15rem] fill-current"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.2.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3Z" /></svg>
          </a>
          <details className="group relative">
          <summary className="flex h-11 cursor-pointer list-none items-center gap-2 px-1 font-mono text-[0.7rem] uppercase tracking-[0.12em] [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">Menu</span>
            <span className="hidden group-open:inline">Close</span>
            <span aria-hidden="true" className="flex w-4 flex-col gap-1">
               <span className="h-0.5 w-full bg-current transition-transform group-open:rotate-45 group-open:translate-y-1.5" />
               <span className="h-0.5 w-full bg-current transition-opacity group-open:opacity-0" />
               <span className="h-0.5 w-full bg-current transition-transform group-open:-rotate-45 group-open:-translate-y-1.5" />
            </span>
          </summary>
          <div className="fixed inset-x-0 top-[4.5rem] border-b border-border bg-background px-5 pb-8 pt-3 shadow-sm">
            <ul className="divide-y divide-border">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="block py-4 font-display text-3xl active:text-accent">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
            <WhatsAppButton className="mt-6 w-full" />
          </div>
        </details>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="ledger-dark mt-20 bg-background text-foreground md:mt-28">
      <div className="mx-auto grid max-w-[88rem] gap-12 px-5 py-14 md:grid-cols-12 md:px-10 md:py-20">
        <div className="md:col-span-5">
          <p className="font-display text-4xl leading-tight md:text-5xl">Bhutan Trekking Services</p>
          <p className="mt-4 max-w-sm text-muted-foreground">{site.location.value}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppButton />
            <a href={`mailto:${site.email.value}`} className="inline-flex items-center border border-current px-5 py-3 font-mono text-[0.8rem] uppercase tracking-[0.12em] transition-colors hover:bg-foreground hover:text-background">
              Email
            </a>
          </div>
        </div>
        <div className="md:col-span-4">
          <p className="eyebrow text-muted-foreground">Treks</p>
          <ul className="mt-4 space-y-2">
            {featuredTreks.map((t) => (
              <li key={t.slug}>
                <Link to="/treks/$slug" params={{ slug: t.slug }} className="transition-colors hover:text-accent">
                  {t.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow text-muted-foreground">Contact</p>
          <ul className="mt-4 space-y-2 font-mono text-sm">
            <li>WhatsApp {site.whatsapp.display}</li>
            <li>
              <a href={`mailto:${site.email.value}`} className="transition-colors hover:text-accent">
                {site.email.value}
              </a>
            </li>
            <li>
              <Link to="/archive" className="transition-colors hover:text-accent">
                Page archive
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/30">
        <p className="mx-auto max-w-[88rem] px-5 py-6 font-mono text-xs text-muted-foreground md:px-10">
          All photographs from the Bhutan Trekking Services archive. Preview build — not yet live.
        </p>
      </div>
    </footer>
  );
}
