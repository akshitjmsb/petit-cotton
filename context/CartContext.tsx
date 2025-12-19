import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product, size: string) => void;
    removeFromCart: (id: string, size: string) => void;
    updateQuantity: (id: string, size: string, delta: number) => void;
    clearCart: () => void;
    cartTotal: number;
    itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        try {
            const saved = localStorage.getItem('cart');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product: Product, size: string) => {
        setCartItems(prev => {
            // Determine variant details if available in product object
            let maxStock = 100; // Default fallback
            let variantId = undefined;

            if (product.variants) {
                const variant = product.variants.find(v => v.size === size);
                if (variant) {
                    maxStock = variant.inventory_count;
                    variantId = variant.id;
                }
            }

            const existing = prev.find(item => item.id === product.id && item.size === size);

            if (existing) {
                // Check stock before incrementing
                if (existing.quantity + 1 > (existing.maxStock || maxStock)) {
                    // Ideally show a toast here, but simple return for now
                    return prev;
                }

                return prev.map(item =>
                    item.id === product.id && item.size === size
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prev, {
                ...product,
                quantity: 1,
                size,
                variantId,
                maxStock
            }];
        });
    };

    const removeFromCart = (id: string, size: string) => {
        setCartItems(prev => prev.filter(item => !(item.id === id && item.size === size)));
    };

    const updateQuantity = (id: string, size: string, delta: number) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id && item.size === size) {
                const newQuantity = item.quantity + delta;

                // Validate against maxStock if increasing
                if (delta > 0 && item.maxStock !== undefined && newQuantity > item.maxStock) {
                    return item;
                }

                return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
            }
            return item;
        }));
    };

    const clearCart = () => setCartItems([]);

    const cartTotal = cartItems.reduce((sum, item) => sum + (item.price! * item.quantity), 0);
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, itemCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
