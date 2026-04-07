

# Micro-Animation Polish — Premium Feel Enhancement

## Overview
Add subtle, CSS-based micro-interactions and shadow refinements across all components to create a rich, polished, "micro-detailed" feel without impacting performance. Focus on CSS transitions/transforms (GPU-accelerated), avoiding new JS animation libraries.

---

## Animations to Add

### 1. Global CSS Utilities (src/index.css)
Add reusable utility classes:
- **`.hover-lift`** — `transition: transform 0.3s, box-shadow 0.3s; &:hover { transform: translateY(-2px); box-shadow: 0 8px 24px -8px hsl(var(--navy) / 0.2) }`
- **`.focus-ring-glow`** — Input focus effect: `box-shadow: 0 0 0 3px hsl(var(--cyan) / 0.15)` with smooth transition
- **`.shine-sweep`** — A `::after` pseudo-element with a 45deg white gradient that sweeps left-to-right on hover (for buttons/cards)
- **`.underline-slide`** — Link underline that slides in from left on hover using `scaleX` transform
- **`.icon-breathe`** — Subtle `scale(1) → scale(1.08) → scale(1)` keyframe loop (3s, very gentle) for accent icons

### 2. Header.tsx
- **Nav links**: Add `underline-slide` effect — a thin cyan underline that grows from left on hover
- **CTA buttons (Call/WhatsApp)**: Add `shine-sweep` — a diagonal light sweep on hover
- **Active nav pill**: Add a subtle `transition: background 0.3s, color 0.3s` with a very slight scale bump (`scale(1.02)`) on active

### 3. Hero.tsx
- **CTA buttons**: Add `shine-sweep` overlay for the "Upload File" gradient button — a white glint that sweeps across on hover
- **Trust indicator icons**: Add `icon-breathe` animation (each with staggered `animation-delay`) for a living feel
- **Scroll indicator**: Already animated, but add `opacity` transition so it fades out when user starts scrolling (CSS-only via a class toggle)

### 4. Stats.tsx
- **Stat icons**: Add a subtle `transition: transform 0.3s` with `hover:scale-110 hover:rotate-6` on each icon
- **Stat number**: Add `tabular-nums` font-feature for alignment during count-up
- **Dividers**: Add thin vertical `border-right` dividers between stats (desktop only) with `opacity: 0.15` for a refined grid feel

### 5. Services.tsx
- **Card image overlay**: Add a subtle `backdrop-filter: blur(4px)` to the hover overlay gradient for a frosted-glass peek
- **Card title**: On hover, shift title text color from `foreground` to `cyan` with `transition: color 0.3s`
- **"View All Services" button**: Add `shine-sweep` effect

### 6. WhyChooseUs.tsx
- **Icon containers**: Add a soft `transition: background-color 0.3s` that intensifies the bg color on hover (e.g., `cyan/15 → cyan/25`)
- **Cards**: Already have hover lift; add a thin `border-bottom: 2px solid transparent` that transitions to `border-cyan` on hover for an accent line effect

### 7. Portfolio.tsx
- **Filter tabs**: Active tab gets a subtle `shadow-[0_2px_8px_-2px_hsl(var(--cyan)/0.3)]` for a glowing active state
- **Cards**: Add `transition: border-color 0.4s` so border subtly glows cyan on hover

### 8. Testimonials.tsx
- **Carousel cards**: Add `transition: border-color 0.3s, background 0.3s` — on hover, border goes from `white/10 → cyan/30` and bg from `white/5 → white/8`
- **Avatar initials circle**: Add `transition: transform 0.3s; hover:scale-110` for a pop effect
- **Dot indicators**: Expand active dot with a `transition: width 0.3s ease` (already partially done, just ensure the cubic-bezier is premium)

### 9. Contact.tsx
- **Form inputs**: Add `focus-ring-glow` — on focus, inputs get a soft cyan outer glow ring instead of a harsh outline
- **Contact info cards**: Add a left-border accent that slides in on hover (`border-left: 3px solid transparent → cyan`)
- **Social icons**: Add `transition: transform 0.3s, border-color 0.3s` with `hover:rotate-[8deg]` for a playful micro-tilt
- **Submit button**: Add `shine-sweep` effect

### 10. Footer.tsx
- **Quick links**: Add `underline-slide` — cyan underline grows from left on hover
- **PG monogram**: Already has hover scale; add a subtle `box-shadow` glow transition on hover (`shadow-[0_0_12px_hsl(var(--cyan)/0.3)]`)
- **Bottom divider**: Replace solid border with a `bg-gradient-to-r from-transparent via-border to-transparent` for a fading line effect

### 11. WhatsAppFAB.tsx
- Already has pulse-glow. Add `hover:shadow-[0_0_30px_8px_hsl(var(--whatsapp)/0.4)]` transition for a deeper glow on hover.

### 12. ScrollProgress.tsx
- Add `hover:shadow-[0_0_12px_hsl(var(--cyan)/0.3)]` transition on the circular button for a soft glow on hover.

---

## Technical Approach
- Most animations are **pure CSS** via Tailwind utility classes and `@layer utilities` in `index.css`
- The `shine-sweep` uses a `::after` pseudo-element with `background: linear-gradient(...)` and `translateX` animation on hover — zero JS
- `icon-breathe` is a CSS `@keyframes` with `will-change: transform` for GPU acceleration
- No new dependencies
- All transitions use `cubic-bezier(0.4, 0, 0.2, 1)` or `ease-out` for premium feel
- Respects `prefers-reduced-motion: reduce` — wrap keyframe animations in a media query

## Files Changed

| File | Action |
|---|---|
| `src/index.css` | Add utility classes, keyframes, reduced-motion query |
| `src/components/Header.tsx` | Add hover effects to nav links and CTA buttons |
| `src/components/Hero.tsx` | Add shine-sweep to CTA, icon-breathe to trust items |
| `src/components/Stats.tsx` | Add icon hover, tabular-nums, visual dividers |
| `src/components/Services.tsx` | Add title color transition, backdrop-blur on overlay |
| `src/components/WhyChooseUs.tsx` | Add icon bg intensify, bottom border accent |
| `src/components/Portfolio.tsx` | Add filter tab glow, card border transition |
| `src/components/Testimonials.tsx` | Add card hover glow, avatar pop, dot transition |
| `src/components/Contact.tsx` | Add input glow, social icon tilt, border accent |
| `src/components/Footer.tsx` | Add link underlines, monogram glow, gradient divider |
| `src/components/WhatsAppFAB.tsx` | Deepen hover glow |
| `src/components/ScrollProgress.tsx` | Add hover glow |

