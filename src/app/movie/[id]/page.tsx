import { getMovieDetails } from "@/lib/tmdb"
import Image from 'next/image'
import VideoPlayer from "@/components/VideoPlayer";
import WatchlistButton from "@/components/WatchlistButton";

// Frontend Movie Details easy enough
export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
    const { id } = await params
    const movie = await getMovieDetails(id)
    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
 
    return (
        <main className="p-8 bg-gray-900 min-h-screen">
            <h1 className="text-4xl font-bold text-white mb-4">{movie.title}</h1>

            <div className="flex justify-between items-center text-white info">
                <div className="flex gap-4">
                    <p>{movie.release_date ? movie.release_date.slice(0, 4) : "Unknown"}</p>
                    {movie.runtime ? <p>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</p> : null}
                    <p className="text-yellow-400">⭐ {movie.vote_average}</p>
                </div>
                <WatchlistButton movie={movie}/>
            </div>

            <div className="mt-8 flex gap-10"> {/* max-w-sm = max 24rem width */}
                <div className="relative w-full aspect-[2/3] max-w-sm">
                    <Image 
                    src={posterUrl} 
                    alt={movie.title}
                    fill
                    className="rounded-lg object-cover"
                    />
                </div> 

                <VideoPlayer videos={movie.videos} />
            </div>

            <div className="text-white mt-8">
                {movie.genres.map(genre => (
                    <span key={genre.id} className="bg-gray-700 px-2 py-1 rounded mr-2 inline-block text-sm">
                        {genre.name}
                    </span>
                ))}
            </div>

            <div className="text-white mt-8">
                <h2 className="text-2xl font-bold mb-4">Overview</h2>
                <p className="leading-relaxed">{movie.overview}</p>
            </div>

            <div className="text-white mt-8">
                <h2 className="text-2xl font-bold mb-4">Top Cast</h2>
                <div className="flex gap-4">
                    {movie.credits.cast.slice(0, 5).map(actor => (
                    <div key={actor.id}>
                        <p className="font-bold">{actor.name}</p>
                        <p className="text-gray-400">{actor.character}</p>
                    </div>
                    ))}
                </div>
            </div>
        </main>
    )
}