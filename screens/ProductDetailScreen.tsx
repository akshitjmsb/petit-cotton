import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCart } from '../context/CartContext';

const ProductDetailScreen: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart, itemCount } = useCart();
  const [selectedSize, setSelectedSize] = useState('0-3M');
  const [isAdded, setIsAdded] = useState(false);

  // Mock product data for this detail screen
  const product = {
    id: '1',
    name: 'Oatmeal Linen Romper',
    price: 68.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDr457fJy664PMfO9IY-2n1nO1H-Q89Z-y5Dq3b5eAyT7foxCxSO4HcbgNZlF7GzB4MWPSA_l6kL8YTIK0OOpUdr4Mx1aAQ4jmuidRTMAT2GsSpSXXiETueOoXdU24lf3DA_YbAQiNHSl-DkJtSGEn-kvo4VABlkhrA_ylKrCCJHrO-h4_zfFB_WwoeQm3S4MiIJPhIojfI3Ow3CSOBKNiDdZUWkDRUqDyoijZ5kOe46KpQeNn7FbfPcrIHVYuVElMWd9fq0fJQAw',
    category: 'Romper'
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-24 bg-bg-light">
      {/* Header (Overlay) */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-bg-light/80 backdrop-blur-md border-b border-transparent transition-colors duration-200">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => navigate(-1)}
            className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 active:scale-95 transition-all text-text-main"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>arrow_back_ios_new</span>
          </button>
          <h1 className="text-sm font-semibold tracking-wide uppercase opacity-0 lg:opacity-100 transition-opacity">Shop</h1>
          <button
            onClick={() => navigate('/cart')}
            className="relative flex size-10 items-center justify-center rounded-full hover:bg-black/5 active:scale-95 transition-all text-text-main"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>shopping_bag</span>
            {itemCount > 0 && (
              <span className="absolute top-2 right-2 size-2.5 rounded-full bg-primary border border-white"></span>
            )}
          </button>
        </div>
      </div>

      <main className="flex-1 w-full pt-14">
        {/* Carousel */}
        <div className="relative w-full aspect-[4/5] bg-neutral-100">
          <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar h-full w-full">
            <div className="snap-center shrink-0 w-full h-full relative">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDr457fJy664PMfO9IY-2n1nO1H-Q89Z-y5Dq3b5eAyT7foxCxSO4HcbgNZlF7GzB4MWPSA_l6kL8YTIK0OOpUdr4Mx1aAQ4jmuidRTMAT2GsSpSXXiETueOoXdU24lf3DA_YbAQiNHSl-DkJtSGEn-kvo4VABlkhrA_ylKrCCJHrO-h4_zfFB_WwoeQm3S4MiIJPhIojfI3Ow3CSOBKNiDdZUWkDRUqDyoijZ5kOe46KpQeNn7FbfPcrIHVYuVElMWd9fq0fJQAw")' }}></div>
            </div>
            <div className="snap-center shrink-0 w-full h-full relative">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCSQBXe_wVfxVZVBzu6Ck38oZkAQbhDf_xgDsUqQHyWF61npSUvLHBTdQ_ZMpvsQrwjqPDsCs7guf1GLEaxco-qqn2yMWn1qvZdOjqK9Hzdq6HBXerhBXdZwb5FOnpvrQS6GGssLg33KhO6IXkR9wiUFPzmdKR2K0aTeMJgGCp2do2LvTl3AALtcAVLNAMUyi6_sidLPD1EUuYyyvwe-I7MuHk42JNJ9DdvYqxqt6lxP33dxneDlXb0MUaH5v70tA0r8kaOv3WTqw")' }}></div>
            </div>
          </div>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-black/60"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-black/20 backdrop-blur-sm"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-black/20 backdrop-blur-sm"></div>
          </div>
        </div>

        {/* Product Info */}
        <div className="px-5 pt-6 pb-2">
          <div className="flex flex-col gap-2 mb-6">
            <div className="flex justify-between items-start gap-4">
              <h1 className="text-2xl font-bold leading-tight tracking-tight text-text-main">Oatmeal Linen Romper</h1>
              <span className="text-xl font-bold text-text-main whitespace-nowrap">$68.00</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-neutral-600">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '16px' }}>eco</span>
              <p className="font-medium">100% Organic Linen</p>
              <span className="w-1 h-1 rounded-full bg-neutral-300 mx-1"></span>
              <p>Montreal, CA</p>
            </div>
          </div>

          {/* Size Selector */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-text-main">Select Size</label>
              <button className="text-xs font-medium text-neutral-500 underline decoration-neutral-300">Size Guide</button>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
              {['NB', '0-3M', '3-6M', '6-12M'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex-1 min-w-[72px] h-12 rounded-lg text-sm transition-all
                        ${selectedSize === size
                      ? 'bg-primary border border-primary text-[#112114] font-bold shadow-sm ring-2 ring-primary/20'
                      : 'border border-neutral-200 bg-white text-text-main font-medium hover:border-primary/50'}
                    `}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <p className="text-base font-normal leading-relaxed text-neutral-600">
              Soft, breathable, and heirloom-quality. This romper features real coconut buttons and our signature invisible stitching specifically designed for sensitive infant skin. Perfect for warm summer days or layering in the fall.
            </p>
          </div>

          {/* Accordions */}
          <div className="flex flex-col border-t border-neutral-100">
            {[
              { icon: 'dry_cleaning', label: 'Fabric & Care' },
              { icon: 'volunteer_activism', label: 'Our Organic Promise' },
              { icon: 'local_shipping', label: 'Shipping & Returns' }
            ].map((item, idx) => (
              <React.Fragment key={idx}>
                <button className="group flex w-full items-center justify-between py-4 text-left active:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-neutral-50 text-text-main">
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>{item.icon}</span>
                    </div>
                    <span className="text-base font-semibold text-text-main">{item.label}</span>
                  </div>
                  <span className="material-symbols-outlined text-neutral-400 group-hover:text-text-main transition-colors">expand_more</span>
                </button>
                <div className="w-full h-px bg-neutral-100"></div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </main>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-neutral-100 p-4 safe-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
        <button
          onClick={handleAddToCart}
          className={`relative w-full overflow-hidden rounded-xl h-14 group transition-all active:scale-[0.99] shadow-lg shadow-primary/30 flex items-center justify-between px-6 ${isAdded ? 'bg-green-500' : 'bg-primary'}`}
        >
          <span className="text-sm font-bold text-[#112114]">{isAdded ? 'Added to Bag!' : '1 Item'}</span>
          <span className="text-base font-bold text-[#112114] uppercase tracking-wide">{isAdded ? 'Continue Shopping' : 'Add to Cart'}</span>
          <span className="text-sm font-bold text-[#112114]">${product.price.toFixed(2)}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductDetailScreen;