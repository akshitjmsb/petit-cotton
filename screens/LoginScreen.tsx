import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginScreen: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth(); // Check if already logged in?
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Retrieve return URL
    const from = location.state?.from?.pathname || '/home';

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            });

            if (error) throw error;

            navigate(from, { replace: true });
        } catch (err: any) {
            setError(err.message || 'Failed to sign in');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white min-h-screen pt-12 pb-24 px-6 flex flex-col items-center">
            {/* Brand Header */}
            <h1 className="font-serif text-3xl text-gray-800 mb-2">Petit Coton</h1>
            <p className="text-gray-500 text-sm mb-12">Welcome back</p>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm flex flex-col gap-5">

                {error && (
                    <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 flex items-center gap-2">
                        <span className="material-symbols-outlined text-base">error</span>
                        {error}
                    </div>
                )}

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        {...register('email')}
                        className={`w-full p-4 bg-gray-50 rounded-xl border ${errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-100 focus:border-gray-400'
                            } outline-none transition-colors text-sm`}
                        placeholder="hello@example.com"
                    />
                    {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        {...register('password')}
                        className={`w-full p-4 bg-gray-50 rounded-xl border ${errors.password ? 'border-red-300 focus:border-red-500' : 'border-gray-100 focus:border-gray-400'
                            } outline-none transition-colors text-sm`}
                        placeholder="••••••••"
                    />
                    {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
                </div>

                <div className="flex justify-end">
                    <Link to="/forgot-password" className="text-xs text-gray-500 hover:text-gray-800 transition-colors">
                        Forgot Password?
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 w-full bg-gray-900 text-white py-4 rounded-full font-medium shadow-xl shadow-gray-200 active:scale-95 transition-all disabled:opacity-70 disabled:active:scale-100"
                >
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-gray-900 font-semibold hover:underline">
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default LoginScreen;
