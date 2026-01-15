
import React from 'react';
import { Reflection } from '../types';

interface Props {
  reflections: Reflection[];
}

const WeeklyView: React.FC<Props> = ({ reflections }) => {
  // Group reflections by week (simplified for prototype)
  const displayWeeks = reflections.length > 0 ? [
    { 
      id: 'current', 
      title: '이번 주차의 발견', 
      tags: ['#성찰', '#기록'], 
      bgColor: 'bg-white/80',
      images: reflections.map(r => r.image).concat(Array(Math.max(0, 4 - reflections.length)).fill('https://picsum.photos/seed/empty/150/150'))
    }
  ] : [
    { 
      id: 1, 
      title: '10월 4주차의 기록', 
      tags: ['#평온', '#인내'], 
      bgColor: 'bg-white/80',
      images: Array(4).fill(0).map((_, i) => `https://picsum.photos/seed/w1-${i}/150/150`)
    }
  ];

  return (
    <div className="space-y-10">
      {displayWeeks.map((week) => (
        <section key={week.id} className={`${week.bgColor} rounded-[2.5rem] p-8 border border-white shadow-sm animate-in zoom-in-95 duration-700`}>
          <header className="mb-6 flex justify-between items-end">
            <div>
              <h3 className="serif text-xl font-black text-stone-900">{week.title}</h3>
              <div className="flex gap-2 mt-2">
                {week.tags.map(tag => (
                  <span key={tag} className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">{tag}</span>
                ))}
              </div>
            </div>
            <div className="text-[10px] font-black opacity-30">WEEKLY REPORT</div>
          </header>

          <div className="grid grid-cols-4 gap-2">
            <div className="col-span-2 row-span-2 aspect-square rounded-2xl overflow-hidden shadow-sm">
              <img src={week.images[0]} className="w-full h-full object-cover" alt="Weekly main" />
            </div>
            {week.images.slice(1, 4).map((img, idx) => (
              <div key={idx} className="aspect-square rounded-xl overflow-hidden shadow-sm">
                <img src={img} className="w-full h-full object-cover" alt={`Weekly ${idx}`} />
              </div>
            ))}
            <div className="aspect-square rounded-xl bg-stone-100/50 flex items-center justify-center text-[10px] text-stone-400 font-black italic">
              JOURNEY
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default WeeklyView;
