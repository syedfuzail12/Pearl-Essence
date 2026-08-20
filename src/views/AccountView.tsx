import React, { useState } from 'react';
import {
  User,
  Package,
  Heart,
  MapPin,
  Ruler,
  LogOut,
  ShoppingBag,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice, formatDate } from '../utils/formatters';

export const AccountView: React.FC = () => {
  const {
    currentUser,
    logoutUser,
    orders,
    wishlist,
    products,
    navigateTo,
    setAuthModalOpen,
    toggleWishlist,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'measurements'>('orders');

  if (!currentUser) {
    return (
      <div className="min-h-[70vh] bg-[#FAF8F4] flex flex-col items-center justify-center p-6 text-center space-y-4 font-manrope">
        <div className="w-16 h-16 rounded-2xl bg-[#E8DFCF] flex items-center justify-center text-[#111010] shadow-sm">
          <User className="w-8 h-8 text-[#B49B73]" />
        </div>
        <h2 className="font-manrope text-3xl font-black uppercase text-[#111010] tracking-tight">Client Portal</h2>
        <p className="text-xs text-[#8C7F72] max-w-sm leading-relaxed font-medium">
          Sign in or create your client account to view bespoke order progress, manage measurements, and access private drops.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => setAuthModalOpen(true)}
            className="py-3 px-8 bg-[#111010] text-[#F5F1E8] text-xs font-black uppercase tracking-widest rounded-xl hover:bg-[#222] transition-colors cursor-pointer"
          >
            Sign In / Create Account
          </button>
          <button
            onClick={() => navigateTo('home')}
            className="py-3 px-6 border border-[#111010] text-[#111010] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#E8DFCF] transition-colors cursor-pointer"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const userOrders = orders.filter(
    o =>
      o.customerEmail.toLowerCase() === currentUser.email.toLowerCase() ||
      o.customerPhone === currentUser.phone
  );

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  const handleSignOut = () => {
    logoutUser();
    navigateTo('home');
  };

  return (
    <div className="bg-[#FAF8F4] min-h-screen pb-24 font-manrope">
      {/* Header */}
      <div className="bg-[#111010] text-[#FAF8F4] py-14 px-4 sm:px-6 lg:px-8 border-b border-[#B49B73]/30">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B49B73] font-bold block mb-1">
              Private Client Dossier
            </span>
            <h1 className="font-manrope text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#F5F1E8]">
              Welcome, {currentUser.name}
            </h1>
            <p className="text-xs text-[#D8C9AE] font-medium mt-1">{currentUser.email} • {currentUser.phone}</p>
          </div>

          <button
            onClick={handleSignOut}
            className="self-start sm:self-auto py-2.5 px-5 bg-[#3A3733]/80 hover:bg-[#B5654F] hover:border-[#B5654F] border border-[#B49B73]/30 rounded-xl text-xs font-bold text-[#FAF8F4] flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95"
            title="Sign out of client session"
          >
            <LogOut className="w-4 h-4 text-[#FAF8F4]" />
            <span className="uppercase tracking-wider">Sign Out</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Navigation Tabs */}
        <div className="flex gap-2 border-b border-[#D8C9AE] pb-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shrink-0 flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-[#111010] text-[#F5F1E8]'
                : 'bg-white text-[#3A3733] border border-[#D8C9AE]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Made-to-Order History ({userOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shrink-0 flex items-center gap-2 ${
              activeTab === 'wishlist'
                ? 'bg-[#111010] text-[#F5F1E8]'
                : 'bg-white text-[#3A3733] border border-[#D8C9AE]'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Wishlist ({wishlistedProducts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('measurements')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shrink-0 flex items-center gap-2 ${
              activeTab === 'measurements'
                ? 'bg-[#111010] text-[#F5F1E8]'
                : 'bg-white text-[#3A3733] border border-[#D8C9AE]'
            }`}
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>Saved Measurements</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shrink-0 flex items-center gap-2 ${
              activeTab === 'addresses'
                ? 'bg-[#111010] text-[#F5F1E8]'
                : 'bg-white text-[#3A3733] border border-[#D8C9AE]'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Shipping Addresses</span>
          </button>
        </div>

        {/* TAB CONTENT */}

        {/* 1. Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {userOrders.length > 0 ? (
              userOrders.map(order => (
                <div
                  key={order.id}
                  className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D8C9AE] shadow-2xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-[#E8DFCF]">
                    <div>
                      <span className="font-manrope text-lg font-black uppercase text-[#111010]">
                        Order #{order.id}
                      </span>
                      <span className="text-xs text-[#8C7F72] ml-2 font-medium">
                        Placed {formatDate(order.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-[#FAF8F4] text-[#111010] border border-[#D8C9AE] text-xs font-bold uppercase rounded-lg">
                        Status: {order.fulfillmentStatus.replace('_', ' ')}
                      </span>
                      <span className="font-manrope text-base font-black text-[#111010]">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>

                  <div className="divide-y divide-[#E8DFCF]">
                    {order.items.map(item => (
                      <div key={item.id} className="py-3 flex justify-between items-center text-xs">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-12 h-16 object-cover rounded-lg bg-[#E8DFCF]"
                          />
                          <div>
                            <span className="font-semibold text-[#111010] block">{item.product.name}</span>
                            <span className="text-[#8C7F72]">
                              Size: {item.selectedSize} • Qty: {item.quantity} • {formatPrice(item.product.price)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex justify-between items-center text-xs">
                    <span className="text-[#8C7F72]">
                      Est. 15-Day Delivery: <strong>{order.estimatedDeliveryDate}</strong>
                    </span>
                    <button
                      onClick={() => navigateTo('track-order')}
                      className="text-[#111010] font-semibold underline flex items-center gap-1"
                    >
                      <span>Track Atelier Progress</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#D8C9AE] p-8">
                <p className="text-xs text-[#8C7F72] mb-4">No active or previous orders found.</p>
                <button
                  onClick={() => navigateTo('shop')}
                  className="py-2.5 px-6 bg-[#111010] text-[#F5F1E8] text-xs font-semibold uppercase tracking-wider rounded-xl"
                >
                  Explore Catalog
                </button>
              </div>
            )}
          </div>
        )}

        {/* 2. Wishlist */}
        {activeTab === 'wishlist' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistedProducts.length > 0 ? (
              wishlistedProducts.map(product => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#D8C9AE] shadow-2xs flex flex-col justify-between"
                >
                  <div className="aspect-3/4 overflow-hidden bg-[#E8DFCF] relative">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover object-top"
                    />
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 p-1.5 bg-[#FAF8F4] text-[#B5654F] rounded-full text-xs font-bold shadow-xs hover:bg-[#E8DFCF] cursor-pointer"
                      title="Remove from wishlist"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <h4 className="font-manrope text-base font-black text-[#111010] uppercase">
                        {product.name}
                      </h4>
                      <span className="font-manrope text-sm font-black text-[#111010]">
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    <button
                      onClick={() => navigateTo('product', { productSlug: product.slug })}
                      className="w-full py-2.5 bg-[#111010] text-[#F5F1E8] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#222] cursor-pointer"
                    >
                      View & Customise
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-16 bg-white rounded-3xl border border-[#D8C9AE] p-8">
                <p className="text-xs text-[#8C7F72] font-medium">Your wishlist is currently empty.</p>
              </div>
            )}
          </div>
        )}

        {/* 3. Measurements */}
        {activeTab === 'measurements' && (
          <div className="bg-white p-8 rounded-3xl border border-[#D8C9AE] shadow-2xs max-w-2xl space-y-6">
            <h3 className="font-manrope text-xl font-black uppercase text-[#111010]">
              Your Stored Bespoke Profile
            </h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-[#FAF8F4] rounded-xl border border-[#D8C9AE]">
                <span className="text-[#8C7F72] uppercase tracking-wider block text-[10px]">Client Height</span>
                <span className="font-bold text-sm text-[#111010]">
                  {currentUser.measurements?.height || '5 ft 5 in (165 cm)'}
                </span>
              </div>

              <div className="p-4 bg-[#FAF8F4] rounded-xl border border-[#D8C9AE]">
                <span className="text-[#8C7F72] uppercase tracking-wider block text-[10px]">Preferred Abaya Length</span>
                <span className="font-bold text-sm text-[#111010]">
                  {currentUser.measurements?.preferredLength || '54 Inches'}
                </span>
              </div>

              <div className="p-4 bg-[#FAF8F4] rounded-xl border border-[#D8C9AE]">
                <span className="text-[#8C7F72] uppercase tracking-wider block text-[10px]">Standard Size</span>
                <span className="font-bold text-sm text-[#111010]">
                  {currentUser.measurements?.standardSize || 'Size M'}
                </span>
              </div>

              <div className="p-4 bg-[#FAF8F4] rounded-xl border border-[#D8C9AE]">
                <span className="text-[#8C7F72] uppercase tracking-wider block text-[10px]">Sleeve Style Preference</span>
                <span className="font-bold text-sm text-[#111010]">
                  {currentUser.measurements?.sleevePreference || 'French Cuff / Elasticated'}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#8C7F72]">
              These measurements are automatically pre-filled when you customise abayas on WhatsApp or in checkout.
            </p>
          </div>
        )}

        {/* 4. Addresses */}
        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {currentUser.savedAddresses.map(addr => (
              <div
                key={addr.id}
                className="bg-white p-6 rounded-2xl border border-[#D8C9AE] shadow-2xs space-y-2 text-xs"
              >
                <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 bg-[#FAF8F4] border border-[#D8C9AE] rounded-md">
                  {addr.label}
                </span>
                <p className="text-sm font-semibold text-[#111010]">{addr.street}</p>
                <p className="text-[#8C7F72]">{addr.city}, {addr.state} - {addr.postalCode}</p>
                <p className="text-[#8C7F72]">{addr.country}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
