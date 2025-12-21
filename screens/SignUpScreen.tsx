import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '../supabaseClient';

const signUpSchema = z.object({
    fullName: z.string().min(2, 'Full name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUpScreen: React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = async (data: SignUpFormData) => {
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        full_name: data.fullName,
                    },
                },
            });

            if (error) throw error;

            // Navigate to home or show confirmation check logic
            // Supabase by default might require email confirmation, but usually, it logs in if auto-confirm is on.
            // We'll assume success redirects to home or shows a message.
            navigate('/home');

        } catch (err: any) {
            setError(err.message || 'Failed to sign up');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white min-h-screen pt-12 pb-24 px-6 flex flex-col items-center">
            {/* Brand Header */}
            <h1 className="font-serif text-3xl text-gray-800 mb-2">Petit Coton</h1>
            <p className="text-gray-500 text-sm mb-12">Create your account</p>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm flex flex-col gap-5">

                {error && (
                    <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 flex items-center gap-2">
                        <span className="material-symbols-outlined text-base">error</span>
                        {error}
                    </div>
                )}

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        {...register('fullName')}
                        className={`w-full p-4 bg-gray-50 rounded-xl border ${errors.fullName ? 'border-red-300 focus:border-red-500' : 'border-gray-100 focus:border-gray-400'
                            } outline-none transition-colors text-sm`}
                        placeholder="John Doe"
                    />
                    {errors.fullName && <span className="text-xs text-red-500">{errors.fullName.message}</span>}
                </div>

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

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 w-full bg-gray-900 text-white py-4 rounded-full font-medium shadow-xl shadow-gray-200 active:scale-95 transition-all disabled:opacity-70 disabled:active:scale-100"
                >
                    {loading ? 'Creating Account...' : 'Sign Up'}
                </button>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-gray-900 font-semibold hover:underline">
                        Log In
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default SignUpScreen;
