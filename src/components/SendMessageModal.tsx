import React from 'react';
import { X, MessageCircle, Mail, ArrowUpRight, Check, Send } from 'lucide-react';
import { CONTACT_CONFIG } from '../config/contact';

interface SendMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    name: string;
    email: string;
    message: string;
  };
  onSuccess: (channel: 'whatsapp' | 'email') => void;
}

export const SendMessageModal: React.FC<SendMessageModalProps> = ({
  isOpen,
  onClose,
  formData,
  onSuccess,
}) => {
  if (!isOpen) return null;

  const handleSendWhatsApp = () => {
    const formattedText = `Hello Kwesi,\n\nMy name is ${formData.name.trim()} (${formData.email.trim()}).\n\n${formData.message.trim()}`;
    const url = `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${encodeURIComponent(formattedText)}`;
    
    // Open WhatsApp in a new tab or window
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = url;
    }
    
    onSuccess('whatsapp');
  };

  const handleSendEmail = () => {
    const subject = `Portfolio Inquiry from ${formData.name.trim()}`;
    const body = `Name: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\nMessage:\n${formData.message.trim()}`;
    const mailtoUrl = `mailto:${CONTACT_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Trigger mail client
    window.location.href = mailtoUrl;
    
    onSuccess('email');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-left animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-100">
            <Send className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500">Dispatch Message</div>
            <h3 id="modal-title" className="text-xl font-bold text-neutral-100">
              How would you like to connect?
            </h3>
          </div>
        </div>

        <p className="text-sm text-neutral-400 mb-6 mt-2 leading-relaxed">
          Select your preferred channel to send this message directly to Kwesi. Your message details are ready to be dispatched seamlessly.
        </p>

        {/* Message Preview Box */}
        <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800/80 mb-6 text-xs text-neutral-300">
          <div className="flex justify-between items-center mb-2 pb-2 border-b border-neutral-800/60 font-mono text-[11px] text-neutral-400">
            <span>From: <strong className="text-neutral-200 font-semibold">{formData.name}</strong> ({formData.email})</span>
            <span className="text-[#16a34a] font-medium flex items-center gap-1">
              <Check className="w-3 h-3" /> Ready
            </span>
          </div>
          <p className="text-neutral-300 line-clamp-2 italic font-sans">
            "{formData.message}"
          </p>
        </div>

        {/* Dispatch Options */}
        <div className="space-y-3">
          {/* WhatsApp Option */}
          <button
            onClick={handleSendWhatsApp}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-emerald-500/50 hover:bg-neutral-950/90 transition-all group cursor-pointer text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400 group-hover:scale-105 group-hover:bg-emerald-900/60 transition-all">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-neutral-100 group-hover:text-white">
                    Send via WhatsApp
                  </span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                    Fastest
                  </span>
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">
                  Opens WhatsApp pre-filled for <span className="font-mono text-neutral-300">{CONTACT_CONFIG.whatsappDisplay}</span>
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </button>

          {/* Email Option */}
          <button
            onClick={handleSendEmail}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-blue-500/50 hover:bg-neutral-950/90 transition-all group cursor-pointer text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-blue-950/60 border border-blue-800/60 flex items-center justify-center text-blue-400 group-hover:scale-105 group-hover:bg-blue-900/60 transition-all">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-neutral-100 group-hover:text-white">
                    Send via Email Client
                  </span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-blue-950 text-blue-400 border border-blue-800/60">
                    Direct
                  </span>
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">
                  Opens your email app addressed to <span className="font-mono text-neutral-300">{CONTACT_CONFIG.email}</span>
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </button>
        </div>

        {/* Footer cancel button */}
        <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
          >
            Cancel & edit message
          </button>
          <span className="text-[11px] font-mono text-neutral-500">
            Encrypted & Direct
          </span>
        </div>
      </div>
    </div>
  );
};
