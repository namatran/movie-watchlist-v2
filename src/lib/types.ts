export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date?: string;
  runtime?: number;
  overview?: string;
  genres?: { id: number; name: string }[];
  credits?: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path?: string;
    }[];
  };
  videos?: {
    results: {
      id: string;
      key: string;
      site: string;
      type: string;
      name: string;
      official: boolean;
    }[];
  };
}

export interface WatchlistItem {
  id: string;
  user_id: string;
  tmdb_id: number;
  title: string;
  poster_path: string;
  rating: number;
  added_at: string;
}

// TMDB API Response Types
export interface TMDBMovieResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface TMDBMovieDetails extends Movie {
  // All Movie properties plus any additional details
}

// Supabase Auth Types (simplified)
export interface User {
  id: string;
  email?: string;
  // Add other user properties as needed
}

// Component Props Types
export interface VideoPlayerProps {
  videos?: Movie['videos'];
}

export interface WatchlistButtonProps {
  movie: Movie;
}

export interface MovieCardProps {
  movie: Movie;
}

// Page Props Types
export interface SearchPageProps {
  searchParams: Promise<{ query?: string }>;
}

export interface MovieDetailPageProps {
  params: Promise<{ id: string }>;
}