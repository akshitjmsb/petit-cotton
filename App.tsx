import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import ReloadPrompt from './components/ReloadPrompt';
import { CartProvider } from './context/CartContext';

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl overflow-hidden relative">
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/products" element={<ProductListScreen />} />
            <Route path="/product/:id" element={<ProductDetailScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/checkout" element={<CheckoutScreen />} />
            {/* Fallback routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <ReloadPrompt />
      </Router>
    </CartProvider>
  );
};

export default App;