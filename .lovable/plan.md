

# Comprehensive UX Enhancement Plan — Paras Graphics

## Overview
Six new components/features: ScrollProgress, SEO wrapper, CookieConsent, Stats counter banner, FileUploadModal refactor with zod, and Testimonials carousel.

---

## 1. ScrollProgress.tsx — Circular scroll-to-top ring
**New file:** `src/components/ScrollProgress.tsx`

- Fixed position bottom-right (bottom-6 right-6), z-40, above WhatsAppFAB or offset from it
- Uses `framer-motion`'s `useScroll` + `useSpring` to get `scrollYProgress`
- Renders an SVG circle (44px diameter) with `pathLength` driven by spring-smoothed scroll progress
- Circle stroke uses the cyan gradient color; background ring in muted color
- Center: ArrowUp icon from lucide-react
- `onClick` → `window.scrollTo({ top: 0, behavior: "smooth" })`
- Only visible when scrolled past ~10% (opacity transition)
- **Footer change:** Remove the "Back to Top" button from `Footer.tsx` bottom bar
- **Mount in:** `Index.tsx` alongside WhatsAppFAB

## 2. SEO.tsx — Dynamic meta tags with react-helmet-async
**Install:** `react-helmet-async`
**New file:** `src/components/SEO.tsx`

- Reusable component accepting `title`, `description`, `ogImage?` props
- Uses `<Helmet>` to set `<title>`, `<meta name="description">`, and OG tags
- **App.tsx:** Wrap `BrowserRouter` children with `<HelmetProvider>`
- **Index.tsx:** `<SEO title="Paras Graphics — Premium Printing in Ahmedabad" description="..." />`
- **NotFound.tsx:** `<SEO title="Page Not Found — Paras Graphics" description="..." />`
- Update `index.html` title to a generic fallback: "Paras Graphics"

## 3. CookieConsent.tsx — Animated consent banner
**New file:** `src/components/CookieConsent.tsx`

- Checks `localStorage.getItem("cookie-consent")` on mount
- If not set, renders a fixed bottom banner sliding up via `framer-motion`
- Styled with `bg-card text-foreground border-t border-border` + shadow
- Text: "We use cookies to enhance your experience..."
- Two shadcn `<Button>` components: "Accept All" (default variant) and "Preferences" (outline variant, no-op/toast for now)
- "Accept All" sets `localStorage.setItem("cookie-consent", "accepted")` and dismisses
- **Mount in:** `App.tsx` globally, outside Routes

## 4. Stats.tsx — Animated count-up banner
**New file:** `src/components/Stats.tsx`

- Placed in `Index.tsx` between `<Hero />` and `<Services />`
- 4 metrics in a responsive grid (2×2 on mobile, 4×1 on desktop):
  - `25+` Years Experience
  - `50,000+` Happy Clients
  - `1,000,000+` Prints Delivered (displayed as `1M+`)
  - `24hr` Express Delivery
- Uses `useInView` from framer-motion to trigger count-up
- Custom `useCountUp` hook: animates from 0 to target using `requestAnimationFrame` over ~2 seconds with easing
- Section styled with `bg-navy text-primary-foreground` with subtle CMYK accent borders/dividers
- Each stat card has an icon from lucide-react

## 5. FileUploadModal.tsx — Refactor with react-hook-form + zod
**Edit:** `src/components/FileUploadModal.tsx`

- Define zod schema: `phone` (optional string, validated phone pattern), `files` (array min 1, max 5)
- Wrap form in `useForm` with `zodResolver`
- Dropzone keeps existing drag-and-drop but enhanced:
  - `border-dashed border-2 border-border` default
  - On drag hover: `border-solid border-cyan bg-cyan/5` (transition-all)
- On submit: show a fake 2-second upload progress bar using the existing `<Progress />` component from `src/components/ui/progress.tsx`
  - Animate value from 0→100 over 2s using `setInterval`
  - On complete, show success state
- Form errors displayed via react-hook-form's `formState.errors`

## 6. Testimonials.tsx — Embla carousel with star ratings
**New file:** `src/components/Testimonials.tsx`

- Inserted in `Index.tsx` right above `<Contact />`
- Uses `embla-carousel-react` (already installed) with autoplay (3s interval)
- 4 testimonial cards with Indian names:
  1. Rajesh Mehta — Business owner, 5 stars
  2. Priya Sharma — Event planner, 5 stars
  3. Amit Patel — Marketing manager, 4 stars
  4. Sneha Desai — Boutique owner, 5 stars
- Each card: avatar initial circle, name, role, star rating (lucide `Star` filled), quote text
- Styled with `bg-navy text-primary-foreground` section, cards use glassmorphism (`bg-white/5 backdrop-blur border border-white/10`)
- Section header with fade-in-up on scroll
- Dot indicators for carousel position

---

## Files Modified
| File | Action |
|------|--------|
| `src/components/ScrollProgress.tsx` | Create |
| `src/components/SEO.tsx` | Create |
| `src/components/CookieConsent.tsx` | Create |
| `src/components/Stats.tsx` | Create |
| `src/components/Testimonials.tsx` | Create |
| `src/components/FileUploadModal.tsx` | Refactor |
| `src/components/Footer.tsx` | Remove "Back to Top" button |
| `src/pages/Index.tsx` | Add Stats, Testimonials, ScrollProgress |
| `src/pages/NotFound.tsx` | Add SEO component |
| `src/App.tsx` | Add HelmetProvider, CookieConsent |
| `index.html` | Update fallback title |
| `package.json` | Add react-helmet-async |

