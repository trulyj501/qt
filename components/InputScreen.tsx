
import React, { useState, useEffect, useRef } from 'react';

interface Props {
  onSubmit: (data: {
    text: string,
    source?: string,
    author?: string,
    music?: string,
    bibleVerse?: string,
    skipImage?: boolean
  }) => void;
}

type VerseCategory = '세계문학일력' | '생명의 삶' | '매일 성경' | '한절 묵상';

const VERSE_DATA: Record<string, { text: string; ref: string; detail: string; author: string; subNum: string }> = {
  '생명의 삶': { 
    text: "예수께서 그에게 말씀하셨다\n\"나는 길이요, 진리요, 생명이다\n나를 거치지 않고서는,\n아무도 아버지께로 갈 사람이 없다\"", 
    ref: "요한복음 14:6",
    detail: "신약 성경",
    author: "사도 요한",
    subNum: "1"
  },
  '매일 성경': { 
    text: "주의 말씀은 내 발에 등이요\n내 길에 빛이니이다", 
    ref: "시편 119:105",
    detail: "구약 성경",
    author: "다윗",
    subNum: "1"
  },
  '한절 묵상': { 
    text: "여호와는 나의 목자시니\n내게 부족함이 없으리다", 
    ref: "시편 23:1",
    detail: "구약 성경",
    author: "다윗",
    subNum: "1"
  }
};

