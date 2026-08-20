import React, { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const WhatsAppButton: React.FC = () => {
  const { generateWhatsAppLink, currentView } = useStore();
  const [showTooltip, setShowTooltip] = useState(false);

  // If in admin view, don't obstruct data tables
  if (currentView === 'admin') return null;

  const waUrl = generateWhatsAppLink({ enquiryType: 'bespoke' });

  return (
    <div className="fixed bottom-5 sm:bottom-8 right-4 sm:right-8 z-40 flex flex-col items-end">
      {/* Detailed Accordion Prompt (Expandable) */}
      {showTooltip && (
        <div className="bg-[#111010] text-[#FAF8F4] p-4 rounded-2xl shadow-2xl border border-[#B49B73]/40 text-xs font-sans-ui w-[calc(100vw-2rem)] max-w-xs mb-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center justify-between pb-2 border-b border-[#3A3733]">
            <span className="font-editorial text-sm font-semibold tracking-wide text-[#E8DFCF] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#B49B73]" />
              Pearlessence Atelier
            </span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-[#D8C9AE] hover:text-[#FAF8F4] p-0.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="mt-2 text-[#D8C9AE] leading-relaxed">
            Need custom length, fabric consultation, or exact measurement guidance? Chat directly with our Bangalore atelier on WhatsApp.
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-center w-full py-2.5 px-3 bg-[#E8DFCF] text-[#111010] text-[11px] font-bold tracking-wider uppercase rounded-xl hover:bg-[#FAF8F4] transition-colors"
          >
            Start WhatsApp Chat
          </a>
        </div>
      )}

      {/* Floating Action Button with 'Chat for Custom Size' Pill */}
      <div className="relative group">
        {/* Floating pill from Natural Tones theme */}
        <div className="hidden sm:block absolute -top-9 right-0 bg-white text-[#111010] px-3 py-1 text-[9px] tracking-widest uppercase font-bold shadow-md whitespace-nowrap rounded-lg border border-[#D8C9AE] pointer-events-none transition-transform group-hover:-translate-y-0.5">
          Chat for Custom Size
        </div>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          className="w-12 h-12 sm:w-14 sm:h-14 bg-[#111010] rounded-full flex items-center justify-center shadow-2xl border border-[#B49B73] cursor-pointer hover:scale-105 transition-transform duration-300 active:scale-95"
          aria-label="Chat for Custom Size on WhatsApp"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#F5F1E8">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.417-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.305 1.652zm6.599-3.835c1.516.899 3.14 1.374 4.811 1.375 5.204 0 9.44-4.234 9.442-9.441.001-2.522-.983-4.893-2.77-6.682-1.788-1.787-4.158-2.771-6.68-2.772-5.204 0-9.44 4.234-9.443 9.441-.001 1.792.511 3.535 1.48 5.04l-.946 3.454 3.546-.93z" />
          </svg>
        </a>
      </div>
    </div>
  );
};
