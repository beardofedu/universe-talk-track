# GitHub Universe 2026 Ships — Talk Track

Static GitHub Pages talk track. Open `index.html` locally or via Pages.

## Images

Each section has a `<figure class="shot">` showing official product imagery from the GitHub changelog post linked in its caption. `data-img` holds the original image URL and `<img src>` the local copy in `assets/`; until the file exists a dashed placeholder is shown. To re-download them:

```
node scripts/fetch-images.mjs
```

Swap any image manually (update `src` if the file type changes) if a different shot reads better on stage.

Items marked `*` need fact-checking against the official changelog/blog before presenting.
