# SEO Fixes (No-Input Items)

Apply all SEO improvements that don't require user-specific data. Skip items needing the production domain, real street address, social URLs, and Twitter handle — leave those as-is or use safe placeholders to be filled later.

## Changes

### 1. `index.html`
- Replace Lovable default `og:image` and `twitter:image` with a local `/og-image.jpg` (generated branded image, 1200×630).
- Remove `<meta name="twitter:site" content="@Lovable" />` (no real handle yet).
- Fix `apple-touch-icon` to point to a proper PNG (`/apple-touch-icon.png`, 180×180) instead of `.ico`.
- Add `<link rel="canonical" href="https://parasgraphics.com/" />` (kept as current assumed domain in JSON-LD).
- JSON-LD: keep `streetAddress` as `"Ahmedabad"` (placeholder), keep `sameAs: []` empty, but update the `image` field to `/og-image.jpg`. Add `areaServed: "Ahmedabad"` and `@id` for the business.

### 2. `public/manifest.json`
- Add 192×192 and 512x512 PNG icons (`/icon-192.png`, `/icon-512.png`, both `purpose: "any maskable"`).
- Keep existing favicon entry.

### 3. `public/robots.txt`
- Replace `Disallow: /admin/` with `Disallow: /admin` (covers exact route too).
- Leave the `Sitemap:` line pointing to `https://parasgraphics.com/sitemap.xml` (current assumed domain, can be updated later).

### 4. `public/sitemap.xml`
- Add entries for `/`, `/privacy-policy`, `/terms` with appropriate `changefreq` and `priority`. Add `<lastmod>` dates.
- Keep `https://parasgraphics.com` as base.

### 5. `src/components/SEO.tsx`
- No structural change needed; already supports canonical + robots. Confirm `og:site_name` is added (`Paras Graphics`).

### 6. `src/pages/Index.tsx`
- Pass `canonical="https://parasgraphics.com/"` and `ogImage="/og-image.jpg"` to `<SEO />`.

### 7. `src/pages/PrivacyPolicy.tsx` & `src/pages/Terms.tsx`
- Add `canonical` prop pointing to their respective URLs.

### 8. Asset generation
- Generate three branded PNGs via script using existing brand colors (navy `#0a1628`, cyan accent) and "Paras Graphics — Print Perfect" wordmark:
  - `public/og-image.jpg` (1200×630)
  - `public/apple-touch-icon.png` (180×180)
  - `public/icon-192.png` (192×192)
  - `public/icon-512.png` (512×512)
- QA each by inspecting the rendered images.

## Items Skipped (need your input later)
- Production domain confirmation (assuming `parasgraphics.com`)
- Real street address & postal code in JSON-LD
- Social profile URLs (`sameAs`)
- Twitter/X handle
