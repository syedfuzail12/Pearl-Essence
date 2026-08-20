import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Toast: React.FC = () => {
  const { toast } = useStore();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed top-6 right-6 z-50 max-w-md w-full animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="bg-[#111010] text-[#FAF8F4] p-4 rounded-xl shadow-2xl border border-[#B49B73]/40 flex items-start gap-3">
        <div className="shrink-0 mt-0.5">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#B49B73]" />}
          {isError && <AlertCircle className="w-5 h-5 text-[#B5654F]" />}
          {!isSuccess && !isError && <Info className="w-5 h-5 text-[#D8C9AE]" />}
        </div>
        <div className="flex-1 text-sm font-sans-ui leading-relaxed text-[#F5F1E8]">
          {toast.message}
        </div>
      </div>
    </div>
  );
};
