import React, { useState } from 'react';
import {
  Search,
  Package,
  Scissors,
  CheckCircle2,
  Truck,
  Sparkles,
  Clock,
  MapPin,
  Calendar,
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice, formatDate } from '../utils/formatters';
import { BRAND_DETAILS } from '../data/mockData';
import { Order } from '../types';

export const OrderTrackingView: React.FC = () => {
  const { orders, generateWhatsAppLink, navigateTo } = useStore();
  const [searchId, setSearchId] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(orders[0] || null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const query = searchId.trim().toLowerCase();
    const found = orders.find(
      o =>
        o.id.toLowerCase() === query ||
        o.orderNumber.toLowerCase() === query ||
        (o.customerPhone && o.customerPhone.includes(query)) ||
        (o.customerEmail && o.customerEmail.toLowerCase().includes(query))
    );
    setSearchedOrder(found || null);
  };

  const steps = [
    { key: 'Confirmed', title: '1. Order Confirmed', desc: 'Design specifications & measurements verified in atelier' },
    { key: 'In Production', title: '2. Fabric Cutting & Master Tailoring', desc: 'Hand-sewn with reinforced French seams' },
    { key: 'Ready', title: '3. Quality Inspection & Steam Press', desc: 'Inspected for dimensional accuracy and drape' },
    { key: 'Shipped', title: '4. Dispatched via Express Courier', desc: 'Packed in signature ivory box & handed to air courier' },
    { key: 'Delivered', title: '5. Delivered', desc: 'Arrived at your doorstep' }
  ];

  const getStepIndex = (status: Order['status']) => {
    switch (status) {
      case 'Confirmed': return 0;
      case 'In Production': return 1;
      case 'Ready': return 2;
      case 'Shipped': return 3;
      case 'Delivered': return 4;
      default: return 0;
    }
  };

  const currentStepIdx = searchedOrder ? getStepIndex(searchedOrder.status) : 0;

  return (
    <div className="bg-[#FAF8F4] min-h-screen pb-24 font-montserrat">
      {/* Header */}
      <div className="bg-[#111010] text-[#FAF8F4] py-16 px-4 sm:px-6 lg:px-8 border-b border-[#B49B73]/30">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#B49B73] font-black">
            <Clock className="w-3.5 h-3.5" />
            <span>Bangalore Atelier Real-Time Status</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#F5F1E8]">
            Track Your Made-to-Order Abaya
          </h1>
          <p className="text-xs sm:text-sm text-[#D8C9AE] max-w-2xl mx-auto font-medium leading-relaxed">
            Monitor each stage of your garment's 15-day tailoring process from initial pattern cut to doorstep delivery.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        {/* Search Bar */}
        <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#D8C9AE] shadow-xs">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8C7F72] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchId}
                onChange={e => setSearchId(e.target.value)}
                placeholder="Enter Order ID (e.g. PEARL-109482) or Phone number"
                className="w-full pl-11 pr-4 py-3 bg-[#FAF8F4] border border-[#D8C9AE] rounded-xl text-xs uppercase font-medium focus:outline-hidden focus:border-[#111010]"
              />
            </div>
            <button
              type="submit"
              className="py-3 px-7 bg-[#111010] text-[#FAF8F4] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#222] transition-colors cursor-pointer"
            >
              Track Order
            </button>
          </form>

          {/* Quick Order pills */}
          {orders.length > 0 && (
            <div className="mt-3 flex items-center gap-2 flex-wrap text-[11px] text-[#8C7F72]">
              <span>Sample Active Orders:</span>
              {orders.slice(0, 3).map(o => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => { setSearchId(o.orderNumber || o.id); setSearchedOrder(o); setHasSearched(true); }}
                  className="px-2 py-0.5 bg-[#E8DFCF] hover:bg-[#D8C9AE] text-[#111010] rounded-md font-semibold font-mono cursor-pointer"
                >
                  {o.orderNumber || o.id}
                </button>
              ))}
            </div>
          )}
        </div>

        {searchedOrder ? (
          <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#D8C9AE] shadow-xs space-y-8 animate-in fade-in">
            {/* Top Order Card Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#E8DFCF]">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#B49B73] font-bold block">
                  Order Reference
                </span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#111010]">
                  #{searchedOrder.orderNumber || searchedOrder.id}
                </h2>
                <span className="text-xs text-[#8C7F72] font-medium">
                  Placed on {formatDate(searchedOrder.createdAt)} by {searchedOrder.customerName}
                </span>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] uppercase tracking-widest text-[#8C7F72] font-bold block">
                  Estimated Delivery Timeline
                </span>
                <span className="text-base font-black text-[#111010] block">
                  {searchedOrder.estimatedDeliveryDate} (15 Working Days)
                </span>
                <span className="inline-block mt-1 px-2.5 py-0.5 bg-[#E8DFCF] text-[#111010] text-[10px] font-bold uppercase rounded-md">
                  Status: {searchedOrder.status}
                </span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="space-y-6">
              <h3 className="text-lg font-black uppercase text-[#111010]">
                Craftsmanship Milestone Progress
              </h3>

              <div className="space-y-4 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-[#E8DFCF] before:z-0">
                {steps.map((step, idx) => {
                  const isCompleted = idx <= currentStepIdx;
                  const isCurrent = idx === currentStepIdx;

                  return (
                    <div key={step.key} className="relative z-10 flex items-start gap-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                          isCompleted
                            ? 'bg-[#111010] text-[#FAF8F4] shadow-sm'
                            : 'bg-white border-2 border-[#D8C9AE] text-[#8C7F72]'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-4 h-4 text-[#B49B73]" /> : idx + 1}
                      </div>

                      <div className="pt-0.5">
                        <h4
                          className={`text-xs font-bold uppercase tracking-wider ${
                            isCurrent ? 'text-[#B49B73]' : isCompleted ? 'text-[#111010]' : 'text-[#8C7F72]'
                          }`}
                        >
                          {step.title} {isCurrent && '(Currently in Progress)'}
                        </h4>
                        <p className="text-[11px] text-[#8C7F72] font-medium">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Items Summary */}
            <div className="pt-6 border-t border-[#E8DFCF] space-y-4">
              <h4 className="text-base font-black uppercase text-[#111010]">
                Tailored Garments in this Order
              </h4>
              <div className="divide-y divide-[#E8DFCF]">
                {searchedOrder.items.map((item, idx) => (
                  <div key={item.id || idx} className="py-3 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-[#111010]">{item.product.name}</span>
                      <span className="text-[#8C7F72] ml-2">
                        (Size: {item.size}, Color: {item.color}, Qty: {item.quantity})
                      </span>
                      {item.customisationNotes?.customLength && (
                        <span className="block text-[11px] text-[#B49B73]">
                          Custom Length: {item.customisationNotes.customLength}
                        </span>
                      )}
                    </div>
                    <span className="font-bold text-[#111010]">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp Concierge Help */}
            <div className="p-5 bg-[#FAF8F4] rounded-2xl border border-[#D8C9AE] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#3A3733]">
                <strong className="block text-[#111010] font-bold">
                  Need to adjust your measurements or update delivery address?
                </strong>
                <span>Our Bangalore atelier concierge is available on WhatsApp.</span>
              </div>
              <a
                href={generateWhatsAppLink({ customNotes: `Tracking order #${searchedOrder.orderNumber || searchedOrder.id}` })}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-5 bg-[#111010] text-[#FAF8F4] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#222] flex items-center gap-2 shrink-0 cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-[#B49B73]" />
                <span>WhatsApp Atelier</span>
              </a>
            </div>
          </div>
        ) : (
          hasSearched && (
            <div className="text-center p-12 bg-white rounded-2xl border border-[#D8C9AE] space-y-3">
              <h3
                className="text-2xl font-normal text-[#111010]"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Order Reference Not Found
              </h3>
              <p className="text-xs text-[#8C7F72] max-w-sm mx-auto">
                Please double check your Order ID or phone number. You can also message our WhatsApp concierge with your name.
              </p>
              <button
                onClick={() => navigateTo('shop')}
                className="mt-2 py-2.5 px-5 bg-[#111010] text-[#FAF8F4] text-xs font-bold uppercase rounded-xl"
              >
                Return to Shop
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};
