# Context — Print Perfect Studio (Paras Graphics)

## Business Context

**Paras Graphics** is a commercial printing business located in Ahmedabad, Gujarat, India, operating since 1997. The business offers a wide range of printing services including business cards, flex banners, vinyl stickers, corporate apparel, brochures, packaging, wedding invitations, certificates, ID cards, rubber stamps, and more.

- **Phone**: +91 93774 76343
- **Email**: parasgph@gmail.com
- **Address**: 2, Chandrika Chamber, Mirzapur Rd, Ahmedabad 380001
- **Hours**: Mon–Sat 11AM–8PM, Sunday Closed
- **Website**: https://parasgraphics.com

## Application Purpose

This web application serves as the primary marketing website and content management system for Paras Graphics. It has two main user-facing areas:

### Public Website (Landing Page)
A single-page marketing site with the following sections, in order:
1. **Header** — Sticky navigation with desktop mega-menu for services, mobile hamburger menu, call/WhatsApp/location CTAs, and dark/light theme toggle.
2. **Hero** — Full-screen hero with animated typewriter effect cycling through "Printing", "Branding", "Packaging", "Design". Features file upload and WhatsApp CTAs. Floating CMYK-colored decorative shapes.
3. **Stats** — Animated count-up statistics: 25+ years, 50,000+ clients, 1M+ prints, 24hr express.
4. **Services** — Grid of services fetched from Supabase. Shows 9 initially with "View All" expansion. Each card links to a WhatsApp inquiry.
5. **Why Choose Us** — Four feature cards: Fast Turnaround, Premium Quality, Affordable Pricing, Trusted Local Printer.
6. **Portfolio** — Filterable gallery (All / Business Cards / Banners / Stickers / Apparel / Brochures) fetched from Supabase. Supports images and videos. Full-screen lightbox with keyboard/touch navigation and swipe support.
7. **Testimonials** — Auto-playing Embla carousel with customer reviews.
8. **Contact** — Two-column layout: left side has a contact form (redirects to WhatsApp), right side has contact info cards, embedded Google Map, and social links. Features animated border beam effect on the form card.
9. **Footer** — Company info, quick links, contact details, privacy/terms links.

### Additional Public Pages
- `/privacy-policy` — Static privacy policy page.
- `/terms` — Static terms of service page.
- `/*` — Animated 404 page with rotating globe.

### Admin Dashboard (`/admin`)
- **Authentication** — Email/password login via Supabase Auth.
- **Portfolio Manager** — Upload images/videos to Supabase Storage (`portfolio-media` bucket), manage portfolio items with title, category, and media. Supports delete with storage cleanup.
- **Services Manager** — Upload service images to Supabase Storage (`services-media` bucket), manage services with title, description, and image. Supports delete with storage cleanup.

### File Upload System
- Modal accessible from the Hero section's "Upload File" button.
- Drag-and-drop or file browser upload (PDF, JPEG, PNG).
- Max 5 files, 15MB each.
- Uploads to Supabase Storage (`client-uploads` bucket).
- Records upload metadata in `client_uploads` table (triggers email notification via Supabase DB webhook + Resend API).
- Rate limited: 1 upload per hour per device (localStorage-based).
- Post-upload: prompts user to confirm on WhatsApp with order details.
- Phone number validation: Indian mobile (10-digit, starting with 6-9).

## Supabase Schema

### Tables
| Table | Columns | Purpose |
|---|---|---|
| `portfolio` | `id`, `title`, `category`, `media_url`, `is_video`, `created_at` | Portfolio gallery items |
| `services` | `id`, `title`, `description`, `media_url`, `created_at` | Service offerings |
| `client_uploads` | `id`, `phone`, `file_names` (jsonb array), `created_at` | Client file upload records |

### Storage Buckets
| Bucket | Access | Purpose |
|---|---|---|
| `portfolio-media` | Public | Portfolio images and videos |
| `services-media` | Public | Service card images |
| `client-uploads` | Authenticated | Customer file uploads |

### Database Triggers
- `send_upload_email()` — Postgres function triggered on `client_uploads` INSERT. Sends email via Resend API to `parasgph@gmail.com` with customer phone, file count, and file list.

## Design System

### Color Palette (CSS Variables)
| Token | Light | Dark | Usage |
|---|---|---|---|
| `--navy` | `215 40% 25%` | (same) | Hero bg, dark sections |
| `--cyan` | `191 85% 50%` | (same) | Primary accent, CTAs |
| `--magenta` | `320 85% 50%` | (same) | Secondary accent |
| `--yellow` | `51 100% 50%` | (same) | Tertiary accent |
| `--whatsapp` | `142 71% 45%` | (same) | WhatsApp-related elements |
| `--background` | White | Dark navy | Page background |
| `--foreground` | Dark navy | Light gray | Text color |
| `--card` | White | Darker navy | Card backgrounds |
| `--muted` | Light gray | Dark gray | Muted backgrounds |
| `--charcoal` | `215 20% 20%` | (same) | Footer background |

### Typography
- **Headings**: Montserrat (400–800 weight), applied via `font-heading` class
- **Body**: Inter (300–700 weight), applied via `font-body` class

### Custom CSS Utilities (defined in `src/index.css`)
| Class | Effect |
|---|---|
| `.text-cmyk-gradient` | Cyan → Magenta → Yellow gradient text |
| `.shadow-cyan-glow` | Cyan glow box-shadow |
| `.shadow-premium` | Premium depth shadow |
| `.hover-lift` | Translate up + shadow on hover |
| `.focus-ring-glow` | Soft cyan ring on input focus |
| `.shine-sweep` | Diagonal light sweep on hover (pseudo-element) |
| `.underline-slide` | Underline that grows from left on hover |
| `.icon-breathe` | Gentle scale pulse keyframe animation |

### Animation Patterns
- **Entrance**: Framer Motion `initial` → `whileInView` with staggered delays
- **Hover**: CSS transitions (`transform`, `box-shadow`, `border-color`, `color`)
- **Micro-interactions**: CSS keyframes (`icon-breathe`, `pulse-glow`, `border-beam`)
- **Accessibility**: `prefers-reduced-motion: reduce` disables keyframe animations

## SEO & PWA

- **Meta tags**: Managed by React Helmet Async via `<SEO>` component on each page.
- **Structured data**: JSON-LD `LocalBusiness` schema in `index.html`.
- **Open Graph**: Title, description, and image tags in `index.html`.
- **PWA**: Basic `manifest.json` with standalone display mode.
- **Sitemap**: Static `public/sitemap.xml`.
- **Robots**: `public/robots.txt` allows all crawlers.

## Performance Optimizations

1. **Tab visibility** — `useTabVisibility` hook adds `pause-animations` class to body when tab is hidden, halting all CSS animations/transitions.
2. **Image prefetching** — `prefetchImages()` utility loads service and portfolio images during browser idle time via `requestIdleCallback`.
3. **Progressive images** — `ProgressiveImage` component for lazy-loaded images with blur-up placeholders.
4. **Code splitting** — Vite handles automatic chunk splitting. Pages are directly imported (no lazy loading currently).
5. **Font loading** — Google Fonts with `display=swap` for non-blocking text rendering.
6. **GPU-accelerated animations** — `will-change: transform` on animated elements. No CSS blur on floating decorative shapes.
