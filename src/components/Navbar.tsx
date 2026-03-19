"use client"
// handles input state and navigates to /search?query=...

import { useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const [search, setSearch] = useState('');
    const router = useRouter();

    const handleSearch = () => {
        router.push(`/search?query=${encodeURIComponent(search)}`);
    };

    return (
        <nav className="bg-gray-700  p-4">
            <div className="flex justify-between items-center">
                <Link href="/" className="text-white font-bold text-xl">Movie Watchlist</Link>

                <div className="flex gap-10">
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
                </div>
                
            </div>
        </nav>
    );
}