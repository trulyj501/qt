
import React from 'react';

const SocialScreen: React.FC = () => {
  // Mock social data
  const socialReflections = [
    {
      id: 's1',
      author: '민지',
      title: '새벽의 고요',
      content: '어둠이 물러가고 빛이 차오르는 시간, 내 마음에도 새 아침이 밝아옵니다.',
      image: 'https://picsum.photos/seed/banana1/400/500',
      likes: 24
    },
    {
      id: 's2',
      author: '준호',
      title: '비 오는 날의 감사',
      content: '땅을 적시는 빗방울처럼 내 영혼에도 은혜가 스며듭니다.',
      image: 'https://picsum.photos/seed/banana2/400/500',
      likes: 18
    },
    {
      id: 's3',
      author: '수아',
      title: '길가에 핀 꽃 한 송이',
      content: '작고 이름 없는 꽃에서도 생명의 위대함을 발견합니다.',
      image: 'https://picsum.photos/seed/banana3/400/500',
      likes: 42
    },
    {
      id: 's4',
      author: '지훈',
      title: '기다림의 미학',
      content: '조급함을 내려놓고 서서히 익어가는 시간을 견뎌봅니다.',
      image: 'https://picsum.photos/seed/banana4/400/500',
      likes: 31
    }
  ];

  return (
    <div className="flex-1 bg-[#EBEBE6] flex flex-col overflow-hidden">
      {/* Header */}
      <header className="px-8 pt-12 pb-6 shrink-0">
        <h2 className="serif text-3xl font-black text-stone-900">정원</h2>
        <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-[0.2em] font-bold">The Shared Garden</p>
      </header>

      {/* Main Feed */}
      <main className="flex-1 overflow-y-auto px-6 pb-10 space-y-8 custom-scrollbar">
        {socialReflections.map((item) => (
          <div key={item.id} className="bg-white/50 border border-white/40 rounded-[2rem] p-5 shadow-sm hover:shadow-md transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
            {/* Artifact Image */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 border border-black/5">
              <img 
                src={item.image} 
                className="w-full h-full object-cover grayscale-[0.2]" 
                alt={item.title} 
              />
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full">
                <span className="text-[10px] text-white font-black">{item.author}</span>
              </div>
            </div>

            {/* Content */}
            <div className="px-1">
              <h3 className="font-black text-sm text-stone-900 mb-2">{item.title}</h3>
              <p className="serif text-[13px] leading-relaxed text-stone-600 mb-4 line-clamp-2 italic">
                "{item.content}"
              </p>
              
              {/* Actions */}
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <button className="flex items-center gap-1.5 group">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone-300 group-hover:text-red-400 transition-colors">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span className="text-[11px] font-black text-stone-400">{item.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 group">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone-300 group-hover:text-stone-600 transition-colors">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                  </button>
                </div>
                <div className="text-[10px] font-black text-stone-300 uppercase tracking-widest">
                  NANO-BANANA
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Decorative end spacer */}
        <div className="py-10 text-center opacity-20">
          <div className="w-1 h-1 bg-black rounded-full mx-auto mb-1"></div>
          <div className="w-1 h-1 bg-black rounded-full mx-auto mb-1"></div>
          <div className="w-1 h-1 bg-black rounded-full mx-auto"></div>
        </div>
      </main>
    </div>
  );
};

export default SocialScreen;
