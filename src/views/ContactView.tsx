import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Instagram, Send, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BRAND_DETAILS } from '../data/mockData';

export const ContactView: React.FC = () => {
  const { showToast, generateWhatsAppLink } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
    showToast('Your message has been received by our Bangalore Atelier.');
  };

  return (
    <div className="bg-[#FAF8F4] min-h-screen pb-24">
      {/* Header */}
      <div className="bg-[#111010] text-[#FAF8F4] py-16 px-4 sm:px-6 lg:px-8 border-b border-[#B49B73]/30">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#B49B73] font-semibold">
            <MapPin className="w-3.5 h-3.5" />
            <span>Bangalore Headquarters</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-medium text-[#F5F1E8]">
            The Pearlessence Atelier & Concierge
          </h1>
          <p className="text-xs sm:text-sm text-[#D8C9AE] max-w-2xl mx-auto font-sans-ui leading-relaxed font-light">
            Connect with our Bangalore studio for bespoke styling consultations, corporate bulk orders, or order assistance.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Atelier Contact Details & Hours (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-[#D8C9AE] shadow-sm space-y-6">
              <h2 className="font-editorial text-2xl font-semibold text-[#111010]">
                Atelier Location & Hours
              </h2>

              <div className="space-y-4 text-xs text-[#3A3733]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#B49B73] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#111010] mb-0.5 font-semibold">
                      Bangalore Design Studio
                    </strong>
                    <p className="text-[#8C7F72] leading-relaxed">
                      Koramangala & Indiranagar Atelier District, Bangalore, Karnataka 560034, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#B49B73] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#111010] mb-0.5 font-semibold">
                      Studio Hours (IST)
                    </strong>
                    <p className="text-[#8C7F72]">
                      Monday – Saturday: 10:00 AM – 7:30 PM
                      <br />
                      Sunday: By Prior Appointment Only
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#B49B73] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#111010] mb-0.5 font-semibold">
                      Direct Concierge Line
                    </strong>
                    <p className="text-[#8C7F72]">{BRAND_DETAILS.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#B49B73] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#111010] mb-0.5 font-semibold">
                      Email Atelier
                    </strong>
                    <p className="text-[#8C7F72]">concierge@pearlessence.co</p>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Trigger */}
              <div className="pt-4 border-t border-[#E8DFCF]">
                <a
                  href={`https://wa.me/${BRAND_DETAILS.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-[#111010] text-[#F5F1E8] rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#222] transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-[#8A9A83]" />
                  <span>Start WhatsApp Chat Now</span>
                </a>
              </div>
            </div>

            {/* Social channels */}
            <div className="bg-[#E8DFCF]/50 p-6 rounded-2xl border border-[#D8C9AE] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#8C7F72] block">
                  Instagram
                </span>
                <a
                  href={BRAND_DETAILS.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-editorial text-lg font-semibold text-[#111010] hover:text-[#B49B73]"
                >
                  {BRAND_DETAILS.instagram}
                </a>
              </div>
              <Instagram className="w-6 h-6 text-[#111010]" />
            </div>
          </div>

          {/* Contact / Appointment Request Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#D8C9AE] shadow-sm">
              <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#111010] mb-2">
                Send an Atelier Message
              </h2>
              <p className="text-xs text-[#8C7F72] mb-8">
                Inquire about custom fittings, wedding bridal parties, or international shipping.
              </p>

              {submitted ? (
                <div className="p-8 text-center space-y-4 animate-in fade-in">
                  <div className="w-12 h-12 bg-[#8A9A83]/20 text-[#8A9A83] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-editorial text-xl text-[#111010]">
                    Thank You, {name}
                  </h3>
                  <p className="text-xs text-[#3A3733]">
                    Your message has been forwarded to our Bangalore atelier concierge. We typically respond within 2–4 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="py-2 px-5 bg-[#111010] text-[#F5F1E8] text-xs font-semibold uppercase tracking-wider rounded-xl mt-4"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#111010] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. Zoya Khan"
                        className="w-full px-4 py-2.5 bg-[#FAF8F4] border border-[#D8C9AE] rounded-xl text-xs focus:outline-hidden focus:border-[#111010]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#111010] mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="+91 98450 12345"
                        className="w-full px-4 py-2.5 bg-[#FAF8F4] border border-[#D8C9AE] rounded-xl text-xs focus:outline-hidden focus:border-[#111010]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#111010] mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="zoya@example.com"
                      className="w-full px-4 py-2.5 bg-[#FAF8F4] border border-[#D8C9AE] rounded-xl text-xs focus:outline-hidden focus:border-[#111010]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#111010] mb-1.5">
                      Message & Requirements *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Please let us know how we can assist you..."
                      className="w-full px-4 py-2.5 bg-[#FAF8F4] border border-[#D8C9AE] rounded-xl text-xs leading-relaxed focus:outline-hidden focus:border-[#111010]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#111010] text-[#F5F1E8] text-xs font-semibold tracking-[0.2em] uppercase rounded-xl hover:bg-[#222] transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
