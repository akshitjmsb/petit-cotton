import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface NavigationDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const NavigationDrawer: React.FC<NavigationDrawerProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { user, signOut } = useAuth();

    const handleNav = (path: string) => {
        navigate(path);
        onClose();
    };

    const handleSignOut = async () => {
        await signOut();
        onClose();
        navigate('/login');
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/40 z-50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >

                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="font-serif text-2xl text-gray-900">Petit Coton</h2>
                    <button onClick={onClose} className="p-1 hover:bg-gray-50 rounded-full transition-colors">
                        <span className="material-symbols-outlined text-gray-400">close</span>
                    </button>
                </div>

                {/* Links */}
                <div className="flex-1 overflow-y-auto py-4">
                    <nav className="flex flex-col">
                        <NavItem icon="home" label="Home" onClick={() => handleNav('/home')} />
                        <NavItem icon="inventory_2" label="Shop Collections" onClick={() => handleNav('/products')} />
                        <NavItem icon="local_mall" label="My Cart" onClick={() => handleNav('/cart')} />
                        <div className="my-2 border-t border-gray-50" />
                        <NavItem icon="favorite" label="Saved Items" onClick={() => handleNav('/saved')} />
                        <NavItem icon="person" label="My Profile" onClick={() => handleNav('/profile')} />
                        <div className="my-2 border-t border-gray-50" />
                        <NavItem icon="info" label="About Us" onClick={() => handleNav('/about')} />
                        <NavItem icon="support_agent" label="Contact" onClick={() => handleNav('/contact')} />
                    </nav>
                </div>

                {/* Footer / Auth */}
                <div className="p-6 border-t border-gray-100 bg-gray-50">
                    {user ? (
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500">Signed in as</span>
                                <span className="text-sm font-bold text-gray-900 truncate max-w-[150px]">{user.email}</span>
                            </div>
                            <button
                                onClick={handleSignOut}
                                className="text-sm font-semibold text-red-500 hover:text-red-700 transition-colors"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => handleNav('/login')}
                                className="py-2.5 rounded-lg border border-gray-200 bg-white text-sm font-bold text-gray-900 hover:bg-gray-50 transition-colors"
                            >
                                Log In
                            </button>
                            <button
                                onClick={() => handleNav('/signup')}
                                className="py-2.5 rounded-lg bg-gray-900 text-sm font-bold text-white hover:bg-gray-800 transition-colors shadow-sm"
                            >
                                Sign Up
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

const NavItem: React.FC<{ icon: string; label: string; onClick: () => void }> = ({ icon, label, onClick }) => (
    <button
        onClick={onClick}
        className="flex items-center gap-4 px-6 py-3.5 w-full hover:bg-gray-50 transition-colors group text-left"
    >
        <span className="material-symbols-outlined text-gray-400 group-hover:text-gray-900 transition-colors">{icon}</span>
        <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">{label}</span>
    </button>
);

export default NavigationDrawer;
