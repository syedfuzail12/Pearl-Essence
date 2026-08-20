import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  CustomisationEnquiry,
  Testimonial,
  Coupon,
  UserProfile,
  AdminAuditLog,
  FabricCategory
} from '../types';
import {
  INITIAL_PRODUCTS,
  TESTIMONIALS,
  INITIAL_COUPONS,
  INITIAL_CUSTOMISATION_ENQUIRIES,
  INITIAL_ORDERS,
  BRAND_DETAILS
} from '../data/mockData';

export type ViewType =
  | 'home'
  | 'shop'
  | 'category'
  | 'product'
  | 'customise'
  | 'size-guide'
  | 'testimonials'
  | 'about'
  | 'delivery-returns'
  | 'blog'
  | 'blog-post'
  | 'faq'
  | 'contact'
  | 'cart'
  | 'checkout'
  | 'order-confirmation'
  | 'track-order'
  | 'account'
  | 'admin';

interface ToastState {
  type: 'success' | 'info' | 'error';
  message: string;
}

interface StoreContextType {
  // Navigation & View state
  currentView: ViewType;
  navigateTo: (view: ViewType, params?: { category?: FabricCategory; productSlug?: string; postSlug?: string; orderId?: string }) => void;
  selectedCategory: FabricCategory | null;
  selectedProductSlug: string | null;
  selectedBlogPostSlug: string | null;
  activeTrackingOrderId: string | null;
  
  // Search & Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductBySlug: (slug: string) => Product | undefined;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'Custom', color: string, quantity?: number, customNotes?: CartItem['customisationNotes']) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  cartSubtotal: number;
  cartGst: number;
  cartDiscount: number;
  cartShipping: number;
  cartTotal: number;
  cartCount: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status'], trackingNum?: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
  lastCreatedOrder: Order | null;

  // Customisation Enquiries (CRM)
  enquiries: CustomisationEnquiry[];
  submitEnquiry: (enquiry: Omit<CustomisationEnquiry, 'id' | 'createdAt' | 'status'>) => CustomisationEnquiry;
  updateEnquiryStatus: (enquiryId: string, status: CustomisationEnquiry['status'], adminNotes?: string) => void;

  // Testimonials
  testimonials: Testimonial[];
  addTestimonial: (test: Omit<Testimonial, 'id' | 'date' | 'isPublished'>) => void;
  toggleTestimonialPublished: (id: string) => void;

  // Coupons
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (code: string) => void;

  // Auth (Customer)
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void;
  loginUser: (emailOrPhone: string, method: 'email' | 'phone' | 'google' | 'apple', fullName?: string) => void;
  logoutUser: () => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;

  // Admin Auth & Audit
  isAdminLoggedIn: boolean;
  isAdmin2FAVerified: boolean;
  loginAdmin: (password: string) => boolean;
  verifyAdmin2FA: (totpCode: string) => boolean;
  logoutAdmin: () => void;
  auditLogs: AdminAuditLog[];
  logAuditAction: (action: string, entityType: AdminAuditLog['entityType'], entityId: string, details: string) => void;

