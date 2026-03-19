"use client"

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { WatchlistButtonProps, User } from "@/lib/types";

export default function WatchlistButton({ movie }: WatchlistButtonProps) {
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    // Fetch current user
    useEffect(() => {
        const getUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
        };
        getUser();
    }, []);

    // Check if movie is in watchlist
    useEffect(() => {
        if (!user) return;
        
        const checkWatchlist = async () => {
            const { data } = await supabase
                .from("watchlist")
                .select("id")
                .eq("user_id", user.id)
                .eq("tmdb_id", movie.id)
                .single();
            
            setIsInWatchlist(!!data);
        };
        checkWatchlist();
    }, [user, movie.id]);

    const handleToggle = async() => {
        if (!user) return; // Not logged in

        setLoading(true);

        if (isInWatchlist) {
            // Remove from Watchlist
            await supabase
                .from("watchlist")
                .delete()
                .eq("user_id", user.id)
                .eq("tmdb_id", movie.id);
        } else {
            // Add to Watchlist
            await supabase
                .from("watchlist")
                .insert({
                    user_id: user.id,
                    tmdb_id: movie.id,
                    title: movie.title,
                    poster_path: movie.poster_path,
                    rating: movie.vote_average,
                });
        }

        setIsInWatchlist(!isInWatchlist);
        setLoading(false);
    }

    if (!user) return <button className="text-gray-400">Log in to save</button>;
    
    return (
        <button
            onClick={handleToggle}
            disabled={loading}
            className={`px-4 py-2 rounded font-bold ${
                isInWatchlist
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
        >
            {loading ? "..." : isInWatchlist ? "Remove" : "Add to Watchlist"}
        </button>
    )
}