const InputScreen: React.FC<Props> = ({ onSubmit }) => {
  const [text, setText] = useState('');
  const [source, setSource] = useState('');
  const [author, setAuthor] = useState('');
  const [music, setMusic] = useState('');
  const [activeCategory, setActiveCategory] = useState<VerseCategory>('생명의 삶');
  const [dateInfo, setDateInfo] = useState({
    month: 'JANUARY',
    day: '15',
    dayName: 'THU',
  });
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const now = new Date();
    setDateInfo({
      month: now.toLocaleString('en-US', { month: 'long' }).toUpperCase(),
      day: now.getDate().toString(),
      dayName: now.toLocaleString('en-US', { weekday: 'short' }).toUpperCase(),
    });
  }, []);

  const scrollToSection = (index: number) => {
    if (scrollContainerRef.current) {
      const height = scrollContainerRef.current.clientHeight;
      scrollContainerRef.current.scrollTo({
        top: index * height,
        behavior: 'smooth'
      });
    }
  };

  const clearInputs = () => {
    setText('');
    setSource('');
    setAuthor('');
    setMusic('');
  };

  const toggleCategory = () => {
    const categories: VerseCategory[] = ['생명의 삶', '매일 성경', '한절 묵상'];
    const currentIndex = categories.indexOf(activeCategory);
    const nextIndex = (currentIndex + 1) % categories.length;
    setActiveCategory(categories[nextIndex]);
  };

  const todayVerse = VERSE_DATA[activeCategory];
  const verseLines = todayVerse.text.split('\n');

  return (
    <div 
      ref={scrollContainerRef} 
      className="flex-1 flex flex-col bg-[#EBEBE6] text-[#1A1A1A] overflow-y-auto snap-y snap-mandatory custom-scrollbar"
    >
      
      {/* SECTION 1: CALENDAR VIEW */}
      <section className="h-full w-full flex flex-col shrink-0 snap-start p-6 pt-4 relative overflow-hidden">
        <header className="flex justify-between items-center mb-2 px-2">
          <button className="opacity-90">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 8h10M4 13h14M4 18h8" strokeLinecap="round" />
            </svg>
          </button>
          
          <button 
            onClick={toggleCategory}
            className="flex items-center gap-1 font-black text-base tracking-tighter hover:opacity-70 transition-opacity"
          >
            <span>{activeCategory}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </button>

          <button className="opacity-90">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
            </svg>
          </button>
        </header>

        <div className="flex-1 flex flex-col items-center">
          <div className="flex flex-col items-center mb-1">
            <div className="w-10 h-[1.5px] bg-black mb-2"></div>
            <div className="text-2xl font-black leading-none">{todayVerse.subNum}</div>
          </div>

          <div className="w-full flex justify-between items-center px-2 mb-2 relative">
            <div className="vertical-rl font-black text-[10px] tracking-[0.45em] opacity-100">{dateInfo.month}</div>
            <div className="text-[140px] font-black leading-none tracking-[-0.06em] transform -translate-y-2">
              {dateInfo.day}
            </div>
            <div className="vertical-rl font-black text-[10px] tracking-[0.45em] opacity-100">{dateInfo.dayName}</div>
          </div>

          <div className="w-full px-2 space-y-0 relative">
            <div className="w-full border-t border-black mb-0"></div>
            
            <div className="flex flex-col">
              {[...verseLines, "", "", "", "", "", ""].slice(0, 7).map((line, idx) => (
                <div key={idx} className="w-full border-b border-black h-[38px] flex items-center justify-center">
                  <span className="font-bold text-[13px] leading-tight text-center px-4">
                    {line}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-start mt-2 px-2">
              <div className="text-[10px] font-black leading-[1.3] opacity-100">
                {todayVerse.detail}<br/>{todayVerse.ref}
              </div>
              <div className="text-[10px] font-black text-right uppercase tracking-tight">
                {todayVerse.author}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-around items-center pt-4 pb-2 opacity-100">
           <button className="text-stone-300 hover:text-red-400 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
           </button>
           <button className="text-stone-300 hover:text-black transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
           </button>
           {/* Replaced share/download with write icon that scrolls */}
           <button 
             onClick={() => scrollToSection(1)}
             className="text-black hover:text-stone-600 transition-colors"
           >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
           </button>
        </div>
      </section>

      {/* SECTION 2: INPUT AREA (Card Refined to match screenshot) */}
      <section className="h-full w-full flex flex-col shrink-0 snap-start p-6 pt-12 bg-[#EBEBE6] relative overflow-hidden">
        
        {/* The Card - Matching the shorter, compact style */}
        <div className="flex flex-col bg-[#F2F2F0] rounded-[40px] shadow-sm border border-black/5 p-8 pb-6 relative overflow-hidden">
          
          {/* Top Bar: Date on left, Clear/Reload on right */}
          <div className="flex justify-between items-center mb-6">
            <div className="font-black text-[13px] tracking-[0.05em] uppercase text-black opacity-100">
              {dateInfo.month} {dateInfo.day}
            </div>
            <button 
              onClick={clearInputs}
              className="opacity-40 hover:opacity-100 transition-opacity"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"/>
              </svg>
            </button>
          </div>

          {/* Lined Textarea Area - Shortened to 3-4 lines */}
          <div className="relative mb-6">
            <div className="absolute inset-0 pointer-events-none flex flex-col z-0">
              <div className="w-full border-t border-black mb-10"></div>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-[40px] border-b border-black/10"></div>
              ))}
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="지금 떠오르는 생각을 기록해보세요."
              className="relative w-full h-[160px] bg-transparent border-none focus:outline-none focus:ring-0 resize-none text-[15px] font-bold leading-[2.65] py-0 placeholder-stone-400/30 z-10 custom-scrollbar"
            />
          </div>

          {/* Footer Bar: Split with vertical divider */}
          <div className="pt-4 border-t border-black relative">
            {/* Center Vertical Separator */}
            <div className="absolute left-[65%] top-0 bottom-0 w-[1px] bg-black"></div>
            
            <div className="flex items-center">
              <div className="w-[65%] pr-4">
                <input 
                  type="text" 
                  placeholder="출처 또는 제목"
                  value={source || music}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-[11px] font-black text-black placeholder-stone-400/50 uppercase tracking-tight"
                />
              </div>
              <div className="w-[35%] pl-4 text-right">
                <input 
                  type="text" 
                  placeholder="작성자"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-[11px] font-black text-black placeholder-stone-400/50 text-right uppercase tracking-tight"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-2 mt-8 mb-4 space-y-3">
          <button 
            onClick={() => onSubmit({ text, source, author, music, bibleVerse: todayVerse.text + " (" + todayVerse.ref + ")", skipImage: false })}
            disabled={!text.trim()}
            className={`w-full py-4 rounded-full font-black text-[11px] tracking-[0.2em] transition-all duration-500 shadow-md active:scale-95 flex items-center justify-center gap-2 ${
              text.trim() ? 'bg-black text-white' : 'bg-stone-300 text-stone-100 cursor-not-allowed'
            }`}
          >
            나노바나나로 빚기
          </button>
          
          <div className="flex justify-between items-center px-4">
             <button 
                onClick={() => scrollToSection(0)}
                className="text-[10px] font-black text-stone-400 hover:text-black transition-colors uppercase tracking-widest"
              >
                돌아가기
              </button>
              <button 
                onClick={() => onSubmit({ text, source, author, music, bibleVerse: todayVerse.text + " (" + todayVerse.ref + ")", skipImage: true })}
                disabled={!text.trim()}
                className={`text-[10px] font-black uppercase tracking-widest ${
                  text.trim() ? 'text-black opacity-60 hover:opacity-100' : 'text-stone-300 cursor-not-allowed'
                }`}
              >
                텍스트만 저장
              </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InputScreen;
