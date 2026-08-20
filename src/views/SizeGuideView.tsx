import React, { useState } from 'react';
import { Ruler, MessageCircle, Sparkles, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SIZE_CHART, BRAND_DETAILS } from '../data/mockData';

export const SizeGuideView: React.FC = () => {
  const { generateWhatsAppLink, navigateTo } = useStore();
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  const waLink = generateWhatsAppLink({ enquiryType: 'size-help' });

  return (
    <div className="bg-[#FAF8F4] min-h-screen pb-24">
      {/* Header */}
      <div className="bg-[#111010] text-[#FAF8F4] py-14 px-4 sm:px-6 lg:px-8 border-b border-[#B49B73]/30">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#B49B73] font-semibold">
            <Ruler className="w-3.5 h-3.5" />
            <span>Precision Fit & Tailoring</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-5xl font-medium text-[#F5F1E8]">
            Size Chart & Customisation Matrix
          </h1>
          <p className="text-xs sm:text-sm text-[#D8C9AE] max-w-2xl mx-auto font-sans-ui leading-relaxed font-light">
            Because each Pearlessence piece is tailored exclusively on order, you can choose standard sizing or specify custom length and sleeve alterations with our Bangalore atelier.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* Unit Toggle & Description */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#D8C9AE] shadow-2xs">
          <div>
            <h3 className="font-editorial text-lg font-semibold text-[#111010] mb-1">
              Standard vs. Bespoke Sizing
            </h3>
            <p className="text-xs text-[#3A3733] leading-relaxed">
              Measurements reflect garment dimensions with 4–6 inches of built-in modest ease for a non-clinging, elegant fall.
            </p>
          </div>

          <div className="inline-flex rounded-xl border border-[#D8C9AE] bg-[#FAF8F4] p-1 self-start sm:self-auto shrink-0">
            <button
              onClick={() => setUnit('inches')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                unit === 'inches' ? 'bg-[#111010] text-[#FAF8F4] shadow-xs' : 'text-[#3A3733] hover:text-[#111010]'
              }`}
            >
              Inches (in)
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                unit === 'cm' ? 'bg-[#111010] text-[#FAF8F4] shadow-xs' : 'text-[#3A3733] hover:text-[#111010]'
              }`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* The Matrix Table */}
        <div className="bg-white rounded-2xl border border-[#D8C9AE] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#111010] text-[#F5F1E8] uppercase tracking-wider text-[11px] font-sans-ui">
                <tr>
                  <th className="py-4 px-5">Size</th>
                  <th className="py-4 px-4">Bust / Chest</th>
                  <th className="py-4 px-4">Waist</th>
                  <th className="py-4 px-4">Hip</th>
                  <th className="py-4 px-4">Shoulder Width</th>
                  <th className="py-4 px-4">Sleeve Length</th>
                  <th className="py-4 px-4">Standard Length</th>
                  <th className="py-4 px-5 bg-[#B49B73]/20 text-[#B49B73] border-l border-[#B49B73]/30">
                    ✨ Customisation Options
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DFCF] text-[#3A3733]">
                {SIZE_CHART.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-[#FAF8F4]/60' : 'bg-white'}>
                    <td className="py-3.5 px-5 font-bold text-sm text-[#111010]">{row.size}</td>
                    <td className="py-3.5 px-4 font-medium">{unit === 'inches' ? row.bust.split('/')[0] : row.bust.split('/')[1]}</td>
                    <td className="py-3.5 px-4 font-medium">{unit === 'inches' ? row.waist.split('/')[0] : row.waist.split('/')[1]}</td>
                    <td className="py-3.5 px-4 font-medium">{unit === 'inches' ? row.hip.split('/')[0] : row.hip.split('/')[1]}</td>
                    <td className="py-3.5 px-4 font-medium">{unit === 'inches' ? row.shoulder.split('/')[0] : row.shoulder.split('/')[1]}</td>
                    <td className="py-3.5 px-4 font-medium">{unit === 'inches' ? row.sleeve.split('/')[0] : row.sleeve.split('/')[1]}</td>
                    <td className="py-3.5 px-4 font-bold text-[#111010]">
                      {unit === 'inches' ? row.standardLength.split('/')[0] : row.standardLength.split('/')[1]}
                    </td>
                    <td className="py-3.5 px-5 text-xs font-semibold text-[#111010] bg-[#FAF8F4] border-l border-[#D8C9AE]">
                      {row.customNote}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How to Measure Step-by-Step */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#D8C9AE] space-y-2 shadow-2xs">
            <span className="text-xs font-bold text-[#B49B73] uppercase tracking-widest block">
              Step 1
            </span>
            <h4 className="font-editorial text-lg font-semibold text-[#111010]">
              Abaya Floor Length
            </h4>
            <p className="text-xs text-[#8C7F72] leading-relaxed">
              Place measuring tape at highest point of shoulder (near collarbone) and let it hang straight down over the bust to 1 inch above the floor or shoe sole.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#D8C9AE] space-y-2 shadow-2xs">
            <span className="text-xs font-bold text-[#B49B73] uppercase tracking-widest block">
              Step 2
            </span>
            <h4 className="font-editorial text-lg font-semibold text-[#111010]">
              Shoulder & Sleeve Span
            </h4>
            <p className="text-xs text-[#8C7F72] leading-relaxed">
              Measure shoulder bone to shoulder bone across the upper back. For sleeve length, measure from shoulder bone down slightly bent arm to wrist bone.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#D8C9AE] space-y-2 shadow-2xs">
            <span className="text-xs font-bold text-[#B49B73] uppercase tracking-widest block">
              Step 3
            </span>
            <h4 className="font-editorial text-lg font-semibold text-[#111010]">
              Bust & Modest Ease
            </h4>
            <p className="text-xs text-[#8C7F72] leading-relaxed">
              Measure around the fullest part of your bust while wearing your standard under-layers. Our cuts provide comfortable graceful ease naturally.
            </p>
          </div>
        </div>

        {/* Direct WhatsApp Assistance Box */}
        <div className="bg-[#E8DFCF] rounded-3xl p-8 border border-[#D8C9AE] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-editorial text-2xl font-semibold text-[#111010]">
              Still Unsure About Sizing?
            </h3>
            <p className="text-xs text-[#3A3733] max-w-lg leading-relaxed">
              Share your height and normal dress size with our master tailor on WhatsApp. We will suggest the exact recommended abaya length for your posture.
            </p>
          </div>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3.5 px-6 bg-[#111010] text-[#F5F1E8] text-xs font-semibold tracking-widest uppercase rounded-xl hover:bg-[#222] transition-colors shrink-0 flex items-center gap-2 shadow-md"
          >
            <MessageCircle className="w-4 h-4 text-[#8A9A83]" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
