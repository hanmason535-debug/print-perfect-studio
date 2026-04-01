
# Paras Graphics — Premium Printing Website Redesign

## Overview
A modern, single-page website for Paras Graphics, a premium printing business in Ahmedabad. The site is a lead-generation tool funneling visitors to WhatsApp/phone. CMYK-inspired design system with Framer Motion animations, glassmorphism, and premium card effects.

## Pages & Sections

### 1. Fixed Header/Navbar
- PG logo monogram + "Paras Graphics" + "Premium Printing" subtitle
- Nav links: Home, Services, Portfolio, Contact (smooth scroll)
- WhatsApp (green) + Call (cyan) + Google Maps icon buttons
- Glassmorphism effect: transparent → frosted on scroll (50px threshold)
- Mobile hamburger menu with slide-down animation
- Active section indicator on nav links

### 2. Hero Section (Full Viewport)
- Dark navy gradient background with subtle printing-themed imagery
- Floating CMYK geometric shapes (cyan circle, magenta rounded square, yellow circle) with infinite float/rotate animation
- Headline: "Premium Printing" + "Solutions" (CMYK gradient text)
- Subheadline about trusted Ahmedabad print partner
- Two CTA buttons: "Upload File" (cyan, opens modal) + "WhatsApp Us" (green)
- Trust indicators: 500+ Happy Clients • 24hr Express Service • Premium Quality
- Animated scroll-down indicator (bouncing)
- Staggered entrance animations with delays

### 3. Services Grid
- Section header with CMYK gradient on "Services"
- 3-col responsive grid (3/2/1 columns for desktop/tablet/mobile)
- Cards with: image, title, description, hover lift + cyan glow shadow
- Each card clicks to WhatsApp with service-specific pre-filled message
- Initially show 9 services, "View All Services" button to expand
- Staggered scroll-triggered entrance animations
- "Get Custom Quote" CTA at bottom
- Services: Business Cards, Banners & Signs, Custom Apparel, Vinyl Stickers, Brochures & Flyers, Flex Printing, Letterheads, Envelopes, Wedding Invitations, Photo Printing, Canvas Prints, Standees, Backdrops, Posters, Pamphlets, Bill Books, Rubber Stamps, ID Cards, Certificates, Packaging

### 4. Why Choose Us (Trust Bar)
- 4-column compact feature bar (4/2/1 cols responsive)
- Fast Turnaround (cyan), Premium Quality (magenta), Affordable Pricing (yellow), Trusted Local Printer (cyan)
- Icon in colored circle + title + description
- Staggered slide-in animation, hover pulse on icons

### 5. Portfolio Gallery
- Section header with CMYK gradient on "Portfolio"
- Filter tabs (pill buttons): All, Business Cards, Banners, Stickers, Apparel, etc.
- 3-col image grid with hover overlay (dark gradient + title + category)
- Fullscreen lightbox: large image, prev/next arrows, close button, keyboard nav (←→ Esc), image counter ("3 / 12")
- "Load More" button for additional items
- AnimatePresence for filter transitions
- Placeholder/sample images for demonstration

### 6. Contact Section
- Two-column layout (form left, info right)
- Contact form: Name*, Email*, Phone, Message*, honeypot field
- Submit → "Send Message via WhatsApp" (opens WhatsApp with form data)
- Animated border beam effect around form card
- Right column: Address (→ Google Maps), Email (→ mailto), Phone (→ tel), Business Hours
- Each info item with colored icon badge, hover slide-right effect
- Google Maps embed in rounded container
- Social media links: Facebook, Instagram, LinkedIn with hover effects

### 7. Footer
- 3-column: Company info + Quick Links + Contact
- "Back to Top" button
- Copyright: © 2025 Paras Graphics, Ahmedabad
- Subtle hover effects on links (cyan color change)

### 8. Floating WhatsApp Button
- Fixed bottom-right, green circular FAB (64×64)
- WhatsApp icon + label, click → WhatsApp chat
- 2-second delayed spring entrance animation
- Pulsing green glow shadow
- Auto-dismissing tooltip "Chat with us on WhatsApp"

### 9. File Upload Modal
- Triggered from Hero "Upload File" button
- Drag-and-drop zone + click-to-browse
- Accept PDF, JPEG, PNG — max 5 files, 15MB each
- File list with status indicators
- Optional phone number field
- "Send Notification" button (EmailJS integration placeholder)
- Success/error states with visual feedback

## Design System
- **Colors:** Cyan (#0BC5EA), Magenta (#D63384), Yellow (#FFD700), Navy (#263A5E), WhatsApp Green (#22C55E)
- **Fonts:** Montserrat (headings), Inter (body) via Google Fonts
- **Signature element:** CMYK gradient text (cyan→magenta→yellow)
- **Cards:** Glassmorphism/elevated with rounded-xl, cyan glow hover shadows
- **Animations:** Framer Motion throughout — scroll-triggered (once), hover/tap feedback, spring physics
- **Shadows:** Navy-tinted premium shadows, cyan glow for interactive elements

## Technical Notes
- All data is static/mock (no backend needed)
- WhatsApp links: `https://wa.me/919377476343?text={encoded_message}`
- Phone: `tel:+919377476343`
- Framer Motion for all animations with `prefers-reduced-motion` respect
- Smooth scroll behavior for anchor navigation
- Mobile-first responsive design with touch-friendly targets (44×44px min)
