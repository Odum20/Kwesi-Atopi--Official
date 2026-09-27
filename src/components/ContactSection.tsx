import React, { useState } from 'react';
import { Mail, Linkedin, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { TikTokIcon } from './TikTokIcon';
import { SendMessageModal } from './SendMessageModal';
import { CONTACT_CONFIG } from '../config/contact';

export const ContactSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastChannel, setLastChannel] = useState<'whatsapp' | 'email' | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleOpenDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setIsModalOpen(true);
  };

  const handleSentSuccess = (channel: 'whatsapp' | 'email') => {
    setIsModalOpen(false);
    setLastChannel(channel);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
      setLastChannel(null);
    }, 5000);
  };

  const socialLinks = [
    { label: 'Email', value: CONTACT_CONFIG.email, icon: Mail, href: `mailto:${CONTACT_CONFIG.email}` },
    { label: 'WhatsApp', value: CONTACT_CONFIG.whatsappDisplay, icon: MessageCircle, href: `https://wa.me/${CONTACT_CONFIG.whatsappNumber}` },
    { label: 'TikTok', value: CONTACT_CONFIG.tiktokHandle, icon: TikTokIcon, href: CONTACT_CONFIG.tiktokUrl },
    { label: 'LinkedIn', value: 'kwesi-atopi-odum-a70a21366', icon: Linkedin, href: CONTACT_CONFIG.linkedinUrl },
  ];

  return (
    <section id="contact" className="py-24 border-t border-neutral-900 bg-neutral-950/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left info */}
          <div>
            <div className="text-xs uppercase tracking-widest text-neutral-500 font-mono mb-2">03 // Connect</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100 mb-6">
              Let's build something together.
            </h2>
            <p className="text-base text-neutral-400 leading-relaxed mb-8">
              Whether you want to discuss a new project, explore an engineering collaboration, or just say hello, my channels are always open.
            </p>

            <div className="space-y-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-300 group-hover:text-neutral-100 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500 uppercase tracking-wider">{link.label}</div>
                      <div className="text-sm font-medium text-neutral-200 group-hover:text-white">{link.value}</div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-neutral-100 mb-6">Send a direct message</h3>
            {submitted ? (
              <div className="py-12 text-center animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-[#16a34a]/20 border border-[#16a34a] text-[#16a34a] flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <CheckCircle2 className="w-6 h-6 text-[#16a34a]" />
                </div>
                <h4 className="text-lg font-bold text-neutral-100 mb-2">
                  {lastChannel === 'whatsapp' ? 'Connected to WhatsApp' : 'Email Client Opened'}
                </h4>
                <p className="text-sm text-neutral-400 max-w-sm mx-auto">
                  {lastChannel === 'whatsapp'
                    ? 'Your message has been formatted and opened directly in WhatsApp. Send it over and I will reply shortly.'
                    : 'Your email draft has been generated with all message details. Looking forward to speaking!'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleOpenDispatch} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Jane Doe"
                    required
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-100 focus:outline-none focus:border-neutral-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="jane@company.com"
                    required
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-100 focus:outline-none focus:border-neutral-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Message</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Tell me about your project or inquiry..."
                    required
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-100 focus:outline-none focus:border-neutral-600 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-neutral-100 text-neutral-950 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Dispatch Modal */}
      <SendMessageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={{ name, email, message }}
        onSuccess={handleSentSuccess}
      />
    </section>
  );
};
