# Print Perfect Studio — Paras Graphics

> Premium printing services website for **Paras Graphics**, Ahmedabad's trusted print partner since 1997.

![React](https://img.shields.io/badge/React-18-blue?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss) ![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase)

## Overview

A modern, responsive single-page application built with React and TypeScript that serves as the marketing website and content management system for Paras Graphics. Features a public-facing landing page with services, portfolio gallery, testimonials, and contact form, plus a protected admin dashboard for managing content via Supabase.

## Features

- **Landing Page** — Hero with typewriter animation, animated stats, service cards, filterable portfolio gallery with lightbox, testimonials carousel, and WhatsApp-integrated contact form
- **Admin Dashboard** — Supabase Auth login, portfolio CRUD (image/video uploads), services CRUD with Supabase Storage
- **File Upload System** — Drag-and-drop file upload modal with Supabase Storage, email notifications via Resend, and WhatsApp confirmation flow
- **Dark/Light Theme** — CSS variable-based theming with `next-themes`
- **Performance Optimized** — Tab visibility animation pausing, idle-time image prefetching, progressive image loading, GPU-accelerated animations
- **SEO Ready** — React Helmet Async, JSON-LD structured data, Open Graph tags, sitemap, robots.txt
- **PWA Ready** — Web app manifest for standalone mode
- **Accessibility** — Respects `prefers-reduced-motion`, keyboard navigation in lightbox

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite 5 (SWC) |
| Styling | Tailwind CSS 3 + shadcn/ui |
| Animations | Framer Motion + CSS keyframes |
| Routing | React Router DOM v6 |
| Backend | Supabase (Auth, Postgres, Storage) |
| Forms | React Hook Form + Zod |
| Carousel | Embla Carousel |
| Icons | Lucide React |

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Supabase project with the required tables and storage buckets (see [context.md](./context.md))

### Installation

```bash
# Clone the repository
git clone https://github.com/hanmason535-debug/print-perfect-studio.git
cd print-perfect-studio

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development

```bash
npm run dev        # Start dev server at http://localhost:8080
```

### Build & Preview

```bash
npm run build      # Production build to dist/
npm run preview    # Preview production build locally
```

### Linting & Testing

```bash
npm run lint       # ESLint
npm run test       # Vitest (unit tests)
npm run test:watch # Vitest watch mode
```

## Project Structure

```
src/
├── pages/               # Route-level page components
│   ├── Index.tsx        # Landing page
│   ├── Admin.tsx        # Admin dashboard
│   ├── NotFound.tsx     # 404 page
│   ├── PrivacyPolicy.tsx
│   └── Terms.tsx
├── components/          # Reusable components
│   ├── Header.tsx       # Sticky navigation
│   ├── Hero.tsx         # Hero with typewriter
│   ├── Services.tsx     # Services grid (Supabase)
│   ├── Portfolio.tsx    # Portfolio gallery (Supabase)
│   ├── Contact.tsx      # Contact form
│   ├── FileUploadModal.tsx  # File upload system
│   ├── admin/           # Admin CRUD managers
│   └── ui/              # shadcn/ui components
├── hooks/               # Custom React hooks
├── lib/                 # Utilities (Supabase client, helpers)
└── assets/              # Static images
```

## Supabase Setup

### Database Tables

1. **`portfolio`** — `id` (uuid), `title` (text), `category` (text), `media_url` (text), `is_video` (boolean), `created_at` (timestamptz)
2. **`services`** — `id` (uuid), `title` (text), `description` (text), `media_url` (text), `created_at` (timestamptz)
3. **`client_uploads`** — `id` (uuid), `phone` (text), `file_names` (jsonb), `created_at` (timestamptz)

### Storage Buckets

- `portfolio-media` — Public, for portfolio images/videos
- `services-media` — Public, for service card images
- `client-uploads` — Authenticated, for customer file uploads

### Email Trigger

Run `update-email-trigger.sql` in the Supabase SQL Editor to set up the email notification trigger for new file uploads.

## Documentation

- **[agent.md](./agent.md)** — AI agent instructions for working with this codebase
- **[context.md](./context.md)** — Detailed technical context including business info, design system, and architecture decisions

## License

Private — All rights reserved by Paras Graphics, Ahmedabad.
