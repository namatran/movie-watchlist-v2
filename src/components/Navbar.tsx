"use client"
// handles input state and navigates to /search?query=...

import { useState, useEffect } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function Navbar() {
    const [search, setSearch] = useState('');
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);
    };
        checkSession();
    }, []);

    const handleSearch = () => {
        router.push(`/search?query=${encodeURIComponent(search)}`);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        router.push("/");
    };

    return (
        <nav className="bg-black px-8 py-4">
            <div className="flex justify-between items-center">
                <Link href="/" className="text-white font-bold text-xl">Movie Watchlist</Link>

                <div className="flex gap-8">
                    <Link href="/" className="text-white py-2">Home</Link>
                    <Link href="/watchlist" className="text-white py-2">Watchlist</Link>
                    
                    <div className="flex gap-2">
                        <input 
                            placeholder="Search for movies..."
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)}
                            className="px-3 py-2 rounded bg-white"
                        />
                        <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
                            Search
                        </button>
                    </div>

                    {user ? (
                            <>
                            <span className="text-white px-4 py-2">{user.email}</span>
                            <button 
                                onClick={handleLogout} 
                                className="text-white px-4 py-2 rounded hover:bg-red-700"
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
        </nav>
    );
}