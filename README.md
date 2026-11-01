# The Central Echo - Student Publication Website

A modern, performant Next.js 15+ website for **The Central Echo** (Central Philippine University's official student publication), built with headless WordPress CMS integration.

## Features

### Core
- **Headless WordPress Integration** - Fetches content via WP REST API (`/wp-json/wp/v2/`)
- **Mock Data Fallback** - Works offline during development
- **TypeScript** - Full type safety across the codebase
- **Tailwind CSS v4** - Utility-first styling with custom design system

### Content Features
- **Home Page** - Hero carousel + category sections (Opinion, Feature, Literary, Sports)
- **Category Pages** - Paginated archives with spotlight article + grid
- **Article Pages** - Full content rendering with SEO metadata
- **Search** - Real-time modal search with keyboard navigation
- **Related Articles** - Same-category suggestions on article pages

### Technical Features
- **Animations** - Framer Motion throughout (page transitions, hover effects, stagger)
- **Image Optimization** - Next.js Image with proper sizing, priority loading
- **SEO** - Sitemap.xml, robots.txt, RSS feed, Open Graph metadata
- **Accessibility** - Semantic HTML, ARIA labels, focus management, keyboard nav
- **Error Boundaries** - Graceful fallbacks for failed WP requests
- **Loading States** - Skeleton screens for all dynamic pages

### Performance
- **ISR (Incremental Static Regeneration)** - 60s revalidation for content
- **Parallel Data Fetching** - Home page loads all sections simultaneously
- **Code Splitting** - Automatic per-route bundles

## Getting Started

### Prerequisites
- Node.js 18+
- WordPress instance (local or remote) with REST API enabled

### Installation

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Edit .env.local with your WordPress URL
# WORDPRESS_API_URL=http://localhost:8080

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### WordPress Setup

1. Install WordPress (LocalWP, Docker, or Hostinger VPS)
2. Create categories with these **exact slugs**:
   - `opinion`
   - `feature`
   - `literary`
   - `sports`
3. Add posts with **Featured Images**
4. Enable pretty permalinks: `/%postname%/`
5. Test API: `curl https://your-site.com/wp-json/wp/v2/posts`

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `WORDPRESS_API_URL` | Yes | Base URL of WordPress site (e.g., `https://cms.example.com`) |
| `WORDPRESS_API_USER` | No | Username for Application Password auth |
| `WORDPRESS_API_PASSWORD` | No | Application Password for auth |
| `NEXT_PUBLIC_SITE_URL` | No | Production URL for sitemap/RSS (e.g., `https://centralecho.edu.ph`) |

## Project Structure

```
├── app/
│   ├── page.tsx                 # Home page
│   ├── articles/[slug]/         # Article detail pages
│   ├── categories/[slug]/       # Category archive pages
│   ├── api/
│   │   ├── categories/          # Categories API for nav
│   │   └── search/              # Search API with rate limiting
│   ├── sitemap.ts               # Dynamic sitemap generation
│   ├── robots.ts                # Robots.txt
│   └── feed.xml/route.ts        # RSS 2.0 feed
├── components/
│   ├── Home/                    # Home page components
│   ├── CategoryPage/            # Category page components
│   ├── Navbar.tsx               # Navigation with search modal
│   ├── SearchModal.tsx          # Animated search overlay
│   ├── ArticleContent.tsx       # Article layout
│   ├── RelatedArticles.tsx      # Related articles grid
│   └── Pagination.tsx           # Category pagination
├── lib/
│   ├── wordpress/
│   │   ├── api.ts               # WP REST API client
│   │   └── types.ts             # WP API TypeScript types
│   ├── posts.ts                 # Data abstraction layer (WP + mock)
│   ├── content.ts               # Article type & date formatting
│   └── mock/articles.ts         # Development placeholder data
└── public/assets/               # Static images (logos, placeholders)
```

## Key Commands

```bash
npm run dev      # Development server (Turbopack)
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
```

## Deployment

### Recommended: Single Hostinger VPS
- WordPress (Docker) on port 8080
- Next.js on port 3000
- Nginx reverse proxy
- Internal WP URL: `http://localhost:8080`

### Alternative: Vercel + Separate WP Host
- Next.js → Vercel
- WordPress → Hostinger / WP Engine / WordPress.com
- Update `WORDPRESS_API_URL` and `NEXT_PUBLIC_SITE_URL`

## Scripts & Automation

- **Conventional Commits** - `feat:`, `fix:`, `chore:`, `refactor:`
- **TypeScript strict mode** - No `any`, full inference
- **ESLint + Prettier** - Code quality

## License

MIT - Built for The Central Echo student publication.