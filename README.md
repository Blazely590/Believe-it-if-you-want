# If You Want website

A responsive static website with pages for Believe It If You Want, Listen If You Want, Buy It If You Want, and Discover (affiliate recommendations).

## Preview
Open `index.html` in your browser.

## Publish using GitHub Pages
1. Extract this ZIP.
2. Upload the files inside this folder to the root of a GitHub repository.
3. Open repository **Settings → Pages**.
4. Select **Deploy from a branch**, choose `main` and `/ (root)`, then Save.

## Customise
Replace placeholder titles, descriptions, `#` links, Spotify links, product details and `hello@example.com` with your real details. This is a static catalogue site; it does not yet include checkout or payment processing.

## Discover categories
Each recommendation on `affiliates.html` is an `<article class="tile" data-category="...">`. The category buttons filter by that value. To add a category, add a button with `data-filter="your-category"` and give its tiles the same `data-category`. Current categories: `software-tools`, `services`, `products`.

## Theme
Black and white only, set in Archivo at its extra-wide, heavy cut to match the logo. The font is bundled in `fonts/` (SIL Open Font License), so the site needs no external requests. Colours are the variables at the top of `styles.css`.
