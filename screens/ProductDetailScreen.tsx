import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { supabase } from '../supabaseClient';
import { Product, ProductVariant } from '../types';

const ProductDetailScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { addToCart, itemCount } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProductAndVariants(id);
    }
  }, [id]);

  const fetchProductAndVariants = async (productId: string) => {
    try {
      setLoading(true);

      // Fetch product
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (productError) throw productError;

      // Fetch variants
      const { data: variantsData, error: variantsError } = await supabase
        .from('product_variants')
        .select('*')
        .eq('product_id', productId)
        .gt('inventory_count', 0); // Only show in-stock variants (optional logic)

      if (variantsError) throw variantsError;

      if (productData) {
        const mappedProduct: Product = {
          ...productData,
          price: productData.base_price,
          image: productData.image_url || 'https://placehold.co/400x500?text=No+Image'
        };
        setProduct(mappedProduct);
      }

      if (variantsData) {
        setVariants(variantsData);
        // Auto-select first available size if any
        if (variantsData.length > 0) {
          setSelectedSize(variantsData[0].size);
        }
      }

    } catch (error) {
      console.error('Error fetching details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    // Find selected variant object
    const selectedVariant = variants.find(v => v.size === selectedSize);

    // Calculate final price (base + additional)
    let finalPrice = product.price || 0;
    if (selectedVariant?.additional_price) {
      finalPrice += selectedVariant.additional_price;
    }

    // Pass variant info to cart (assuming addToCart can handle it or we enhance it later)
    // For now, adhering to simple addToCart interface but we should probably enrich it
    // The current addToCart signature might need checking, but standard pattern:
    addToCart({
      ...product,
      price: finalPrice,
      id: selectedVariant ? selectedVariant.id : product.id // Use variant ID if possible for uniqueness? Or keep product ID + size
    }, selectedSize);

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Derived state
  const selectedVariant = variants.find(v => v.size === selectedSize);
  const currentPrice = (product?.price || 0) + (selectedVariant?.additional_price || 0);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <p>Product not found</p>
        <button onClick={() => navigate('/products')} className="text-primary underline">Back to Products</button>
      </div>
    );
  }

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
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            {/* Placeholder for more images if we had a gallery */}
          </div>
        </div>

        {/* Product Info */}
        <div className="px-5 pt-6 pb-2">
          <div className="flex flex-col gap-2 mb-6">
            <div className="flex justify-between items-start gap-4">
              <h1 className="text-2xl font-bold leading-tight tracking-tight text-text-main">{product.name}</h1>
              <span className="text-xl font-bold text-text-main whitespace-nowrap">${currentPrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-neutral-600">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '16px' }}>eco</span>
              <p className="font-medium">100% Organic Cotton</p>
              <span className="w-1 h-1 rounded-full bg-neutral-300 mx-1"></span>
              <p>Montreal, CA</p>
            </div>
          </div>

          {/* Size Selector */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-text-main">
                Select Size {variants.length === 0 && <span className="text-red-500 font-normal">(No variants available)</span>}
              </label>
              <button className="text-xs font-medium text-neutral-500 underline decoration-neutral-300">Size Guide</button>
            </div>

            {variants.length > 0 ? (
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                {variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedSize(variant.size)}
                    className={`flex-1 min-w-[72px] h-12 rounded-lg text-sm transition-all
                            ${selectedSize === variant.size
                        ? 'bg-primary border border-primary text-[#112114] font-bold shadow-sm ring-2 ring-primary/20'
                        : 'border border-neutral-200 bg-white text-text-main font-medium hover:border-primary/50'}
                        `}
                  >
                    {variant.size}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">Standard size</p>
            )}

          </div>

          <div className="mb-8">
            <p className="text-base font-normal leading-relaxed text-neutral-600">
              {product.description || 'No description available.'}
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
          disabled={variants.length > 0 && !selectedSize}
          className={`relative w-full overflow-hidden rounded-xl h-14 group transition-all active:scale-[0.99] shadow-lg shadow-primary/30 flex items-center justify-between px-6 ${isAdded ? 'bg-green-500' : 'bg-primary'} disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <span className="text-sm font-bold text-[#112114]">{isAdded ? 'Added to Bag!' : '1 Item'}</span>
          <span className="text-base font-bold text-[#112114] uppercase tracking-wide">{isAdded ? 'Continue Shopping' : 'Add to Cart'}</span>
          <span className="text-sm font-bold text-[#112114]">${currentPrice.toFixed(2)}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductDetailScreen;