// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Static prerender of every content page (data edits -> rebuild -> new HTML). Keep in sync with src/data/treks.json.
    pages: [{"path": "/"}, {"path": "/treks"}, {"path": "/about"}, {"path": "/contact"}, {"path": "/archive"}, {"path": "/treks/bumdra-trek"}, {"path": "/treks/druk-path-trek"}, {"path": "/treks/dagala-thousand-lakes-trek"}, {"path": "/treks/jomolhari-round-trek"}, {"path": "/treks/soi-yaksa-trek"}, {"path": "/treks/laya-lingzhi-trek"}, {"path": "/treks/snowman-trek"}, {"path": "/treks/snowman-trek-ii"}, {"path": "/treks/snowman-trek-iii"}, {"path": "/treks/snowman-trek-iv"}],
    // Prerender disabled: on Vercel it emptied .vercel/output (404). Pages render via the server function instead.
    prerender: { enabled: false, autoStaticPathsDiscovery: false },
  },
});
