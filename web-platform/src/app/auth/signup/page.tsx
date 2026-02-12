// Sign Up Page
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        setIsLoading(true);

        try {
            // TODO: Implement Firebase authentication
            console.log('Sign up:', formData);

            // For demo, redirect to booking
            setTimeout(() => {
                router.push('/booking');
            }, 1000);
        } catch (error) {
            console.error('Sign up error:', error);
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
                        <div className="text-3xl">🤖</div>
                        <span className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                            LeLab
                        </span>
                    </div>
                </Link>

                <div className="glass-dark rounded-lg p-8 glow">
                    <h1 className="text-2xl font-bold mb-2">Create Account</h1>
                    <p className="text-gray-400 mb-6">Start your robotics learning journey</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="John Doe"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="your@email.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="••••••••"
                                required
                                minLength={8}
                            />
                            <p className="text-xs text-gray-500 mt-1">At least 8 characters</p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <label className="flex items-start gap-2 text-sm">
                            <input type="checkbox" className="mt-1 rounded" required />
                            <span className="text-gray-400">
                                I agree to the{' '}
                                <Link href="/terms" className="text-primary-400 hover:text-primary-300">
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link href="/privacy" className="text-primary-400 hover:text-primary-300">
                                    Privacy Policy
                                </Link>
                            </span>
                        </label>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 gradient-primary text-white rounded-lg font-bold glow transform hover:scale-105 transition-all disabled:opacity-50"
                        >
                            {isLoading ? '⚙️ Creating Account...' : '🚀 Create Account'}
                        </button>
                    </form>

                    <div className="my-6 flex items-center gap-4">
                        <div className="flex-1 h-px bg-white/10" />
                        <span className="text-sm text-gray-500">or sign up with</span>
                        <div className="flex-1 h-px bg-white/10" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button className="px-4 py-3 glass hover:bg-white/20 rounded-lg transition-colors font-semibold">
                            <span className="mr-2">🔍</span> Google
                        </button>
                        <button className="px-4 py-3 glass hover:bg-white/20 rounded-lg transition-colors font-semibold">
                            <span className="mr-2">😺</span> GitHub
                        </button>
                    </div>

                    <p className="text-center text-sm text-gray-400 mt-6">
                        Already have an account?{' '}
                        <Link href="/auth/login" className="text-primary-400 hover:text-primary-300 font-semibold">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
