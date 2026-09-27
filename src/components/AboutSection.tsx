import React from 'react';
import { User, Code, Cpu, ShieldCheck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 border-t border-neutral-900">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 font-mono mb-2">
          <User className="w-3.5 h-3.5" />
          <span>05 // About Me</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100 mb-8">
          About me
        </h2>

        {/* Minimal placeholder as requested */}
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-8 md:p-12 mb-12">
          <blockquote className="text-xl sm:text-2xl font-medium text-neutral-200 leading-relaxed mb-6 font-sans">
            "I'm a builder interested in creating useful things with technology."
          </blockquote>
          <p className="text-base text-neutral-400 leading-relaxed">
            Focused on building high-performance web applications, distributed systems, and developer tools with exceptional attention to typography, speed, and ergonomics.
          </p>
        </div>

        {/* Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-neutral-900/30 border border-neutral-800/80 rounded-xl">
            <Code className="w-5 h-5 text-neutral-300 mb-3" />
            <h3 className="text-base font-bold text-neutral-100 mb-1">Clean Engineering</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">Writing robust, maintainable code with strict type safety and zero unnecessary abstraction.</p>
          </div>
          <div className="p-6 bg-neutral-900/30 border border-neutral-800/80 rounded-xl">
            <Cpu className="w-5 h-5 text-neutral-300 mb-3" />
            <h3 className="text-base font-bold text-neutral-100 mb-1">Performance First</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">Optimizing for sub-100ms interactions, minimal bundle sizes, and lightning-fast edge delivery.</p>
          </div>
          <div className="p-6 bg-neutral-900/30 border border-neutral-800/80 rounded-xl">
            <ShieldCheck className="w-5 h-5 text-neutral-300 mb-3" />
            <h3 className="text-base font-bold text-neutral-100 mb-1">Thoughtful Design</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">Prioritizing typographic hierarchy, generous whitespace, and restrained anti-slop aesthetics.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
