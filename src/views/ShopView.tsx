import React, { useState, useMemo } from 'react';
import {
  Filter,
  Heart,
  Eye,
  MessageCircle,
  Sparkles,
  ShoppingBag,
  SlidersHorizontal,
  ChevronRight,
  X
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/mockData';
import { FabricCategory, Product } from '../types';
import { formatPrice } from '../utils/formatters';

export const ShopView: React.FC = () => {
  const {
    products,
    selectedCategory,
    navigateTo,
    setQuickViewProduct,
    toggleWishlist,
    isWishlisted,
    generateWhatsAppLink,
    searchQuery,
    setSearchQuery
  } = useStore();

  const [activeCategory, setActiveCategory] = useState<FabricCategory | 'all'>(
    selectedCategory || 'all'
  );
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync if selectedCategory from navigation changes
  React.useEffect(() => {
    if (selectedCategory) {
      setActiveCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const currentCategoryInfo = CATEGORIES.find(c => c.id === activeCategory);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter(prod => {
        // Category
        if (activeCategory !== 'all' && prod.fabricCategory !== activeCategory) {
          return false;
        }
        // Size
        if (selectedSize !== 'all' && !prod.availableSizes.includes(selectedSize as any)) {
          return false;
        }
        // Occasion
        if (selectedOccasion !== 'all' && !prod.occasion.some(o => o.toLowerCase().includes(selectedOccasion.toLowerCase()))) {
          return false;
        }
        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = prod.name.toLowerCase().includes(q);
          const matchesFabric = prod.fabricName.toLowerCase().includes(q);
          const matchesDesc = prod.shortDescription.toLowerCase().includes(q);
          if (!matchesName && !matchesFabric && !matchesDesc) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      });
  }, [products, activeCategory, selectedSize, selectedOccasion, sortBy, searchQuery]);

  return (
    <div className="bg-[#FAF8F4] min-h-screen pb-24">
      {/* Category Hero Banner */}
      <div className="bg-[#111010] text-[#FAF8F4] py-14 px-4 sm:px-6 lg:px-8 border-b border-[#B49B73]/30">
        <div className="max-w-7xl mx-auto text-center">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-[11px] uppercase tracking-widest text-[#D8C9AE] mb-3">
            <button onClick={() => navigateTo('home')} className="hover:text-[#FAF8F4]">
              Home
            </button>
            <ChevronRight className="w-3 h-3 text-[#8C7F72]" />
            <span className="text-[#B49B73]">
              {currentCategoryInfo ? currentCategoryInfo.name : 'All Ready-to-Wear Abayas'}
            </span>
          </div>

          <h1 className="font-montserrat text-3xl sm:text-4xl md:text-5xl font-black uppercase text-[#F5F1E8] mb-3 tracking-tight">
            {currentCategoryInfo ? currentCategoryInfo.name : 'Ready-to-Wear Abaya Collection'}
          </h1>

          {/* EXACT CLIENT DESCRIPTION COPY PER CATEGORY */}
          <p className="text-xs sm:text-sm text-[#D8C9AE] max-w-2xl mx-auto font-medium leading-relaxed">
            {currentCategoryInfo
              ? currentCategoryInfo.description
              : 'Handcrafted in Bangalore with imported Gulf Nida, Italian Armani Crepe, and Belgian Flax Linen. Each design is tailored exclusively on order.'}
          </p>

          {currentCategoryInfo && (
            <div className="mt-4 inline-block px-3 py-1 bg-[#3A3733]/60 rounded-full border border-[#B49B73]/30 text-[11px] text-[#D8C9AE] uppercase tracking-widest">
              ✨ {currentCategoryInfo.bestFor}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Fabric Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shrink-0 border ${
              activeCategory === 'all'
                ? 'bg-[#111010] text-[#F5F1E8] border-[#111010] shadow-xs'
                : 'bg-white text-[#3A3733] border-[#D8C9AE] hover:border-[#111010]'
            }`}
          >
            All Fabrics ({products.length})
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shrink-0 border ${
                activeCategory === cat.id
                  ? 'bg-[#111010] text-[#F5F1E8] border-[#111010] shadow-xs'
                  : 'bg-white text-[#3A3733] border-[#D8C9AE] hover:border-[#111010]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Filter Controls & Result Count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#D8C9AE] shadow-2xs mb-8">
          {/* Active Search & Count */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#3A3733] font-medium font-sans-ui">
              Showing <strong className="text-[#111010]">{filteredProducts.length}</strong> Made-to-Order Designs
            </span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#E8DFCF] text-[#111010] text-xs rounded-lg">
                "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="text-[#3A3733] hover:text-[#111010]">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>

          {/* Sizing & Sorting Selectors */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Size Filter */}
            <select
              value={selectedSize}
              onChange={e => setSelectedSize(e.target.value)}
              className="px-3 py-1.5 bg-[#FAF8F4] border border-[#D8C9AE] rounded-xl text-xs text-[#111010] focus:outline-hidden"
            >
              <option value="all">All Sizes (S–XXL)</option>
              <option value="S">Size S</option>
              <option value="M">Size M</option>
              <option value="L">Size L</option>
              <option value="XL">Size XL</option>
              <option value="XXL">Size XXL</option>
              <option value="Custom">Custom Fit</option>
            </select>

            {/* Occasion Filter */}
            <select
              value={selectedOccasion}
              onChange={e => setSelectedOccasion(e.target.value)}
              className="px-3 py-1.5 bg-[#FAF8F4] border border-[#D8C9AE] rounded-xl text-xs text-[#111010] focus:outline-hidden"
            >
              <option value="all">All Occasions</option>
              <option value="wedding">Weddings & Nikah</option>
              <option value="eid">Eid & Festive</option>
              <option value="office">Office & Work</option>
              <option value="daily">Daily & Summer</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 bg-[#FAF8F4] border border-[#D8C9AE] rounded-xl text-xs text-[#111010] focus:outline-hidden font-medium"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Product Catalog Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden border border-[#D8C9AE] shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Gallery Trigger */}
                <div className="relative aspect-3/4 overflow-hidden bg-[#E8DFCF]">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-top group-hover:scale-104 transition-transform duration-500"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                    <span className="px-2.5 py-0.5 bg-[#111010] text-[#F5F1E8] text-[10px] font-semibold uppercase tracking-widest rounded-md">
                      {product.fabricCategory.toUpperCase()} ABAYA
                    </span>
                    {product.isBestseller && (
                      <span className="px-2 py-0.5 bg-[#B49B73] text-[#111010] text-[9px] font-bold uppercase tracking-wider rounded-md">
                        Bestseller
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#FAF8F4]/90 backdrop-blur-xs flex items-center justify-center text-[#111010] hover:scale-110 transition-transform shadow-xs z-10"
                    aria-label="Save to Wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 ${isWishlisted(product.id) ? 'fill-[#B5654F] text-[#B5654F]' : 'text-[#111010]'}`}
                    />
                  </button>

                  {/* Quick View Trigger on Hover */}
                  <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="w-full py-2.5 bg-[#111010]/95 backdrop-blur-xs text-[#F5F1E8] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#111010] flex items-center justify-center gap-2 shadow-md"
                    >
                      <Eye className="w-4 h-4" /> Quick View & Sizing
                    </button>
                  </div>
                </div>

                {/* Details Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#B49B73] font-semibold block mb-1">
                      {product.fabricName}
                    </span>
                    <h3
                      onClick={() => navigateTo('product', { productSlug: product.slug })}
                      className="font-montserrat text-base sm:text-lg font-extrabold text-[#111010] hover:text-[#B49B73] cursor-pointer transition-colors leading-tight mb-1.5"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#8C7F72] line-clamp-2 leading-relaxed mb-4 font-medium">
                      {product.shortDescription}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between mb-4 pt-3 border-t border-[#E8DFCF]">
                      <div>
                        <span className="font-montserrat text-lg font-black text-[#111010]">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-[#8C7F72] line-through ml-2 font-semibold">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#8C7F72] uppercase tracking-wider font-bold">
                        GST Inclusive
                      </span>
                    </div>

                    {/* DUAL EQUAL ORDERING ACTIONS */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => navigateTo('product', { productSlug: product.slug })}
                        className="py-2.5 px-3 bg-[#111010] text-[#F5F1E8] hover:bg-[#222] text-xs font-semibold tracking-wider uppercase rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Shop Now</span>
                      </button>

                      <a
                        href={generateWhatsAppLink({ product })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 bg-white border border-[#111010] text-[#111010] hover:bg-[#E8DFCF] text-xs font-semibold tracking-wider uppercase rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#B49B73]" />
                        <span>Customise</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#D8C9AE] p-8">
            <h3 className="font-editorial text-2xl text-[#111010] mb-2">No Matching Abayas Found</h3>
            <p className="text-xs text-[#8C7F72] mb-6">
              Try adjusting your filter options or search terms.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedSize('all');
                setSelectedOccasion('all');
                setSearchQuery('');
              }}
              className="py-2 px-5 bg-[#111010] text-[#F5F1E8] text-xs font-semibold uppercase tracking-wider rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Custom Request Callout */}
        <div className="mt-16 bg-[#E8DFCF] rounded-2xl p-8 border border-[#D8C9AE] text-center space-y-3">
          <h3 className="font-montserrat text-xl sm:text-2xl font-black text-[#111010] uppercase">
            Looking for a Specific Color or Fabric Swap?
          </h3>
          <p className="text-xs text-[#3A3733] max-w-xl mx-auto font-medium">
            Every Pearlessence abaya can be ordered in custom lengths, customized sleeves, or alternative fabrics sourced from our Gulf mills.
          </p>
          <button
            onClick={() => navigateTo('customise')}
            className="py-3 px-6 bg-[#111010] text-[#F5F1E8] text-xs font-semibold tracking-widest uppercase rounded-xl hover:bg-[#222] transition-colors"
          >
            Start Bespoke WhatsApp Enquiry
          </button>
        </div>
      </div>
    </div>
  );
};
