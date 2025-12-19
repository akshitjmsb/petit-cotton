import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { calculateTax, PROVINCES } from '../utils/tax';

const CartScreen: React.FC = () => {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateQuantity, cartTotal, itemCount } = useCart();
    const [promoCode, setPromoCode] = useState('');
    const [selectedProvince, setSelectedProvince] = useState<string>('ON'); // Default to Ontario

    const { taxAmount, rate } = calculateTax(cartTotal, selectedProvince);
    const finalTotal = cartTotal + taxAmount;

    return (
        <div className="relative flex flex-col min-h-screen w-full mx-auto shadow-2xl bg-bg-light">
            <header className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-bg-light/95 backdrop-blur-md border-b border-gray-200/50">
                <button onClick={() => navigate(-1)} className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full hover:bg-black/5 transition-colors">
                    <span className="material-symbols-outlined text-text-main" style={{ fontSize: '24px' }}>arrow_back</span>
                </button>
                <h1 className="text-lg font-bold tracking-tight text-text-main">Your Basket ({itemCount})</h1>
                <button className="flex items-center justify-center w-10 h-10 -mr-2 text-sm font-medium text-gray-500 hover:text-black transition-colors">
                    Edit
                </button>
            </header>

            <main className="flex-1 pb-32 overflow-y-auto no-scrollbar">
                <div className="flex flex-col gap-1 p-4">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <span className="material-symbols-outlined text-gray-300 text-6xl mb-4">shopping_basket</span>
                            <h2 className="text-xl font-bold text-text-main">Your basket is empty</h2>
                            <p className="text-gray-500 mt-2 mb-6">Looks like you haven't added anything yet.</p>
                            <button onClick={() => navigate('/products')} className="px-6 py-3 bg-primary text-text-main font-bold rounded-full">
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={`${item.id}-${item.size}`} className="group relative flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md mt-1">
                                <div className="relative shrink-0 overflow-hidden rounded-lg w-[88px] h-[88px] bg-gray-100">
                                    <img alt={item.name} className="w-full h-full object-cover" src={item.image} />
                                </div>
                                <div className="flex flex-col flex-1 justify-between py-0.5">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-base font-semibold leading-tight text-text-main line-clamp-1">{item.name}</h3>
                                            <p className="text-base font-bold text-text-main">${item.price?.toFixed(2)}</p>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">{item.category} • {item.size}</p>
                                    </div>
                                    <div className="flex justify-between items-end mt-2">
                                        <div className="flex items-center gap-3 bg-gray-50 rounded-full px-2 py-1 border border-gray-100">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.size, -1)}
                                                className="w-6 h-6 flex items-center justify-center rounded-full text-gray-500 hover:text-primary transition-colors"
                                            >
                                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>remove</span>
                                            </button>
                                            <span className="text-sm font-semibold w-4 text-center text-text-main">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.size, 1)}
                                                className={`w-6 h-6 flex items-center justify-center rounded-full text-primary bg-white shadow-sm hover:bg-blue-50 transition-colors ${item.maxStock && item.quantity >= item.maxStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            >
                                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span>
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id, item.size)}
                                            className="text-xs font-medium text-red-500/80 hover:text-red-600 underline decoration-red-500/30 underline-offset-2"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <>
                        <div className="h-px w-full bg-gray-200 my-2"></div>

                        {/* Promo Code - kept simple */}
                        <div className="px-4 py-4">
                            <label className="block mb-2 text-sm font-medium text-gray-700">Discount Code / Province</label>

                            {/* Province Selector for Tax */}
                            <div className="mb-4">
                                <label className="block text-xs text-gray-500 mb-1">Province (for Tax Estimation)</label>
                                <select
                                    value={selectedProvince}
                                    onChange={(e) => setSelectedProvince(e.target.value)}
                                    className="block w-full p-2.5 rounded-lg border-gray-200 bg-white text-sm text-text-main focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    {PROVINCES.map(p => (
                                        <option key={p.code} value={p.code}>{p.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-symbols-outlined text-gray-400" style={{ fontSize: '20px' }}>sell</span>
                                    </div>
                                    <input
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 rounded-lg border-gray-200 bg-white text-sm text-text-main placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                                        placeholder="Enter gift code"
                                        type="text"
                                    />
                                </div>
                                <button className="px-5 py-2.5 bg-text-main text-white font-semibold rounded-lg text-sm hover:bg-gray-800 transition-colors">Apply</button>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="p-4 mt-2">
                            <h2 className="text-sm font-semibold text-text-main mb-4">Order Summary</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span className="font-medium text-text-main">${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Shipping Estimate</span>
                                    <span className="font-medium text-primary">Free</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Tax ({selectedProvince} @ {(rate * 100).toFixed(1)}%)</span>
                                    <span className="font-medium text-text-main">${taxAmount.toFixed(2)}</span>
                                </div>
                                <div className="pt-3 mt-3 border-t border-gray-100 flex justify-between items-center">
                                    <span className="text-base font-bold text-text-main">Total</span>
                                    <span className="text-xl font-bold text-text-main">${finalTotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-4">
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 text-xs text-gray-500">
                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>info</span>
                                <p>Free returns within 30 days of delivery.</p>
                            </div>
                        </div>
                    </>
                )}
            </main>

            {cartItems.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 z-30 p-4 bg-white/90 backdrop-blur-lg border-t border-gray-100 safe-bottom">
                    <button
                        onClick={() => navigate('/checkout')}
                        className="group w-full relative flex items-center justify-between bg-primary hover:bg-primary-dark active:scale-[0.98] text-[#111712] rounded-full h-14 px-6 transition-all shadow-[0_4px_14px_0_rgba(184,216,234,0.5)]"
                    >
                        <span className="font-bold text-base">Checkout</span>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold opacity-80 border-r border-black/20 pr-3 mr-1">{itemCount} items</span>
                            <span className="font-bold text-lg">${finalTotal.toFixed(2)}</span>
                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform" style={{ fontSize: '20px' }}>arrow_forward</span>
                        </div>
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartScreen;