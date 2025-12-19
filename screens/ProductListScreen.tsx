import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { Product } from '../types';
import { supabase } from '../supabaseClient';

const ProductListScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Filters state
  const currentCategory = searchParams.get('category');
  const sortOption = searchParams.get('sort') || 'featured';

  const PAGE_SIZE = 12;

  useEffect(() => {
    fetchProducts(true);
  }, [currentCategory, sortOption]);

  const fetchProducts = async (reset = false) => {
    try {
      setLoading(true);
      if (reset) {
        setProducts([]);
        setLoadedCount(0);
      }

      let query = supabase
        .from('products')
        .select('*', { count: 'exact' });

      // Apply filters
      if (currentCategory) {
        query = query.eq('category', currentCategory);
      }

      // Apply sorting
      if (sortOption === 'price-low-high') {
        query = query.order('base_price', { ascending: true });
      } else if (sortOption === 'price-high-low') {
        query = query.order('base_price', { ascending: false });
      } else if (sortOption === 'newest') {
        query = query.order('created_at', { ascending: false });
      } else {
        // Default / Featured
        query = query.order('created_at', { ascending: false });
      }

      // Apply pagination
      const from = reset ? 0 : products.length;
      const to = from + PAGE_SIZE - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) {
        throw error;
      }

      if (data) {
        // Map DB fields to UI fields
        const mappedProducts: Product[] = data.map(item => ({
          ...item,
          price: item.base_price,
          image: item.image_url || 'https://placehold.co/400x500?text=No+Image', // Fallback
          originalPrice: undefined // Logic for original price can remain undefined for now
        }));

        setProducts(prev => reset ? mappedProducts : [...prev, mappedProducts]);
        if (count !== null) setTotalCount(count);

        const newLoadedCount = (reset ? 0 : products.length) + mappedProducts.length;
        setLoadedCount(newLoadedCount);
        setHasMore(count !== null && newLoadedCount < count);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterClick = (filterType: string, value: string) => {
    // This is a simplified filter handler. In a real app we'd have a more robust UI.
    // For now, let's just demonstrate category filtering via the existing UI buttons if possible
    // or just rely on generic logic.
    // Given the UI is mock-heavy, I'll just keep the existing UI logic for now and maybe wire up one or two.
  };

  const handleSortChange = (newSort: string) => {
    setSearchParams(prev => {
      prev.set('sort', newSort);
      return prev;
    });
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-white/95 backdrop-blur-md px-4 py-3 border-b border-gray-50">
        <button onClick={() => navigate(-1)} className="flex size-10 items-center justify-center rounded-full hover:bg-gray-50 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-text-main" style={{ fontSize: '24px' }}>arrow_back</span>
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.01em] text-text-main flex-1 text-center">Organic Onesies</h2>
        <div className="flex items-center justify-end w-10 relative">
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center justify-center text-text-main hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>shopping_bag</span>
          </button>
          <div className="absolute top-0 right-0 size-2 bg-primary rounded-full ring-2 ring-white"></div>
        </div>
      </header>

      {/* Filters */}
      <div className="sticky top-[60px] z-40 bg-white/95 backdrop-blur-md w-full py-3">
        <div className="flex gap-2.5 px-4 overflow-x-auto no-scrollbar items-center">
          <button className="flex h-9 shrink-0 items-center justify-center gap-x-1.5 rounded-full border border-gray-200 bg-white pl-3 pr-4 transition-all active:scale-95">
            <span className="material-symbols-outlined text-text-main" style={{ fontSize: '18px' }}>tune</span>
            <span className="text-xs font-semibold text-text-main">Filters</span>
          </button>
          <div className="w-px h-6 bg-gray-200 mx-1 shrink-0"></div>
          {/* Mock filters for now, functionality would require a modal or dropdown */}

          <button onClick={() => handleSortChange('price-low-high')} className={`flex h-9 shrink-0 items-center justify-center gap-x-1 rounded-full pl-3 pr-2 transition-colors active:scale-95 ${sortOption === 'price-low-high' ? 'bg-black text-white' : 'bg-[#F1F5F9] hover:bg-gray-100'}`}>
            <p className="text-xs font-medium whitespace-nowrap">Price: Low to High</p>
          </button>
          <button onClick={() => handleSortChange('price-high-low')} className={`flex h-9 shrink-0 items-center justify-center gap-x-1 rounded-full pl-3 pr-2 transition-colors active:scale-95 ${sortOption === 'price-high-low' ? 'bg-black text-white' : 'bg-[#F1F5F9] hover:bg-gray-100'}`}>
            <p className="text-xs font-medium whitespace-nowrap">Price: High to Low</p>
          </button>

        </div>
      </div>

      <main className="flex-1 px-4 pt-2 pb-28">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-medium text-gray-500">{totalCount} Items Found</p>
        </div>

        {loading && products.length === 0 ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="group flex flex-col gap-3 cursor-pointer active:scale-[0.98] transition-transform"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <button
                    className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-transform active:scale-90 shadow-sm hover:bg-white"
                    onClick={(e) => { e.stopPropagation(); }}
                  >
                    <span className="material-symbols-outlined text-gray-600 filled-icon" style={{ fontSize: '18px' }}>favorite</span>
                  </button>
                  <button
                    className="absolute bottom-2 right-2 flex size-9 items-center justify-center rounded-full bg-primary text-white shadow-soft transition-all active:scale-90 hover:bg-primary-dark hover:shadow-lg"
                    onClick={(e) => { e.stopPropagation(); navigate('/cart'); }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>add</span>
                  </button>
                </div>
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-sm font-normal text-text-main line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-bold ${product.originalPrice ? 'text-primary' : 'text-text-main'}`}>
                      ${product.price?.toFixed(2)} CAD
                    </p>
                    {product.originalPrice && (
                      <p className="text-xs text-gray-400 line-through">${product.originalPrice.toFixed(2)}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More */}
        {hasMore && !loading && (
          <div className="mt-10 flex flex-col items-center justify-center gap-3">
            <p className="text-xs text-gray-400">You've viewed {loadedCount} of {totalCount} products</p>
            <div className="h-1 w-32 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${(loadedCount / totalCount) * 100}%` }}></div>
            </div>
            <button
              onClick={() => fetchProducts(false)}
              className="mt-2 px-8 py-3 rounded-full bg-primary text-sm font-bold text-white shadow-soft hover:bg-primary-dark active:scale-95 transition-all"
            >
              Load more
            </button>
          </div>
        )}

      </main>

      <BottomNav />
    </div>
  );
};

export default ProductListScreen;