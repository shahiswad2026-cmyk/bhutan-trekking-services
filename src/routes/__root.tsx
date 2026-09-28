import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteFooter, SiteHeader } from "@/components/site/Chrome";

function NotFoundComponent() {
  return (
    <main id="main" className="mx-auto max-w-3xl px-5 py-32">
      <p className="eyebrow text-muted-foreground">404</p>
      <h1 className="mt-4 text-5xl">This trail doesn't go anywhere.</h1>
      <p className="mt-4 text-muted-foreground">The page you're looking for doesn't exist or has moved.</p>
      <div className="mt-8 flex gap-6 font-mono text-sm uppercase tracking-wider">
        <Link to="/" className="underline decoration-accent underline-offset-4">Home</Link>
        <Link to="/treks" className="underline decoration-accent underline-offset-4">All treks</Link>
      </div>
    </main>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <main className="mx-auto max-w-3xl px-5 py-32">
      <h1 className="text-4xl">This page didn't load</h1>
      <p className="mt-2 text-muted-foreground">Something went wrong. Try again, or head back home.</p>
      <div className="mt-6 flex gap-4">
        <button onClick={() => { router.invalidate(); reset(); }} className="bg-primary px-4 py-2 text-primary-foreground">Try again</button>
        <a href="/" className="border border-border px-4 py-2">Go home</a>
      </div>
    </main>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Bhutan Trekking Services" },
      { name: "description", content: "Camping treks in Bhutan's high country, run from Thimphu." },
      { property: "og:site_name", content: "Bhutan Trekking Services" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#10261E" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..600&family=IBM+Plex+Mono:wght@400;500&family=Source+Sans+3:wght@400;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </QueryClientProvider>
  );
}
