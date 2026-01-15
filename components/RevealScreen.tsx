
import React, { useEffect, useState } from 'react';
import { Reflection } from '../types';

interface Props {
  reflection: Reflection;
  onSave: () => void;
}

const RevealScreen: React.FC<Props> = ({ reflection, onSave }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsActive(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-[#EBEBE6] text-[#1A1A1A] overflow-hidden">
      {/* Top Header */}
      <header className="px-6 py-4 flex justify-between items-center shrink-0">
        <button className="text-2xl opacity-20">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H12M4 12H10M4 18H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <div className="flex items-center gap-1 font-bold text-sm tracking-tighter">
          <span>세계문학일력</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </div>
        <button className="text-2xl opacity-20">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="5" cy="12" r="2" fill="currentColor"/>
            <circle cx="12" cy="12" r="2" fill="currentColor"/>
            <circle cx="19" cy="12" r="2" fill="currentColor"/>
          </svg>
        </button>
      </header>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col items-center justify-start pt-4 px-8 overflow-y-auto transition-all duration-1000 bloom-reveal ${isActive ? 'bloom-active' : ''}`}>
        
        {/* Date Display */}
        <div className="w-full flex justify-between items-center mb-6">
          <div className="font-bold text-xs tracking-widest vertical-rl rotate-180 opacity-60">
            {reflection.month}
          </div>

          <div className="flex flex-col items-center">
            <div className="text-xl font-black mb-1 leading-none opacity-40">{reflection.subDayNum}</div>
            <div className="w-8 h-[2px] bg-black/20 mb-2"></div>
            <div className="text-7xl font-black leading-none tracking-tight">
              {reflection.dayNum}
            </div>
          </div>

          <div className="font-bold text-xs tracking-widest vertical-rl opacity-60">
            {reflection.dayName}
          </div>
        </div>

        {/* Hero Image (Nano-Banana Artifact) */}
        <div className="w-full mb-8 relative group">
          <div className="absolute inset-0 bg-black/5 blur-xl transform scale-95 translate-y-2 group-hover:translate-y-4 transition-transform duration-700"></div>
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden border-[6px] border-white shadow-xl transform rotate-[-1deg]">
            <img 
              src={reflection.image} 
              alt="Nano Banana Artifact" 
              className="w-full h-full object-cover grayscale-[0.1] hover:grayscale-0 transition-all duration-1000"
            />
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none"></div>
          </div>
        </div>

        {/* Quote Section */}
        <div className="w-full flex flex-col items-center space-y-0 text-center mb-10 pb-10">
          <div className="w-full border-t border-black/10 pb-4"></div>
          <h2 className="font-black text-lg mb-4 tracking-tight">{reflection.title}</h2>
          
          {reflection.contentLines.map((line, i) => (
            <React.Fragment key={i}>
              <div className="w-full border-t border-black/5"></div>
              <p className="font-bold text-[14px] leading-[3] py-0 text-stone-700">{line}</p>
            </React.Fragment>
          ))}
          <div className="w-full border-t border-black/5"></div>

          {/* Footer of Quote */}
          <div className="w-full flex justify-between items-end mt-6 text-[11px] font-black opacity-40">
            <div className="text-left leading-tight tracking-tighter">
              {reflection.source}
            </div>
            <div className="text-right uppercase tracking-widest">{reflection.author}</div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <footer className="px-10 py-6 flex justify-between items-center shrink-0 bg-[#EBEBE6]/90 backdrop-blur-md">
        <button className="text-stone-300 hover:text-red-400 transition-colors transform active:scale-125 duration-300">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
        <button 
          onClick={onSave} 
          className="bg-black text-white px-8 py-3 rounded-full font-black text-xs tracking-widest shadow-lg hover:bg-stone-800 transition-all transform active:scale-95"
        >
          저니에 저장하기
        </button>
        <button className="text-stone-300 hover:text-blue-400 transition-colors">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z"/>
          </svg>
        </button>
      </footer>
    </div>
  );
};

export default RevealScreen;
