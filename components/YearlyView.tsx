
import React from 'react';
import { Reflection } from '../types';

interface Props {
  reflections: Reflection[];
}

const YearlyView: React.FC<Props> = ({ reflections }) => {
  const currentYear = new Date().getFullYear();
  
  // Grouping reflections by month for a real summary
  const monthNames = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
  ];

  // Added isSample property to ensure type consistency when mapping sampleMonthlyData
  const monthlyData = monthNames.map((month) => {
    const monthReflections = reflections.filter(r => r.month === month);
    return {
      name: month,
      shortName: month.substring(0, 3),
      count: monthReflections.length,
      heroImage: monthReflections.length > 0 ? monthReflections[0].image : null,
      hasData: monthReflections.length > 0,
      isSample: false
    };
  });

  // Sample data for months without real data to show a "full" garden
  const sampleMonthlyData = monthlyData.map((data, index) => {
    if (!data.hasData && index < new Date().getMonth()) {
      // Add some sample aesthetic placeholders for past months if empty
      return {
        ...data,
        count: Math.floor(Math.random() * 20) + 5,
        heroImage: `https://picsum.photos/seed/year-${index}/200/200?grayscale`,
        isSample: true
      };
    }
    return data;
  });

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* Year Hero Header */}
      <div className="text-center py-6">
        <div className="inline-block relative">
          <h3 className="serif text-5xl font-black text-stone-900 tracking-tighter">{currentYear}</h3>
          <div className="absolute -top-4 -right-8 text-[10px] font-black text-stone-300 uppercase tracking-widest vertical-rl h-12">
            ANNUAL GARDEN
          </div>
        </div>
        <p className="mt-4 text-[11px] font-black text-stone-400 uppercase tracking-[0.3em]">성장의 궤적을 돌아보다</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4 border-y border-black/5 py-8">
        <div className="text-center">
          <div className="text-xl font-black">{reflections.length}</div>
          <div className="text-[9px] font-bold text-stone-400 uppercase">Total Artifacts</div>
        </div>
        <div className="text-center border-x border-black/5">
          <div className="text-xl font-black">{Math.min(12, monthlyData.filter(m => m.hasData).length)}</div>
          <div className="text-[9px] font-bold text-stone-400 uppercase">Active Months</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-black">🌱</div>
          <div className="text-[9px] font-bold text-stone-400 uppercase">Growth Stage</div>
        </div>
      </div>

      {/* 12 Months Grid */}
      <div className="grid grid-cols-3 gap-x-4 gap-y-10">
        {sampleMonthlyData.map((month, idx) => (
          <div key={month.name} className={`flex flex-col items-center group ${!month.heroImage ? 'opacity-30' : ''}`}>
            <div className="relative mb-3">
              <div className={`w-24 h-24 rounded-full overflow-hidden border-2 transition-all duration-700 ${
                month.heroImage 
                  ? 'border-white shadow-lg group-hover:scale-110 group-hover:rotate-3' 
                  : 'border-dashed border-stone-300 bg-stone-100/50'
              }`}>
                {month.heroImage ? (
                  <img src={month.heroImage} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0" alt={month.name} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-stone-300 rounded-full"></div>
                  </div>
                )}
              </div>
              {month.count > 0 && (
                <div className="absolute -bottom-1 -right-1 bg-black text-white text-[8px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#EBEBE6]">
                  {month.count}
                </div>
              )}
            </div>
            <span className="text-[10px] font-black tracking-widest text-stone-500 uppercase">{month.shortName}</span>
            {month.isSample && <span className="text-[7px] font-bold text-stone-300 uppercase mt-1">Sample</span>}
          </div>
        ))}
      </div>

      {/* Decorative End Quote */}
      <div className="py-20 text-center">
        <div className="w-[1px] h-12 bg-gradient-to-b from-stone-300 to-transparent mx-auto mb-6"></div>
        <p className="serif text-xs italic text-stone-400 leading-relaxed px-12">
          "천천히, 그러나 꾸준히 자라나는 당신의 정원이<br/>
          올 한 해를 눈부시게 채웠습니다."
        </p>
      </div>
    </div>
  );
};

export default YearlyView;
