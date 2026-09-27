import React from 'react';
import { X, Mail, MessageCircle } from 'lucide-react';
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
    
    window.location.href = mailtoUrl;
    
    onSuccess('email');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-xs sm:max-w-sm bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl p-5 sm:p-6 text-left animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 id="modal-title" className="text-sm font-semibold text-neutral-100">
            Connect via
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Horizontal Options: WhatsApp (Left) & Email (Right) */}
        <div className="grid grid-cols-2 gap-3">
          {/* Left: WhatsApp */}
          <button
            onClick={handleSendWhatsApp}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-800/40 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 group-hover:border-emerald-500/40 transition-all">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-neutral-200 group-hover:text-white transition-colors">
              WhatsApp
            </span>
          </button>

          {/* Right: Email */}
          <button
            onClick={handleSendEmail}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-800/40 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-105 group-hover:border-blue-500/40 transition-all">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-neutral-200 group-hover:text-white transition-colors">
              Email
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
