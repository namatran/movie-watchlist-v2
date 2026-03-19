import { searchMovies } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";
import { redirect } from "next/navigation";
import { SearchPageProps } from "@/lib/types";

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const params = await searchParams;
    const query = params.query;

    if (!query) {
        redirect("/");
    }

    const movies = await searchMovies(query);

    // Render results
    return (
        <main className="p-8 bg-gray-900 min-h-screen">
            <h1 className="text-4xl font-bold text-white mb-8">Results for "{query}"</h1>
            {movies.length === 0 ? (
                <p className="text-white text-lg">No results found for "{query}". Try another search.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {movies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </main>
    )
}