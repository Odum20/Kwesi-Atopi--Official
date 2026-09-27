import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Linkedin, Terminal, Sun, Moon } from 'lucide-react';
import { CONTACT_CONFIG } from '../config/contact';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'work', label: 'Work' },
    { id: 'experiments', label: 'Experiments' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800/80 py-3.5' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Zone 1: Brand title */}
        <button 
          onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2 text-left group cursor-pointer"
        >
          <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-200 group-hover:border-neutral-600 transition-colors">
            <Terminal className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-neutral-100 tracking-tight text-base">
            Kwesi Odum
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-neutral-400">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`transition-colors hover:text-neutral-100 cursor-pointer py-1 relative ${activeSection === item.id ? 'text-neutral-100 font-semibold' : ''}`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-neutral-100" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button (Desktop & Tablet only; on mobile it is in the hamburger menu) */}
          <button
            onClick={toggleTheme}
            className="hidden sm:inline-flex p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-neutral-100 transition-colors cursor-pointer"
            aria-label="Toggle Theme"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-800" />}
          </button>

          <a
            href={CONTACT_CONFIG.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 bg-neutral-900 border border-neutral-800 rounded-lg hover:bg-neutral-800 hover:text-neutral-100 transition-colors whitespace-nowrap"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3 h-3 text-neutral-500" />
          </a>
          <button
            onClick={() => onNavigate('contact')}
            className="px-4 py-1.5 text-xs font-medium text-neutral-950 bg-neutral-100 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap cursor-pointer shadow-sm"
          >
            Let's Talk
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-400 hover:text-neutral-100 rounded-lg"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800 px-6 py-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4 text-base font-medium text-neutral-300">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 hover:text-neutral-100 transition-colors border-b border-neutral-900"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 flex items-center justify-between">
              <a
                href={CONTACT_CONFIG.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-100"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn Profile</span>
              </a>
              <button
                onClick={() => {
                  toggleTheme();
                  setMobileMenuOpen(false);
                }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-sm text-neutral-300 hover:text-neutral-100 transition-colors cursor-pointer"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-800" />}
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

