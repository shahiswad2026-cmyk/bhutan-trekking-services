import { createFileRoute, Link } from "@tanstack/react-router";
import urlMap from "@/data/urlMap.json";

const TITLE = "Page archive — old and new addresses · Bhutan Trekking Services";
const DESC = "Where every page of the previous Bhutan Trekking Services website lives in the new site, including tours, planning articles and festival calendars.";

export const Route = createFileRoute("/archive")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Archive,
});

const INTERNAL = new Set(["/", "/treks", "/about", "/contact"]);

function Archive() {
  return (
    <main id="main" className="mx-auto max-w-[88rem] px-5 pt-12 md:px-10 md:pt-20">
      <p className="eyebrow text-muted-foreground">Archive</p>
      <h1 className="mt-4 text-5xl font-light md:text-6xl">Old pages, new addresses.</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Every page of the previous website and where it goes. Cultural tours, planning articles, festival calendars,
        the gallery and films stay on the current site until a decision is made — nothing has been deleted or redirected yet.
      </p>
      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
          <thead>
            <tr className="eyebrow border-b border-foreground text-muted-foreground">
              <th className="py-3 pr-4 font-normal">Old address</th>
              <th className="py-3 pr-4 font-normal">Page</th>
              <th className="py-3 pr-4 font-normal">New address</th>
              <th className="py-3 font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {urlMap.map((r) => {
              const built = r.status.startsWith("built");
              const trek = r.newUrl.match(/^\/treks\/([a-z0-9-]+)$/);
              return (
                <tr key={r.oldUrl} className="border-b border-rule align-top">
                  <td className="py-3 pr-4 font-mono">
                    <a href={`https://bhutantrekkings.com${r.oldUrl}`} target="_blank" rel="noopener noreferrer" className="underline decoration-rule underline-offset-4 hover:decoration-accent">{r.oldUrl}</a>
                  </td>
                  <td className="py-3 pr-4">{r.title}</td>
                  <td className="py-3 pr-4 font-mono">
                    {built && trek ? (
                      <Link to="/treks/$slug" params={{ slug: trek[1] ?? "" }} className="underline decoration-accent underline-offset-4">{r.newUrl}</Link>
                    ) : built && INTERNAL.has(r.newUrl) ? (
                      <a href={r.newUrl} className="underline decoration-accent underline-offset-4">{r.newUrl}</a>
                    ) : (
                      <span className="text-muted-foreground">{r.newUrl} (proposed)</span>
                    )}
                  </td>
                  <td className="py-3 text-muted-foreground">{r.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
