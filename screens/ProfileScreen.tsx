import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BottomNav from '../components/BottomNav';

const ProfileScreen: React.FC = () => {
    const { user, signOut, loading } = useAuth();
    const navigate = useNavigate();

    // For US-002 we will implement a proper protected route wrapper
    // For now, simple redirect if not logged in
    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [user, loading, navigate]);

    const handleSignOut = async () => {
        await signOut();
        navigate('/login');
    };

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pt-8 pb-24 px-6">
            <h1 className="font-serif text-2xl text-gray-900 mb-6">My Profile</h1>

            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-4 mb-4">
                    <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-2xl font-serif">
                        {user.email?.[0].toUpperCase()}
                    </div>
                    <div>
                        <h2 className="font-medium text-lg">{user.user_metadata?.full_name || 'User'}</h2>
                        <p className="text-gray-500 text-sm">{user.email}</p>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-gray-400">shopping_bag</span>
                        <span className="text-gray-700 font-medium">My Orders</span>
                    </div>
                    <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-gray-400">favorite</span>
                        <span className="text-gray-700 font-medium">Saved Items</span>
                    </div>
                    <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-gray-400">settings</span>
                        <span className="text-gray-700 font-medium">Settings</span>
                    </div>
                    <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                </button>
            </div>

            <button
                onClick={handleSignOut}
                className="mt-8 w-full py-4 text-red-500 font-medium border border-red-100 rounded-full hover:bg-red-50 transition-colors"
            >
                Sign Out
            </button>

            <BottomNav />
        </div>
    );
};

export default ProfileScreen;
