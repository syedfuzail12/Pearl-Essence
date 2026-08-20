import React, { useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { Toast } from './components/common/Toast';
import { QuickViewModal } from './components/modals/QuickViewModal';
import { SizeGuideModal } from './components/modals/SizeGuideModal';
import { AuthModal } from './components/modals/AuthModal';

// Views
import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { CustomiseView } from './views/CustomiseView';
import { SizeGuideView } from './views/SizeGuideView';
import { TestimonialsView } from './views/TestimonialsView';
import { AboutView } from './views/AboutView';
import { DeliveryReturnsView } from './views/DeliveryReturnsView';
import { BlogView } from './views/BlogView';
import { ContactView } from './views/ContactView';
import { CartView } from './views/CartView';
import { CheckoutView } from './views/CheckoutView';
import { OrderTrackingView } from './views/OrderTrackingView';
import { AccountView } from './views/AccountView';
import { AdminView } from './views/AdminView';

const MainLayout: React.FC = () => {
  const { currentView } = useStore();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'shop':
      case 'category':
        return <ShopView />;
      case 'product':
        return <ProductDetailView />;
      case 'customise':
        return <CustomiseView />;
      case 'size-guide':
        return <SizeGuideView />;
      case 'testimonials':
        return <TestimonialsView />;
      case 'about':
        return <AboutView />;
      case 'delivery-returns':
        return <DeliveryReturnsView />;
      case 'blog':
        return <BlogView />;
      case 'contact':
        return <ContactView />;
      case 'cart':
        return <CartView />;
      case 'checkout':
        return <CheckoutView />;
      case 'track-order':
        return <OrderTrackingView />;
      case 'account':
        return <AccountView />;
      case 'admin':
        return <AdminView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#111010] flex flex-col font-sans-ui selection:bg-[#E8DFCF] selection:text-[#111010]">
      {/* Top Navigation */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1 w-full">
        {renderCurrentView()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />

      {/* Global Modals & Overlays */}
      <QuickViewModal />
      <SizeGuideModal />
      <AuthModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}
