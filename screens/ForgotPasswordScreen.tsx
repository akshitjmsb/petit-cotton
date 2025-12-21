import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '../supabaseClient';

const forgotPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordScreen: React.FC = () => {
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: ForgotPasswordFormData) => {
        setLoading(true);
        setError(null);
        setMessage(null);
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });

            if (error) throw error;

            setMessage('Password reset email sent! Check your inbox.');
        } catch (err: any) {
            setError(err.message || 'Failed to send reset email');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white min-h-screen pt-12 pb-24 px-6 flex flex-col items-center">
            <h1 className="font-serif text-3xl text-gray-800 mb-2">Petit Coton</h1>
            <p className="text-gray-500 text-sm mb-12">Reset your password</p>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm flex flex-col gap-5">

                {error && (
                    <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 flex items-center gap-2">
                        <span className="material-symbols-outlined text-base">error</span>
                        {error}
                    </div>
                )}

                {message && (
                    <div className="bg-green-50 text-green-600 text-sm p-3 rounded-lg border border-green-100 flex items-center gap-2">
                        <span className="material-symbols-outlined text-base">check_circle</span>
                        {message}
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

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 w-full bg-gray-900 text-white py-4 rounded-full font-medium shadow-xl shadow-gray-200 active:scale-95 transition-all disabled:opacity-70 disabled:active:scale-100"
                >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                </button>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Remembered it?{' '}
                    <Link to="/login" className="text-gray-900 font-semibold hover:underline">
                        Log In
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default ForgotPasswordScreen;
