
import React from 'react';
import { Reflection } from '../types';

interface Props {
  reflections: Reflection[];
}

const DailyView: React.FC<Props> = ({ reflections }) => {
  const displayItems = reflections.length > 0 ? reflections : [];

  return (
    <div className="relative space-y-10 pb-10">
      <div className="absolute left-[23px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-transparent via-stone-300 to-transparent z-0 opacity-40" />

      {displayItems.length === 0 ? (
        <div className="text-center py-20 text-stone-300 text-xs font-bold uppercase tracking-widest">
          첫 기록을 남겨보세요
        </div>
      ) : displayItems.map((item) => (
        <div key={item.id} className="relative flex items-start gap-6 group animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mt-2 w-12 h-12 rounded-full bg-white shadow-sm border border-stone-100 flex items-center justify-center z-10 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-stone-300 group-hover:bg-black transition-colors duration-500" />
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-stone-400 tracking-tight uppercase">{item.date}</span>
              <div className="h-[1px] flex-1 bg-black/5" />
            </div>
            
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-700 hover:-translate-y-1 border border-white/50">
              {item.image && (
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000" />
                </div>
              )}
              <div className="p-5">
                {/* Only show Bible Verse if an image exists (not a text-only entry) */}
                {item.bibleVerse && item.image && (
                  <div className="mb-3 p-3 bg-stone-50 rounded-xl border border-stone-100">
                    <p className="serif text-[10px] leading-relaxed text-stone-500 italic">"{item.bibleVerse.split(' (')[0]}"</p>
                    <p className="text-[8px] font-bold text-stone-300 text-right mt-1">{item.bibleVerse.includes('(') ? item.bibleVerse.split(' (')[1].replace(')', '') : ''}</p>
                  </div>
                )}
                
                <h4 className="font-black text-sm mb-1">{item.title}</h4>
                <div className="space-y-1">
                  {item.contentLines.map((line, idx) => (
                    <p key={idx} className="serif text-xs leading-relaxed text-stone-600 italic">
                      {line}
                    </p>
                  ))}
                </div>

                {item.music && (
                  <div className="mt-3 flex items-center gap-1.5 opacity-40">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M9 18V5l12-2v13"></path>
                      <circle cx="6" cy="18" r="3"></circle>
                      <circle cx="18" cy="16" r="3"></circle>
                    </svg>
                    <span className="text-[9px] font-bold">{item.music}</span>
                  </div>
                )}

                {item.author && (
                  <div className="mt-3 text-[9px] font-black text-stone-300 uppercase tracking-widest text-right">
                    — {item.author}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DailyView;
