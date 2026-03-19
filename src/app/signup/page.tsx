"use client"

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            router.push("/");
        }
    };

    return (
        <main className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md">
            <h1 className="text-3xl font-bold text-white mb-6">Sign Up</h1>
            
            <form onSubmit={handleSignup} className="space-y-4">
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                required
            />
            
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                required
            />

            {error && <p className="text-red-500">{error}</p>}

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700"
            >
                Sign Up
            </button>
            </form>

            <p className="text-white mt-4">
                Already have an account? <Link href="/login" className="text-blue-400">Login</Link>
            </p>
        </div>
        </main>
    );
}