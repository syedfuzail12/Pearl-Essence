import React, { useState } from 'react';
import {
  X,
  Mail,
  Phone,
  Lock,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  User,
  Zap,
  Eye,
  EyeOff,
  LogOut
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PearlessenceLogo } from '../brand/Logo';

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    setAuthModalOpen,
    loginUser,
    currentUser,
    logoutUser,
    navigateTo
  } = useStore();
  const [tab, setTab] = useState<'email' | 'phone'>('email');
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);

  if (!authModalOpen) return null;

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      const nameToUse = fullName.trim() || email.split('@')[0].replace(/[._]/g, ' ');
      const formattedName = nameToUse.charAt(0).toUpperCase() + nameToUse.slice(1);
      loginUser(email, 'email', formattedName);
      setLoading(false);
    }, 400);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setOtpCode('786786'); // Pre-fill helpful demo OTP for instantaneous testing
      setLoading(false);
    }, 400);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      loginUser(phone, 'phone', fullName.trim() || 'Pearlessence VIP Client');
      setLoading(false);
      setOtpSent(false);
    }, 400);
  };

  const handleOAuth = (provider: 'google' | 'apple') => {
    setLoading(true);
    setTimeout(() => {
      if (provider === 'google') {
        loginUser('syedfuzail455@gmail.com', 'google', 'Syed Fuzail');
      } else {
        loginUser('client.apple@icloud.com', 'apple', 'Mariam Khan');
      }
      setLoading(false);
    }, 400);
  };

  const handleQuickDemoLogin = (preset: 'fuzail' | 'ayesha') => {
    setLoading(true);
    setTimeout(() => {
      if (preset === 'fuzail') {
        loginUser('syedfuzail455@gmail.com', 'email', 'Syed Fuzail');
      } else {
        loginUser('ayesha.rahman@pearlessence.co', 'email', 'Ayesha Rahman');
      }
      setLoading(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111010]/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF8F4] w-full max-w-md rounded-2xl shadow-2xl border border-[#D8C9AE] overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-[#3A3733] hover:text-[#111010] hover:bg-[#E8DFCF] rounded-full transition-colors z-10 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-[#111010] text-[#FAF8F4] p-6 text-center border-b border-[#B49B73]/30 font-manrope">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-[#FAF8F4] rounded-2xl flex items-center justify-center shadow-inner font-manrope font-black text-2xl text-[#111010]">
              P
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#F5F1E8]">
            {currentUser ? 'Client Dossier' : isSignUp ? 'Create Client Account' : 'Sign In to Pearlessence'}
          </h3>
          <p className="text-[10px] text-[#D8C9AE] tracking-[0.25em] uppercase mt-1 font-bold">
            Bangalore Modest Luxury Atelier
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 max-h-[80vh] overflow-y-auto font-manrope">
          {currentUser ? (
            <div className="space-y-5">
              <div className="p-5 bg-[#E8DFCF]/80 rounded-2xl border border-[#D8C9AE] text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-[#111010] text-[#FAF8F4] flex items-center justify-center mx-auto font-black text-xl shadow-xs">
                  {(currentUser.name || currentUser.fullName || 'C').charAt(0)}
                </div>
                <h4 className="font-manrope text-base font-black uppercase text-[#111010]">
                  {currentUser.name || currentUser.fullName}
                </h4>
                <p className="text-xs text-[#3A3733] font-medium">{currentUser.email}</p>
                <p className="text-xs text-[#8C7F72]">{currentUser.phone}</p>
              </div>

              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalOpen(false);
                    navigateTo('account');
                  }}
                  className="w-full py-3 bg-[#111010] text-[#F5F1E8] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#222] transition-colors cursor-pointer"
                >
                  View Client Dossier (Account)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    logoutUser();
                    setAuthModalOpen(false);
                    navigateTo('home');
                  }}
                  className="w-full py-3 bg-white border border-[#B5654F] text-[#B5654F] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#FAF8F4] flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
                >
                  <LogOut className="w-4 h-4 text-[#B5654F]" />
                  <span>Sign Out of Account</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Quick 1-Click Demo Login Bar */}
              <div className="mb-5 p-3 bg-[#E8DFCF]/70 rounded-xl border border-[#D8C9AE]">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#111010] mb-2">
              <Zap className="w-3.5 h-3.5 text-[#B49B73] fill-[#B49B73]" />
              <span>1-Click Quick Testing</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('fuzail')}
                disabled={loading}
                className="py-2 px-2.5 bg-white border border-[#D8C9AE] hover:border-[#111010] hover:bg-[#FAF8F4] text-[#111010] text-[11px] font-semibold rounded-lg transition-colors text-center cursor-pointer"
              >
                Syed Fuzail
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('ayesha')}
                disabled={loading}
                className="py-2 px-2.5 bg-white border border-[#D8C9AE] hover:border-[#111010] hover:bg-[#FAF8F4] text-[#111010] text-[11px] font-semibold rounded-lg transition-colors text-center cursor-pointer"
              >
                Ayesha (VIP)
              </button>
            </div>
          </div>

          {/* Social OAuth Buttons */}
          <div className="space-y-2.5 mb-5">
            <button
              onClick={() => handleOAuth('google')}
              disabled={loading}
              className="w-full py-2.5 px-4 bg-white border border-[#D8C9AE] hover:bg-[#FAF8F4] text-[#111010] text-xs font-semibold tracking-wider uppercase rounded-xl flex items-center justify-center gap-3 transition-colors shadow-2xs cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.37 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.17 0 9.99 0 12s.46 3.83 1.26 5.42l4.02-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.25 2.63 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              Continue with Google
            </button>

            <button
              onClick={() => handleOAuth('apple')}
              disabled={loading}
              className="w-full py-2.5 px-4 bg-[#111010] text-[#F5F1E8] hover:bg-[#222] text-xs font-semibold tracking-wider uppercase rounded-xl flex items-center justify-center gap-3 transition-colors shadow-2xs cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.08-7.72-7.87-12.06-14.36-6.19-9.14-11.1-19.45-14.74-30.93-3.64-11.48-5.46-22.61-5.46-33.39 0-13.15 3.27-24.32 9.8-33.52 6.53-9.2 14.88-13.9 25.04-14.11 4.58 0 9.77 1.25 15.58 3.75 5.81 2.5 9.78 3.78 11.9 3.84 1.63 0 5.83-1.39 12.6-4.17 6.77-2.78 12.35-3.99 16.73-3.62 12.82.76 22.84 5.46 30.07 14.11-11.3 6.85-16.84 16.32-16.63 28.41.22 9.57 3.81 17.52 10.77 23.86 6.96 6.33 15.34 9.97 25.13 10.92-2.17 6.74-4.89 13.6-8.16 20.58zM119.22 33.04c0-7.39 2.66-14.4 7.99-21.03 5.33-6.63 12.08-10.76 20.24-12.41.22 1.09.33 2.07.33 2.94 0 7.28-2.77 14.4-8.31 21.36-5.54 6.96-12.51 11.09-20.91 12.41-.22-1.09-.34-2.18-.34-3.27z" />
              </svg>
              Sign in with Apple
            </button>
          </div>

          <div className="relative flex py-2 items-center mb-5">
            <div className="grow border-t border-[#D8C9AE]/60"></div>
            <span className="shrink mx-4 text-[10px] uppercase tracking-widest text-[#8C7F72] font-semibold">
              or continue with
            </span>
            <div className="grow border-t border-[#D8C9AE]/60"></div>
          </div>

          {/* Tab Switcher */}
          <div className="flex border-b border-[#D8C9AE] mb-5">
            <button
              type="button"
              onClick={() => { setTab('email'); setOtpSent(false); }}
              className={`flex-1 py-2 text-xs font-semibold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                tab === 'email'
                  ? 'border-b-2 border-[#111010] text-[#111010]'
                  : 'text-[#8C7F72] hover:text-[#111010]'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              Email & Password
            </button>
            <button
              type="button"
              onClick={() => setTab('phone')}
              className={`flex-1 py-2 text-xs font-semibold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                tab === 'phone'
                  ? 'border-b-2 border-[#111010] text-[#111010]'
                  : 'text-[#8C7F72] hover:text-[#111010]'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              Phone OTP
            </button>
          </div>

          {/* Email Tab Form */}
          {tab === 'email' && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#3A3733] mb-1 font-semibold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="e.g. Ayesha Rahman"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D8C9AE] rounded-xl text-sm focus:outline-hidden focus:border-[#111010]"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#3A3733] mb-1 font-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D8C9AE] rounded-xl text-sm focus:outline-hidden focus:border-[#111010]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] uppercase tracking-wider text-[#3A3733] font-semibold">
                    Password
                  </label>
                  {!isSignUp && (
                    <button
                      type="button"
                      onClick={() => setEmail('syedfuzail455@gmail.com')}
                      className="text-[10px] text-[#B49B73] hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 pr-10 bg-white border border-[#D8C9AE] rounded-xl text-sm focus:outline-hidden focus:border-[#111010]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C7F72] hover:text-[#111010] p-1 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#111010] text-[#F5F1E8] text-xs font-semibold tracking-widest uppercase rounded-xl hover:bg-[#222] transition-colors flex items-center justify-center gap-2 mt-2 shadow-sm cursor-pointer"
              >
                {loading ? 'Authenticating...' : isSignUp ? 'Create Atelier Account' : 'Sign In'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* Phone OTP Tab Form */}
          {tab === 'phone' && (
            <div className="space-y-4">
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  {isSignUp && (
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#3A3733] mb-1 font-semibold">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        placeholder="e.g. Mariam Siddiqui"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#D8C9AE] rounded-xl text-sm focus:outline-hidden focus:border-[#111010]"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#3A3733] mb-1 font-semibold">
                      Mobile Number (India)
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3.5 bg-[#E8DFCF] border border-r-0 border-[#D8C9AE] text-xs text-[#3A3733] font-medium rounded-l-xl">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="98450 12345"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#D8C9AE] rounded-r-xl text-sm focus:outline-hidden focus:border-[#111010]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-[#111010] text-[#F5F1E8] text-xs font-semibold tracking-widest uppercase rounded-xl hover:bg-[#222] transition-colors flex items-center justify-center gap-2 mt-2 shadow-sm cursor-pointer"
                  >
                    {loading ? 'Sending SMS OTP...' : 'Send Verification OTP'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="p-3 bg-[#E8DFCF]/70 rounded-xl text-xs text-[#3A3733] leading-relaxed">
                    A 6-digit verification code was sent to <strong className="text-[#111010]">+91 {phone}</strong>.
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="ml-2 text-[#111010] underline font-medium cursor-pointer"
                    >
                      Change
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#3A3733] mb-1 font-semibold">
                      Enter 6-Digit OTP (Demo code: 786786)
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={otpCode}
                      onChange={e => setOtpCode(e.target.value)}
                      placeholder="786786"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D8C9AE] rounded-xl text-center tracking-[0.3em] font-mono text-base font-semibold focus:outline-hidden focus:border-[#111010]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-[#111010] text-[#F5F1E8] text-xs font-semibold tracking-widest uppercase rounded-xl hover:bg-[#222] transition-colors flex items-center justify-center gap-2 mt-2 shadow-sm cursor-pointer"
                  >
                    {loading ? 'Verifying OTP...' : 'Confirm & Login'}
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Toggle Sign in / Sign up */}
          <div className="mt-6 text-center text-xs text-[#8C7F72]">
            {isSignUp ? 'Already registered with Pearlessence?' : 'First time at Pearlessence?'}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="ml-1 text-[#111010] font-semibold underline underline-offset-2 cursor-pointer"
            >
              {isSignUp ? 'Sign In here' : 'Create an Account'}
            </button>
          </div>

            <div className="mt-5 pt-4 border-t border-[#D8C9AE]/60 flex items-center justify-center gap-2 text-[11px] text-[#8C7F72]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B49B73]" />
              <span>256-Bit SSL Encryption • Bangalore Atelier Private Portal</span>
            </div>
          </>
        )}
      </div>
    </div>
  </div>
);
};
