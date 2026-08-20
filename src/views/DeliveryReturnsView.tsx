import React from 'react';
import { Truck, ShieldAlert, Clock, CheckCircle2, Video, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BRAND_DETAILS } from '../data/mockData';

export const DeliveryReturnsView: React.FC = () => {
  const { generateWhatsAppLink, navigateTo } = useStore();

  return (
    <div className="bg-[#FAF8F4] min-h-screen pb-24">
      {/* Header */}
      <div className="bg-[#111010] text-[#FAF8F4] py-16 px-4 sm:px-6 lg:px-8 border-b border-[#B49B73]/30">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#B49B73] font-semibold">
            <Truck className="w-3.5 h-3.5" />
            <span>Client Information</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-medium text-[#F5F1E8]">
            Delivery & Returns Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#D8C9AE] max-w-2xl mx-auto font-sans-ui leading-relaxed font-light">
            Clear, transparent policies for our made-to-order modest luxury abayas.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* SECTION 1: DELIVERY INFORMATION */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#D8C9AE] shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#111010] text-[#FAF8F4] flex items-center justify-center">
              <Clock className="w-6 h-6 text-[#B49B73]" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#B49B73] font-semibold">
                Section 1
              </span>
              <h2 className="font-editorial text-2xl font-semibold text-[#111010]">
                Delivery Information
              </h2>
            </div>
          </div>

          {/* EXACT VERBATIM CLIENT COPY */}
          <div className="p-6 bg-[#FAF8F4] rounded-2xl border border-[#D8C9AE] text-sm text-[#111010] leading-relaxed font-sans-ui space-y-3">
            <p className="font-medium">
              "{BRAND_DETAILS.deliveryTimeCopy}"
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs text-[#3A3733]">
            <div className="p-4 bg-[#E8DFCF]/50 rounded-xl border border-[#D8C9AE]">
              <strong className="block text-[#111010] mb-1 font-semibold">
                1. Order Confirmation
              </strong>
              <p className="text-[11px] text-[#8C7F72]">
                Day 1: Tailor receives bespoke specifications and height requirements.
              </p>
            </div>
            <div className="p-4 bg-[#E8DFCF]/50 rounded-xl border border-[#D8C9AE]">
              <strong className="block text-[#111010] mb-1 font-semibold">
                2. Bangalore Atelier Craft
              </strong>
              <p className="text-[11px] text-[#8C7F72]">
                Days 2–12: Hand-cutting, precision stitching, seam reinforcement, and QC.
              </p>
            </div>
            <div className="p-4 bg-[#E8DFCF]/50 rounded-xl border border-[#D8C9AE]">
              <strong className="block text-[#111010] mb-1 font-semibold">
                3. Air Courier Dispatch
              </strong>
              <p className="text-[11px] text-[#8C7F72]">
                Days 13–15: Dispatched with tracked express courier across India and worldwide.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 2: RETURN & EXCHANGE POLICY */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#D8C9AE] shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#111010] text-[#FAF8F4] flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-[#B5654F]" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#B5654F] font-semibold">
                Section 2
              </span>
              <h2 className="font-editorial text-2xl font-semibold text-[#111010]">
                Exchange & Return Policy
              </h2>
            </div>
          </div>

          {/* EXACT VERBATIM CLIENT COPY */}
          <div className="p-6 bg-[#FAF8F4] rounded-2xl border border-[#D8C9AE] text-sm text-[#111010] leading-relaxed font-sans-ui space-y-3">
            <p className="font-medium">
              "{BRAND_DETAILS.returnPolicyCopy}"
            </p>
          </div>

          {/* Damage Claim Requirements */}
          <div className="p-6 bg-[#FAF8F4] rounded-2xl border border-[#D8C9AE] space-y-3">
            <h4 className="font-editorial text-base font-semibold text-[#111010] flex items-center gap-2">
              <Video className="w-4 h-4 text-[#B49B73]" />
              In Case of Transit Damage: Mandatory Unboxing Video
            </h4>
            <p className="text-xs text-[#3A3733] leading-relaxed">
              To protect both our artisans and our clients, we request an unbroken opening video from outer courier seal to garment inspection. This allows us to instantly file transit insurance and expedite an immediate remake for you.
            </p>
            <div className="pt-2">
              <a
                href={generateWhatsAppLink({ enquiryType: 'general' })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#111010] hover:text-[#B49B73] underline underline-offset-4"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Contact Atelier Concierge on WhatsApp (+91 98450 12345)
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
