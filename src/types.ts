export type FabricCategory = 'linen' | 'armani' | 'satin' | 'formal' | 'qatar';

export interface CategoryInfo {
  id: FabricCategory;
  name: string;
  tagline: string;
  description: string;
  bestFor: string;
  heroImage: string;
  accentColor: string;
}

export interface CustomisationOptions {
  allowLengthAdjustment: boolean;
  allowSleeveAdjustment: boolean;
  sleeveStyles: string[];
  embroideryOptions: string[];
  fabricSwapsAvailable: boolean;
  notesPrompt?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  fabricCategory: FabricCategory;
  fabricName: string;
  price: number; // INR
  originalPrice?: number;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  inStock: boolean;
  stockCount: number;
  leadTimeDays: number;
  shortDescription: string;
  fullDescription: string;
  fabricComposition: string;
  drapeAndFit: string;
  occasion: string[];
  careInstructions: string[];
  images: string[];
  availableSizes: ('S' | 'M' | 'L' | 'XL' | 'XXL' | 'Custom')[];
  colors: { name: string; hex: string }[];
  customisation: CustomisationOptions;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  id: string; // unique item id in cart
  productId: string;
  product: Product;
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'Custom';
  color: string;
  quantity: number;
  customisationNotes?: {
    customLength?: string;
    customSleeveLength?: string;
    sleeveStyle?: string;
    embroideryNotes?: string;
    heightInInches?: string;
    specialRequests?: string;
  };
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export type OrderStatus = 'Confirmed' | 'In Production' | 'Ready' | 'Shipped' | 'Delivered' | 'Cancelled';
export type PaymentStatus = 'Paid' | 'Pending' | 'COD - Due on Delivery' | 'Refunded';
export type PaymentMethod = 'Razorpay (UPI / Card / NetBanking)' | 'Cash on Delivery (COD)';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: CartItem[];
  subtotal: number;
  gstAmount: number; // 5% or 12% GST
  shippingFee: number;
  discountAmount: number;
  couponCode?: string;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  shippingAddress: Address;
  estimatedDeliveryDate: string;
  trackingNumber?: string;
  courierName?: string;
  giftWrapping?: boolean;
  giftNote?: string;
  policyAcknowledged: boolean;
}

export type CustomisationEnquiryStatus = 'New' | 'Contacted' | 'Confirmed' | 'Converted' | 'Lost';

export interface CustomisationEnquiry {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email?: string;
  productReference?: string;
  preferredFabric: FabricCategory | 'Other / Undecided';
  sourcePage: string;
  notes: string;
  status: CustomisationEnquiryStatus;
  budgetEstimate?: string;
  referenceImageUrl?: string;
  adminNotes?: string;
}

export interface Testimonial {
  id: string;
  customerName: string;
  city: string;
  rating: number;
  productName: string;
  fabricCategory: FabricCategory;
  comment: string;
  source: 'WhatsApp' | 'Instagram' | 'Verified Buyer';
  date: string;
  avatarUrl?: string;
  screenshotUrl?: string;
  isPublished: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  readTime: string;
  author: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface Coupon {
  code: string;
  discountPercentage: number;
  discountType: 'percentage' | 'fixed';
  fixedAmount?: number;
  minOrderValue?: number;
  validUntil: string;
  isActive: boolean;
  description: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  name?: string;
  phone: string;
  role: 'customer' | 'admin';
  savedAddresses: Address[];
  wishlistProductIds: string[];
  createdAt: string;
}

export interface AdminAuditLog {
  id: string;
  timestamp: string;
  adminName: string;
  action: string;
  entityType: 'Order' | 'Product' | 'CustomisationEnquiry' | 'Coupon' | 'Testimonial' | 'Settings';
  entityId: string;
  details: string;
}
