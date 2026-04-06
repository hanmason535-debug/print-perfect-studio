

# Add All Missing SEO & Technical Files

## What's Already Done
- `robots.txt` and `sitemap.xml` exist (with placeholder domain)
- `SEO.tsx` component with react-helmet-async
- Basic OG/Twitter meta tags in `index.html`
- `CookieConsent` component
- `favicon.ico` exists

## What's Missing & Plan

### 1. JSON-LD Structured Data (LocalBusiness Schema)
**File:** `index.html` — add a `<script type="application/ld+json">` block in `<body>` with LocalBusiness schema including business name, address (Ahmedabad), phone, services, geo coordinates, opening hours, and logo.

### 2. Enhanced SEO Component
**File:** `src/components/SEO.tsx` — add canonical URL support, `og:type`, `og:url`, `og:locale`, Twitter card meta, and `robots` meta tag as optional props.

### 3. Preconnect & Performance Hints
**File:** `index.html` — add `<link rel="preconnect">` for Google Fonts and Google Maps domains. Add `dns-prefetch` fallbacks.

### 4. Web App Manifest (installability only, no PWA/service worker)
**File:** `public/manifest.json` — simple manifest with app name "Paras Graphics", theme color (navy), background color, icon reference, `display: "standalone"`. No service worker.
**File:** `index.html` — add `<link rel="manifest" href="/manifest.json">` and `<meta name="theme-color">`.

### 5. Apple Touch Icon & Favicon Cleanup
**File:** `index.html` — add `<link rel="apple-touch-icon">` pointing to existing favicon. Add explicit `<link rel="icon">` tag.

### 6. Privacy Policy Page
**File:** `src/pages/PrivacyPolicy.tsx` — a simple styled page with standard privacy policy content relevant to a printing business (data collection, cookies, contact info).
**File:** `src/App.tsx` — add route `/privacy-policy`.
**File:** `src/components/Footer.tsx` — link "Privacy Policy" to the new route.

### 7. Terms of Service Page
**File:** `src/pages/Terms.tsx` — standard terms page for a printing services business.
**File:** `src/App.tsx` — add route `/terms`.
**File:** `src/components/Footer.tsx` — link "Terms of Service" to the new route.

### 8. Security Headers Meta
**File:** `index.html` — add `<meta http-equiv="X-UA-Compatible" content="IE=edge">` and `<meta name="robots" content="index, follow">`.

---

### Files Summary

| File | Action |
|---|---|
| `index.html` | Add JSON-LD, preconnects, manifest link, apple-touch-icon, theme-color, robots meta |
| `src/components/SEO.tsx` | Add canonical, og:url, og:locale, robots props |
| `public/manifest.json` | Create (installability only) |
| `src/pages/PrivacyPolicy.tsx` | Create |
| `src/pages/Terms.tsx` | Create |
| `src/App.tsx` | Add 2 routes |
| `src/components/Footer.tsx` | Add Privacy/Terms links |

