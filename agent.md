# Agent Instructions — Print Perfect Studio (Paras Graphics)

## Project Overview

This is a **React + TypeScript SPA** for **Paras Graphics**, a premium printing services business in Ahmedabad, India (est. 1997). The site is a marketing website with a Supabase-powered admin dashboard for managing portfolio items and services.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5 (SWC plugin) |
| Styling | Tailwind CSS 3 + CSS variables (dark/light theme) |
| UI Library | shadcn/ui (Radix UI primitives) |
| Animations | Framer Motion + CSS keyframes |
| Routing | React Router DOM v6 |
| State | React Query (TanStack) + local useState |
| Backend | Supabase (Auth, Database, Storage) |
| Forms | React Hook Form + Zod validation |
| Carousel | Embla Carousel |
| Icons | Lucide React |
| Fonts | Montserrat (headings) + Inter (body) via Google Fonts |

## Project Structure

```
src/
├── App.tsx                  # Root app — routes, providers
├── main.tsx                 # Entry point
├── index.css                # Global styles, CSS variables, utility classes
├── pages/
│   ├── Index.tsx            # Landing page (assembles all sections)
│   ├── Admin.tsx            # Admin dashboard (auth + portfolio/services CRUD)
│   ├── NotFound.tsx         # Animated 404 page
│   ├── PrivacyPolicy.tsx    # Static privacy policy
│   └── Terms.tsx            # Static terms of service
├── components/
│   ├── Header.tsx           # Sticky nav with NavigationMenu dropdown
│   ├── Hero.tsx             # Hero section with typewriter effect
│   ├── Stats.tsx            # Animated count-up statistics
│   ├── Services.tsx         # Services grid (fetched from Supabase)
│   ├── WhyChooseUs.tsx      # Feature cards
│   ├── Portfolio.tsx        # Filterable portfolio gallery with lightbox
│   ├── Testimonials.tsx     # Auto-playing carousel testimonials
│   ├── Contact.tsx          # Contact form → WhatsApp redirect
│   ├── Footer.tsx           # Site footer
│   ├── FileUploadModal.tsx  # File upload modal (Supabase Storage)
│   ├── WhatsAppFAB.tsx      # Floating WhatsApp button
│   ├── ScrollProgress.tsx   # Scroll-to-top + progress indicator
│   ├── SEO.tsx              # React Helmet Async for meta tags
│   ├── ThemeToggle.tsx      # Dark/light theme switcher
│   ├── NavLink.tsx          # Navigation link component
│   ├── MaterialSwatches.tsx # Material swatch display
│   ├── OurProcess.tsx       # Process steps
│   └── admin/
│       ├── PortfolioManager.tsx  # CRUD for portfolio items
│       └── ServicesManager.tsx   # CRUD for services
├── components/ui/           # shadcn/ui components (DO NOT modify directly)
├── hooks/
│   ├── use-mobile.tsx       # Mobile breakpoint detection
│   ├── use-toast.ts         # Toast notification hook
│   └── useTabVisibility.ts  # Pauses animations when tab is hidden
├── lib/
│   ├── supabase.ts          # Supabase client init
│   ├── prefetcher.ts        # Image prefetching utility
│   └── utils.ts             # cn() utility (clsx + tailwind-merge)
└── registry/
    └── magicui/
        └── border-beam.tsx  # Animated border beam effect
```

## Key Commands

```bash
npm run dev        # Start dev server (port 8080)
npm run build      # Production build
npm run lint       # ESLint check
npm run test       # Run vitest tests
npm run preview    # Preview production build
```

## Architecture Decisions

1. **No SSR** — Pure client-side SPA. SEO is handled via React Helmet Async and structured data in `index.html`.
2. **Supabase as backend** — Auth (email/password), Postgres tables (`portfolio`, `services`, `client_uploads`), and Storage buckets (`portfolio-media`, `services-media`, `client-uploads`).
3. **WhatsApp as primary CTA** — Contact form, file upload confirmation, and service inquiries all redirect to WhatsApp.
4. **CSS-first animations** — Custom utility classes (`shine-sweep`, `underline-slide`, `hover-lift`, `focus-ring-glow`, `icon-breathe`) in `index.css`. Framer Motion used for scroll-triggered entrance animations.
5. **Performance** — Tab visibility hook pauses animations when hidden. Image prefetching via `requestIdleCallback`. Progressive image loading.
6. **Dark mode default** — `next-themes` with `class` strategy. CSS variables toggle between light/dark palettes.

## Environment Variables

```
VITE_SUPABASE_URL=<supabase-project-url>
VITE_SUPABASE_ANON_KEY=<supabase-anon-key>
```

## Rules for Agents

1. **Do not modify `src/components/ui/`** — These are auto-generated shadcn/ui components. Use `npx shadcn-ui@latest add <component>` to add new ones.
2. **Follow the color system** — Use CSS variable-based colors (`cyan`, `magenta`, `yellow`, `navy`, `whatsapp`, etc.) defined in `index.css`. Never hardcode hex colors.
3. **Maintain animation approach** — Prefer CSS utilities from `index.css` for hover/focus effects. Use Framer Motion only for scroll-triggered entrance animations and layout transitions.
4. **Supabase patterns** — All Supabase queries use the client from `src/lib/supabase.ts`. Storage uploads go to the appropriate bucket. Database operations are in the component that needs them.
5. **Routing** — All custom routes must be added above the catch-all `*` route in `App.tsx`.
6. **Phone number** — The business phone `919377476343` is used throughout. If it needs to change, grep for it across all components.
7. **Fonts** — Headings use `font-heading` (Montserrat), body uses `font-body` (Inter). Both are loaded via Google Fonts in `index.css`.
8. **Testing** — Vitest is configured with jsdom. Tests are in `src/test/`. Playwright is set up for E2E but has no test files yet.
9. **Respect `prefers-reduced-motion`** — All keyframe animations are wrapped in a reduced-motion media query in `index.css`.
10. **Path aliases** — Use `@/` prefix which maps to `src/` (configured in Vite and tsconfig).
