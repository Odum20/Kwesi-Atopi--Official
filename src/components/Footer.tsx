import React from 'react';
import { Terminal, MessageCircle, Linkedin, Mail, Shield } from 'lucide-react';
import { TikTokIcon } from './TikTokIcon';
import { CONTACT_CONFIG } from '../config/contact';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="border-t border-neutral-900 bg-neutral-950/60 backdrop-blur-sm py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300">
            <Terminal className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-neutral-200 tracking-tight text-sm">
            Kwesi Odum — Digital Workspace
          </span>
        </div>

        <div className="text-xs text-neutral-500 font-mono text-center md:text-left flex items-center gap-2">
          <span>© {new Date().getFullYear()} Kwesi Odum. Built with React & Firebase.</span>
          <button
            onClick={onOpenAdmin}
            className="p-1 hover:text-neutral-300 transition-colors cursor-pointer opacity-40 hover:opacity-100"
            title="Open Admin Dashboard (Ctrl + Alt + A)"
          >
            <Shield className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-4 text-neutral-400">
          <a href={`https://wa.me/${CONTACT_CONFIG.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-100 transition-colors" title={`WhatsApp: ${CONTACT_CONFIG.whatsappDisplay}`}>
            <MessageCircle className="w-4 h-4" />
          </a>
          <a href={CONTACT_CONFIG.tiktokUrl} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-100 transition-colors" title={`TikTok: ${CONTACT_CONFIG.tiktokHandle}`}>
            <TikTokIcon className="w-4 h-4" />
          </a>
          <a href={CONTACT_CONFIG.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-100 transition-colors" title="LinkedIn">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href={`mailto:${CONTACT_CONFIG.email}`} className="hover:text-neutral-100 transition-colors" title="Email">
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};
