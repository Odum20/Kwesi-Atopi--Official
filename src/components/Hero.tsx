import React from 'react';
import { ArrowDown, Terminal, Globe, Activity } from 'lucide-react';
import { TechBackgroundCanvas } from './TechBackgroundCanvas';

interface HeroProps {
  onExploreWork: () => void;
  onContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onContact }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center pt-32 pb-24 px-6 md:px-16 lg:px-24 w-full overflow-hidden">
      {/* Background Animated Developer Icons Canvas */}
      <TechBackgroundCanvas />

      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Natural Left-Aligned Content */}
        <div className="lg:col-span-6 text-left">
          {/* Kicker badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 mb-8">
            <Terminal className="w-3.5 h-3.5 text-neutral-300" />
            <span>Digital Workspace & Engineering Portfolio</span>
          </div>

          {/* Main Name / Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-100 mb-6 font-sans">
            Kwesi Odum
          </h1>

          {/* Core statement */}
          <p className="text-2xl sm:text-3xl font-medium text-neutral-300 tracking-tight mb-6 font-sans">
            I build things.
          </p>

          {/* Supporting text / Biography */}
          <p className="text-base sm:text-lg text-neutral-400 mb-10 leading-relaxed font-sans max-w-2xl">
            Projects, experiments, and production-grade systems. Crafting high-performance software, distributed pipelines, and immersive digital interfaces from Kumasi, Ghana.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-14">
            <button
              onClick={onExploreWork}
              className="px-6 py-3.5 rounded-xl bg-neutral-100 text-neutral-950 font-medium text-sm hover:bg-white transition-all duration-200 shadow-sm cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>View my work</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
            <button
              onClick={onContact}
              className="px-6 py-3.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 font-medium text-sm hover:bg-neutral-800 hover:text-neutral-100 transition-all duration-200 cursor-pointer"
            >
              Contact me
            </button>
          </div>

          {/* Stats ticker / quick specs */}
          <div className="pt-8 border-t border-neutral-900 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Focus</div>
              <div className="text-sm font-medium text-neutral-200">Systems & AI Workflows</div>
            </div>
            <div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Base</div>
              <div className="text-sm font-medium text-neutral-200">Kumasi, Ghana</div>
            </div>
            <div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Status</div>
              <div className="text-sm font-medium text-[#16a34a] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
                <span>Building & Shipping</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Source</div>
              <div className="text-sm font-medium text-neutral-200 font-mono">TypeScript / Rust</div>
            </div>
          </div>
        </div>

        {/* Right Column: Seamless Vertical Image Viewport Widget */}
        <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
          <div className="relative rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden max-w-md w-full group">
            
            {/* Viewport Top Bar */}
            <div className="px-4 py-3 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              
              <div className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>workspace.viewport.live</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>Live</span>
              </div>
            </div>

            {/* Vertical Image Display Container */}
            <div className="relative w-full bg-neutral-950 flex items-center justify-center p-4">
              <div className="relative rounded-xl overflow-hidden border border-neutral-800/80 shadow-inner w-full flex justify-center bg-neutral-900/50">
                <img
                  src="https://res.cloudinary.com/dukipuswv/image/upload/v1790449072/85b8ad62-abb3-405a-9a6f-09880e2e113a_yfttez.png"
                  alt="Kwesi Odum Profile"
                  className="w-full h-auto max-h-[520px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>

            {/* Bottom Caption / Status Bar */}
            <div className="px-4 py-3 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
              <span className="text-neutral-300">Kwesi Odum — Portrait</span>
              <span className="text-[#16a34a] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse" />
                <span>Online</span>
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
