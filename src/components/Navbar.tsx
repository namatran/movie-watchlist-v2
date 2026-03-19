"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { User } from '@/lib/types';

export default function Navbar() {
    const [search, setSearch] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user || null);
        };
        checkSession();
    }, []);

    const handleSearch = () => {
        if (search.trim()) {
            router.push(`/search?query=${encodeURIComponent(search)}`);
            setSearch('');
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        router.push("/");
    };

    return (
        <nav className="bg-black px-4 md:px-8 py-4 sticky top-0 z-50">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                {/* Left: Logo + Nav Links */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="text-white font-bold text-xl whitespace-nowrap">Movie Watchlist</Link>
                    <div className="hidden md:flex gap-6">
                        <Link href="/" className="text-white hover:text-gray-300">Home</Link>
                        <Link href="/watchlist" className="text-white hover:text-gray-300">Watchlist</Link>
                    </div>
                </div>

                {/* Right: Search + Auth */}
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    <div className="flex gap-2">
                        <input 
                            placeholder="Search..."
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") handleSearch();
                            }}
                            className="flex-1 md:flex-none px-3 py-2 rounded bg-white text-black"
                        />
                        <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Search
                        </button>
                    </div>

                    <div className="flex gap-2">
                        {user ? (
                            <>
                                <span className="text-white px-2 py-2 text-sm md:text-base">{user.email}</span>
                                <button 
                                    onClick={handleLogout} 
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="text-white px-4 py-2 rounded hover:bg-gray-700">
                                    Login
                                </Link>
                                <Link href="/signup" className="text-white px-4 py-2 rounded hover:bg-gray-700">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile: Nav Links */}
                <div className="md:hidden flex gap-6 w-full">
                    <Link href="/" className="text-white hover:text-gray-300">Home</Link>
                    <Link href="/watchlist" className="text-white hover:text-gray-300">Watchlist</Link>
                </div>
            </div>
        </nav>
    );
}