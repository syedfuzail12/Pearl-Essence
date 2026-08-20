import React, { useState } from 'react';
import {
  Scissors,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  Ruler,
  Layers,
  Truck,
  ArrowRight,
  ShieldCheck,
  UploadCloud,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BRAND_DETAILS, CATEGORIES } from '../data/mockData';
import { FabricCategory } from '../types';

export const CustomiseView: React.FC = () => {
  const { submitEnquiry, generateWhatsAppLink, navigateTo, setSizeGuideOpen } = useStore();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedFabric, setSelectedFabric] = useState<FabricCategory | 'Other / Undecided'>('qatar');
  const [clientOccasion, setClientOccasion] = useState('');
  const [height, setHeight] = useState('');
  const [lengthInches, setLengthInches] = useState('');
  const [sleevePreference, setSleevePreference] = useState('');
  const [notes, setNotes] = useState('');
  const [budgetEstimate, setBudgetEstimate] = useState('₹6,000 – ₹9,000');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    // 1. Log lead into Admin CRM
    const fullNotes = `Height: ${height || 'N/A'}, Length: ${lengthInches || 'N/A'}, Sleeve: ${sleevePreference || 'N/A'}, Occasion: ${clientOccasion || 'N/A'}. Details: ${notes || 'Bespoke consultation request'}`;
    
    submitEnquiry({
      name: fullName,
      phone,
      email,
      preferredFabric: selectedFabric,
      sourcePage: '/customise',
      notes: fullNotes,
      budgetEstimate
    });

    setSubmitted(true);

    // 2. Open WhatsApp with pre-filled context
    const waText = `Hello Pearlessence Concierge,\n\nI would like to initiate a bespoke abaya consultation:\n*Client Name:* ${fullName}\n*Phone:* ${phone}\n*Preferred Fabric:* ${selectedFabric.toUpperCase()}\n*Occasion:* ${clientOccasion || 'Special Event / Everyday'}\n*Height / Desired Length:* ${height || 'Standard'} / ${lengthInches || 'Standard'}\n*Details:* ${notes || 'Bespoke design assistance needed'}`;
    const url = `https://wa.me/${BRAND_DETAILS.whatsappNumber}?text=${encodeURIComponent(waText)}`;
    
    setTimeout(() => {
      window.open(url, '_blank');
    }, 500);
  };

  return (
    <div className="bg-[#FAF8F4] min-h-screen pb-24">
      {/* Editorial Header */}
      <section className="bg-[#111010] text-[#FAF8F4] py-16 px-4 sm:px-6 lg:px-8 border-b border-[#B49B73]/30 font-montserrat">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#3A3733]/60 rounded-full border border-[#B49B73]/30 text-[#D8C9AE] text-xs uppercase tracking-[0.2em] font-bold">
            <Scissors className="w-3.5 h-3.5 text-[#B49B73]" />
            Bespoke Haute Couture Atelier
          </div>
          <h1 className="font-montserrat text-4xl sm:text-5xl font-black text-[#F5F1E8] uppercase tracking-tight">
            Craft Your Bespoke Abaya
          </h1>
          <p className="text-xs sm:text-sm text-[#D8C9AE] max-w-2xl mx-auto font-medium leading-relaxed">
            Every woman has a unique silhouette and stature. Work directly with our Bangalore master tailors to select exclusive Gulf fabrics, customize lengths to the quarter-inch, and create a piece that is truly yours.
          </p>
        </div>
      </section>

      {/* 4-STEP BESPOKE JOURNEY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-montserrat">
        <div className="text-center mb-12">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B49B73] font-bold">
            How Bespoke Works
          </span>
          <h2 className="font-montserrat text-3xl font-black text-[#111010] uppercase tracking-tight mt-1">
            The 4-Step Atelier Process
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#D8C9AE] shadow-2xs relative">
            <span className="font-montserrat text-3xl font-black text-[#B49B73]/30 absolute top-4 right-4">
              01
            </span>
            <div className="w-10 h-10 rounded-full bg-[#111010] text-[#F5F1E8] flex items-center justify-center mb-4">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="font-montserrat text-base font-black text-[#111010] mb-2 uppercase">
              1. Direct Consultation
            </h3>
            <p className="text-xs text-[#8C7F72] leading-relaxed">
              Connect with our founder on WhatsApp. Share your preferred silhouette, event date, and styling vision.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#D8C9AE] shadow-2xs relative">
            <span className="font-editorial text-4xl font-light text-[#B49B73]/40 absolute top-4 right-4">
              02
            </span>
            <div className="w-10 h-10 rounded-full bg-[#111010] text-[#F5F1E8] flex items-center justify-center mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-editorial text-lg font-semibold text-[#111010] mb-2">
              2. Fabric & Sizing
            </h3>
            <p className="text-xs text-[#8C7F72] leading-relaxed">
              Select from authentic Qatar Nida, Italian Armani, or Belgian Linen. We guide you through shoulder and length measurements.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#D8C9AE] shadow-2xs relative">
            <span className="font-editorial text-4xl font-light text-[#B49B73]/40 absolute top-4 right-4">
              03
            </span>
            <div className="w-10 h-10 rounded-full bg-[#111010] text-[#F5F1E8] flex items-center justify-center mb-4">
              <Scissors className="w-5 h-5" />
            </div>
            <h3 className="font-editorial text-lg font-semibold text-[#111010] mb-2">
              3. Handcrafted Tailoring
            </h3>
            <p className="text-xs text-[#8C7F72] leading-relaxed">
              Individual hand-cutting and stitching in our Bangalore studio with reinforced seams, seed pearls, and modest linings.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#D8C9AE] shadow-2xs relative">
            <span className="font-editorial text-4xl font-light text-[#B49B73]/40 absolute top-4 right-4">
              04
            </span>
            <div className="w-10 h-10 rounded-full bg-[#111010] text-[#F5F1E8] flex items-center justify-center mb-4">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-editorial text-lg font-semibold text-[#111010] mb-2">
              4. 15-Day Delivery
            </h3>
            <p className="text-xs text-[#8C7F72] leading-relaxed">
              Hand-pressed, scented, and presented in our signature ivory luxury box delivered to your doorstep across India & worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* INTERACTIVE BESPOKE REQUEST BUILDER */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#D8C9AE] shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-[#111010] text-[#FAF8F4] p-8 text-center border-b border-[#B49B73]/30">
            <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#F5F1E8]">
              Initiate Your Customisation Consultation
            </h2>
            <p className="text-xs text-[#D8C9AE] mt-1 tracking-wider uppercase">
              Logged automatically into our Atelier CRM + Connected on WhatsApp
            </p>
          </div>

          {submitted ? (
            <div className="p-12 text-center space-y-6 animate-in fade-in">
              <div className="w-16 h-16 bg-[#8A9A83]/20 text-[#8A9A83] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-editorial text-2xl text-[#111010]">
                Enquiry Logged with Bangalore Atelier
              </h3>
              <p className="text-xs text-[#3A3733] max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{fullName}</strong>. Your customisation ticket has been recorded in our system and WhatsApp has been initiated.
              </p>
              <div className="pt-2 flex justify-center gap-4">
                <a
                  href={`https://wa.me/${BRAND_DETAILS.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-6 bg-[#111010] text-[#F5F1E8] text-xs font-semibold uppercase tracking-widest rounded-xl hover:bg-[#222] transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#B49B73]" />
                  Re-open WhatsApp Chat
                </a>
                <button
                  onClick={() => setSubmitted(false)}
                  className="py-3 px-6 bg-[#E8DFCF] text-[#111010] text-xs font-semibold uppercase tracking-widest rounded-xl"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#111010] mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="e.g. Fatima Al-Zahra"
                    className="w-full px-4 py-2.5 bg-[#FAF8F4] border border-[#D8C9AE] rounded-xl text-sm focus:outline-hidden focus:border-[#111010]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#111010] mb-1.5">
                    WhatsApp Phone Number *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 bg-[#E8DFCF] border border-r-0 border-[#D8C9AE] text-xs text-[#3A3733] font-medium rounded-l-xl">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="98450 12345"
                      className="w-full px-4 py-2.5 bg-[#FAF8F4] border border-[#D8C9AE] rounded-r-xl text-sm focus:outline-hidden focus:border-[#111010]"
                    />
                  </div>
                </div>
              </div>

              {/* Fabric Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#111010] mb-2">
                  Preferred Fabric Curation
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'qatar', label: 'Qatar Royal Nida' },
                    { id: 'armani', label: 'Armani Silk-Crepe' },
                    { id: 'satin', label: 'Hammered Duchess Satin' },
                    { id: 'linen', label: 'European Washed Linen' },
                    { id: 'formal', label: 'Minimalist Poly-Crepe' },
                    { id: 'Other / Undecided', label: 'Help Me Choose' }
                  ].map(f => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setSelectedFabric(f.id as any)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        selectedFabric === f.id
                          ? 'bg-[#111010] text-[#F5F1E8] border-[#111010] shadow-xs'
                          : 'bg-[#FAF8F4] text-[#3A3733] border-[#D8C9AE] hover:border-[#111010]'
                      }`}
                    >
                      <span className="font-semibold block">{f.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Measurements */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#111010] mb-1.5">
                    Your Height
                  </label>
                  <input
                    type="text"
                    value={height}
                    onChange={e => setHeight(e.target.value)}
                    placeholder="e.g. 5 ft 5 in (165 cm)"
                    className="w-full px-3 py-2 bg-[#FAF8F4] border border-[#D8C9AE] rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#111010] mb-1.5">
                    Desired Abaya Length
                  </label>
                  <input
                    type="text"
                    value={lengthInches}
                    onChange={e => setLengthInches(e.target.value)}
                    placeholder="e.g. 54 inches"
                    className="w-full px-3 py-2 bg-[#FAF8F4] border border-[#D8C9AE] rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#111010] mb-1.5">
                    Occasion / Event Date
                  </label>
                  <input
                    type="text"
                    value={clientOccasion}
                    onChange={e => setClientOccasion(e.target.value)}
                    placeholder="e.g. Sister's Nikah in Oct"
                    className="w-full px-3 py-2 bg-[#FAF8F4] border border-[#D8C9AE] rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* Sleeve and Details */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#111010] mb-1.5">
                  Specific Customisation Notes & Requests
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Describe sleeve preferences (kimono, bell, elasticated), embroidery, pockets, or matching hijab requirements..."
                  className="w-full px-4 py-2.5 bg-[#FAF8F4] border border-[#D8C9AE] rounded-xl text-xs leading-relaxed focus:outline-hidden focus:border-[#111010]"
                />
              </div>

              {/* Submission Button */}
              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-[#111010] text-[#F5F1E8] hover:bg-[#222] text-xs font-semibold tracking-[0.2em] uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-3"
                >
                  <MessageCircle className="w-4 h-4 text-[#8A9A83]" />
                  <span>Send Request & Open WhatsApp Concierge</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-[#8C7F72]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B49B73]" />
                  <span>100% Confidential • Handcrafted in Bangalore Atelier • 15 Working Days</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
