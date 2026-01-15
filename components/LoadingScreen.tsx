
import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#EBEBE6] p-8 text-center animate-in fade-in duration-500">
      <div className="relative w-24 h-24 mb-12">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 left-0 w-full h-full particle"
            style={{ animationDelay: `${i * 0.1}s`, opacity: 0.6 - (i * 0.05) }}
          >
            <div 
              className="w-2.5 h-2.5 bg-black rounded-full blur-[0.5px]"
              style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '0', 
                transform: 'translateY(-50%)' 
              }}
            />
          </div>
        ))}
        <div className="absolute inset-0 m-auto w-4 h-4 bg-stone-400 rounded-full blur-sm animate-pulse" />
      </div>
      <p className="text-black text-[10px] tracking-[0.4em] font-black uppercase animate-pulse leading-relaxed">
        당신의 오늘을<br/>나노바나나로 빚고 있습니다
      </p>
    </div>
  );
};

export default LoadingScreen;
