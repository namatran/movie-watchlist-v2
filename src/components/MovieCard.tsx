import Link from 'next/link'
import Image from 'next/image'

export default function MovieCard({ movie }) {
    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    return (
        <Link href={`/movie/${movie.id}`}>
            <div className="cursor-pointer hover:scale-105 transition-transform">
                <div className="relative w-full aspect-[2/3]"> {/* This is using tailwind CSS and html in the component*/}
                    <Image 
                        src={posterUrl} 
                        alt={movie.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="rounded-lg object-cover"
                    />
                </div>
                <h3 className="font-bold text-white">{movie.title}</h3>
                <div className="flex justify-between items-center text-white info">
                    <div className="flex gap-2">
                        <p>{movie.release_date ? movie.release_date.slice(0, 4) : "Unknown"}</p>
                        {movie.runtime ? <p>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</p> : null}
                        <p className="text-yellow-400">⭐ {movie.vote_average}</p>
                    </div>
            </div>
            </div>
        </Link>
    );
}