# GitHub Universe 2026 Ships — Talk Track

Static GitHub Pages talk track with two presentations. Open either locally or via Pages:

- `index.html`: facilitator version with speaking prompts, notes, section timings, and a timer.
- `participant.html`: audience version with the same topics, product imagery, and source links, without facilitator notes, speaking prompts, or timing cues. Notes are omitted from the HTML, not just hidden, and the `N` key cannot reveal them.

From the facilitator version, select **Open participant presentation** to open the audience view in a separate tab. Move that tab into a separate window on the shared display, and keep the facilitator version on your own screen. Both versions support left/right arrow navigation; navigate each window independently.

The two HTML pages share `style.css`, `app.js`, and `assets/`. When updating presentation content, keep both pages aligned while leaving facilitator-only content in `index.html`.

## Images

Each section has a `<figure class="shot">` showing official product imagery from the GitHub changelog post linked in its caption. `data-img` holds the original image URL and `<img src>` the local copy in `assets/`; until the file exists a dashed placeholder is shown. To re-download them:

```
node scripts/fetch-images.mjs
```

Swap any image manually (update `src` if the file type changes) if a different shot reads better on stage.

Items marked `*` need fact-checking against the official changelog/blog before presenting.
