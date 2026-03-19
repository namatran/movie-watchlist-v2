import { getPopularMovies } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";

export default async function Home() {
  const movies = await getPopularMovies(); {/* Fetches the movies using the function */}

  // Render popular movies
  return (
    <main className="p-8 bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-8">Popular Movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6"> {/* Grid Layout */}
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main> 
  );
}