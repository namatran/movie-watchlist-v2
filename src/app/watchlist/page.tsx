"use client"

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import MovieCard from "@/components/MovieCard";

export default function WatchlistPage() {
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Fetch the Watchlist
    useEffect(() => {
        const fetchWatchlist = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
            router.push("/login");
            return;
        }

        const { data } = await supabase
            .from("watchlist")
            .select("*")
            .eq("user_id", session.user.id);

        setWatchlist(data || []);
        setLoading(false);
        };

        fetchWatchlist();
    }, [router]);

    if (loading) return <main className="bg-gray-900 min-h-screen p-8"><p className="text-white">Loading...</p></main>;

    return (
        <main className="p-8 bg-gray-900 min-h-screen">
            <h1 className="text-4xl font-bold text-white mb-8">My Watchlist</h1>
            
            {watchlist.length === 0 ? (
                <p className="text-white">No movies yet. Add some!</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {watchlist.map(item => (
                    <MovieCard 
                        key={item.tmdb_id} 
                        movie={{
                        id: item.tmdb_id,
                        title: item.title,
                        poster_path: item.poster_path,
                        vote_average: item.rating,
                        }} 
                    />
                ))}
                </div>
            )}
        </main>
    );
}