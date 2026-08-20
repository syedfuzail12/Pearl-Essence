import React, { useState } from 'react';
import { Sparkles, ArrowRight, Calendar, User, Clock, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BLOG_POSTS } from '../data/mockData';
import { BlogPost } from '../types';

export const BlogView: React.FC = () => {
  const { navigateTo } = useStore();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  if (selectedPost) {
    return (
      <div className="bg-[#FAF8F4] min-h-screen pb-24">
        {/* Article Breadcrumb */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8C7F72] mb-6">
            <button onClick={() => setSelectedPost(null)} className="hover:text-[#111010]">
              &larr; Back to Editorial Journal
            </button>
            <ChevronRight className="w-3 h-3 text-[#D8C9AE]" />
            <span className="text-[#111010] font-semibold truncate">{selectedPost.title}</span>
          </div>

          <article className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8C9AE] shadow-sm space-y-8">
            <div className="space-y-3">
              <span className="px-3 py-1 bg-[#111010] text-[#F5F1E8] text-[10px] font-semibold uppercase tracking-widest rounded-md">
                {selectedPost.category}
              </span>
              <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-medium text-[#111010] leading-tight">
                {selectedPost.title}
              </h1>
              <div className="flex items-center gap-4 text-xs text-[#8C7F72] pt-2 border-t border-[#E8DFCF]">
                <span>By {selectedPost.author}</span>
                <span>•</span>
                <span>{selectedPost.date}</span>
                <span>•</span>
                <span>{selectedPost.readTime}</span>
              </div>
            </div>

            <div className="aspect-16/9 rounded-2xl overflow-hidden bg-[#E8DFCF]">
              <img
                src={selectedPost.coverImage}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Body */}
            <div className="text-sm text-[#3A3733] font-sans-ui leading-relaxed space-y-6">
              {selectedPost.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* CTA */}
            <div className="p-6 bg-[#FAF8F4] rounded-2xl border border-[#D8C9AE] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-editorial text-base font-semibold text-[#111010]">
                  Explore Related Ready-to-Wear
                </h4>
                <p className="text-xs text-[#8C7F72]">
                  Crafted on order with complimentary length customization.
                </p>
              </div>
              <button
                onClick={() => navigateTo('shop')}
                className="py-2.5 px-5 bg-[#111010] text-[#F5F1E8] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#222]"
              >
                View Collection
              </button>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F4] min-h-screen pb-24">
      {/* Header */}
      <div className="bg-[#111010] text-[#FAF8F4] py-16 px-4 sm:px-6 lg:px-8 border-b border-[#B49B73]/30">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#B49B73] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pearlessence Editorial</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-medium text-[#F5F1E8]">
            The Styling & Fabric Journal
          </h1>
          <p className="text-xs sm:text-sm text-[#D8C9AE] max-w-2xl mx-auto font-sans-ui leading-relaxed font-light">
            In-depth guides to modest styling, fabric care, Gulf textiles, and capsule wardrobes.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map(post => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group bg-white rounded-2xl overflow-hidden border border-[#D8C9AE] shadow-2xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="aspect-16/10 overflow-hidden bg-[#E8DFCF]">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#8C7F72] mb-2">
                    <span className="text-[#B49B73] font-semibold uppercase tracking-wider">
                      {post.tags?.[0] || 'Modest Styling'}
                    </span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="font-editorial text-xl font-medium text-[#111010] group-hover:text-[#B49B73] transition-colors leading-snug mb-3">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#8C7F72] line-clamp-3 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E8DFCF] flex items-center justify-between text-xs text-[#111010] font-semibold">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
