import React from 'react';
import {
  Sparkles,
  Scissors,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  Heart,
  Eye,
  MessageCircle,
  Instagram,
  Star,
  Award,
  Ruler,
  Clock
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, BRAND_DETAILS, TESTIMONIALS } from '../data/mockData';
import { formatPrice } from '../utils/formatters';

export const HomeView: React.FC = () => {
  const {
    products,
    navigateTo,
    setQuickViewProduct,
    toggleWishlist,
    isWishlisted,
    generateWhatsAppLink,
    addToCart,
    showToast
  } = useStore();

  const bestsellers = products.filter(p => p.isBestseller).slice(0, 4);

  return (
    <div className="bg-[#FAF8F4] text-[#111010] min-h-screen font-montserrat">
      {/* 1. HERO SECTION */}
      <section className="relative border-b border-[#D8C9AE] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Brand Statement & Primary Actions */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E8DFCF] rounded-full border border-[#D8C9AE] text-xs uppercase tracking-[0.2em] font-bold text-[#111010]">
                <Sparkles className="w-3.5 h-3.5 text-[#B49B73]" />
                <span>Bangalore Modest Luxury Atelier</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] text-[#111010] tracking-tight uppercase">
                Grace, Confidence &amp; Quiet Luxury.
              </h1>

              <p className="text-sm sm:text-base text-[#3A3733] leading-relaxed max-w-lg font-medium">
                Pearlessence was created for women who value modest craftsmanship without compromising on modern style. Each abaya is handcrafted in our Bangalore atelier from premium Gulf fabrics with 15-day made-to-order precision.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2 max-w-md">
                <button
                  onClick={() => navigateTo('shop')}
                  className="flex-1 py-4 px-7 bg-[#111010] text-[#FAF8F4] text-xs font-black tracking-[0.2em] uppercase rounded-xl hover:bg-[#222] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4 text-[#B49B73]" />
                  <span>Shop Collection</span>
                </button>
                <button
                  onClick={() => navigateTo('customise')}
                  className="flex-1 py-4 px-7 border-2 border-[#111010] bg-transparent text-[#111010] text-xs font-black tracking-[0.2em] uppercase rounded-xl hover:bg-[#E8DFCF] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Scissors className="w-4 h-4 text-[#B49B73]" />
                  <span>Customise Fit</span>
                </button>
              </div>

              <div className="flex items-center gap-6 pt-3 text-[11px] text-[#8C7F72] uppercase tracking-wider font-bold">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#B49B73]" />
                  <span>15 Working Days Delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5 text-[#B49B73]" />
                  <span>Custom Length &amp; Sleeve</span>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Showcase Visual */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden border border-[#D8C9AE] shadow-xl bg-[#E8DFCF] group">
                <img
                  src="https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1400&auto=format&fit=crop"
                  alt="Pearlessence Luxury Modest Abaya"
                  className="w-full aspect-4/3 sm:aspect-16/11 object-cover object-center group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#111010]/70 via-transparent to-transparent" />

                {/* Floating Tag */}
                <div
                  onClick={() => navigateTo('product', { productSlug: 'ivory-armani-abaya' })}
                  className="absolute bottom-6 left-6 right-6 p-4 bg-[#FAF8F4]/95 backdrop-blur-md rounded-2xl border border-[#D8C9AE] shadow-lg cursor-pointer hover:bg-white transition-colors flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-black text-[#B49B73] block mb-0.5">
                      Signature Atelier Piece
                    </span>
                    <span className="text-base sm:text-lg font-black text-[#111010] uppercase">
                      The Ivory Armani Silk Abaya
                    </span>
                  </div>
                  <span className="text-xs font-black text-[#111010] bg-[#E8DFCF] px-3 py-1.5 rounded-lg">
                    ₹6,499 &rarr;
                  </span>
                </div>
              </div>

              {/* Fabric Quick Selectors */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-4">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => navigateTo('category', { category: cat.id })}
                    className="py-2.5 px-2 text-center bg-white hover:bg-[#E8DFCF] border border-[#D8C9AE] rounded-xl transition-colors cursor-pointer"
                  >
                    <span className="text-[11px] font-black text-[#111010] block uppercase">{cat.name.split(' ')[0]}</span>
                    <span className="text-[9px] text-[#8C7F72] truncate block font-bold">Explore</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE & CRAFTSMANSHIP PILLARS */}
      <section className="bg-[#E8DFCF]/50 border-b border-[#D8C9AE] py-7">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Sparkles className="w-5 h-5 text-[#111010] mb-1.5" />
              <span className="text-xs font-black uppercase tracking-wider text-[#111010]">
                Made-to-Order
              </span>
              <span className="text-[11px] text-[#3A3733] font-medium mt-0.5">Zero mass waste • Tailored for you</span>
            </div>

            <div className="flex flex-col items-center">
              <Truck className="w-5 h-5 text-[#111010] mb-1.5" />
              <span className="text-xs font-black uppercase tracking-wider text-[#111010]">
                15 Working Days
              </span>
              <span className="text-[11px] text-[#3A3733] font-medium mt-0.5">Meticulous handcrafted tailoring</span>
            </div>

            <div className="flex flex-col items-center">
              <Award className="w-5 h-5 text-[#111010] mb-1.5" />
              <span className="text-xs font-black uppercase tracking-wider text-[#111010]">
                Imported Gulf Fabrics
              </span>
              <span className="text-[11px] text-[#3A3733] font-medium mt-0.5">Qatar Nida, Armani, Pure Linen</span>
            </div>

            <div className="flex flex-col items-center">
              <ShieldCheck className="w-5 h-5 text-[#111010] mb-1.5" />
              <span className="text-xs font-black uppercase tracking-wider text-[#111010]">
                Bangalore Atelier
              </span>
              <span className="text-[11px] text-[#3A3733] font-medium mt-0.5">Direct designer WhatsApp concierge</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE FABRIC LINES (5 Collections) */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B49B73] font-black">
              The Fabric Atelier
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#111010] uppercase tracking-tight mt-1.5 mb-3">
              5 Signature Modest Fabrics
            </h2>
            <p className="text-xs sm:text-sm text-[#3A3733] leading-relaxed font-medium">
              Every textile in our collection is curated for its distinctive opaque drape, breathable comfort, and timeless tactile luxury.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {CATEGORIES.map(cat => (
              <div
                key={cat.id}
                onClick={() => navigateTo('category', { category: cat.id })}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#D8C9AE] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-4/5 overflow-hidden bg-[#E8DFCF]">
                  <img
                    src={cat.heroImage}
                    alt={cat.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#111010]/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-[#FAF8F4]">
                    <span className="text-[9px] uppercase tracking-widest text-[#D8C9AE] block mb-0.5 font-bold">
                      Collection
                    </span>
                    <h3 className="text-lg font-black text-[#FAF8F4] leading-tight uppercase">
                      {cat.name}
                    </h3>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between bg-[#FAF8F4]">
                  <div>
                    <p className="text-xs text-[#111010] font-bold mb-1.5">
                      "{cat.tagline}"
                    </p>
                    <p className="text-[11px] text-[#8C7F72] leading-relaxed mb-3 font-medium">
                      {cat.bestFor}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E8DFCF] flex items-center justify-between text-xs text-[#111010] font-black group-hover:text-[#B49B73] transition-colors uppercase">
                    <span className="text-[10px] tracking-widest">Explore Pieces</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CURATED BESTSELLERS */}
      <section className="py-16 sm:py-20 bg-[#E8DFCF]/40 border-y border-[#D8C9AE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#B49B73] font-black">
                Client Favorites
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#111010] uppercase tracking-tight mt-1">
                Bestselling Abayas
              </h2>
            </div>
            <button
              onClick={() => navigateTo('shop')}
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#111010] hover:text-[#B49B73] transition-colors cursor-pointer"
            >
              <span>View All {products.length} Designs &rarr;</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map(product => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden border border-[#D8C9AE] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative aspect-3/4 overflow-hidden bg-[#E8DFCF]">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-top group-hover:scale-104 transition-transform duration-500"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className="px-2.5 py-1 bg-[#111010] text-[#FAF8F4] text-[9px] font-black uppercase tracking-widest rounded-md shadow-xs">
                      Bestseller
                    </span>
                    <span className="px-2.5 py-0.5 bg-white/90 backdrop-blur-xs text-[#111010] text-[9px] font-black uppercase tracking-wider rounded-md border border-[#D8C9AE]">
                      {product.fabricCategory.toUpperCase()}
                    </span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#111010] hover:scale-110 transition-transform shadow-xs cursor-pointer"
                    aria-label="Save to Wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 ${isWishlisted(product.id) ? 'fill-[#B5654F] text-[#B5654F]' : 'text-[#111010]'}`}
                    />
                  </button>

                  {/* Quick View overlay button */}
                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="w-full py-2.5 bg-[#111010]/95 backdrop-blur-xs text-[#FAF8F4] text-[11px] font-black uppercase tracking-wider rounded-xl hover:bg-[#111010] flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Info Block */}
                <div className="p-4 flex-1 flex flex-col justify-between bg-[#FAF8F4]">
                  <div>
                    <h3
                      onClick={() => navigateTo('product', { productSlug: product.slug })}
                      className="text-base font-extrabold text-[#111010] hover:text-[#B49B73] cursor-pointer transition-colors leading-snug mb-1"
                    >
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-[#8C7F72] font-medium line-clamp-2 mb-3">
                      {product.shortDescription}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between mb-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-black text-[#111010]">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-[#8C7F72] line-through font-semibold">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#8C7F72] font-bold">15-Day Bespoke</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E8DFCF]">
                      <button
                        onClick={() => navigateTo('product', { productSlug: product.slug })}
                        className="py-2.5 text-center bg-[#111010] text-[#FAF8F4] text-[10px] font-black uppercase tracking-wider rounded-xl hover:bg-[#222] transition-colors cursor-pointer"
                      >
                        Shop Now
                      </button>
                      <a
                        href={generateWhatsAppLink({ product })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 text-center bg-white border border-[#111010] text-[#111010] text-[10px] font-black uppercase tracking-wider rounded-xl hover:bg-[#E8DFCF] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <MessageCircle className="w-3 h-3 text-[#B49B73]" />
                        <span>Customise</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BESPOKE ATELIER SPOTLIGHT */}
      <section className="py-16 sm:py-20 bg-[#111010] text-[#FAF8F4] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Image */}
            <div className="lg:col-span-5">
              <div className="aspect-3/4 rounded-3xl overflow-hidden border border-[#B49B73]/40 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop"
                  alt="Pearlessence Bangalore Tailoring"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#3A3733]/70 rounded-full border border-[#B49B73]/30 text-[#D8C9AE] text-xs uppercase tracking-widest font-bold">
                <Scissors className="w-3.5 h-3.5 text-[#B49B73]" />
                <span>Master Tailor Consultation</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-[#F5F1E8] uppercase tracking-tight">
                "We don't follow trends — we create pieces meant to stay with you."
              </h2>

              <p className="text-xs sm:text-sm text-[#D8C9AE] leading-relaxed font-medium">
                {BRAND_DETAILS.story}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-[#D8C9AE]">
                <div className="p-4 bg-[#3A3733]/50 rounded-2xl border border-[#B49B73]/20">
                  <h4 className="text-sm text-[#F5F1E8] mb-1 font-black uppercase">
                    Custom Length &amp; Sleeves
                  </h4>
                  <p className="text-[11px] leading-relaxed text-[#D8C9AE] font-medium">
                    Tailored to your exact stature (50" to 60"+) with optional wudhu-friendly cuffs or French sleeves.
                  </p>
                </div>
                <div className="p-4 bg-[#3A3733]/50 rounded-2xl border border-[#B49B73]/20">
                  <h4 className="text-sm text-[#F5F1E8] mb-1 font-black uppercase">
                    15-Day Atelier Care
                  </h4>
                  <p className="text-[11px] leading-relaxed text-[#D8C9AE] font-medium">
                    Each abaya is individually cut and hand-stitched upon order confirmation. Zero warehouse mass batches.
                  </p>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap gap-4">
                <button
                  onClick={() => navigateTo('customise')}
                  className="py-3.5 px-7 bg-[#FAF8F4] text-[#111010] text-xs font-black uppercase tracking-widest rounded-xl hover:bg-[#E8DFCF] transition-colors shadow-lg cursor-pointer"
                >
                  Start Bespoke Customisation &rarr;
                </button>
                <button
                  onClick={() => navigateTo('about')}
                  className="py-3.5 px-7 border border-[#B49B73] text-[#FAF8F4] text-xs font-black uppercase tracking-widest rounded-xl hover:bg-[#3A3733] transition-colors cursor-pointer"
                >
                  Our Atelier Story
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS & SOCIAL PROOF */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#B49B73] font-black">
                Client Testimonials
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#111010] uppercase tracking-tight mt-1">
                Words from Our Clientele
              </h2>
            </div>
            <button
              onClick={() => navigateTo('testimonials')}
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#111010] hover:text-[#B49B73] transition-colors cursor-pointer"
            >
              <span>View All Client Reviews &rarr;</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 3).map(item => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-2xl border border-[#D8C9AE] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1 text-[#B49B73]">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#B49B73]" />
                      ))}
                    </div>
                    <span className="text-[10px] uppercase tracking-widest font-black px-2 py-0.5 bg-[#FAF8F4] text-[#111010] rounded-md border border-[#D8C9AE]">
                      {item.source}
                    </span>
                  </div>

                  <p className="text-xs text-[#3A3733] font-medium leading-relaxed mb-6">
                    "{item.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#D8C9AE]/60 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-black text-[#111010] uppercase">
                      {item.customerName}
                    </h4>
                    <span className="text-[11px] text-[#8C7F72] font-semibold">{item.city}</span>
                  </div>
                  <span className="text-[10px] text-[#B49B73] font-bold text-right max-w-28 truncate">
                    {item.productName}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. INSTAGRAM FEED */}
      <section className="py-14 bg-[#E8DFCF]/30 border-t border-[#D8C9AE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <div className="inline-flex items-center gap-2 mb-2">
            <Instagram className="w-5 h-5 text-[#111010]" />
            <a
              href={BRAND_DETAILS.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-black text-[#111010] hover:text-[#B49B73] transition-colors uppercase tracking-wider"
            >
              {BRAND_DETAILS.instagram}
            </a>
          </div>
          <p className="text-xs text-[#8C7F72] tracking-wider uppercase mb-8 font-bold">
            Bangalore atelier styling reels, fabric reveals &amp; bespoke diaries
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600&auto=format&fit=crop'
            ].map((img, idx) => (
              <a
                key={idx}
                href={BRAND_DETAILS.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square rounded-2xl overflow-hidden bg-[#D8C9AE] block shadow-xs"
              >
                <img
                  src={img}
                  alt={`Pearlessence Instagram Post ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#111010]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[#FAF8F4]">
                  <Instagram className="w-5 h-5 text-[#B49B73]" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