  // Modals & UI
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  sizeGuideOpen: boolean;
  setSizeGuideOpen: (open: boolean) => void;
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  
  // WhatsApp Link Generator Helper
  generateWhatsAppLink: (context?: { product?: Product; customNotes?: string; enquiryType?: string }) => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedCategory, setSelectedCategory] = useState<FabricCategory | null>(null);
  const [selectedProductSlug, setSelectedProductSlug] = useState<string | null>(null);
  const [selectedBlogPostSlug, setSelectedBlogPostSlug] = useState<string | null>(null);
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('pe_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Cart & Wishlist
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('pe_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('pe_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('pe_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });
  const [lastCreatedOrder, setLastCreatedOrder] = useState<Order | null>(null);

  // Enquiries (CRM)
  const [enquiries, setEnquiries] = useState<CustomisationEnquiry[]>(() => {
    const saved = localStorage.getItem('pe_enquiries');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMISATION_ENQUIRIES;
  });

  // Testimonials
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('pe_testimonials');
    return saved ? JSON.parse(saved) : TESTIMONIALS;
  });

  // Coupons
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('pe_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  // Customer Auth
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('pe_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Admin Auth
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem('pe_admin_auth') === 'true';
  });
  const [isAdmin2FAVerified, setIsAdmin2FAVerified] = useState(() => {
    return sessionStorage.getItem('pe_admin_2fa') === 'true';
  });

  // Audit Logs
  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>(() => {
    const saved = localStorage.getItem('pe_audit_logs');
    return saved ? JSON.parse(saved) : [
      {
        id: 'aud-1',
        timestamp: new Date().toISOString(),
        adminName: 'Owner (Bangalore Atelier)',
        action: 'System Initialization',
        entityType: 'Settings',
        entityId: 'SYSTEM',
        details: 'Admin panel initialized with RLS and 2FA policy enforcement.'
      }
    ];
  });

  // UI Modals
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('pe_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('pe_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('pe_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('pe_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('pe_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem('pe_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('pe_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('pe_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('pe_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('pe_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Toast Helper
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Router navigation helper
  const navigateTo = (
    view: ViewType,
    params?: { category?: FabricCategory; productSlug?: string; postSlug?: string; orderId?: string }
  ) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
    if (params?.category) setSelectedCategory(params.category);
    if (params?.productSlug) setSelectedProductSlug(params.productSlug);
    if (params?.postSlug) setSelectedBlogPostSlug(params.postSlug);
    if (params?.orderId) setActiveTrackingOrderId(params.orderId);
  };

  // WhatsApp Link Generator
  const generateWhatsAppLink = (context?: { product?: Product; customNotes?: string; enquiryType?: string }) => {
    const base = `https://wa.me/${BRAND_DETAILS.whatsappNumber}`;
    let message = `Hello Pearlessence, I am reaching out from your website.`;

    if (context?.product) {
      message = `Hello Pearlessence Concierge,\n\nI would like to inquire about/customise the following piece:\n*Product:* ${context.product.name} (₹${context.product.price.toLocaleString('en-IN')})\n*Fabric:* ${context.product.fabricName}\n*Reference:* ${window.location.origin}/shop/product/${context.product.slug}`;
      if (context.customNotes) {
        message += `\n*My Customisation Notes:* ${context.customNotes}`;
      }
    } else if (context?.enquiryType === 'bespoke') {
      message = `Hello Pearlessence Concierge,\n\nI would like to arrange a bespoke abaya consultation with the Bangalore atelier. Please guide me through fabric selection and measurement scheduling.`;
    } else if (context?.enquiryType === 'size-help') {
      message = `Hello Pearlessence Concierge,\n\nI need assistance selecting the right size and custom abaya length for my height. Could you please assist me?`;
    }

    return `${base}?text=${encodeURIComponent(message)}`;
  };

  // Product CRUD
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const id = `prod-${Date.now()}`;
    const productWithId: Product = { ...newProd, id };
    setProducts(prev => [productWithId, ...prev]);
    logAuditAction('Created Product', 'Product', id, `Added ${newProd.name} under ${newProd.fabricCategory}`);
    showToast(`Product "${newProd.name}" added to catalog.`);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
    logAuditAction('Updated Product', 'Product', id, `Updated fields on ${updates.name || id}`);
    showToast('Product updated successfully.');
  };

  const deleteProduct = (id: string) => {
    const target = products.find(p => p.id === id);
    setProducts(prev => prev.filter(p => p.id !== id));
    logAuditAction('Deleted Product', 'Product', id, `Removed product ${target?.name || id}`);
    showToast('Product removed from catalog.');
  };

  const getProductBySlug = (slug: string) => {
    return products.find(p => p.slug === slug);
  };

  // Cart operations
  const addToCart = (
    product: Product,
    size: 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'Custom',
    color: string,
    quantity: number = 1,
    customNotes?: CartItem['customisationNotes']
  ) => {
    const existingIndex = cart.findIndex(
      item => item.productId === product.id && item.size === size && item.color === color
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      if (customNotes) {
        updated[existingIndex].customisationNotes = {
          ...updated[existingIndex].customisationNotes,
          ...customNotes
        };
      }
      setCart(updated);
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        productId: product.id,
        product,
        size,
        color,
        quantity,
        customisationNotes: customNotes
      };
      setCart(prev => [...prev, newItem]);
    }
    showToast(`"${product.name}" added to your shopping bag.`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    showToast('Item removed from cart.');
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => (item.id === cartItemId ? { ...item, quantity } : item)));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Cart calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartGst = Math.round(cartSubtotal * 0.05 * 100) / 100; // 5% GST on luxury textiles
  const cartShipping = cartSubtotal > 4999 || cartSubtotal === 0 ? 0 : 250;

  let cartDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      cartDiscount = Math.round((cartSubtotal * appliedCoupon.discountPercentage) / 100);
    } else if (appliedCoupon.fixedAmount) {
      cartDiscount = Math.min(appliedCoupon.fixedAmount, cartSubtotal);
    }
  }

  const cartTotal = Math.max(0, cartSubtotal + cartGst + cartShipping - cartDiscount);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const found = coupons.find(c => c.code.toUpperCase() === trimmed && c.isActive);

    if (!found) {
      showToast('Invalid or expired promotional code.', 'error');
      return { success: false, message: 'Invalid or expired promotional code.' };
    }

    if (found.minOrderValue && cartSubtotal < found.minOrderValue) {
      const msg = `This coupon requires a minimum cart value of ₹${found.minOrderValue.toLocaleString('en-IN')}.`;
      showToast(msg, 'error');
      return {
        success: false,
        message: msg
      };
    }

    setAppliedCoupon(found);
    showToast(`Promotional code "${found.code}" applied successfully!`);
    return { success: true, message: `Promotional code ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed.');
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    if (wishlist.includes(productId)) {
      setWishlist(prev => prev.filter(id => id !== productId));
      showToast('Removed from wishlist.');
    } else {
      setWishlist(prev => [...prev, productId]);
      showToast('Saved to your wishlist.');
    }
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // Orders
  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order => {
    const orderNumber = `PEARL-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);
    setLastCreatedOrder(newOrder);
    clearCart();
    logAuditAction('Placed Order', 'Order', newOrder.id, `Order ${orderNumber} placed for ₹${newOrder.total}`);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status'], trackingNum?: string) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id === orderId || o.orderNumber === orderId) {
          return {
            ...o,
            status,
            ...(trackingNum ? { trackingNumber: trackingNum, courierName: 'Delhivery Luxury Express' } : {})
          };
        }
        return o;
      })
    );
    logAuditAction('Updated Order Status', 'Order', orderId, `Status updated to ${status}`);
    showToast(`Order status updated to "${status}".`);
  };

  const getOrderById = (orderId: string) => orders.find(o => o.id === orderId || o.orderNumber === orderId);

  // Enquiries (CRM)
  const submitEnquiry = (enquiryData: Omit<CustomisationEnquiry, 'id' | 'createdAt' | 'status'>): CustomisationEnquiry => {
    const newEnquiry: CustomisationEnquiry = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'New'
    };

    setEnquiries(prev => [newEnquiry, ...prev]);
    logAuditAction(
      'New Customisation Lead',
      'CustomisationEnquiry',
      newEnquiry.id,
      `Lead from ${newEnquiry.name} (${newEnquiry.phone}) for ${newEnquiry.preferredFabric}`
    );
    showToast('Customisation enquiry logged. Opening WhatsApp...');
    return newEnquiry;
  };

  const updateEnquiryStatus = (enquiryId: string, status: CustomisationEnquiry['status'], adminNotes?: string) => {
    setEnquiries(prev =>
      prev.map(e => (e.id === enquiryId ? { ...e, status, ...(adminNotes ? { adminNotes } : {}) } : e))
    );
    logAuditAction('Updated Enquiry Status', 'CustomisationEnquiry', enquiryId, `Status changed to ${status}`);
    showToast(`Enquiry marked as "${status}".`);
  };

  // Testimonials
  const addTestimonial = (testData: Omit<Testimonial, 'id' | 'date' | 'isPublished'>) => {
    const newTestimonial: Testimonial = {
      ...testData,
      id: `test-${Date.now()}`,
      date: 'Just now',
      isPublished: true
    };
    setTestimonials(prev => [newTestimonial, ...prev]);
    logAuditAction('Added Testimonial', 'Testimonial', newTestimonial.id, `Submitted by ${newTestimonial.customerName}`);
    showToast('Thank you! Your review has been submitted successfully.');
  };

  const toggleTestimonialPublished = (id: string) => {
    setTestimonials(prev =>
      prev.map(t => (t.id === id ? { ...t, isPublished: !t.isPublished } : t))
    );
    showToast('Testimonial visibility toggled.');
  };

  // Coupons
  const addCoupon = (coupon: Coupon) => {
    setCoupons(prev => [coupon, ...prev.filter(c => c.code !== coupon.code)]);
    logAuditAction('Created Coupon', 'Coupon', coupon.code, `Discount ${coupon.discountPercentage}%`);
    showToast(`Coupon ${coupon.code} created.`);
  };

  const deleteCoupon = (code: string) => {
    setCoupons(prev => prev.filter(c => c.code !== code));
    logAuditAction('Deleted Coupon', 'Coupon', code, 'Coupon removed');
    showToast(`Coupon ${code} removed.`);
  };

  // Customer Auth
  const loginUser = (
    emailOrPhone: string,
    method: 'email' | 'phone' | 'google' | 'apple',
    fullName: string = 'Ayesha Rahman'
  ) => {
    const user: UserProfile = {
      id: `usr-${Date.now()}`,
      email: emailOrPhone.includes('@') ? emailOrPhone : `${emailOrPhone.replace(/\s+/g, '')}@phone.pearlessence.co`,
      phone: emailOrPhone.startsWith('+') || !isNaN(Number(emailOrPhone.replace(/\s+/g, ''))) ? emailOrPhone : '+91 98450 12345',
      fullName,
      name: fullName,
      role: 'customer',
      savedAddresses: [
        {
          id: 'addr-default',
          fullName,
          phone: '+91 98450 12345',
          line1: '12th Main Road, HAL 2nd Stage, Indiranagar',
          city: 'Bangalore',
          state: 'Karnataka',
          pincode: '560038',
          isDefault: true
        }
      ],
      wishlistProductIds: wishlist,
      createdAt: new Date().toISOString()
    };
    setCurrentUser(user);
    setAuthModalOpen(false);
    showToast(`Welcome back, ${fullName}!`);
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('pe_user');
    showToast('Signed out of Pearlessence Client Portal.');
  };

  // Admin Auth (Owner password + 2FA TOTP simulation)
  const loginAdmin = (password: string) => {
    if (password === 'pearlessence2026' || password === 'admin' || password === 'bangalore') {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem('pe_admin_auth', 'true');
      logAuditAction('Admin Login Initialized', 'Settings', 'ADMIN_AUTH', 'Password authenticated; awaiting 2FA TOTP');
      return true;
    }
    showToast('Invalid admin security credentials.', 'error');
    return false;
  };

  const verifyAdmin2FA = (totpCode: string) => {
    // Accepts any 6-digit code or demo 123456 / 786786
    if (totpCode.length === 6) {
      setIsAdmin2FAVerified(true);
      sessionStorage.setItem('pe_admin_2fa', 'true');
      logAuditAction('Admin 2FA Passed', 'Settings', 'ADMIN_AUTH', 'Full RLS Admin role access granted');
      showToast('Admin authenticated with 2FA TOTP.');
      return true;
    }
    showToast('Invalid 6-digit TOTP authentication token.', 'error');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setIsAdmin2FAVerified(false);
    sessionStorage.removeItem('pe_admin_auth');
    sessionStorage.removeItem('pe_admin_2fa');
    showToast('Admin session terminated safely.');
    navigateTo('home');
  };

  const logAuditAction = (
    action: string,
    entityType: AdminAuditLog['entityType'],
    entityId: string,
    details: string
  ) => {
    const newLog: AdminAuditLog = {
      id: `aud-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      timestamp: new Date().toISOString(),
      adminName: 'Pearlessence Owner (Bangalore Atelier)',
      action,
      entityType,
      entityId,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  return (
    <StoreContext.Provider
      value={{
        currentView,
        navigateTo,
        selectedCategory,
        selectedProductSlug,
        selectedBlogPostSlug,
        activeTrackingOrderId,
        searchQuery,
        setSearchQuery,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductBySlug,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        cartSubtotal,
        cartGst,
        cartDiscount,
        cartShipping,
        cartTotal,
        cartCount,
        wishlist,
        toggleWishlist,
        isWishlisted,
        orders,
        createOrder,
        updateOrderStatus,
        getOrderById,
        lastCreatedOrder,
        enquiries,
        submitEnquiry,
        updateEnquiryStatus,
        testimonials,
        addTestimonial,
        toggleTestimonialPublished,
        coupons,
        addCoupon,
        deleteCoupon,
        currentUser,
        setCurrentUser,
        loginUser,
        logoutUser,
        authModalOpen,
        setAuthModalOpen,
        isAdminLoggedIn,
        isAdmin2FAVerified,
        loginAdmin,
        verifyAdmin2FA,
        logoutAdmin,
        auditLogs,
        logAuditAction,
        quickViewProduct,
        setQuickViewProduct,
        sizeGuideOpen,
        setSizeGuideOpen,
        toast,
        showToast,
        generateWhatsAppLink
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
