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

- Keep party facts in the shared EVENT object and derive calendar links from it so displayed and exported dates stay aligned.
- Invitation controls use the shared Button invitation variant; global invitation styling and palette live in src/styles.css.
- Use separate portrait and landscape painted backdrops via a picture source so decorative edges remain visible on narrow screens; motion respects reduced-motion preferences.
- Shared guest entries are public-readable, but each device's private key stays out of every read and rows are removed only through the owner-checked database functions, never by a direct delete.
- Sections that appear only after the opening interaction read shared data on the client with useQuery rather than a route loader, because the browser backend client cannot authenticate during prerender.
