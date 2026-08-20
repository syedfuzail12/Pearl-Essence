import React, { useState } from 'react';
import {
  Heart,
  ShoppingBag,
  MessageCircle,
  Sparkles,
  Truck,
  ShieldAlert,
  Ruler,
  ChevronRight,
  CheckCircle2,
  Share2,
  Info,
  Clock,
  Scissors,
  Check,
  Star
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/formatters';
import { BRAND_DETAILS } from '../data/mockData';

export const ProductDetailView: React.FC = () => {
  const {
    selectedProductSlug,
    getProductBySlug,
    products,
    navigateTo,
    addToCart,
    toggleWishlist,
    isWishlisted,
    setSizeGuideOpen,
    generateWhatsAppLink,
    submitEnquiry,
    showToast
  } = useStore();

  const product = selectedProductSlug
    ? getProductBySlug(selectedProductSlug)
    : products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL' | 'XXL' | 'Custom'>('M');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  // Bespoke customisation inputs on PDP
  const [customLengthInches, setCustomLengthInches] = useState('');
  const [customSleeveLength, setCustomSleeveLength] = useState('');
  const [selectedSleeveStyle, setSelectedSleeveStyle] = useState('');
  const [selectedEmbroidery, setSelectedEmbroidery] = useState('');
  const [clientHeight, setClientHeight] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAF8F4] flex flex-col items-center justify-center p-6 text-center font-montserrat">
        <h2 className="font-montserrat text-3xl font-black text-[#111010] mb-4 uppercase">Product Not Found</h2>
        <button
          onClick={() => navigateTo('shop')}
          className="py-3 px-6 bg-[#111010] text-[#F5F1E8] text-xs font-black uppercase tracking-widest rounded-xl"
        >
          Return to Atelier Collection
        </button>
      </div>
    );
  }

  const currentColor = selectedColor || product.colors[0]?.name || 'Standard';

  const handleAddToCart = () => {
    addToCart(product, selectedSize, currentColor, quantity, {
      customLength: customLengthInches ? `${customLengthInches} inches` : undefined,
      customSleeveLength: customSleeveLength || undefined,
      sleeveStyle: selectedSleeveStyle || undefined,
      embroideryNotes: selectedEmbroidery || undefined,
      heightInInches: clientHeight || undefined,
      specialRequests: specialRequests || undefined
    });
  };

  const handleWhatsAppCustomise = () => {
    // Log enquiry into Admin CRM automatically
    submitEnquiry({
      name: 'PDP Customisation Lead',
      phone: 'Direct via WhatsApp',
      productReference: product.name,
      preferredFabric: product.fabricCategory,
      sourcePage: `/shop/product/${product.slug}`,
      notes: `Size: ${selectedSize}, Height: ${clientHeight || 'N/A'}, Length: ${customLengthInches || 'Std'}, Sleeve: ${selectedSleeveStyle || 'Std'}, Notes: ${specialRequests || 'None'}`
    });

    const customNotes = `Size: ${selectedSize}, Height: ${clientHeight || 'Not specified'}, Preferred Length: ${customLengthInches || 'Standard'}, Sleeve Style: ${selectedSleeveStyle || 'Standard'}, Requests: ${specialRequests || 'None'}`;
    const link = generateWhatsAppLink({ product, customNotes });
    window.open(link, '_blank');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard.');
    }
  };

  const relatedProducts = products
    .filter(p => p.id !== product.id && p.fabricCategory === product.fabricCategory)
    .concat(products.filter(p => p.id !== product.id))
    .slice(0, 3);

  return (
    <div className="bg-[#FAF8F4] min-h-screen pb-32">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-[#E8DFCF]">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8C7F72]">
          <button onClick={() => navigateTo('home')} className="hover:text-[#111010]">
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-[#D8C9AE]" />
          <button
            onClick={() => navigateTo('category', { category: product.fabricCategory })}
            className="hover:text-[#111010]"
          >
            {product.fabricCategory.toUpperCase()} ABAYAS
          </button>
          <ChevronRight className="w-3 h-3 text-[#D8C9AE]" />
          <span className="text-[#111010] font-semibold truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT 7 COLS: FULL IMAGE GALLERY */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-3/4 rounded-2xl overflow-hidden bg-[#E8DFCF] border border-[#D8C9AE] shadow-sm">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-top transition-all duration-300"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="px-3 py-1 bg-[#111010] text-[#F5F1E8] text-[10px] font-semibold uppercase tracking-widest rounded-lg shadow-sm">
                  {product.fabricCategory.toUpperCase()} COLLECTION
                </span>
                <span className="px-3 py-1 bg-[#FAF8F4]/90 backdrop-blur-xs text-[#111010] text-[10px] uppercase tracking-wider rounded-lg font-medium">
                  Crafted on Order (15 Working Days)
                </span>
              </div>

              {/* Wishlist & Share buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="w-10 h-10 rounded-full bg-[#FAF8F4]/90 backdrop-blur-xs flex items-center justify-center text-[#111010] hover:scale-105 transition-transform shadow-sm"
                  aria-label="Wishlist"
                >
                  <Heart
                    className={`w-5 h-5 ${isWishlisted(product.id) ? 'fill-[#B5654F] text-[#B5654F]' : 'text-[#111010]'}`}
                  />
                </button>
                <button
                  onClick={handleShare}
                  className="w-10 h-10 rounded-full bg-[#FAF8F4]/90 backdrop-blur-xs flex items-center justify-center text-[#111010] hover:scale-105 transition-transform shadow-sm"
                  aria-label="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-3/4 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#111010] shadow-md scale-102'
                      : 'border-transparent opacity-70 hover:opacity-100 bg-[#E8DFCF]'
                  }`}
                >
                  <img src={img} alt="Thumbnail view" className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>

            {/* Atelier Craftsmanship Accordion / Dossier */}
            <div className="pt-6 space-y-4 font-montserrat">
              <div className="bg-white p-6 rounded-2xl border border-[#D8C9AE] shadow-2xs space-y-4">
                <h3 className="font-montserrat text-base sm:text-lg font-black text-[#111010] flex items-center gap-2 uppercase">
                  <Sparkles className="w-4 h-4 text-[#B49B73]" />
                  Fabric & Drapery Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[#8C7F72] uppercase tracking-wider block text-[10px]">
                      Fabric Composition
                    </span>
                    <span className="font-medium text-[#111010]">{product.fabricComposition}</span>
                  </div>
                  <div>
                    <span className="text-[#8C7F72] uppercase tracking-wider block text-[10px]">
                      Silhouette & Drape
                    </span>
                    <span className="font-medium text-[#111010]">{product.drapeAndFit}</span>
                  </div>
                  <div>
                    <span className="text-[#8C7F72] uppercase tracking-wider block text-[10px]">
                      Recommended Occasions
                    </span>
                    <span className="font-medium text-[#111010]">{product.occasion.join(' • ')}</span>
                  </div>
                  <div>
                    <span className="text-[#8C7F72] uppercase tracking-wider block text-[10px]">
                      Origin & Craftsmanship
                    </span>
                    <span className="font-medium text-[#111010]">Bangalore Atelier, Karnataka, India</span>
                  </div>
                </div>

                {/* Wash and Care */}
                <div className="pt-3 border-t border-[#E8DFCF]">
                  <span className="text-[#8C7F72] uppercase tracking-wider block text-[10px] mb-1.5 font-semibold">
                    Garment Care & Longevity
                  </span>
                  <ul className="list-disc pl-4 text-xs text-[#3A3733] space-y-1">
                    {product.careInstructions.map((ins, i) => (
                      <li key={i}>{ins}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT 5 COLS: DETAILS, SIZING, CUSTOMISATION & DUAL CTAS */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B49B73] font-semibold mb-1">
                <span>{product.fabricName}</span>
                <span>•</span>
                <span>⭐ {product.rating} ({product.reviewCount} Reviews)</span>
              </div>

              <h1 className="font-montserrat text-3xl sm:text-4xl font-black text-[#111010] leading-tight mb-3 uppercase">
                {product.name}
              </h1>

              {/* Price & GST */}
              <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-[#D8C9AE]">
                <span className="font-montserrat text-3xl font-black text-[#111010]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-[#8C7F72] line-through font-semibold">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs text-[#8C7F72] uppercase tracking-wider font-bold">
                  (GST Inclusive)
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#3A3733] leading-relaxed font-medium">
                {product.fullDescription}
              </p>
            </div>

            {/* Color Palette Selector */}
            {product.colors.length > 0 && (
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#111010] font-semibold mb-2">
                  Color Shade: <span className="text-[#8C7F72] font-normal">{currentColor}</span>
                </label>
                <div className="flex items-center gap-3">
                  {product.colors.map(col => (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColor(col.name)}
                      className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                        currentColor === col.name ? 'border-[#111010] scale-110 shadow-xs' : 'border-transparent'
                      }`}
                      title={col.name}
                    >
                      <span
                        className="w-6 h-6 rounded-full border border-[#D8C9AE]"
                        style={{ backgroundColor: col.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector + Size Guide Link */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#111010]">
                  Select Standard Size
                </label>
                <button
                  type="button"
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-[11px] text-[#111010] font-medium underline underline-offset-2 flex items-center gap-1 hover:text-[#B49B73]"
                >
                  <Ruler className="w-3.5 h-3.5" /> Size Guide & Custom Matrix
                </button>
              </div>

              <div className="grid grid-cols-6 gap-2">
                {product.availableSizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2.5 text-xs font-semibold rounded-xl border transition-all ${
                      selectedSize === size
                        ? 'bg-[#111010] text-[#F5F1E8] border-[#111010] shadow-xs'
                        : 'bg-white text-[#3A3733] border-[#D8C9AE] hover:border-[#111010]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* EXPLICIT CUSTOMISATION OPTIONS SECTION (Requested on every product) */}
            <div className="bg-[#E8DFCF]/60 p-5 rounded-2xl border border-[#D8C9AE] space-y-3.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#111010] uppercase tracking-wider">
                  <Scissors className="w-4 h-4 text-[#B49B73]" />
                  Customisation & Tailoring Options
                </div>
                <span className="text-[10px] text-[#8C7F72] font-medium bg-[#FAF8F4] px-2 py-0.5 rounded-md">
                  Complimentary
                </span>
              </div>
              <p className="text-[11px] text-[#3A3733] leading-relaxed">
                Even for ready-made orders, specify your exact height or sleeve preference so our tailors can adjust the hemline before dispatch.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Abaya Length */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#3A3733] font-semibold mb-1">
                    Custom Abaya Length (Inches)
                  </label>
                  <input
                    type="text"
                    value={customLengthInches}
                    onChange={e => setCustomLengthInches(e.target.value)}
                    placeholder="e.g. 54 or 56 in"
                    className="w-full px-3 py-2 bg-white border border-[#D8C9AE] rounded-xl text-xs focus:outline-hidden focus:border-[#111010]"
                  />
                </div>

                {/* Client Height */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#3A3733] font-semibold mb-1">
                    Your Height (Feet / In)
                  </label>
                  <input
                    type="text"
                    value={clientHeight}
                    onChange={e => setClientHeight(e.target.value)}
                    placeholder="e.g. 5 ft 6 in"
                    className="w-full px-3 py-2 bg-white border border-[#D8C9AE] rounded-xl text-xs focus:outline-hidden focus:border-[#111010]"
                  />
                </div>

                {/* Sleeve Style */}
                {product.customisation.sleeveStyles.length > 0 && (
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#3A3733] font-semibold mb-1">
                      Sleeve Style Preference
                    </label>
                    <select
                      value={selectedSleeveStyle}
                      onChange={e => setSelectedSleeveStyle(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#D8C9AE] rounded-xl text-xs focus:outline-hidden"
                    >
                      <option value="">Default Catalog Style</option>
                      {product.customisation.sleeveStyles.map((s, idx) => (
                        <option key={idx} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Embroidery / Accents */}
                {product.customisation.embroideryOptions.length > 0 && (
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#3A3733] font-semibold mb-1">
                      Embroidery / Accent
                    </label>
                    <select
                      value={selectedEmbroidery}
                      onChange={e => setSelectedEmbroidery(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#D8C9AE] rounded-xl text-xs focus:outline-hidden"
                    >
                      <option value="">Default Catalog Finish</option>
                      {product.customisation.embroideryOptions.map((e, idx) => (
                        <option key={idx} value={e}>{e}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#3A3733] font-semibold mb-1">
                  Special Tailoring Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={e => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Add wudhu-friendly hidden sleeve zipper, coordinate with matching slip dress..."
                  className="w-full px-3 py-2 bg-white border border-[#D8C9AE] rounded-xl text-xs focus:outline-hidden focus:border-[#111010]"
                />
              </div>
            </div>

            {/* DUAL ORDERING PATH CTAS (EQUAL VISUAL WEIGHT) */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. Add to Cart / Shop Now */}
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 px-4 bg-[#111010] text-[#F5F1E8] hover:bg-[#222] text-xs font-semibold tracking-[0.2em] uppercase rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4 text-[#F5F1E8]" />
                  <span>Add to Cart</span>
                </button>

                {/* 2. Customise via WhatsApp */}
                <button
                  onClick={handleWhatsAppCustomise}
                  className="w-full py-4 px-4 bg-white text-[#111010] border-2 border-[#111010] hover:bg-[#E8DFCF] text-xs font-semibold tracking-[0.2em] uppercase rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 text-[#8A9A83]" />
                  <span>Customise via WhatsApp</span>
                </button>
              </div>

              <div className="text-center">
                <span className="text-[11px] text-[#8C7F72]">
                  Ordering for an upcoming event or wedding? WhatsApp consultation is available 7 days a week.
                </span>
              </div>
            </div>

            {/* EXACT DELIVERY & RETURN POLICY DISCLOSURES */}
            <div className="space-y-3 pt-4 border-t border-[#D8C9AE]">
              {/* Delivery info box */}
              <div className="p-4 bg-white rounded-xl border border-[#D8C9AE] flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#B49B73] shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <strong className="text-[#111010] block font-semibold">
                    Delivery Information
                  </strong>
                  <p className="text-[#3A3733] leading-relaxed">
                    {BRAND_DETAILS.deliveryTimeCopy}
                  </p>
                </div>
              </div>

              {/* Exchange and return policy box */}
              <div className="p-4 bg-white rounded-xl border border-[#D8C9AE] flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-[#8C7F72] shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <strong className="text-[#111010] block font-semibold">
                    Exchange & Return Policy
                  </strong>
                  <p className="text-[#3A3733] leading-relaxed">
                    {BRAND_DETAILS.returnPolicyCopy}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PIECES */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-[#D8C9AE]">
            <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#111010] mb-8 text-center">
              Complete Your Modest Wardrobe
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map(rel => (
                <div
                  key={rel.id}
                  onClick={() => navigateTo('product', { productSlug: rel.slug })}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#D8C9AE] cursor-pointer shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="aspect-3/4 overflow-hidden bg-[#E8DFCF]">
                    <img
                      src={rel.images[0]}
                      alt={rel.name}
                      className="w-full h-full object-cover object-top group-hover:scale-104 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-editorial text-base font-semibold text-[#111010] group-hover:text-[#B49B73] transition-colors">
                        {rel.name}
                      </h4>
                      <span className="text-xs text-[#8C7F72]">{rel.fabricName}</span>
                    </div>
                    <span className="font-editorial text-sm font-bold text-[#111010]">
                      {formatPrice(rel.price)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* STICKY BOTTOM CTA BAR ON MOBILE (Add to Cart / Customise) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-[#FAF8F4]/95 backdrop-blur-md border-t border-[#D8C9AE] p-3 z-30 shadow-2xl">
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          <div className="flex flex-col">
            <span className="font-editorial text-base font-bold text-[#111010]">
              {formatPrice(product.price)}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-[#8C7F72]">
              Size {selectedSize} • Made to Order
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className="py-2.5 px-3 bg-[#111010] text-[#F5F1E8] text-[11px] font-semibold uppercase tracking-wider rounded-xl flex items-center gap-1.5 shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Cart</span>
            </button>

            <button
              onClick={handleWhatsAppCustomise}
              className="py-2.5 px-3 bg-white border border-[#111010] text-[#111010] text-[11px] font-semibold uppercase tracking-wider rounded-xl flex items-center gap-1.5 shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#B49B73]" />
              <span>Customise</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
