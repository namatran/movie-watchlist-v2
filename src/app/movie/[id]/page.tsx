import { getMovieDetails } from "@/lib/tmdb"
import Image from 'next/image'
import VideoPlayer from "@/components/VideoPlayer";
import WatchlistButton from "@/components/WatchlistButton";
import { MovieDetailPageProps } from "@/lib/types";

// Frontend Movie Details easy enough
export default async function MovieDetailPage({
  params,
}: MovieDetailPageProps) {
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

            <div className="mt-8 flex flex-col lg:flex-row gap-10">
                <div className="relative w-full lg:w-1/3 aspect-[2/3]">
                    <Image 
                        src={posterUrl} 
                        alt={movie.title}
                        fill
                        className="rounded-lg object-cover"
                    />
                </div>
                <div className="w-full lg:w-2/3">
                    <VideoPlayer videos={movie.videos} />
                </div>
            </div>

            <div className="text-white mt-8">
                {(movie.genres || []).map(genre => (
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
                <div className="flex gap-4 overflow-x-auto">
                    {(movie.credits?.cast || []).slice(0, 5).map(actor => (
                        <div key={actor.id} className="flex-shrink-0">
                            <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 relative">
                                <Image 
                                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                    alt={actor.name}
                                    fill
                                    className="object-cover"
                                    sizes="96px"
                                />
                            </div>
                            <p className="font-bold text-sm mt-2">{actor.name}</p>
                            <p className="text-gray-400 text-xs">{actor.character}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}