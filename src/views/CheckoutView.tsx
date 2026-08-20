import React, { useState } from 'react';
import {
  CreditCard,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Printer,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  FileText
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice, formatDate } from '../utils/formatters';
import { BRAND_DETAILS } from '../data/mockData';
import { Order } from '../types';
import { PearlessenceLogo } from '../components/brand/Logo';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartTotal,
    appliedCoupon,
    clearCart,
    createOrder,
    navigateTo,
    currentUser,
    showToast
  } = useStore();

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [address, setAddress] = useState(currentUser?.savedAddresses[0]?.street || '');
  const [city, setCity] = useState(currentUser?.savedAddresses[0]?.city || 'Bangalore');
  const [state, setState] = useState(currentUser?.savedAddresses[0]?.state || 'Karnataka');
  const [postalCode, setPostalCode] = useState(currentUser?.savedAddresses[0]?.postalCode || '560034');
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod'>('razorpay');

  const [orderPlaced, setOrderPlaced] = useState<Order | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const shippingCharge = cartTotal > 4999 ? 0 : 250;
  const finalTotal = Math.max(0, cartTotal - discountAmount + shippingCharge);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address || !postalCode) {
      showToast('Please fill in all mandatory shipping information.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `PEARL-${Date.now().toString().slice(-6)}`;
      const newOrder: Order = {
        id: orderId,
        orderNumber: orderId,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        shippingAddress: {
          id: `addr-${Date.now()}`,
          fullName: name,
          phone,
          line1: address,
          city,
          state,
          pincode: postalCode
        },
        items: [...cart],
        subtotal: cartTotal,
        gstAmount: Math.round(cartTotal * 0.05),
        shippingFee: shippingCharge,
        discountAmount,
        total: finalTotal,
        status: 'Confirmed',
        paymentStatus: paymentMethod === 'razorpay' ? 'Paid' : 'Pending',
        paymentMethod: paymentMethod === 'razorpay' ? 'Razorpay (UPI / Card / NetBanking)' : 'Cash on Delivery (COD)',
        createdAt: new Date().toISOString(),
        estimatedDeliveryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        policyAcknowledged: true
      };

      createOrder(newOrder);
      clearCart();
      setOrderPlaced(newOrder);
      setIsProcessing(false);
      showToast('Order confirmed! We have initiated made-to-order craftsmanship.');
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  // SUCCESS / CONFIRMATION INVOICE SCREEN
  if (orderPlaced) {
    return (
      <div className="bg-[#FAF8F4] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-[#D8C9AE] shadow-xl space-y-8 print:border-none print:shadow-none">
          {/* Header Banner */}
          <div className="text-center space-y-3 pb-8 border-b border-[#E8DFCF]">
            <div className="flex justify-center mb-2">
              <PearlessenceLogo variant="badge" size="lg" theme="dark" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#8A9A83]/20 text-[#42683B] rounded-full text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-[#42683B]" />
              <span>Craftsmanship Initiated</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl font-medium text-[#111010]">
              Thank You for Your Order
            </h1>
            <p className="text-xs text-[#3A3733] max-w-md mx-auto leading-relaxed">
              Order <strong>#{orderPlaced.id}</strong> has been logged in our Bangalore Atelier. Our master tailors have begun preparing your fabrics.
            </p>
          </div>

          {/* Invoice Meta Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-[#FAF8F4] rounded-2xl border border-[#D8C9AE] text-xs">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#8C7F72] block">Order Date</span>
              <span className="font-semibold text-[#111010]">{formatDate(orderPlaced.createdAt)}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#8C7F72] block">Est. Delivery</span>
              <span className="font-semibold text-[#111010]">{orderPlaced.estimatedDeliveryDate} (15 Days)</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#8C7F72] block">Payment Method</span>
              <span className="font-semibold text-[#111010]">{orderPlaced.paymentMethod}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#8C7F72] block">Status</span>
              <span className="font-semibold text-[#42683B] uppercase">Confirmed & Cutting</span>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="text-xs text-[#3A3733] p-4 bg-[#E8DFCF]/40 rounded-xl border border-[#D8C9AE]">
            <strong className="text-[#111010] block mb-1 font-semibold">
              Delivery Recipient & Destination:
            </strong>
            <p>{orderPlaced.customerName} ({orderPlaced.customerPhone})</p>
            <p>{orderPlaced.shippingAddress.street}, {orderPlaced.shippingAddress.city}, {orderPlaced.shippingAddress.state} - {orderPlaced.shippingAddress.postalCode}</p>
          </div>

          {/* Items Table */}
          <div className="space-y-4">
            <h3 className="font-editorial text-lg font-semibold text-[#111010]">
              Ordered Garments
            </h3>
            <div className="divide-y divide-[#E8DFCF] border-y border-[#E8DFCF]">
              {orderPlaced.items.map(item => (
                <div key={item.id} className="py-4 flex justify-between items-start gap-4 text-xs">
                  <div>
                    <h4 className="font-semibold text-[#111010]">{item.product.name}</h4>
                    <p className="text-[#8C7F72]">
                      Size: {item.selectedSize} • Color: {item.selectedColor} • Qty: {item.quantity}
                    </p>
                    {item.customOptions && (
                      <p className="text-[11px] text-[#B49B73] mt-0.5">
                        Customisations: {item.customOptions.customLength || 'Std Length'}, {item.customOptions.heightInInches || ''}
                      </p>
                    )}
                  </div>
                  <span className="font-editorial font-bold text-[#111010]">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financials Breakdown */}
          <div className="p-5 bg-[#FAF8F4] rounded-2xl border border-[#D8C9AE] space-y-2 text-xs text-[#3A3733]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(orderPlaced.subtotal)}</span>
            </div>
            {orderPlaced.discount > 0 && (
              <div className="flex justify-between text-[#42683B]">
                <span>Discount</span>
                <span>- {formatPrice(orderPlaced.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Express Delivery (15-Day Made-to-Order)</span>
              <span>{orderPlaced.shipping === 0 ? 'FREE' : formatPrice(orderPlaced.shipping)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-[#D8C9AE] text-base font-bold text-[#111010]">
              <span>Total Paid / Payable</span>
              <span className="font-editorial text-xl">{formatPrice(orderPlaced.total)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 flex flex-wrap justify-between items-center gap-4 print:hidden">
            <button
              onClick={handlePrint}
              className="py-2.5 px-4 bg-white border border-[#111010] text-[#111010] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#E8DFCF] transition-colors flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official Invoice</span>
            </button>

            <button
              onClick={() => navigateTo('shop')}
              className="py-2.5 px-6 bg-[#111010] text-[#F5F1E8] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#222] transition-colors"
            >
              Continue Shopping &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }

  // CHECKOUT INPUT FORM
  return (
    <div className="bg-[#FAF8F4] min-h-screen pb-24">
      {/* Header */}
      <div className="bg-[#111010] text-[#FAF8F4] py-10 px-4 sm:px-6 lg:px-8 border-b border-[#B49B73]/30">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-editorial text-3xl font-medium text-[#F5F1E8]">
            Secure Checkout
          </h1>
          <p className="text-xs text-[#D8C9AE] tracking-widest uppercase mt-1">
            Bangalore Atelier • 15-Day Made-to-Order Dispatch
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Form Fields (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Contact Information */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D8C9AE] shadow-2xs space-y-4">
                <h2 className="font-editorial text-xl font-semibold text-[#111010] flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#B49B73]" />
                  1. Contact Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#111010] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Fatima Khan"
                      className="w-full px-3 py-2 bg-[#FAF8F4] border border-[#D8C9AE] rounded-xl text-xs focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#111010] mb-1">
                      WhatsApp Phone (+91) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="98450 12345"
                      className="w-full px-3 py-2 bg-[#FAF8F4] border border-[#D8C9AE] rounded-xl text-xs focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#111010] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="fatima@example.com"
                    className="w-full px-3 py-2 bg-[#FAF8F4] border border-[#D8C9AE] rounded-xl text-xs focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D8C9AE] shadow-2xs space-y-4">
                <h2 className="font-editorial text-xl font-semibold text-[#111010] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#B49B73]" />
                  2. Shipping Destination in India
                </h2>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#111010] mb-1">
                    Street Address & Flat / Apartment *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Flat 402, Al-Rehab Residency, 80 Feet Road"
                    className="w-full px-3 py-2 bg-[#FAF8F4] border border-[#D8C9AE] rounded-xl text-xs focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#111010] mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      placeholder="Bangalore"
                      className="w-full px-3 py-2 bg-[#FAF8F4] border border-[#D8C9AE] rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#111010] mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={e => setState(e.target.value)}
                      placeholder="Karnataka"
                      className="w-full px-3 py-2 bg-[#FAF8F4] border border-[#D8C9AE] rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#111010] mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={e => setPostalCode(e.target.value)}
                      placeholder="560034"
                      className="w-full px-3 py-2 bg-[#FAF8F4] border border-[#D8C9AE] rounded-xl text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D8C9AE] shadow-2xs space-y-4">
                <h2 className="font-editorial text-xl font-semibold text-[#111010] flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#B49B73]" />
                  3. Payment Method
                </h2>

                <div className="space-y-3">
                  {/* Razorpay */}
                  <label
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'razorpay'
                        ? 'bg-[#FAF8F4] border-[#111010] shadow-xs'
                        : 'bg-white border-[#D8C9AE]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'razorpay'}
                        onChange={() => setPaymentMethod('razorpay')}
                        className="text-[#111010]"
                      />
                      <div>
                        <span className="font-semibold text-xs text-[#111010] block">
                          Razorpay (UPI / Google Pay / Credit & Debit Cards / NetBanking)
                        </span>
                        <span className="text-[11px] text-[#8C7F72]">
                          Instant verification & prioritized atelier cutting
                        </span>
                      </div>
                    </div>
                    <Lock className="w-4 h-4 text-[#B49B73]" />
                  </label>

                  {/* COD */}
                  <label
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'bg-[#FAF8F4] border-[#111010] shadow-xs'
                        : 'bg-white border-[#D8C9AE]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="text-[#111010]"
                      />
                      <div>
                        <span className="font-semibold text-xs text-[#111010] block">
                          Cash on Delivery (COD)
                        </span>
                        <span className="text-[11px] text-[#8C7F72]">
                          Subject to telephone/WhatsApp verification before tailoring
                        </span>
                      </div>
                    </div>
                    <Truck className="w-4 h-4 text-[#8C7F72]" />
                  </label>
                </div>
              </div>
            </div>

            {/* Order Review Sidebar (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D8C9AE] shadow-sm space-y-6">
                <h3 className="font-editorial text-xl font-semibold text-[#111010] pb-3 border-b border-[#E8DFCF]">
                  Review ({cart.length} Item{cart.length > 1 ? 's' : ''})
                </h3>

                <div className="divide-y divide-[#E8DFCF] max-h-60 overflow-y-auto">
                  {cart.map(item => (
                    <div key={item.id} className="py-3 flex justify-between text-xs">
                      <div>
                        <span className="font-semibold text-[#111010]">{item.product.name}</span>
                        <div className="text-[11px] text-[#8C7F72]">
                          Size: {item.selectedSize} × {item.quantity}
                        </div>
                      </div>
                      <span className="font-bold text-[#111010]">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-xs text-[#3A3733] border-t border-[#E8DFCF] pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#42683B]">
                      <span>Discount</span>
                      <span>- {formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shippingCharge === 0 ? 'FREE' : formatPrice(shippingCharge)}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-[#D8C9AE] text-base font-bold text-[#111010]">
                    <span>Total Amount</span>
                    <span className="font-editorial text-2xl">{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 bg-[#111010] text-[#F5F1E8] text-xs font-semibold tracking-[0.2em] uppercase rounded-xl hover:bg-[#222] transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <span>Initiating Atelier Protocol...</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Place Made-to-Order ({formatPrice(finalTotal)})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
