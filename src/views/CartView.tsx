import React, { useState } from 'react';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  Truck,
  ShieldCheck,
  Gift,
  Scissors,
  MessageCircle,
  Tag,
  Check
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/formatters';
import { BRAND_DETAILS } from '../data/mockData';

export const CartView: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    navigateTo,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    showToast,
    generateWhatsAppLink
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [giftWrapping, setGiftWrapping] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);

  const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const shippingCharge = cartTotal > 4999 ? 0 : 250;
  const giftWrapFee = giftWrapping ? 350 : 0;
  const finalTotal = Math.max(0, cartTotal - discountAmount + shippingCharge + giftWrapFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    if (!agreedToPolicy) {
      showToast('Please acknowledge the 15-day made-to-order craftsmanship policy.');
      return;
    }
    navigateTo('checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#FAF8F4] flex flex-col items-center justify-center p-6 text-center font-montserrat">
        <div className="w-16 h-16 rounded-full bg-[#E8DFCF] flex items-center justify-center mb-4 text-[#111010]">
          <ShoppingBag className="w-8 h-8 text-[#B49B73]" />
        </div>
        <h2 className="font-montserrat text-3xl font-black text-[#111010] mb-2 uppercase">Your Bag is Empty</h2>
        <p className="text-xs text-[#8C7F72] max-w-sm mb-6 leading-relaxed font-medium">
          Discover our ready-to-wear luxury abayas or commission a bespoke design with our Bangalore atelier.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => navigateTo('shop')}
            className="py-3 px-6 bg-[#111010] text-[#F5F1E8] text-xs font-black tracking-widest uppercase rounded-xl hover:bg-[#222] cursor-pointer"
          >
            Explore Ready-to-Wear
          </button>
          <button
            onClick={() => navigateTo('customise')}
            className="py-3 px-6 border border-[#111010] text-[#111010] text-xs font-black tracking-widest uppercase rounded-xl hover:bg-[#E8DFCF] cursor-pointer"
          >
            Customise via WhatsApp
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F4] min-h-screen pb-24 font-montserrat">
      {/* Header */}
      <div className="bg-[#111010] text-[#FAF8F4] py-12 px-4 sm:px-6 lg:px-8 border-b border-[#B49B73]/30">
        <div className="max-w-7xl mx-auto text-center space-y-2">
          <h1 className="font-montserrat text-3xl sm:text-4xl font-black text-[#F5F1E8] uppercase tracking-tight">
            Your Shopping Bag
          </h1>
          <p className="text-xs text-[#D8C9AE] uppercase tracking-widest font-bold">
            {cart.reduce((acc, item) => acc + item.quantity, 0)} Handcrafted Piece(s)
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Free Shipping Progress Indicator */}
        <div className="bg-white p-4 rounded-2xl border border-[#D8C9AE] mb-8 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-[#111010] mb-2 font-medium">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#B49B73]" />
              {cartTotal >= 4999 ? (
                <span className="text-[#42683B] font-semibold">
                  ✨ Congratulations! You've unlocked Complimentary Express Shipping across India.
                </span>
              ) : (
                <span>
                  Add <strong>{formatPrice(4999 - cartTotal)}</strong> more for Complimentary Express Shipping
                </span>
              )}
            </span>
            <span className="text-[11px] text-[#8C7F72]">Free at ₹4,999</span>
          </div>
          <div className="w-full bg-[#E8DFCF] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#111010] h-full transition-all duration-500"
              style={{ width: `${Math.min(100, (cartTotal / 4999) * 100)}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Cart Line Items (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {cart.map(item => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-2xl border border-[#D8C9AE] shadow-2xs flex flex-col sm:flex-row gap-4 justify-between"
              >
                <div className="flex gap-4">
                  <div className="w-24 h-32 rounded-xl overflow-hidden bg-[#E8DFCF] shrink-0 border border-[#D8C9AE]">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-widest text-[#B49B73] font-semibold block">
                      {item.product.fabricCategory.toUpperCase()} COLLECTION
                    </span>
                    <h3 className="font-editorial text-lg font-semibold text-[#111010] leading-snug">
                      {item.product.name}
                    </h3>
                    <div className="text-xs text-[#8C7F72] flex flex-wrap gap-x-3">
                      <span>Size: <strong>{item.selectedSize}</strong></span>
                      <span>Color: <strong>{item.selectedColor}</strong></span>
                    </div>

                    {/* Custom Tailoring Notes Tag */}
                    {(item.customOptions?.customLength || item.customOptions?.heightInInches || item.customOptions?.sleeveStyle || item.customOptions?.specialRequests) && (
                      <div className="mt-2 p-2 bg-[#FAF8F4] rounded-lg border border-[#D8C9AE] text-[11px] text-[#3A3733] space-y-0.5">
                        <div className="font-semibold text-[#111010] flex items-center gap-1">
                          <Scissors className="w-3 h-3 text-[#B49B73]" />
                          <span>Custom Tailoring:</span>
                        </div>
                        {item.customOptions.customLength && <div>• Length: {item.customOptions.customLength}</div>}
                        {item.customOptions.heightInInches && <div>• Height: {item.customOptions.heightInInches}</div>}
                        {item.customOptions.sleeveStyle && <div>• Sleeve: {item.customOptions.sleeveStyle}</div>}
                        {item.customOptions.specialRequests && <div>• Notes: {item.customOptions.specialRequests}</div>}
                      </div>
                    )}
                  </div>
                </div>

                {/* Price, Quantity, Remove */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-between pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E8DFCF]">
                  <div className="text-right">
                    <span className="font-editorial text-base font-bold text-[#111010] block">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                    <span className="text-[10px] text-[#8C7F72]">
                      ({formatPrice(item.product.price)} each)
                    </span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 border border-[#D8C9AE] rounded-lg p-1 bg-[#FAF8F4]">
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-[#E8DFCF] rounded-md transition-colors text-[#111010]"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center text-xs font-semibold text-[#111010]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-[#E8DFCF] rounded-md transition-colors text-[#111010]"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-[#B5654F] hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Gift Wrapping & Message Accordion */}
            <div className="bg-white p-5 rounded-2xl border border-[#D8C9AE] shadow-2xs space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={giftWrapping}
                  onChange={e => setGiftWrapping(e.target.checked)}
                  className="w-4 h-4 rounded-sm border-[#D8C9AE] text-[#111010] focus:ring-0"
                />
                <div className="text-xs">
                  <span className="font-semibold text-[#111010] flex items-center gap-1.5">
                    <Gift className="w-4 h-4 text-[#B49B73]" />
                    Add Luxury Ivory Gift Packaging & Scented Box (+₹350)
                  </span>
                  <span className="text-[11px] text-[#8C7F72] block">
                    Includes satin ribbon, wax seal, and a personalized handwritten calligraphy card.
                  </span>
                </div>
              </label>

              {giftWrapping && (
                <div className="pt-2 pl-7 animate-in fade-in">
                  <textarea
                    rows={2}
                    value={giftMessage}
                    onChange={e => setGiftMessage(e.target.value)}
                    placeholder="Enter your personalized gift message for the recipient..."
                    className="w-full px-3 py-2 bg-[#FAF8F4] border border-[#D8C9AE] rounded-xl text-xs"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Order Summary & Checkout Form (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D8C9AE] shadow-sm space-y-6">
              <h2 className="font-editorial text-2xl font-semibold text-[#111010] pb-4 border-b border-[#E8DFCF]">
                Order Summary
              </h2>

              {/* Coupon Code Field */}
              <div>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-[#8C7F72] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={couponInput}
                      onChange={e => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="Coupon (e.g. WELCOME10, EIDLUXE)"
                      className="w-full pl-9 pr-3 py-2 bg-[#FAF8F4] border border-[#D8C9AE] rounded-xl text-xs uppercase font-medium focus:outline-hidden"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#111010] text-[#F5F1E8] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#222]"
                  >
                    Apply
                  </button>
                </form>

                {appliedCoupon && (
                  <div className="mt-2 p-2 bg-[#F4F7F4] rounded-lg border border-[#D0DFCF] flex items-center justify-between text-xs text-[#42683B]">
                    <span>
                      ✓ Coupon <strong>{appliedCoupon.code}</strong> applied ({formatPrice(appliedCoupon.discountAmount)} off)
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-[#B5654F] font-semibold hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-3 text-xs text-[#3A3733] border-b border-[#E8DFCF] pb-4">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-[#111010]">{formatPrice(cartTotal)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-[#42683B]">
                    <span>Promo Discount</span>
                    <span>- {formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping (All-India Express)</span>
                  <span className="font-semibold text-[#111010]">
                    {shippingCharge === 0 ? 'FREE' : formatPrice(shippingCharge)}
                  </span>
                </div>

                {giftWrapping && (
                  <div className="flex justify-between">
                    <span>Luxury Gift Packaging</span>
                    <span className="font-semibold text-[#111010]">{formatPrice(350)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#8C7F72] text-[11px]">
                  <span>Estimated Taxes (GST)</span>
                  <span>Included in pricing</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-baseline pt-1">
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#111010] block">
                    Total Amount
                  </span>
                  <span className="text-[10px] text-[#8C7F72]">15 Working Days Delivery</span>
                </div>
                <span className="font-editorial text-3xl font-bold text-[#111010]">
                  {formatPrice(finalTotal)}
                </span>
              </div>

              {/* MANDATORY POLICY ACKNOWLEDGMENT CHECKBOX */}
              <div className="p-4 bg-[#FAF8F4] rounded-2xl border border-[#D8C9AE] space-y-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={agreedToPolicy}
                    onChange={e => setAgreedToPolicy(e.target.checked)}
                    className="w-4 h-4 rounded-sm border-[#D8C9AE] text-[#111010] mt-0.5"
                  />
                  <span className="text-[11px] text-[#3A3733] leading-relaxed">
                    I acknowledge that Pearlessence pieces are handcrafted on order with a <strong>15 working day craftsmanship period</strong>, and understand that tailored items are non-returnable except in case of transit damage.
                  </span>
                </label>
              </div>

              {/* Checkout Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleProceedToCheckout}
                  disabled={!agreedToPolicy}
                  className={`w-full py-4 px-6 text-xs font-semibold tracking-[0.2em] uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 ${
                    agreedToPolicy
                      ? 'bg-[#111010] text-[#F5F1E8] hover:bg-[#222] cursor-pointer'
                      : 'bg-[#D8C9AE] text-[#8C7F72] cursor-not-allowed'
                  }`}
                >
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Alternative: WhatsApp Direct Order */}
                <a
                  href={generateWhatsAppLink({ customNotes: `Cart items: ${cart.map(c => `${c.product.name} (Size ${c.selectedSize})`).join(', ')}` })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-white border border-[#111010] text-[#111010] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#E8DFCF] transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#8A9A83]" />
                  <span>Order via WhatsApp Concierge</span>
                </a>
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] text-[#8C7F72] pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B49B73]" />
                  Razorpay & COD Secure
                </span>
                <span>•</span>
                <span>GST Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
