# GitHub Universe 2026 Ships — Talk Track

Static GitHub Pages talk track with two presentations. Open either locally or via Pages:

- `index.html`: facilitator version with speaking prompts, notes, section timings, and a timer.
- `participant.html`: audience slideshow with one topic visible at a time, product imagery, and source links, without facilitator notes, speaking prompts, or timing cues. Notes are omitted from the HTML, not just hidden, and the `N` key cannot reveal them.

From the facilitator version, select **Open participant presentation** to open the audience view in a separate tab. Move that tab into a separate window on the shared display, and keep the facilitator version on your own screen. Both versions support left/right arrow navigation; navigate each window independently. The facilitator version remains a scrolling talk track.

In the participant slideshow, use **Previous** / **Next**, the left/right arrows, or **Jump to topic** to change slides. **Home** / **End** jump to the first/last slide. The footer shows the current topic and slide count; each topic has a shareable URL fragment, and browser back/forward restores slide selection. Slides use a side-by-side text and imagery layout on larger displays; small or short windows allow scrolling within only the current slide so content remains accessible. Printing includes every slide. Without JavaScript, the participant page remains a readable document.

The two HTML pages share `style.css`, `app.js`, and `assets/`. When updating presentation content, keep both pages aligned while leaving facilitator-only content in `index.html`.

## Images

Product sections include `<figure class="shot">` elements showing official product imagery from the GitHub changelog post linked in each caption. `data-img` holds the original image URL and `<img src>` the local copy in `assets/`; until the file exists a dashed placeholder is shown. To re-download them:

```
node scripts/fetch-images.mjs
```

Swap any image manually (update `src` if the file type changes) if a different shot reads better on stage.

Both presentations also include four space-themed illustrations made with Copilot image generation: mission control for the app, Projects, and Automations; a multi-engine ship for Fusion; cargo inspection for code review and security; and an orbital studio for image generation and desktop automation. These use `<figure class="shot generated">`, descriptive alt text, and captions identifying them as conceptual artwork rather than product screenshots. The optimized local JPEGs are named `assets/*-art.jpg`; `fetch-images.mjs` leaves them untouched because they have no `data-img` source.

Items marked `*` need fact-checking against the official changelog/blog before presenting.
