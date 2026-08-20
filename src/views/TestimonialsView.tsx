import React, { useState } from 'react';
import {
  Star,
  MessageCircle,
  Instagram,
  CheckCircle2,
  Sparkles,
  Heart,
  Plus,
  Send
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { TESTIMONIALS, BRAND_DETAILS } from '../data/mockData';
import { Testimonial } from '../types';

export const TestimonialsView: React.FC = () => {
  const { showToast } = useStore();

  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>(TESTIMONIALS);
  const [filterSource, setFilterSource] = useState<'all' | 'WhatsApp' | 'Instagram' | 'Website'>('all');
  
  // Submit new review form
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [productName, setProductName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    const newTestimonial: Testimonial = {
      id: `test-user-${Date.now()}`,
      customerName: name,
      city: city || 'India',
      productName: productName || 'Bespoke Abaya',
      fabricCategory: 'linen',
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      source: 'Verified Buyer',
      isPublished: true
    };

    setTestimonialsList([newTestimonial, ...testimonialsList]);
    showToast('Thank you for sharing your experience! Your review has been published.');
    setName('');
    setCity('');
    setProductName('');
    setComment('');
    setFormOpen(false);
  };

  const filtered = testimonialsList.filter(t => {
    if (filterSource === 'all') return true;
    return t.source === filterSource;
  });

  return (
    <div className="bg-[#FAF8F4] min-h-screen pb-24">
      {/* Header */}
      <div className="bg-[#111010] text-[#FAF8F4] py-16 px-4 sm:px-6 lg:px-8 border-b border-[#B49B73]/30">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#B49B73] font-semibold">
            <Heart className="w-3.5 h-3.5 fill-[#B49B73]" />
            <span>Real Clientele Feedback</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-medium text-[#F5F1E8]">
            Client Words & Testimonials
          </h1>
          <p className="text-xs sm:text-sm text-[#D8C9AE] max-w-2xl mx-auto font-sans-ui leading-relaxed font-light">
            Real WhatsApp chats, direct messages, and client diaries from women across Bangalore, Dubai, London, and beyond who wear Pearlessence.
          </p>

          <div className="pt-4 flex justify-center gap-4">
            <button
              onClick={() => setFormOpen(!formOpen)}
              className="py-2.5 px-5 bg-[#FAF8F4] text-[#111010] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#E8DFCF] transition-colors flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Share Your Review</span>
            </button>

            <a
              href={BRAND_DETAILS.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-5 bg-transparent border border-[#B49B73] text-[#F5F1E8] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#B49B73]/20 transition-colors flex items-center gap-2"
            >
              <Instagram className="w-4 h-4 text-[#B49B73]" />
              <span>View Instagram Highlights</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Review Submission Accordion */}
        {formOpen && (
          <div className="mb-12 bg-white rounded-2xl border border-[#D8C9AE] p-6 sm:p-8 shadow-md max-w-2xl mx-auto animate-in slide-in-from-top duration-300">
            <h3 className="font-editorial text-2xl font-semibold text-[#111010] mb-1">
              Submit Client Feedback
            </h3>
            <p className="text-xs text-[#8C7F72] mb-6">
              Share your thoughts on the fabric quality, stitching, and customisation experience.
            </p>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#111010] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Ayesha Siddiqa"
                    className="w-full px-3 py-2 bg-[#FAF8F4] border border-[#D8C9AE] rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#111010] mb-1">
                    City / Country
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="e.g. Bangalore / London"
                    className="w-full px-3 py-2 bg-[#FAF8F4] border border-[#D8C9AE] rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#111010] mb-1">
                    Abaya Ordered
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                    placeholder="e.g. Noor Black Qatar Royal Abaya"
                    className="w-full px-3 py-2 bg-[#FAF8F4] border border-[#D8C9AE] rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#111010] mb-1">
                    Rating (1 to 5 Stars)
                  </label>
                  <select
                    value={rating}
                    onChange={e => setRating(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FAF8F4] border border-[#D8C9AE] rounded-xl text-xs font-semibold"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5/5) Pure Luxury</option>
                    <option value={4}>⭐⭐⭐⭐ (4/5) Very Good</option>
                    <option value={3}>⭐⭐⭐ (3/5) Average</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#111010] mb-1">
                  Your Review *
                </label>
                <textarea
                  rows={4}
                  required
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder="How was the drape, opacity, fit, and 15-day made-to-order turnaround?"
                  className="w-full px-3 py-2 bg-[#FAF8F4] border border-[#D8C9AE] rounded-xl text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#8C7F72] hover:text-[#111010]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#111010] text-[#F5F1E8] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#222]"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Source Filters */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#D8C9AE]">
          <div className="flex gap-2">
            {(['all', 'WhatsApp', 'Instagram', 'Website'] as const).map(src => (
              <button
                key={src}
                onClick={() => setFilterSource(src)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all border ${
                  filterSource === src
                    ? 'bg-[#111010] text-[#F5F1E8] border-[#111010]'
                    : 'bg-white text-[#3A3733] border-[#D8C9AE] hover:border-[#111010]'
                }`}
              >
                {src === 'all' ? 'All Stories' : `${src} Feedback`}
              </button>
            ))}
          </div>
          <span className="text-xs text-[#8C7F72] font-medium hidden sm:inline">
            Showing {filtered.length} verified testimonials
          </span>
        </div>

        {/* Masonry / Grid of Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(t => (
            <div
              key={t.id}
              className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between shadow-2xs hover:shadow-md ${
                t.source === 'WhatsApp'
                  ? 'bg-[#F4F7F4] border-[#D0DFCF]'
                  : 'bg-white border-[#D8C9AE]'
              }`}
            >
              <div>
                {/* Channel & Stars Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 text-[#B49B73]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#B49B73]" />
                    ))}
                  </div>

                  <span
                    className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-md flex items-center gap-1 ${
                      t.source === 'WhatsApp'
                        ? 'bg-[#E1ECE0] text-[#42683B]'
                        : t.source === 'Instagram'
                        ? 'bg-[#FBEBE8] text-[#9A4E3A]'
                        : 'bg-[#E8DFCF] text-[#111010]'
                    }`}
                  >
                    {t.source === 'WhatsApp' && <MessageCircle className="w-3 h-3" />}
                    {t.source === 'Instagram' && <Instagram className="w-3 h-3" />}
                    <span>{t.source}</span>
                  </span>
                </div>

                {/* Comment Text with WhatsApp bubble vibe if applicable */}
                <p className="text-xs text-[#3A3733] font-sans-ui italic leading-relaxed mb-6">
                  "{t.comment}"
                </p>
              </div>

              {/* Author & Verification */}
              <div className="pt-4 border-t border-[#D8C9AE]/60 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-editorial text-sm font-semibold text-[#111010]">
                      {t.customerName}
                    </h4>
                    {t.verifiedPurchase && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8A9A83]" title="Verified Client" />
                    )}
                  </div>
                  <span className="text-[11px] text-[#8C7F72]">{t.city}</span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[#B49B73] font-medium block max-w-32 truncate">
                    {t.productName}
                  </span>
                  <span className="text-[9px] text-[#8C7F72]">{t.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
