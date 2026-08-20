import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Key,
  Package,
  Scissors,
  Users,
  Tag,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MessageCircle,
  Plus,
  Trash2,
  Edit,
  Eye,
  LogOut,
  Sparkles,
  Search,
  Filter,
  FileText
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice, formatDate } from '../utils/formatters';
import { BRAND_DETAILS, CATEGORIES } from '../data/mockData';
import { PearlessenceLogo } from '../components/brand/Logo';
import { Order, Product, CustomisationEnquiry, FabricCategory } from '../types';

export const AdminView: React.FC = () => {
  const {
    isAdminLoggedIn,
    isAdmin2FAVerified,
    loginAdmin,
    verifyAdmin2FA,
    logoutAdmin,
    orders,
    updateOrderStatus,
    enquiries,
    updateEnquiryStatus,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    coupons,
    addCoupon,
    deleteCoupon,
    testimonials,
    toggleTestimonialPublished,
    auditLogs,
    showToast
  } = useStore();

  const [password, setPassword] = useState('');
  const [totpCode, setTotpCode] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'crm' | 'products' | 'coupons' | 'reviews' | 'logs'>('overview');

  // Product modal state
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState<FabricCategory>('linen');
  const [newProductPrice, setNewProductPrice] = useState('8500');
  const [newProductDesc, setNewProductDesc] = useState('');
  const [newProductImage, setNewProductImage] = useState('https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop');

  // Coupon state
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('10');

  // Filter states
  const [orderSearch, setOrderSearch] = useState('');
  const [enquiryFilter, setEnquiryFilter] = useState<'all' | 'new' | 'contacted' | 'converted'>('all');

  // 1. Password Login screen
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-[80vh] bg-[#FAF8F4] flex items-center justify-center p-4">
        <div className="bg-[#111010] text-[#FAF8F4] w-full max-w-md p-8 sm:p-10 rounded-3xl border border-[#B49B73]/40 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-3">
              <PearlessenceLogo variant="badge" size="lg" theme="dark" />
            </div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#B49B73] font-semibold block">
              Confidential Access
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#F5F1E8]">
              Atelier Admin Portal
            </h2>
            <p className="text-xs text-[#D8C9AE] font-light">
              Bangalore Atelier Management &amp; Bespoke Order Dispatch
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginAdmin(password);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#D8C9AE] mb-1.5 font-medium">
                Admin Master Passcode
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter master password..."
                className="w-full px-4 py-3 bg-[#181615] border border-[#3A3733] rounded-xl text-sm text-[#FAF8F4] placeholder-[#8C7F72] focus:outline-hidden focus:border-[#B49B73]"
                autoFocus
              />
              <p className="text-[10px] text-[#8C7F72] mt-1.5">
                Default Atelier Passcode: <span className="text-[#D8C9AE] font-mono">pearlessence2026</span> or <span className="text-[#D8C9AE] font-mono">admin</span>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#B49B73] text-[#111010] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#FAF8F4] transition-all shadow-md active:scale-98"
            >
              Verify Security Credential
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. 2FA TOTP Verification screen
  if (!isAdmin2FAVerified) {
    return (
      <div className="min-h-[80vh] bg-[#FAF8F4] flex items-center justify-center p-4">
        <div className="bg-[#111010] text-[#FAF8F4] w-full max-w-md p-8 sm:p-10 rounded-3xl border border-[#B49B73]/40 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-[#8A9A83]/20 border border-[#8A9A83] flex items-center justify-center mx-auto text-[#8A9A83]">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#B49B73] font-semibold block">
              Step 2 of 2: Multi-Factor
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#F5F1E8]">
              Two-Factor Authenticator
            </h2>
            <p className="text-xs text-[#D8C9AE] font-light">
              Enter your 6-digit Atelier Authenticator token
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              verifyAdmin2FA(totpCode || '123456');
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#D8C9AE] mb-1.5 font-medium text-center">
                6-Digit TOTP Token
              </label>
              <input
                type="text"
                maxLength={6}
                value={totpCode}
                onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ''))}
                placeholder="123456"
                className="w-full text-center tracking-[0.4em] font-mono text-2xl py-3 bg-[#181615] border border-[#3A3733] rounded-xl text-[#FAF8F4] placeholder-[#8C7F72] focus:outline-hidden focus:border-[#B49B73]"
                autoFocus
              />
              <p className="text-[10px] text-center text-[#8C7F72] mt-1.5">
                (Demo mode: enter any 6 digits such as <span className="text-[#D8C9AE]">123456</span>)
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#B49B73] text-[#111010] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#FAF8F4] transition-all shadow-md active:scale-98"
            >
              Grant Full Atelier Access
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Calculate high-level stats
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const activeOrders = orders.filter((o) => o.status !== 'Delivered');
  const newEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;

  return (
    <div className="bg-[#FAF8F4] min-h-screen pb-24">
      {/* Top Admin Header Bar */}
      <div className="bg-[#111010] text-[#FAF8F4] border-b border-[#3A3733] px-4 sm:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <PearlessenceLogo variant="badge" size="sm" theme="dark" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-editorial text-lg text-[#F5F1E8] font-bold">
                  Pearlessence Atelier Portal
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#8A9A83]/20 border border-[#8A9A83] text-[#8A9A83] text-[9px] uppercase font-bold tracking-widest">
                  Live Sync
                </span>
              </div>
              <p className="text-[11px] text-[#8C7F72]">
                Bangalore Headquarters • 15-Day Made-To-Order Fulfillment
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={logoutAdmin}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#181615] border border-[#3A3733] text-xs text-[#D8C9AE] hover:text-[#FAF8F4] hover:border-[#B49B73] transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock Admin Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="bg-[#181615] border-b border-[#3A3733] px-4 sm:px-8 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-4 overflow-x-auto py-2.5">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'orders', label: `Orders (${orders.length})`, icon: Package },
            { id: 'crm', label: `WhatsApp CRM (${enquiries.length})`, icon: Scissors, badge: newEnquiriesCount > 0 ? newEnquiriesCount : null },
            { id: 'products', label: `Products (${products.length})`, icon: Sparkles },
            { id: 'coupons', label: `Coupons (${coupons.length})`, icon: Tag },
            { id: 'reviews', label: `Testimonials (${testimonials.length})`, icon: Users },
            { id: 'logs', label: 'Security Logs', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-[#B49B73] text-[#111010]'
                    : 'text-[#D8C9AE] hover:bg-[#3A3733] hover:text-[#FAF8F4]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="ml-1 px-1.5 py-0.2 bg-[#B5654F] text-white text-[9px] font-bold rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-6 rounded-2xl border border-[#D8C9AE] shadow-xs">
                <div className="flex items-center justify-between text-[#8C7F72] mb-3">
                  <span className="text-[11px] uppercase tracking-wider font-semibold">Total Revenue</span>
                  <DollarSign className="w-5 h-5 text-[#B49B73]" />
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#111010]">
                  {formatPrice(totalRevenue)}
                </div>
                <p className="text-[11px] text-[#8A9A83] mt-2 font-medium">
                  +18.4% this festive season
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#D8C9AE] shadow-xs">
                <div className="flex items-center justify-between text-[#8C7F72] mb-3">
                  <span className="text-[11px] uppercase tracking-wider font-semibold">Active Tailoring Orders</span>
                  <Package className="w-5 h-5 text-[#B49B73]" />
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#111010]">
                  {activeOrders.length}
                </div>
                <p className="text-[11px] text-[#8C7F72] mt-2">
                  15-day atelier delivery pipeline
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#D8C9AE] shadow-xs">
                <div className="flex items-center justify-between text-[#8C7F72] mb-3">
                  <span className="text-[11px] uppercase tracking-wider font-semibold">Customise Leads (CRM)</span>
                  <Scissors className="w-5 h-5 text-[#B49B73]" />
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#111010]">
                  {enquiries.length}
                </div>
                <p className="text-[11px] text-[#B49B73] mt-2 font-medium">
                  {newEnquiriesCount} pending WhatsApp replies
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#D8C9AE] shadow-xs">
                <div className="flex items-center justify-between text-[#8C7F72] mb-3">
                  <span className="text-[11px] uppercase tracking-wider font-semibold">Catalog Abayas</span>
                  <Sparkles className="w-5 h-5 text-[#B49B73]" />
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#111010]">
                  {products.length}
                </div>
                <p className="text-[11px] text-[#8C7F72] mt-2">
                  Across 5 luxury fabric tiers
                </p>
              </div>
            </div>

            {/* Quick Actions & Recent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Orders (2 cols) */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-[#D8C9AE] p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-editorial text-lg font-bold text-[#111010]">
                    Recent Atelier Orders
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs uppercase tracking-wider text-[#B49B73] font-bold hover:underline"
                  >
                    View All Orders &rarr;
                  </button>
                </div>

                <div className="divide-y divide-[#E8DFCF]">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="py-3.5 flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#111010]">
                            {order.orderNumber}
                          </span>
                          <span className="text-xs text-[#8C7F72]">•</span>
                          <span className="text-xs font-medium text-[#111010]">
                            {order.customerName}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#8C7F72]">
                          {order.items.length} item(s) • {formatPrice(order.total)} • {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div>
                        <span
                          className={`px-2.5 py-1 text-[10px] uppercase font-bold rounded-md ${
                            order.status === 'Delivered'
                              ? 'bg-[#8A9A83]/20 text-[#8A9A83]'
                              : 'bg-[#B49B73]/20 text-[#111010]'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bespoke Leads Summary (1 col) */}
              <div className="bg-white rounded-2xl border border-[#D8C9AE] p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-editorial text-lg font-bold text-[#111010]">
                    Bespoke CRM Leads
                  </h3>
                  <button
                    onClick={() => setActiveTab('crm')}
                    className="text-xs uppercase tracking-wider text-[#B49B73] font-bold hover:underline"
                  >
                    Open CRM &rarr;
                  </button>
                </div>

                <div className="space-y-3">
                  {enquiries.slice(0, 4).map((enq) => (
                    <div key={enq.id} className="p-3 bg-[#FAF8F4] rounded-xl border border-[#E8DFCF] text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#111010]">{enq.fullName}</span>
                        <span className="text-[10px] text-[#8C7F72]">{enq.fabricCategory}</span>
                      </div>
                      <p className="text-[11px] text-[#8C7F72] truncate">
                        {enq.notes || 'No specific notes provided'}
                      </p>
                      <a
                        href={`https://wa.me/${enq.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${enq.fullName}, this is Pearlessence Atelier Bangalore regarding your bespoke ${enq.fabricCategory} abaya enquiry.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] text-[#8A9A83] font-bold uppercase mt-1 hover:underline"
                      >
                        <MessageCircle className="w-3 h-3" /> Reply on WhatsApp
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl border border-[#D8C9AE] p-6 shadow-xs space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-editorial text-xl font-bold text-[#111010]">
                  Client Order Fulfillment
                </h3>
                <p className="text-xs text-[#8C7F72]">
                  Track and update bespoke tailoring status across production steps
                </p>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-[#8C7F72] absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search by order # or customer..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF8F4] border border-[#D8C9AE] rounded-xl focus:outline-hidden"
                />
              </div>
            </div>

            <div className="divide-y divide-[#E8DFCF] overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead>
                  <tr className="border-b border-[#D8C9AE] text-[#8C7F72] uppercase tracking-wider text-[10px]">
                    <th className="pb-3 font-semibold">Order #</th>
                    <th className="pb-3 font-semibold">Customer &amp; Contact</th>
                    <th className="pb-3 font-semibold">Items &amp; Details</th>
                    <th className="pb-3 font-semibold">Total</th>
                    <th className="pb-3 font-semibold">Fulfillment Status</th>
                    <th className="pb-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DFCF]">
                  {orders
                    .filter(
                      (o) =>
                        o.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
                        o.customerName.toLowerCase().includes(orderSearch.toLowerCase())
                    )
                    .map((order) => (
                      <tr key={order.id} className="py-4">
                        <td className="py-4 font-mono font-bold text-[#111010]">
                          {order.orderNumber}
                          <div className="text-[10px] text-[#8C7F72] font-normal">
                            {formatDate(order.createdAt)}
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="font-semibold text-[#111010]">{order.customerName}</div>
                          <div className="text-[11px] text-[#8C7F72]">{order.customerPhone}</div>
                          <div className="text-[10px] text-[#8C7F72] truncate max-w-[150px]">
                            {order.shippingAddress.city}, {order.shippingAddress.pincode}
                          </div>
                        </td>
                        <td className="py-4">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="text-[11px] text-[#111010]">
                              {item.quantity}x {item.product.name} ({item.size})
                            </div>
                          ))}
                        </td>
                        <td className="py-4 font-semibold text-[#111010]">
                          {formatPrice(order.total)}
                          <div className="text-[10px] text-[#8A9A83]">{order.paymentStatus}</div>
                        </td>
                        <td className="py-4">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                            className="px-2.5 py-1.5 bg-[#FAF8F4] border border-[#D8C9AE] rounded-lg text-xs font-semibold focus:outline-hidden text-[#111010]"
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="In Production">In Production</option>
                            <option value="Quality Check">Quality Check</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="py-4">
                          <a
                            href={`https://wa.me/${order.customerPhone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${order.customerName}, this is Pearlessence Atelier regarding your order ${order.orderNumber}. Status: ${order.status}.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#111010] text-[#FAF8F4] rounded-md text-[10px] uppercase font-bold hover:bg-[#3A3733] transition-colors"
                          >
                            <MessageCircle className="w-3 h-3 text-[#B49B73]" />
                            <span>WhatsApp</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: BESPOKE CRM */}
        {activeTab === 'crm' && (
          <div className="bg-white rounded-2xl border border-[#D8C9AE] p-6 shadow-xs space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-editorial text-xl font-bold text-[#111010]">
                  Bespoke WhatsApp Customisation CRM
                </h3>
                <p className="text-xs text-[#8C7F72]">
                  Client requests submitted for bespoke sizing, custom sleeves, and fabric choices
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {enquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="p-5 bg-[#FAF8F4] rounded-2xl border border-[#D8C9AE] space-y-3 relative"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-[#111010]">{enq.fullName}</h4>
                      <p className="text-xs text-[#8C7F72]">{enq.phone} • {enq.email || 'No email'}</p>
                    </div>
                    <select
                      value={enq.status}
                      onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as any)}
                      className="px-2 py-1 bg-white border border-[#D8C9AE] rounded-md text-[10px] font-bold uppercase"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Converted">Converted</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-[#E8DFCF] text-xs space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#8C7F72]">Fabric Preference:</span>
                      <span className="font-bold uppercase text-[#111010]">{enq.fabricCategory}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#8C7F72]">Custom Length:</span>
                      <span className="font-semibold text-[#111010]">{enq.length || 'Standard'}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#8C7F72]">Bust / Chest:</span>
                      <span className="font-semibold text-[#111010]">{enq.bust || 'Standard'}</span>
                    </div>
                    {enq.notes && (
                      <div className="pt-2 text-[11px] text-[#3A3733] border-t border-[#E8DFCF]">
                        <span className="text-[#8C7F72] block">Client Notes:</span>
                        {enq.notes}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[10px] text-[#8C7F72]">
                      Received: {formatDate(enq.createdAt)}
                    </span>
                    <a
                      href={`https://wa.me/${enq.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Assalamu Alaikum / Hello ${enq.fullName}, this is the Pearlessence Atelier team in Bangalore. We received your bespoke customisation enquiry for our ${enq.fabricCategory} collection.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#111010] text-[#FAF8F4] rounded-lg text-xs font-semibold hover:bg-[#3A3733] transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#8A9A83]" />
                      <span>Start WhatsApp Consult</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PRODUCTS CATALOG */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-2xl border border-[#D8C9AE] p-6 shadow-xs space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-editorial text-xl font-bold text-[#111010]">
                  Atelier Abaya Catalog
                </h3>
                <p className="text-xs text-[#8C7F72]">
                  Manage pieces, fabrics, pricing, and bestseller spotlights
                </p>
              </div>
              <button
                onClick={() => setShowAddProduct(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#111010] text-[#FAF8F4] text-xs uppercase tracking-wider font-bold rounded-xl hover:bg-[#3A3733] transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-[#B49B73]" />
                <span>Add New Design</span>
              </button>
            </div>

            {/* Add product modal */}
            {showAddProduct && (
              <div className="p-5 bg-[#FAF8F4] rounded-2xl border border-[#D8C9AE] space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-sm text-[#111010]">Add Atelier Piece</h4>
                  <button
                    onClick={() => setShowAddProduct(false)}
                    className="text-xs text-[#8C7F72] hover:text-[#111010]"
                  >
                    Cancel
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Product Name (e.g. The Midnight Crepe Abaya)"
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    className="px-3 py-2 text-xs bg-white border border-[#D8C9AE] rounded-lg"
                  />
                  <select
                    value={newProductCategory}
                    onChange={(e) => setNewProductCategory(e.target.value as any)}
                    className="px-3 py-2 text-xs bg-white border border-[#D8C9AE] rounded-lg"
                  >
                    <option value="linen">Linen Tier</option>
                    <option value="armani-silk">Armani Matte Silk</option>
                    <option value="silk-crepe">Luxury Satin / Crepe</option>
                    <option value="formal">Formal Embellished</option>
                    <option value="qatar-nida">Qatar Premium Nida</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Price in INR (e.g. 8500)"
                    value={newProductPrice}
                    onChange={(e) => setNewProductPrice(e.target.value)}
                    className="px-3 py-2 text-xs bg-white border border-[#D8C9AE] rounded-lg"
                  />
                </div>
                <button
                  onClick={() => {
                    if (!newProductName) return;
                    const slug = newProductName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    addProduct({
                      slug,
                      name: newProductName,
                      category: newProductCategory,
                      fabricTier: 'Signature Luxe',
                      price: parseInt(newProductPrice) || 8500,
                      rating: 5.0,
                      reviewCount: 1,
                      description: 'Handcrafted exclusively on order in our Bangalore atelier from premier fabrics.',
                      fabricStory: 'Curated for opacity, gentle drape, and modest comfort.',
                      careInstructions: ['Dry clean recommended', 'Steam iron inside out'],
                      images: [newProductImage],
                      availableSizes: ['S', 'M', 'L', 'XL', 'XXL', 'Custom'],
                      colors: [{ name: 'Noir Black', hex: '#111010' }],
                      inStock: true,
                      isBestseller: true,
                      isNew: true,
                      badge: 'New Atelier Drop',
                      leadTimeDays: 15
                    });
                    setShowAddProduct(false);
                    setNewProductName('');
                    showToast('New abaya added to catalog successfully!');
                  }}
                  className="px-4 py-2 bg-[#B49B73] text-[#111010] text-xs font-bold uppercase rounded-lg"
                >
                  Save Product to Catalog
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-[#FAF8F4] p-4 rounded-xl border border-[#D8C9AE] flex gap-3 items-center justify-between"
                >
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-16 h-20 object-cover rounded-lg border border-[#D8C9AE]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] uppercase font-bold text-[#B49B73]">
                        {prod.category}
                      </span>
                      {prod.isBestseller && (
                        <span className="text-[9px] bg-[#111010] text-[#FAF8F4] px-1.5 py-0.2 rounded-xs">
                          Bestseller
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-xs text-[#111010] truncate">{prod.name}</h4>
                    <p className="text-xs font-semibold text-[#111010] mt-0.5">{formatPrice(prod.price)}</p>
                    <p className="text-[10px] text-[#8C7F72]">15-day made-to-order</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => updateProduct(prod.id, { isBestseller: !prod.isBestseller })}
                      title="Toggle Bestseller"
                      className="p-1.5 bg-white rounded-md border border-[#D8C9AE] text-xs hover:bg-[#E8DFCF]"
                    >
                      ★
                    </button>
                    <button
                      onClick={() => deleteProduct(prod.id)}
                      title="Delete Product"
                      className="p-1.5 bg-white rounded-md border border-[#D8C9AE] text-[#B5654F] text-xs hover:bg-[#E8DFCF]"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: COUPONS */}
        {activeTab === 'coupons' && (
          <div className="bg-white rounded-2xl border border-[#D8C9AE] p-6 shadow-xs space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-editorial text-xl font-bold text-[#111010]">
                  Promo &amp; Atelier Discount Codes
                </h3>
                <p className="text-xs text-[#8C7F72]">
                  Create special coupon offers for festive events and private clients
                </p>
              </div>
            </div>

            <div className="flex gap-2 max-w-md">
              <input
                type="text"
                placeholder="Coupon Code (e.g. FESTIVE15)"
                value={newCouponCode}
                onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                className="flex-1 px-3 py-2 text-xs uppercase bg-[#FAF8F4] border border-[#D8C9AE] rounded-lg font-mono font-bold"
              />
              <input
                type="number"
                placeholder="% Discount (e.g. 15)"
                value={newCouponDiscount}
                onChange={(e) => setNewCouponDiscount(e.target.value)}
                className="w-24 px-3 py-2 text-xs bg-[#FAF8F4] border border-[#D8C9AE] rounded-lg"
              />
              <button
                onClick={() => {
                  if (!newCouponCode) return;
                  addCoupon({
                    code: newCouponCode,
                    discountPercentage: parseInt(newCouponDiscount) || 10,
                    minOrderValue: 4000,
                    description: `${newCouponDiscount}% VIP client courtesy discount`
                  });
                  setNewCouponCode('');
                  showToast(`Coupon ${newCouponCode} activated!`);
                }}
                className="px-4 py-2 bg-[#111010] text-[#FAF8F4] text-xs uppercase font-bold rounded-lg"
              >
                Add Code
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {coupons.map((c) => (
                <div
                  key={c.code}
                  className="p-4 bg-[#FAF8F4] rounded-xl border border-[#D8C9AE] flex items-center justify-between"
                >
                  <div>
                    <span className="font-mono text-sm font-bold text-[#111010]">{c.code}</span>
                    <p className="text-xs text-[#B49B73] font-semibold">{c.discountPercentage}% OFF</p>
                    <p className="text-[10px] text-[#8C7F72]">Min Order: {formatPrice(c.minOrderValue)}</p>
                  </div>
                  <button
                    onClick={() => deleteCoupon(c.code)}
                    className="p-2 text-[#B5654F] hover:bg-[#E8DFCF] rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: TESTIMONIALS */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-2xl border border-[#D8C9AE] p-6 shadow-xs space-y-6 animate-in fade-in duration-300">
            <h3 className="font-editorial text-xl font-bold text-[#111010]">
              Client Testimonial Moderation
            </h3>
            <div className="divide-y divide-[#E8DFCF]">
              {testimonials.map((t) => (
                <div key={t.id} className="py-4 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-[#111010]">{t.customerName}</span>
                      <span className="text-xs text-[#8C7F72]">({t.city})</span>
                      <span className="text-[10px] bg-[#E8DFCF] text-[#111010] px-2 py-0.2 rounded-full">
                        {t.source}
                      </span>
                    </div>
                    <p className="text-xs text-[#3A3733] italic">"{t.comment}"</p>
                    <p className="text-[10px] text-[#8C7F72]">Fabric: {t.fabricCategory}</p>
                  </div>
                  <button
                    onClick={() => toggleTestimonialPublished(t.id)}
                    className={`px-3 py-1.5 text-xs font-bold uppercase rounded-lg transition-colors ${
                      t.isPublished
                        ? 'bg-[#8A9A83]/20 text-[#8A9A83] border border-[#8A9A83]'
                        : 'bg-[#3A3733] text-white'
                    }`}
                  >
                    {t.isPublished ? 'Published' : 'Hidden'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: SECURITY AUDIT LOGS */}
        {activeTab === 'logs' && (
          <div className="bg-white rounded-2xl border border-[#D8C9AE] p-6 shadow-xs space-y-4 animate-in fade-in duration-300">
            <h3 className="font-editorial text-xl font-bold text-[#111010]">
              Admin Security &amp; Audit Trail
            </h3>
            <div className="divide-y divide-[#E8DFCF] font-mono text-xs">
              {auditLogs.map((log) => (
                <div key={log.id} className="py-3 flex flex-col sm:flex-row justify-between gap-1 text-[11px]">
                  <div>
                    <span className="font-bold text-[#111010]">{log.action}</span>
                    <span className="text-[#8C7F72] ml-2">[{log.entityType} : {log.entityId}]</span>
                    <p className="text-[#3A3733] font-sans-ui mt-0.5">{log.details}</p>
                  </div>
                  <span className="text-[#8C7F72] shrink-0">{formatDate(log.timestamp)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
