# UAE TrustCore fixed single-file homepage

The homepage is fully self-contained: CSS, JavaScript and key images are embedded into `index.html`. This fixes previews that show unstyled HTML when only `index.html` is opened.

Upload all files to the GitHub repository root and commit to `main`.

All booking CTAs point to https://calendly.com/uaetrustcore/30min

## Live-content visibility fix

This build fixes the blank-section issue caused by a strict Content Security Policy blocking the old inline JavaScript while `.reveal` elements defaulted to `opacity: 0`.

The corrected build:

- loads interactive JavaScript from `/assets/app.js`;
- keeps all page content visible even if JavaScript is unavailable;
- allows only the exact JSON-LD hash in the CSP;
- disables HTML caching during updates.

Upload **all files and folders at the repository root**, especially `index.html`, `_headers`, and `assets/app.js`.
