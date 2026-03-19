# Movie Watchlist V2

A movie discovery and watchlist app built with Next.js, React, and the TMDB API.

## Features

- Browse popular movies
- Search for movies by title
- View detailed movie information (runtime, genres, overview, cast)
- Watch official trailers with video dropdown
- Responsive design for mobile and desktop

## Tech Stack

- **Frontend**: Next.js 16, React, TypeScript, Tailwind CSS
- **Image Optimization**: Next.js Image component
- **API**: TMDB (The Movie Database) API
- **Deployment**: Vercel (planned)

## Getting Started

### Prerequisites
- Node.js 18+
- TMDB API key (get one free at https://www.themoviedb.org/settings/api)

### Installation

1. Clone the repo:
```bash
git clone <your-repo-url>
cd movie-watchlist-v2
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` and add your TMDB API key:
```
TMDB_API_KEY=your_api_key_here
```

4. Run the dev server:
```bash
npm run dev
```

5. Open http://localhost:3000 in your browser

## Project Structure
```
src/
├── app/
│   ├── page.tsx              ← Home page (popular movies)
│   ├── search/page.tsx       ← Search results
│   ├── movie/[id]/page.tsx   ← Movie detail page
│   ├── layout.tsx            ← Root layout with Navbar
│   └── globals.css
├── components/
│   ├── Navbar.tsx            ← Search bar and navigation
│   ├── MovieCard.tsx         ← Movie poster card
│   └── VideoPlayer.tsx       ← Trailer dropdown player
└── lib/
    └── tmdb.ts               ← TMDB API functions
```

## Pages

- **Home** (`/`) - Browse popular movies in a responsive grid
- **Search** (`/search?query=...`) - Search for movies and view results
- **Movie Detail** (`/movie/[id]`) - Full movie info, cast, trailer, and reviews

## Next Steps

- Phase 4: User authentication with Supabase
- Phase 5: Per-user watchlist database
- Phase 6: Add to watchlist functionality

---

Built as a portfolio project