import React, { useState } from 'react';
import { X, Heart, MessageCircle, ShoppingBag, Sparkles, Check, ChevronRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../utils/formatters';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    navigateTo,
    generateWhatsAppLink,
    setSizeGuideOpen,
    submitEnquiry
  } = useStore();

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL' | 'XXL' | 'Custom'>('M');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [customLength, setCustomLength] = useState<string>('');
  const [customSleeve, setCustomSleeve] = useState<string>('');

  if (!quickViewProduct) return null;

  const currentImg = selectedImage || quickViewProduct.images[0];
  const currentColor = selectedColor || quickViewProduct.colors[0]?.name || 'Standard';

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedSize, currentColor, 1, {
      customLength: customLength || undefined,
      customSleeveLength: customSleeve || undefined
    });
    setQuickViewProduct(null);
  };

  const handleWhatsAppCustomise = () => {
    // Log enquiry into Admin CRM automatically
    submitEnquiry({
      name: 'Website QuickView Visitor',
      phone: 'Via WhatsApp Direct',
      productReference: quickViewProduct.name,
      preferredFabric: quickViewProduct.fabricCategory,
      sourcePage: `/shop/product/${quickViewProduct.slug}`,
      notes: `Custom size: ${selectedSize}, Length: ${customLength || 'Standard'}, Sleeve: ${customSleeve || 'Standard'}`
    });

    const link = generateWhatsAppLink({
      product: quickViewProduct,
      customNotes: `Size: ${selectedSize}, Color: ${currentColor}, Custom Length: ${customLength || 'Standard'}, Custom Sleeve: ${customSleeve || 'Standard'}`
    });
    window.open(link, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111010]/70 backdrop-blur-xs animate-in fade-in duration-200 font-montserrat">
      <div className="bg-[#FAF8F4] w-full max-w-4xl max-h-[92vh] rounded-2xl shadow-2xl border border-[#D8C9AE] overflow-hidden flex flex-col md:flex-row relative">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 p-2 text-[#3A3733] hover:text-[#111010] hover:bg-[#E8DFCF] rounded-full transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Gallery */}
        <div className="md:w-1/2 bg-[#E8DFCF]/40 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#D8C9AE]">
          <div className="relative aspect-3/4 rounded-xl overflow-hidden shadow-sm bg-white mb-4">
            <img
              src={currentImg}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover object-top transition-all duration-300"
            />
            <button
              onClick={() => toggleWishlist(quickViewProduct.id)}
              className="absolute top-3 left-3 w-9 h-9 rounded-full bg-[#FAF8F4]/90 backdrop-blur-xs flex items-center justify-center text-[#111010] shadow-xs hover:scale-105 transition-transform cursor-pointer"
            >
              <Heart
                className={`w-4 h-4 ${isWishlisted(quickViewProduct.id) ? 'fill-[#B5654F] text-[#B5654F]' : 'text-[#111010]'}`}
              />
            </button>
            <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-[#111010] text-[#F5F1E8] text-[10px] font-black uppercase tracking-widest rounded-md">
              {quickViewProduct.fabricCategory.toUpperCase()} ABAYA
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {quickViewProduct.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img)}
                className={`w-14 h-18 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  currentImg === img ? 'border-[#111010] scale-102' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="thumbnail" className="w-full h-full object-cover object-top" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Details & CTAs */}
        <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] uppercase tracking-widest text-[#B49B73] font-bold">
                Made Exclusively on Order
              </span>
              <span className="text-[10px] text-[#8C7F72] font-semibold">• 15-Day Delivery</span>
            </div>

            <h2 className="font-montserrat text-2xl md:text-3xl font-black text-[#111010] leading-tight mb-2 uppercase">
              {quickViewProduct.name}
            </h2>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-montserrat text-2xl font-black text-[#111010]">
                {formatPrice(quickViewProduct.price)}
              </span>
              {quickViewProduct.originalPrice && (
                <span className="text-sm text-[#8C7F72] line-through font-semibold">
                  {formatPrice(quickViewProduct.originalPrice)}
                </span>
              )}
              <span className="text-[11px] text-[#8C7F72] uppercase tracking-wider font-bold">(GST Inclusive)</span>
            </div>

            <p className="text-xs text-[#3A3733] leading-relaxed mb-6">
              {quickViewProduct.shortDescription}
            </p>

            {/* Size Selector */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#111010]">
                  Select Size
                </label>
                <button
                  type="button"
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-[11px] text-[#8C7F72] underline hover:text-[#111010]"
                >
                  Size Guide & Customisation Matrix
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickViewProduct.availableSizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3.5 text-xs font-medium rounded-lg border transition-all ${
                      selectedSize === size
                        ? 'bg-[#111010] text-[#F5F1E8] border-[#111010]'
                        : 'bg-white text-[#3A3733] border-[#D8C9AE] hover:border-[#111010]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Customisation inputs */}
            <div className="p-3.5 bg-[#E8DFCF]/50 rounded-xl border border-[#D8C9AE] mb-6 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#111010] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#B49B73]" />
                Complimentary Tailoring Adjustments
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <input
                  type="text"
                  value={customLength}
                  onChange={e => setCustomLength(e.target.value)}
                  placeholder="Abaya Length (e.g. 54 in)"
                  className="px-3 py-1.5 bg-white border border-[#D8C9AE] rounded-lg text-xs"
                />
                <input
                  type="text"
                  value={customSleeve}
                  onChange={e => setCustomSleeve(e.target.value)}
                  placeholder="Sleeve style / length"
                  className="px-3 py-1.5 bg-white border border-[#D8C9AE] rounded-lg text-xs"
                />
              </div>
            </div>
          </div>

          {/* DUAL ORDERING PATH CTAS (EQUAL PROMINENCE) */}
          <div className="space-y-2.5 pt-4 border-t border-[#D8C9AE]/70">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Ready-made Shop Now CTA */}
              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 px-4 bg-[#111010] text-[#F5F1E8] hover:bg-[#222] text-xs font-semibold tracking-widest uppercase rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <ShoppingBag className="w-4 h-4 text-[#F5F1E8]" />
                Add to Cart
              </button>

              {/* Bespoke WhatsApp Customise CTA */}
              <button
                onClick={handleWhatsAppCustomise}
                className="w-full py-3.5 px-4 bg-white text-[#111010] border-2 border-[#111010] hover:bg-[#E8DFCF] text-xs font-semibold tracking-widest uppercase rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#B49B73]" />
                Customise via WhatsApp
              </button>
            </div>

            <button
              onClick={() => {
                setQuickViewProduct(null);
                navigateTo('product', { productSlug: quickViewProduct.slug });
              }}
              className="w-full py-2 text-center text-xs text-[#8C7F72] hover:text-[#111010] flex items-center justify-center gap-1 transition-colors"
            >
              View Full Product Dossier & Care Guide <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
