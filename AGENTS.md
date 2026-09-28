<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules
- Content lives in src/data/*.json, validated by zod in src/lib/content.ts; the build fails on invalid data. Why: static, editable, no runtime API.
- All content routes are prerendered via tanstackStart.pages in vite.config.ts; add a path there when adding a trek. Why: static HTML output.
- Departures render only when verification === "verified". Why: never show fabricated dates/status.
- Route explorer is schematic and shows only printed figures. Why: source data is incomplete/conflicting.
- The compact identity is a typographic BTS monogram and wordmark in the shared header. Why: it stays legible on mobile without inventing a cultural symbol or generic mountain mark.
