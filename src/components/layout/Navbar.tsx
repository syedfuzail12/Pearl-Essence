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

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

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
      <div className="bg-[#111010] text-[#FAF8F4] text-[10px] sm:text-xs font-bold tracking-[0.12em] sm:tracking-[0.18em] uppercase py-2 sm:py-2.5 px-3 sm:px-4 text-center border-b border-[#2A2825] transition-colors font-montserrat w-full overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-1.5 sm:gap-2.5">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#B49B73] shrink-0" />
          <span className="truncate sm:whitespace-normal">
            BANGALORE ATELIER • 15-DAY MADE-TO-ORDER BESPOKE • FREE SHIPPING OVER ₹4,999
          </span>
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#B49B73] shrink-0 hidden sm:inline" />
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-[#FAF8F4]/98 backdrop-blur-md shadow-sm border-b border-[#D8C9AE] py-3 sm:py-3.5'
            : 'bg-[#FAF8F4] border-b border-[#E8DFCF] py-3.5 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between gap-3 sm:gap-6 lg:gap-8">
            
            {/* Left: Mobile Menu Toggle & Brand Logo (Navigates to About Page) */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 -ml-1 text-[#111010] hover:bg-[#E8DFCF] rounded-lg transition-colors cursor-pointer"
                aria-label="Open menu"
                title="Navigation Menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Brand Logo & Title: Navigates to About Page for brand story */}
              <button
                onClick={() => handleNavClick('about')}
                className="flex items-center group cursor-pointer text-left focus:outline-hidden"
                title="About Pearlessence Atelier"
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

              {/* About Atelier */}
              <button
                onClick={() => handleNavClick('about')}
                className={`flex items-center gap-1.5 py-1.5 transition-colors hover:text-[#B49B73] cursor-pointer ${
                  currentView === 'about'
                    ? 'text-[#B49B73] border-b-2 border-[#B49B73]'
                    : 'text-[#111010]'
                }`}
              >
                <span>About</span>
              </button>
            </nav>

            {/* Right: Actions Group (Search, Wishlist, Account, Cart Bag) */}
            <div className="flex items-center gap-2 sm:gap-4 font-montserrat">
              {/* Search Box / Button */}
              <div className="relative">
                {searchOpen ? (
                  <form onSubmit={handleSearchSubmit} className="flex items-center animate-in fade-in duration-150">
                    <input
                      type="text"
                      autoFocus
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search abayas..."
                      className="w-32 sm:w-56 px-3 py-1.5 sm:py-2 bg-white border border-[#D8C9AE] rounded-xl text-xs font-semibold text-[#111010] focus:outline-hidden focus:border-[#111010] shadow-xs"
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
                    className="p-2 sm:p-2.5 rounded-xl hover:bg-[#E8DFCF] text-[#111010] transition-colors cursor-pointer"
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
                className="py-2 sm:py-2.5 px-3 sm:px-4 bg-[#111010] hover:bg-[#222] text-[#FAF8F4] rounded-xl font-montserrat font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-xs active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#B49B73]" />
                <span className="hidden sm:inline">Bag</span>
                <span className="bg-[#B49B73] text-[#111010] text-[10px] font-black px-1.5 py-0.5 rounded-md min-w-4 text-center">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Mobile Navigation Full Slide-Over Drawer with Independent Scroll */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Dark Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-over Drawer Panel */}
          <div className="relative w-[86%] max-w-sm bg-[#FAF8F4] h-full shadow-2xl flex flex-col z-10 font-manrope animate-in slide-in-from-left duration-250 border-r border-[#D8C9AE]">
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-[#D8C9AE] flex items-center justify-between bg-white shrink-0">
              <button
                onClick={() => handleNavClick('about')}
                className="flex items-center text-left focus:outline-hidden"
              >
                <PearlessenceLogo variant="horizontal" theme="dark" size="sm" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl text-[#111010] hover:bg-[#E8DFCF] transition-colors cursor-pointer"
                aria-label="Close navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Links Container */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-4 pb-28">
              {/* User Account Bar in Mobile Drawer */}
              {currentUser ? (
                <div className="p-3.5 bg-[#E8DFCF] rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#B49B73]" />
                    <span className="text-xs font-black text-[#111010] truncate max-w-[140px]">
                      {currentUser.name || currentUser.fullName}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleNavClick('account')}
                      className="text-xs font-bold text-[#111010] bg-white px-2.5 py-1 rounded-lg border border-[#D8C9AE] cursor-pointer"
                    >
                      Dossier
                    </button>
                    <button
                      onClick={() => {
                        logoutUser();
                        setMobileMenuOpen(false);
                        handleNavClick('home');
                      }}
                      className="p-1 text-xs font-bold text-[#B5654F] bg-white rounded-lg border border-[#D8C9AE] cursor-pointer"
                      title="Sign Out"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => { setMobileMenuOpen(false); setAuthModalOpen(true); }}
                  className="w-full py-3 bg-[#111010] text-[#FAF8F4] text-xs font-black uppercase tracking-widest rounded-xl text-center cursor-pointer shadow-xs"
                >
                  Sign In / Create Account
                </button>
              )}

              {/* Main Navigation Items */}
              <div className="space-y-1">
                <button
                  onClick={() => handleNavClick('home')}
                  className="w-full text-left py-2.5 px-3 text-xs uppercase tracking-wider font-extrabold text-[#111010] hover:bg-[#E8DFCF] rounded-xl transition-colors cursor-pointer"
                >
                  Home
                </button>

                <button
                  onClick={() => handleNavClick('shop')}
                  className="w-full text-left py-2.5 px-3 text-xs uppercase tracking-wider font-extrabold text-[#111010] hover:bg-[#E8DFCF] rounded-xl transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>All Ready-to-Wear Abayas</span>
                  <span className="text-[10px] bg-[#B49B73] text-[#111010] px-2 py-0.5 rounded-md font-black">All</span>
                </button>

                {/* Fabric Subsections */}
                <div className="py-2.5 px-3 bg-white/70 rounded-xl border border-[#E8DFCF] my-1">
                  <div className="text-[9.5px] uppercase tracking-widest text-[#8C7F72] mb-2 font-black">
                    5 Signature Fabric Lines
                  </div>
                  <div className="space-y-1.5 pl-1">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => handleNavClick('category', cat.id)}
                        className="w-full text-left text-xs font-bold text-[#111010] py-1 flex items-center justify-between hover:text-[#B49B73] transition-colors cursor-pointer"
                      >
                        <span>{cat.name}</span>
                        <span className="text-[9px] text-[#8C7F72] font-medium">{cat.bestFor.split('•')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleNavClick('customise')}
                  className="w-full text-left py-2.5 px-3 text-xs uppercase tracking-wider font-extrabold text-[#111010] hover:bg-[#E8DFCF] rounded-xl transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Scissors className="w-4 h-4 text-[#B49B73]" />
                    <span>Customise Bespoke Abaya</span>
                  </div>
                  <span className="text-[9px] bg-[#8A9A83]/20 text-[#3B6631] px-2 py-0.5 rounded-full font-bold">
                    15 Days
                  </span>
                </button>

                <button
                  onClick={() => handleNavClick('size-guide')}
                  className="w-full text-left py-2.5 px-3 text-xs uppercase tracking-wider font-extrabold text-[#111010] hover:bg-[#E8DFCF] rounded-xl transition-colors cursor-pointer"
                >
                  Size Guide &amp; Measurements
                </button>

                <button
                  onClick={() => handleNavClick('track-order')}
                  className="w-full text-left py-2.5 px-3 text-xs uppercase tracking-wider font-extrabold text-[#111010] hover:bg-[#E8DFCF] rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Clock className="w-3.5 h-3.5 text-[#8C7F72]" />
                  <span>Track Order Status</span>
                </button>

                <button
                  onClick={() => handleNavClick('testimonials')}
                  className="w-full text-left py-2.5 px-3 text-xs uppercase tracking-wider font-extrabold text-[#111010] hover:bg-[#E8DFCF] rounded-xl transition-colors cursor-pointer"
                >
                  Client Reviews &amp; Stories
                </button>

                <button
                  onClick={() => handleNavClick('about')}
                  className="w-full text-left py-2.5 px-3 text-xs uppercase tracking-wider font-extrabold text-[#111010] hover:bg-[#E8DFCF] rounded-xl transition-colors flex items-center justify-between cursor-pointer bg-[#E8DFCF]/50"
                >
                  <span>About Bangalore Atelier</span>
                  <span className="text-[9px] text-[#B49B73] font-bold">Brand Story &rarr;</span>
                </button>

                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full text-left py-2.5 px-3 text-xs uppercase tracking-wider font-extrabold text-[#111010] hover:bg-[#E8DFCF] rounded-xl transition-colors cursor-pointer"
                >
                  Contact &amp; Concierge
                </button>

                <button
                  onClick={() => handleNavClick('delivery-returns')}
                  className="w-full text-left py-2.5 px-3 text-xs uppercase tracking-wider font-extrabold text-[#111010] hover:bg-[#E8DFCF] rounded-xl transition-colors cursor-pointer"
                >
                  Shipping &amp; Return Policy
                </button>
              </div>

              {/* Admin Portal Link */}
              <div className="pt-4 border-t border-[#D8C9AE]">
                <button
                  onClick={() => handleNavClick('admin')}
                  className="w-full text-left py-2.5 px-3 text-[11px] uppercase tracking-wider font-bold text-[#8C7F72] hover:text-[#111010] hover:bg-[#E8DFCF] rounded-xl transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>🔒 Atelier Admin Dashboard</span>
                  <span>&rarr;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
