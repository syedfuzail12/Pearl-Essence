import React, { useState } from 'react';
import { X, Ruler, Sparkles, MessageCircle, Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { SIZE_CHART, BRAND_DETAILS } from '../../data/mockData';

export const SizeGuideModal: React.FC = () => {
  const { sizeGuideOpen, setSizeGuideOpen, generateWhatsAppLink } = useStore();
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!sizeGuideOpen) return null;

  const waLink = generateWhatsAppLink({ enquiryType: 'size-help' });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111010]/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF8F4] w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl border border-[#D8C9AE] overflow-hidden flex flex-col relative">
        {/* Header */}
        <div className="bg-[#111010] text-[#FAF8F4] p-6 flex items-center justify-between border-b border-[#B49B73]/30 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-[#B49B73] text-xs uppercase tracking-widest font-sans-ui mb-1">
              <Ruler className="w-4 h-4" />
              Atelier Measurement Matrix
            </div>
            <h3 className="font-editorial text-2xl font-medium tracking-wide text-[#F5F1E8]">
              Size Guide & Customisation Matrix
            </h3>
          </div>
          <button
            onClick={() => setSizeGuideOpen(false)}
            className="p-2 text-[#D8C9AE] hover:text-[#FAF8F4] hover:bg-[#3A3733] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6">
          {/* Unit Toggle & Note */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#E8DFCF]/50 p-4 rounded-xl border border-[#D8C9AE]">
            <p className="text-xs text-[#3A3733] leading-relaxed">
              Every Pearlessence abaya is tailored exclusively on order. You may select a standard size or request custom sleeve/length adjustments at no extra charge.
            </p>
            <div className="inline-flex rounded-lg border border-[#D8C9AE] bg-white p-1 self-start sm:self-auto shrink-0">
              <button
                type="button"
                onClick={() => setUnit('inches')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  unit === 'inches' ? 'bg-[#111010] text-[#FAF8F4]' : 'text-[#3A3733] hover:text-[#111010]'
                }`}
              >
                Inches
              </button>
              <button
                type="button"
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  unit === 'cm' ? 'bg-[#111010] text-[#FAF8F4]' : 'text-[#3A3733] hover:text-[#111010]'
                }`}
              >
                Centimeters
              </button>
            </div>
          </div>

          {/* Sizing Table */}
          <div className="overflow-x-auto border border-[#D8C9AE] rounded-xl bg-white shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#111010] text-[#F5F1E8] uppercase tracking-wider text-[11px] font-sans-ui">
                <tr>
                  <th className="py-3.5 px-4">Size</th>
                  <th className="py-3.5 px-3">Bust</th>
                  <th className="py-3.5 px-3">Waist</th>
                  <th className="py-3.5 px-3">Hip</th>
                  <th className="py-3.5 px-3">Shoulder</th>
                  <th className="py-3.5 px-3">Sleeve</th>
                  <th className="py-3.5 px-3">Standard Length</th>
                  <th className="py-3.5 px-4 bg-[#B49B73]/20 text-[#B49B73] border-l border-[#B49B73]/40">
                    ✨ Customisation Options
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DFCF] text-[#3A3733]">
                {SIZE_CHART.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-[#FAF8F4]/50' : 'bg-white'}>
                    <td className="py-3 px-4 font-bold text-[#111010]">{row.size}</td>
                    <td className="py-3 px-3">{unit === 'inches' ? row.bust.split('/')[0] : row.bust.split('/')[1]}</td>
                    <td className="py-3 px-3">{unit === 'inches' ? row.waist.split('/')[0] : row.waist.split('/')[1]}</td>
                    <td className="py-3 px-3">{unit === 'inches' ? row.hip.split('/')[0] : row.hip.split('/')[1]}</td>
                    <td className="py-3 px-3">{unit === 'inches' ? row.shoulder.split('/')[0] : row.shoulder.split('/')[1]}</td>
                    <td className="py-3 px-3">{unit === 'inches' ? row.sleeve.split('/')[0] : row.sleeve.split('/')[1]}</td>
                    <td className="py-3 px-3 font-medium text-[#111010]">
                      {unit === 'inches' ? row.standardLength.split('/')[0] : row.standardLength.split('/')[1]}
                    </td>
                    <td className="py-3 px-4 text-xs font-medium text-[#111010] bg-[#FAF8F4] border-l border-[#D8C9AE]">
                      {row.customNote}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Visual Measuring Guide */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-white rounded-xl border border-[#D8C9AE]">
              <h4 className="font-editorial text-base font-semibold text-[#111010] mb-1">
                1. Abaya Length
              </h4>
              <p className="text-xs text-[#8C7F72] leading-relaxed">
                Measure straight from the highest shoulder point over the bust to 1 inch above your heel or preferred floor level.
              </p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-[#D8C9AE]">
              <h4 className="font-editorial text-base font-semibold text-[#111010] mb-1">
                2. Sleeve Span
              </h4>
              <p className="text-xs text-[#8C7F72] leading-relaxed">
                Measure from the shoulder bone down slightly bent arm to the wrist bone for modest coverage.
              </p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-[#D8C9AE]">
              <h4 className="font-editorial text-base font-semibold text-[#111010] mb-1">
                3. Bust / Modest Ease
              </h4>
              <p className="text-xs text-[#8C7F72] leading-relaxed">
                Measure around fullest chest. We add 4–6 inches of modest ease so the silhouette stays relaxed and non-clinging.
              </p>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-[#E8DFCF] p-4 md:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#D8C9AE] shrink-0">
          <div className="text-xs text-[#111010]">
            <strong>Unsure of your size or height ratio?</strong> Our Bangalore atelier tailors bespoke pieces daily.
          </div>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 py-2.5 px-5 bg-[#111010] text-[#F5F1E8] text-xs font-medium tracking-widest uppercase rounded-xl hover:bg-[#222] transition-colors shrink-0 shadow-sm"
          >
            <MessageCircle className="w-4 h-4 text-[#B49B73]" />
            Chat with us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};
