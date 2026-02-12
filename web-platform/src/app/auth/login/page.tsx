// Login Page
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, signInWithGoogle, signInWithGithub } from '@/lib/supabase';
import { Bot, LogIn, Loader2 } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const { data, error: signInError } = await signIn(email, password);

            if (signInError) {
                setError(signInError.message);
                return;
            }

            if (data.user) {
                router.push('/lab');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('An error occurred during login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen gradient-dark flex items-center justify-center p-4">
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500/30 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
            </div>

            <div className="relative w-full max-w-md">
                <Link href="/">
                    <div className="flex items-center justify-center gap-2 mb-8 cursor-pointer">
                        <Bot className="w-10 h-10 text-primary-500" />
                        <span className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                            LabsYi
                        </span>
                    </div>
                </Link>

                <div className="glass-dark rounded-lg p-8 glow">
                    <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
                    <p className="text-gray-400 mb-6">Sign in to access your lab sessions</p>

                    {error && (
                        <div className="mb-4 p-3 bg-danger-500/20 border border-danger-500 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="your@email.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded" />
                                <span>Remember me</span>
                            </label>
                            <Link href="/auth/reset" className="text-primary-400 hover:text-primary-300">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 gradient-primary text-white rounded-lg font-bold glow transform hover:scale-105 transition-all disabled:opacity-50"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5 inline mr-2" />
                                    Sign In
                                </>
                            )}
                        </button>
                    </form>

                    <div className="my-6 flex items-center gap-4">
                        <div className="flex-1 h-px bg-white/10" />
                        <span className="text-sm text-gray-500">or continue with</span>
                        <div className="flex-1 h-px bg-white/10" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={async () => await signInWithGoogle()}
                            className="px-4 py-3 glass hover:bg-white/20 rounded-lg transition-colors font-semibold"
                        >
                            Google
                        </button>
                        <button
                            type="button"
                            onClick={async () => await signInWithGithub()}
                            className="px-4 py-3 glass hover:bg-white/20 rounded-lg transition-colors font-semibold"
                        >
                            GitHub
                        </button>
                    </div>

                    <p className="text-center text-sm text-gray-400 mt-6">
                        Don't have an account?{' '}
                        <Link href="/auth/signup" className="text-primary-400 hover:text-primary-300 font-semibold">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
