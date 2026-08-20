import React, { useState } from 'react';
import {
  Instagram,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Truck,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { BRAND_DETAILS, CATEGORIES } from '../../data/mockData';
import { PearlessenceLogo } from '../brand/Logo';

export const Footer: React.FC = () => {
  const { navigateTo, showToast } = useStore();
  const [emailInput, setEmailInput] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    showToast('You have been welcomed to the Pearlessence Private List.');
    setEmailInput('');
  };

  return (
    <footer className="bg-[#111010] text-[#F5F1E8] border-t border-[#B49B73]/30">
      {/* Signature Natural Tones Trust Bar */}
      <div className="w-full bg-[#181615] border-b border-[#3A3733] py-4 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 lg:gap-12">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#B49B73]"></div>
              <span className="text-[10px] tracking-widest uppercase font-medium text-[#F5F1E8]">
                15-Day Made-To-Order
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#B49B73]"></div>
              <span className="text-[10px] tracking-widest uppercase font-medium text-[#F5F1E8]">
                Bangalore Boutique
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#B49B73]"></div>
              <span className="text-[10px] tracking-widest uppercase font-medium text-[#F5F1E8]">
                Premium Fabrics Only
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[10px] tracking-widest uppercase">
            <span className="opacity-60 text-[#D8C9AE]">Follow Us</span>
            <a
              href={BRAND_DETAILS.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#F5F1E8] hover:text-[#B49B73] transition-colors"
            >
              @pearlesseence_co
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-16 pb-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#3A3733]">
          {/* Brand & Story (Col 1 & 2) */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => navigateTo('about')}
              className="flex items-center gap-3 text-left group cursor-pointer focus:outline-hidden"
              title="About Pearlessence"
            >
              <PearlessenceLogo variant="badge" size="md" theme="dark" />
              <div className="flex flex-col">
                <span className="font-manrope text-xl font-black tracking-[0.24em] text-[#F5F1E8] uppercase group-hover:text-[#B49B73] transition-colors">
                  PEARLESSENCE
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#B49B73] font-bold">
                  Modest • Luxe • Timeless • Soft Elegance
                </span>
              </div>
            </button>

            <p className="text-xs text-[#D8C9AE] leading-relaxed font-medium max-w-md pt-2">
              {BRAND_DETAILS.story}
            </p>

            {/* Social & Contact */}
            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href={BRAND_DETAILS.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-1.5 px-3 bg-[#3A3733]/60 hover:bg-[#3A3733] text-[#F5F1E8] rounded-lg text-xs transition-colors border border-[#B49B73]/20"
              >
                <Instagram className="w-4 h-4 text-[#B49B73]" />
                <span>{BRAND_DETAILS.instagram}</span>
              </a>

              <a
                href={`https://wa.me/${BRAND_DETAILS.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-1.5 px-3 bg-[#3A3733]/60 hover:bg-[#3A3733] text-[#F5F1E8] rounded-lg text-xs transition-colors border border-[#B49B73]/20"
              >
                <MessageCircle className="w-4 h-4 text-[#8A9A83]" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>
          </div>

          {/* Shop by Fabric (Col 3) */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B49B73] mb-4 font-sans-ui">
              Fabric Lines
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D8C9AE]">
              {CATEGORIES.map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => navigateTo('category', { category: cat.id })}
                    className="hover:text-[#F5F1E8] transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li className="pt-1">
                <button
                  onClick={() => navigateTo('shop')}
                  className="text-[#B49B73] hover:underline text-xs font-medium"
                >
                  All Ready-to-Wear &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Atelier & Policies (Col 4) */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B49B73] mb-4 font-sans-ui">
              Client Care & Policies
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D8C9AE]">
              <li>
                <button
                  onClick={() => navigateTo('customise')}
                  className="hover:text-[#F5F1E8] transition-colors"
                >
                  Bespoke Customisation
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('size-guide')}
                  className="hover:text-[#F5F1E8] transition-colors"
                >
                  Size Chart & Custom Lengths
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('delivery-returns')}
                  className="hover:text-[#F5F1E8] transition-colors"
                >
                  Delivery & Return Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('testimonials')}
                  className="hover:text-[#F5F1E8] transition-colors"
                >
                  Client Testimonials
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-[#F5F1E8] transition-colors"
                >
                  Our Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('blog')}
                  className="hover:text-[#F5F1E8] transition-colors"
                >
                  Styling & Fabric Journal
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('track-order')}
                  className="hover:text-[#F5F1E8] transition-colors"
                >
                  Track Made-to-Order Status
                </button>
              </li>
            </ul>
          </div>

          {/* Bangalore Atelier NAP & Newsletter (Col 5) */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B49B73] mb-4 font-sans-ui">
              Bangalore Atelier
            </h4>
            <div className="space-y-3 text-xs text-[#D8C9AE]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#B49B73] shrink-0 mt-0.5" />
                <span>Koramangala & Indiranagar, Bangalore, Karnataka 560034, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B49B73] shrink-0" />
                <span>Mon – Sat: 10:00 AM – 7:30 PM IST</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#B49B73] shrink-0" />
                <span>concierge@pearlessence.co</span>
              </div>

              {/* Newsletter */}
              <div className="pt-3">
                <p className="text-[11px] uppercase tracking-wider text-[#F5F1E8] font-medium mb-1.5">
                  Private Atelier List
                </p>
                <form onSubmit={handleSubscribe} className="flex">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={e => setEmailInput(e.target.value)}
                    placeholder="Enter email for Eid drop"
                    className="w-full px-3 py-2 bg-[#3A3733]/70 border border-[#B49B73]/30 rounded-l-lg text-xs text-[#F5F1E8] placeholder-[#D8C9AE]/60 focus:outline-hidden focus:border-[#B49B73]"
                  />
                  <button
                    type="submit"
                    className="px-3 bg-[#B49B73] text-[#111010] rounded-r-lg hover:bg-[#FAF8F4] transition-colors"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8C7F72]">
          <div className="flex flex-wrap items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#B49B73]" />
              15-Day Made-to-Order Craftsmanship
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#B49B73]" />
              GST Registered • Razorpay & COD
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>© {new Date().getFullYear()} Pearlessence. All rights reserved.</span>
            <button
              onClick={() => navigateTo('admin')}
              className="text-[#8C7F72] hover:text-[#B49B73] transition-colors"
            >
              Atelier Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
