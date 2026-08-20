import React from 'react';
import { Sparkles, Scissors, ShieldCheck, Heart, MapPin, Award } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BRAND_DETAILS } from '../data/mockData';
import { PearlessenceLogo } from '../components/brand/Logo';

export const AboutView: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div className="bg-[#FAF8F4] min-h-screen pb-24">
      {/* Editorial Hero */}
      <section className="bg-[#111010] text-[#FAF8F4] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#B49B73]/30">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="flex justify-center mb-4">
            <PearlessenceLogo variant="badge" size="xl" theme="dark" />
          </div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B49B73] font-semibold">
            Modest • Luxe • Timeless • Soft Elegance
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-[#F5F1E8]">
            The Pearlessence Philosophy
          </h1>
          <p className="text-xs sm:text-base text-[#D8C9AE] max-w-2xl mx-auto font-sans-ui leading-relaxed font-light">
            "Pearlessence was created for women who value modesty without compromising on elegance. Each design is inspired by simplicity, femininity, and timeless luxury."
          </p>
        </div>
      </section>

      {/* Brand Narrative */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-[11px] uppercase tracking-widest text-[#B49B73] font-semibold">
              Our Vision
            </span>
            <h2 className="font-editorial text-3xl font-medium text-[#111010] leading-snug">
              "We don't follow trends — we create pieces meant to stay with you."
            </h2>
            <p className="text-xs sm:text-sm text-[#3A3733] font-sans-ui leading-relaxed">
              Every abaya is a reflection of grace, confidence, and quiet strength. In an era dominated by fast fashion and fleeting novelty, Pearlessence stands for enduring craftsmanship. We source exceptional textiles from heritage mills in Qatar, Italy, and Belgium, transforming them into silhouettes that transcend seasons.
            </p>
            <p className="text-xs sm:text-sm text-[#3A3733] font-sans-ui leading-relaxed">
              Whether you are attending an intimate Eid gathering, stepping into a corporate boardroom, or performing sacred pilgrimages, our pieces envelope you in weightless dignity.
            </p>
          </div>

          <div className="aspect-4/5 rounded-3xl overflow-hidden border border-[#D8C9AE] shadow-xl bg-[#E8DFCF]">
            <img
              src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop"
              alt="Pearlessence Atelier Bangalore"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* Pillars of Craftsmanship */}
        <div className="pt-8 border-t border-[#D8C9AE]">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[11px] uppercase tracking-widest text-[#B49B73] font-semibold">
              Our Pillars
            </span>
            <h3 className="font-editorial text-3xl font-medium text-[#111010] mt-1">
              The Architecture of Quiet Luxury
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-[#D8C9AE] shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#111010] text-[#F5F1E8] flex items-center justify-center">
                <Scissors className="w-6 h-6 text-[#B49B73]" />
              </div>
              <h4 className="font-editorial text-lg font-semibold text-[#111010]">
                100% Made-to-Order
              </h4>
              <p className="text-xs text-[#8C7F72] leading-relaxed">
                We reject mass-inventory waste. Every garment begins its life only when you place your order, cut specifically to your length and sleeve requirements in our Bangalore studio.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#D8C9AE] shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#111010] text-[#F5F1E8] flex items-center justify-center">
                <Award className="w-6 h-6 text-[#B49B73]" />
              </div>
              <h4 className="font-editorial text-lg font-semibold text-[#111010]">
                Authentic Gulf & European Textiles
              </h4>
              <p className="text-xs text-[#8C7F72] leading-relaxed">
                From opaque, high-density Qatar Nida to Italian Armani crepe and pure washed linen, our fabrics are hand-selected for breathable opacity and liquid drape.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#D8C9AE] shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#111010] text-[#F5F1E8] flex items-center justify-center">
                <Heart className="w-6 h-6 text-[#B49B73]" />
              </div>
              <h4 className="font-editorial text-lg font-semibold text-[#111010]">
                Personal WhatsApp Atelier
              </h4>
              <p className="text-xs text-[#8C7F72] leading-relaxed">
                Modesty is personal. Our Bangalore concierge assists you through sizing, sleeve styles, matching hijabs, and custom requests 7 days a week.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#111010] text-[#FAF8F4] rounded-3xl p-10 text-center space-y-6">
          <h3 className="font-editorial text-3xl font-medium text-[#F5F1E8]">
            Experience Pearlessence
          </h3>
          <p className="text-xs text-[#D8C9AE] max-w-lg mx-auto leading-relaxed">
            Discover our collection of Ready-to-Wear abayas or commission a bespoke design tailored specifically for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => navigateTo('shop')}
              className="py-3 px-6 bg-[#FAF8F4] text-[#111010] text-xs font-semibold uppercase tracking-widest rounded-xl hover:bg-[#E8DFCF] transition-colors"
            >
              Shop Collection
            </button>
            <button
              onClick={() => navigateTo('customise')}
              className="py-3 px-6 border border-[#B49B73] text-[#F5F1E8] text-xs font-semibold uppercase tracking-widest rounded-xl hover:bg-[#3A3733] transition-colors"
            >
              Customise via WhatsApp
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
