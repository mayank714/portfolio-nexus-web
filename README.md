# Portfolio Nexus Web

> A modern, fully dynamic portfolio/resume frontend built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. Powered by the [Portfolio Nexus API](../portfolio-nexus-api).

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Pages & Routes](#pages--routes)
- [Portfolio Sections](#portfolio-sections)
- [API Integration](#api-integration)
- [Admin Dashboard](#admin-dashboard)
- [Theming & Styling](#theming--styling)
- [Scripts](#scripts)

---

## Overview

Portfolio Nexus Web is a single-page portfolio application that renders every section dynamically from the backend API — no hardcoded data. It's designed to serve as a living resume showcasing projects, skills, work experience, education, achievements, certifications, testimonials, and a working contact form.

Features:
- **Fully dynamic** — all content fetched from the REST API
- **Dark / light mode** toggle with `localStorage` persistence
- **Framer Motion** animations on scroll and on load
- **Responsive** — mobile-first design with a collapsible navbar
- **Contact form** with validation (Zod + React Hook Form) and toast notifications
- **Admin dashboard** with JWT login and portfolio stats overview

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org) 14 (App Router) |
| Language | TypeScript 5 |
| Styling | [Tailwind CSS](https://tailwindcss.com) v3 |
| Animations | [Framer Motion](https://www.framer.com/motion) v11 |
| HTTP Client | [Axios](https://axios-http.com) |
| Forms | React Hook Form + Zod |
| Icons | Lucide React + React Icons |
| Notifications | React Hot Toast |
| Typing Effect | react-type-animation |

---

## Project Structure

```
portfolio-nexus-web/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout (fonts, Toaster)
│   ├── globals.css             # Tailwind base + custom utilities
│   ├── page.tsx                # Home — full single-page portfolio
│   ├── about/page.tsx
│   ├── projects/page.tsx
│   ├── experience/page.tsx
│   ├── education/page.tsx
│   ├── achievements/page.tsx
│   ├── certifications/page.tsx
│   ├── testimonials/page.tsx
│   ├── contact/page.tsx
│   └── admin/page.tsx          # Admin dashboard
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky navbar with dark mode toggle
│   │   └── Footer.tsx          # Footer with social links
│   ├── sections/               # One component per portfolio section
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── EducationSection.tsx
│   │   ├── AchievementsSection.tsx
│   │   ├── CertificationsSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── ContactSection.tsx
│   ├── ui/
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── SectionHeader.tsx
│   └── admin/
│       └── AdminLogin.tsx
├── hooks/
│   └── usePortfolio.ts         # All data-fetching hooks + theme hook
├── lib/
│   ├── api.ts                  # Axios API client (all endpoints)
│   └── utils.ts                # formatDate, groupBy, proficiency %, etc.
├── types/
│   └── index.ts                # TypeScript interfaces for all API entities
├── public/                     # Static assets
├── tailwind.config.ts
├── next.config.mjs
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- [Portfolio Nexus API](../portfolio-nexus-api) running on port 3001

### Installation

```bash
# Clone or enter the directory
cd portfolio-nexus-web

# Install dependencies
npm install

# Copy and configure environment
cp .env.local.example .env.local

# Start development server
npm run dev
```

Open **http://localhost:3000** in your browser.

> Make sure the API is running at `http://localhost:3001` before starting the frontend.

---

## Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

Change the URL to point to your deployed backend for production.

---

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Full single-page portfolio (all sections) |
| `/about` | About / profile section standalone |
| `/projects` | Projects listing with category filter |
| `/experience` | Work experience timeline |
| `/education` | Academic qualifications |
| `/achievements` | Awards, hackathons & milestones |
| `/certifications` | Professional certifications |
| `/testimonials` | Testimonials and reviews |
| `/contact` | Contact form |
| `/admin` | Admin dashboard (requires login) |

---

## Portfolio Sections

### Hero
- Animated entrance with Framer Motion
- Type-animation cycling through professional titles
- Avatar with floating badges
- CTA buttons: **Get In Touch** and **Download CV**
- Social links row
- "Open to Work" badge (conditional on profile data)

### About
- Two-column layout: avatar + stats on the left, bio on the right
- Quick stats: years of experience, languages spoken, interests count
- Contact info (email, phone, location)
- Language and interest tags

### Skills
- Category filter tabs (All, Frontend, Backend, etc.)
- Animated progress bars per skill
- Proficiency label (Beginner → Expert)
- Tech tag cloud summary at the bottom

### Projects
- Category filter tabs (All, Web, Mobile, API, etc.)
- Cards with: image, status badge, tech stack chips, live demo & GitHub links
- Featured star indicator

### Work Experience
- Vertical timeline layout
- Company logo, employment type badge, Remote / Current indicators
- Expandable responsibilities and achievements lists
- Tech stack chips per role

### Education
- Cards per institution with degree type badge
- Grade, location, and date range
- Subjects, honors, and activities tags

### Achievements
- Two-column card grid
- Category icon (🏆 Award, 💻 Hackathon, etc.)
- Featured star indicator, rank badge, organization name

### Certifications
- Two-column card grid with issuer logo
- Issue / expiry dates with active / expired indicator
- Credential ID and "Verify Credential" link
- Skills tags

### Testimonials
- Three-column card grid
- 5-star rating display
- Relationship type badge (Manager, Colleague, etc.)
- LinkedIn link on author name

### Contact
- Left column: email, phone, location, social links
- Right column: form (name, email, phone, company, subject, message)
- Zod validation with inline error messages
- Success state with "Send Another" reset

---

## API Integration

All data is fetched client-side using custom React hooks in [`hooks/usePortfolio.ts`](hooks/usePortfolio.ts).

The Axios client in [`lib/api.ts`](lib/api.ts) handles:
- Base URL from `NEXT_PUBLIC_API_URL`
- Automatic `Authorization: Bearer <token>` injection from `localStorage`
- Automatic logout on 401 responses

### Hook examples

```ts
import { usePortfolioData } from '@/hooks/usePortfolio'

// Full portfolio data in one call
const { profile, skills, projects, experiences, loading } = usePortfolioData()

// Individual hooks
const { profile } = useProfile()
const { skills, grouped, categories } = useSkills()
const { projects } = useProjects(featuredOnly?: boolean)
const { experiences } = useExperience()
const { education } = useEducation()
const { achievements } = useAchievements()
const { certifications } = useCertifications()
const { testimonials } = useTestimonials()
const { socialLinks } = useSocialLinks()
```

### API client example

```ts
import { projectsApi, contactApi } from '@/lib/api'

// Public GET
const projects = await projectsApi.getAll()

// Admin write (token injected automatically)
const created = await projectsApi.create({ title: 'My Project', ... })

// Contact form
await contactApi.send({ name, email, subject, message })
```

---

## Admin Dashboard

Accessible at `/admin`.

- **Login** — JWT auth via `POST /api/v1/auth/login`
- **Token storage** — saved to `localStorage`, auto-injected into all API requests
- **Overview** — stats cards showing counts for all portfolio sections
- **Quick actions** — navigate to each section's management panel
- **Sidebar** — collapsible, dark themed
- **View Portfolio** link — opens the public site in a new tab

To log in use the credentials from your `.env` (`ADMIN_EMAIL` / `ADMIN_PASSWORD`).

---

## Theming & Styling

The site defaults to **dark mode**. The theme persists in `localStorage`.

### Color Palette (Tailwind custom config)

| Token | Purpose |
|-------|---------|
| `primary-*` | Blue shades — buttons, links, highlights |
| `accent-*` | Purple/pink — gradient text, featured badges |
| `dark-*` | Slate — backgrounds, borders, muted text |

### Custom Utilities (globals.css)

```css
.gradient-text       /* blue-to-purple gradient text */
.glass               /* frosted glass card */
.card-hover          /* lift + shadow on hover */
.btn-primary         /* solid blue button */
.btn-outline         /* outlined blue button */
.skill-bar           /* progress bar track */
.skill-bar-fill      /* animated gradient fill */
.input-field         /* styled form input */
.tag, .tag-primary   /* chip/pill labels */
.container-custom    /* max-w-6xl centered container */
.section-padding     /* py-16 md:py-24 */
```

---

## Scripts

```bash
npm run dev          # Start development server (port 3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npm run type-check   # TypeScript type checking (no emit)
```

---

## Related Repositories

| Repo | Description |
|------|-------------|
| **portfolio-nexus-api** | NestJS + MySQL backend API |
| **portfolio-nexus-web** (this repo) | Next.js 14 frontend portfolio |
