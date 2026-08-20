import React, { useState, useEffect } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  Scissors,
  Clock,
  ShieldCheck,
  Star,
  LogOut
} from 'lucide-react';
import { useStore, ViewType } from '../../context/StoreContext';
import { CATEGORIES } from '../../data/mockData';
import { FabricCategory } from '../../types';
import { PearlessenceLogo } from '../brand/Logo';

export const Navbar: React.FC = () => {
  const {
    currentView,
    navigateTo,
    cartCount,
    wishlist,
    currentUser,
    logoutUser,
    setAuthModalOpen,
    searchQuery,
    setSearchQuery,
    isAdminLoggedIn
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: ViewType, category?: FabricCategory) => {
    navigateTo(view, { category });
    setMobileMenuOpen(false);
    setShopDropdownOpen(false);
    setSearchOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('shop');
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* 1. Slim, Clear Top Announcement Banner */}
      <div className="bg-[#111010] text-[#FAF8F4] text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase py-2.5 px-4 text-center border-b border-[#2A2825] transition-colors font-montserrat">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2.5">
          <Sparkles className="w-3.5 h-3.5 text-[#B49B73] shrink-0" />
          <span>BANGALORE ATELIER • 15-DAY MADE-TO-ORDER BESPOKE • COMPLIMENTARY SHIPPING OVER ₹4,999</span>
          <Sparkles className="w-3.5 h-3.5 text-[#B49B73] shrink-0 hidden sm:inline" />
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-[#FAF8F4]/98 backdrop-blur-md shadow-sm border-b border-[#D8C9AE] py-3.5'
            : 'bg-[#FAF8F4] border-b border-[#E8DFCF] py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between gap-6 lg:gap-8">
            
            {/* Left: Brand Wordmark (Bold, Modern, Clean Montserrat) */}
            <div className="flex items-center gap-3">
              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 -ml-2 text-[#111010] hover:bg-[#E8DFCF] rounded-lg transition-colors cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <button
                onClick={() => handleNavClick('home')}
                className="flex items-center group cursor-pointer text-left focus:outline-hidden"
              >
                <PearlessenceLogo variant="horizontal" theme="dark" />
              </button>
            </div>

            {/* Center: Desktop Navigation Links (Bold, spacious, clean) */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-9 font-montserrat text-xs font-bold tracking-[0.16em] uppercase">
              {/* Shop Abayas Dropdown */}
              <div
                className="relative py-1"
                onMouseEnter={() => setShopDropdownOpen(true)}
                onMouseLeave={() => setShopDropdownOpen(false)}
              >
                <button
                  onClick={() => handleNavClick('shop')}
                  className={`flex items-center gap-1.5 py-1.5 transition-colors hover:text-[#B49B73] cursor-pointer ${
                    currentView === 'shop' || currentView === 'category'
                      ? 'text-[#B49B73] border-b-2 border-[#B49B73]'
                      : 'text-[#111010]'
                  }`}
                >
                  <span>Shop Abayas</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${shopDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {shopDropdownOpen && (
                  <div className="absolute top-full left-0 w-84 bg-[#FAF8F4] border border-[#D8C9AE] rounded-2xl shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-2 border-b border-[#E8DFCF] mb-1.5">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#8C7F72] block">
                        5 Signature Fabric Lines
                      </span>
                    </div>

                    <div className="space-y-1">
                      {CATEGORIES.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => handleNavClick('category', cat.id)}
                          className="w-full text-left p-2.5 rounded-xl hover:bg-[#E8DFCF] transition-colors flex items-center justify-between group cursor-pointer"
                        >
                          <div>
                            <div className="text-xs font-extrabold text-[#111010] group-hover:text-[#B49B73] transition-colors">
                              {cat.name}
                            </div>
                            <div className="text-[10px] text-[#8C7F72] font-medium tracking-normal mt-0.5">
                              {cat.bestFor}
                            </div>
                          </div>
                          <span className="text-xs text-[#B49B73] font-bold">&rarr;</span>
                        </button>
                      ))}
                    </div>

                    <div className="pt-2 mt-2 border-t border-[#E8DFCF]">
                      <button
                        onClick={() => handleNavClick('shop')}
                        className="w-full py-2.5 bg-[#111010] hover:bg-[#222] text-[#FAF8F4] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors text-center cursor-pointer"
                      >
                        View All Collections
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Bespoke Customisation */}
              <button
                onClick={() => handleNavClick('customise')}
                className={`flex items-center gap-1.5 py-1.5 transition-colors hover:text-[#B49B73] cursor-pointer ${
                  currentView === 'customise'
                    ? 'text-[#B49B73] border-b-2 border-[#B49B73]'
                    : 'text-[#111010]'
                }`}
              >
                <Scissors className="w-3.5 h-3.5 text-[#B49B73]" />
                <span>Customise Fit</span>
              </button>

              {/* Size Guide */}
              <button
                onClick={() => handleNavClick('size-guide')}
                className={`py-1.5 transition-colors hover:text-[#B49B73] cursor-pointer ${
                  currentView === 'size-guide'
                    ? 'text-[#B49B73] border-b-2 border-[#B49B73]'
                    : 'text-[#111010]'
                }`}
              >
                Size Guide
              </button>

              {/* Track Order */}
              <button
                onClick={() => handleNavClick('track-order')}
                className={`flex items-center gap-1.5 py-1.5 transition-colors hover:text-[#B49B73] cursor-pointer ${
                  currentView === 'track-order'
                    ? 'text-[#B49B73] border-b-2 border-[#B49B73]'
                    : 'text-[#111010]'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-[#8C7F72]" />
                <span>Track Order</span>
              </button>

              {/* Client Reviews */}
              <button
                onClick={() => handleNavClick('testimonials')}
                className={`flex items-center gap-1.5 py-1.5 transition-colors hover:text-[#B49B73] cursor-pointer ${
                  currentView === 'testimonials'
                    ? 'text-[#B49B73] border-b-2 border-[#B49B73]'
                    : 'text-[#111010]'
                }`}
              >
                <span>Reviews</span>
              </button>
            </nav>

            {/* Right: Actions Group (Search, Wishlist, Account, Cart Bag) */}
            <div className="flex items-center gap-3 sm:gap-4 font-montserrat">
              {/* Search Box / Button */}
              <div className="relative">
                {searchOpen ? (
                  <form onSubmit={handleSearchSubmit} className="flex items-center animate-in fade-in duration-150">
                    <input
                      type="text"
                      autoFocus
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search abayas & fabrics..."
                      className="w-36 sm:w-56 px-3.5 py-2 bg-white border border-[#D8C9AE] rounded-xl text-xs font-semibold text-[#111010] focus:outline-hidden focus:border-[#111010] shadow-xs"
                    />
                    <button
                      type="button"
                      onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                      className="p-1.5 ml-1 text-[#8C7F72] hover:text-[#111010] cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="p-2.5 rounded-xl hover:bg-[#E8DFCF] text-[#111010] transition-colors cursor-pointer"
                    aria-label="Search Collection"
                    title="Search"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Wishlist */}
              <button
                onClick={() => {
                  if (currentUser) {
                    handleNavClick('account');
                  } else {
                    handleNavClick('shop');
                  }
                }}
                className="hidden sm:flex items-center justify-center p-2.5 rounded-xl hover:bg-[#E8DFCF] text-[#111010] transition-colors relative cursor-pointer"
                aria-label="Wishlist"
                title="Saved Items"
              >
                <Heart className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#B49B73] text-[#111010] font-black text-[9px] rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Account / User */}
              {currentUser ? (
                <div className="hidden sm:flex items-center gap-1.5 bg-[#E8DFCF] p-1 rounded-xl">
                  <button
                    onClick={() => handleNavClick('account')}
                    className="flex items-center gap-1.5 py-1.5 px-2.5 hover:bg-[#D8C9AE] text-[#111010] text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    title="View Account Dossier"
                  >
                    <User className="w-3.5 h-3.5 text-[#B49B73]" />
                    <span>{(currentUser.name || currentUser.fullName || 'Client').split(' ')[0]}</span>
                  </button>
                  <button
                    onClick={() => {
                      logoutUser();
                      handleNavClick('home');
                    }}
                    className="p-1.5 hover:bg-[#FAF8F4] text-[#8C7F72] hover:text-[#B5654F] rounded-lg transition-colors cursor-pointer"
                    title="Sign Out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="hidden sm:flex items-center gap-1.5 py-2 px-3 hover:bg-[#E8DFCF] text-[#111010] text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-[#8C7F72]" />
                  <span>Sign In</span>
                </button>
              )}

              {/* Cart / Shopping Bag Button */}
              <button
                onClick={() => handleNavClick('cart')}
                className="py-2.5 px-4 bg-[#111010] hover:bg-[#222] text-[#FAF8F4] rounded-xl font-montserrat font-bold text-xs uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-xs active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#B49B73]" />
                <span className="hidden sm:inline">Bag</span>
                <span className="bg-[#B49B73] text-[#111010] text-[10px] font-black px-1.5 py-0.5 rounded-md min-w-5 text-center">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Clean Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F4] border-b border-[#D8C9AE] p-6 shadow-2xl animate-in slide-in-from-top-3 duration-200 font-manrope">
          <div className="space-y-4">
            {/* User card in mobile */}
            {currentUser ? (
              <div className="p-3.5 bg-[#E8DFCF] rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-[#B49B73]" />
                  <span className="text-xs font-black text-[#111010]">
                    Hi, {currentUser.name || currentUser.fullName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleNavClick('account')}
                    className="text-xs font-bold text-[#111010] bg-white px-2.5 py-1 rounded-lg border border-[#D8C9AE]"
                  >
                    Account
                  </button>
                  <button
                    onClick={() => {
                      logoutUser();
                      setMobileMenuOpen(false);
                      handleNavClick('home');
                    }}
                    className="text-xs font-bold text-[#B5654F] bg-white px-2 py-1 rounded-lg border border-[#D8C9AE]"
                    title="Sign Out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => { setMobileMenuOpen(false); setAuthModalOpen(true); }}
                className="w-full py-3 bg-[#111010] text-[#FAF8F4] text-xs font-black uppercase tracking-widest rounded-xl text-center cursor-pointer"
              >
                Sign In / Register
              </button>
            )}

            <button
              onClick={() => handleNavClick('home')}
              className="w-full text-left py-2 text-sm uppercase tracking-wider font-extrabold text-[#111010] border-b border-[#E8DFCF]"
            >
              Home
            </button>

            <div className="py-2 border-b border-[#E8DFCF]">
              <div className="text-[10px] uppercase tracking-widest text-[#8C7F72] mb-2 font-black">
                Fabric Collections
              </div>
              <div className="space-y-2 pl-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => handleNavClick('category', cat.id)}
                    className="w-full text-left text-xs font-bold text-[#111010] py-1 flex items-center justify-between"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-[#8C7F72] font-normal">{cat.bestFor}</span>
                  </button>
                ))}
                <button
                  onClick={() => handleNavClick('shop')}
                  className="text-left text-xs font-black text-[#B49B73] pt-1 block"
                >
                  &rarr; View All Ready-to-Wear
                </button>
              </div>
            </div>

            <button
              onClick={() => handleNavClick('customise')}
              className="w-full text-left py-2 text-sm uppercase tracking-wider font-extrabold text-[#111010] flex items-center justify-between border-b border-[#E8DFCF]"
            >
              <div className="flex items-center gap-2">
                <Scissors className="w-4 h-4 text-[#B49B73]" />
                <span>Customise Bespoke Abaya</span>
              </div>
              <span className="text-[9px] bg-[#B49B73]/20 text-[#B49B73] px-2 py-0.5 rounded-full font-bold">
                WhatsApp
              </span>
            </button>

            <button
              onClick={() => handleNavClick('size-guide')}
              className="w-full text-left py-2 text-sm uppercase tracking-wider font-extrabold text-[#111010] border-b border-[#E8DFCF]"
            >
              Size Guide &amp; Measurements
            </button>

            <button
              onClick={() => handleNavClick('track-order')}
              className="w-full text-left py-2 text-sm uppercase tracking-wider font-extrabold text-[#111010] border-b border-[#E8DFCF]"
            >
              Track Order Status
            </button>

            <button
              onClick={() => handleNavClick('testimonials')}
              className="w-full text-left py-2 text-sm uppercase tracking-wider font-extrabold text-[#111010] border-b border-[#E8DFCF]"
            >
              Client Reviews
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className="w-full text-left py-2 text-sm uppercase tracking-wider font-extrabold text-[#111010] border-b border-[#E8DFCF]"
            >
              About Bangalore Atelier
            </button>

            <button
              onClick={() => handleNavClick('admin')}
              className="w-full text-left py-2 text-xs uppercase tracking-wider font-bold text-[#8C7F72]"
            >
              🔒 Atelier Admin Dashboard
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
