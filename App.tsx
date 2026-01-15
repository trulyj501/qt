
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { AppView, Reflection } from './types';
import LoadingScreen from './components/LoadingScreen';
import RevealScreen from './components/RevealScreen';
import ArchiveScreen from './components/ArchiveScreen';
import InputScreen from './components/InputScreen';
import SocialScreen from './components/SocialScreen';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('input');
  const [currentReflection, setCurrentReflection] = useState<Reflection | null>(null);
  const [history, setHistory] = useState<Reflection[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // 프로토타입용 가상 생성기
  const mockGenerate = async (text: string, bibleVerse?: string): Promise<{ title: string, contentLines: string[], imageUrl: string }> => {
    // 실제 AI 생성 시간과 유사한 지연 시간 (1.5초)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const titles = ["고요한 발견", "성장의 궤적", "마음의 정원", "오늘의 조각", "빛의 기록"];
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    
    // 입력된 텍스트를 적절히 분절하거나 변형하여 시적인 느낌 부여
    const lines = text.length > 20 
      ? [text.substring(0, 15), text.substring(15, 30), "그 너머의 진실"] 
      : [text, "깊은 성찰 끝에", "피어난 작은 평온"];

    // 텍스트를 시드로 사용하여 일관된 이미지 생성 (picsum seed 활용)
    const seed = encodeURIComponent(text.substring(0, 10));
    const imageUrl = `https://picsum.photos/seed/${seed}/800/1000?blur=1`;

    return {
      title: `${randomTitle}: ${text.substring(0, 5)}...`,
      contentLines: lines,
      imageUrl
    };
  };

  const handleInputSubmit = async (data: {
    text: string,
    source?: string,
    author?: string,
    music?: string,
    bibleVerse?: string,
    skipImage?: boolean
  }) => {
    const { text, source, author, music, bibleVerse, skipImage } = data;

    if (skipImage) {
      const now = new Date();
      const newReflection: Reflection = {
        id: Date.now().toString(),
        date: now.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' }),
        month: now.toLocaleString('en-US', { month: 'long' }).toUpperCase(),
        dayName: now.toLocaleString('en-US', { weekday: 'short' }).toUpperCase(),
        dayNum: now.getDate().toString(),
        subDayNum: "1",
        image: "", 
        title: source || "오늘의 기록",
        contentLines: [text],
        source: source || "나의 기록",
        author: author || "나",
        tags: ["#텍스트", "#성찰"],
        music,
        bibleVerse
      };
      setHistory(prev => [newReflection, ...prev]);
      setView('archive');
      return;
    }

    setView('loading');
    setIsGenerating(true);

    // API_KEY 존재 여부 확인
    const hasApiKey = process.env.API_KEY && process.env.API_KEY !== 'undefined' && process.env.API_KEY !== '';

    try {
      let resultData;

      if (hasApiKey) {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const textResponse = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `당신의 오늘 묵상: "${text}". 말씀: "${bibleVerse}". 이 내용을 바탕으로 1) 아주 짧고 시적인 제목, 2) 3~4줄 정도의 감성적인 문구(원문 변형 가능)를 JSON 형식으로 작성해줘. { "title": "...", "contentLines": ["...", "..."] } 형식이어야 해.`,
          config: { responseMimeType: "application/json" }
        });
        
        const textData = JSON.parse(textResponse.text || '{"title": "오늘의 발견", "contentLines": ["기록되지 않은 시간은", "망각의 숲으로 사라집니다."]}');

        const imageResponse = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: `A surreal, artistic, minimalist and ethereal digital artifact called a 'Nano-Banana', inspired by the theme of faith and: "${text}". Abstract, high quality, soft lighting, pastel or aesthetic colors, clean background.` }]
          },
          config: { imageConfig: { aspectRatio: "4:5" } }
        });

        let imageUrl = `https://picsum.photos/seed/${Date.now()}/800/1000`; 
        for (const part of imageResponse.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            imageUrl = `data:image/png;base64,${part.inlineData.data}`;
            break;
          }
        }
        
        resultData = {
          title: textData.title,
          contentLines: textData.contentLines,
          imageUrl
        };
      } else {
        // API 키가 없으면 프로토타입 모드 실행
        console.warn("API_KEY가 감지되지 않아 프로토타입 모드로 실행합니다.");
        resultData = await mockGenerate(text, bibleVerse);
      }

      const now = new Date();
      const newReflection: Reflection = {
        id: Date.now().toString(),
        date: now.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' }),
        month: now.toLocaleString('en-US', { month: 'long' }).toUpperCase(),
        dayName: now.toLocaleString('en-US', { weekday: 'short' }).toUpperCase(),
        dayNum: now.getDate().toString(),
        subDayNum: "1",
        image: resultData.imageUrl,
        title: resultData.title,
        contentLines: resultData.contentLines,
        source: source || "나의 마음 한 조각",
        author: author || "나노바나나",
        tags: ["#기록", "#성장"],
        music,
        bibleVerse
      };

      setCurrentReflection(newReflection);
      setHistory(prev => [newReflection, ...prev]);
      setView('reveal');
    } catch (error) {
      console.error("Generation failed, falling back to mock", error);
      // 에러 발생 시에도 중단하지 않고 가상 데이터로 진행 (프로토타입 환경 배려)
      const fallbackData = await mockGenerate(text, bibleVerse);
      const now = new Date();
      const fallbackReflection: Reflection = {
        id: Date.now().toString(),
        date: now.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' }),
        month: now.toLocaleString('en-US', { month: 'long' }).toUpperCase(),
        dayName: now.toLocaleString('en-US', { weekday: 'short' }).toUpperCase(),
        dayNum: now.getDate().toString(),
        subDayNum: "1",
        image: fallbackData.imageUrl,
        title: fallbackData.title,
        contentLines: fallbackData.contentLines,
        source: source || "마음의 기록 (Demo)",
        author: author || "나노바나나",
        tags: ["#데모", "#성장"],
        music,
        bibleVerse
      };
      setCurrentReflection(fallbackReflection);
      setHistory(prev => [fallbackReflection, ...prev]);
      setView('reveal');
    } finally {
      setIsGenerating(false);
    }
  };

  const saveAndGoToArchive = () => {
    setView('archive');
  };

  const showTabBar = view === 'input' || view === 'archive' || view === 'social';

  return (
    <div className="max-w-md mx-auto h-screen relative shadow-2xl bg-[#EBEBE6] flex flex-col overflow-hidden">
      <div className="flex-1 relative overflow-hidden flex flex-col">
        {view === 'input' && <InputScreen onSubmit={handleInputSubmit} />}
        {view === 'loading' && <LoadingScreen />}
        {view === 'reveal' && currentReflection && (
          <RevealScreen 
            reflection={currentReflection} 
            onSave={saveAndGoToArchive} 
          />
        )}
        {view === 'archive' && <ArchiveScreen reflections={history} />}
        {view === 'social' && <SocialScreen />}
      </div>
      
      {showTabBar && (
        <nav className="h-20 bg-[#EBEBE6] border-t border-black/5 px-6 flex justify-around items-center shrink-0 z-50">
          <button 
            onClick={() => setView('input')} 
            className={`flex flex-col items-center gap-1 transition-all ${view === 'input' ? 'text-black' : 'text-stone-300'}`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            <span className="text-[9px] font-black tracking-tight">기록하기</span>
          </button>

          <button 
            onClick={() => setView('archive')} 
            className={`flex flex-col items-center gap-1 transition-all ${view === 'archive' ? 'text-black' : 'text-stone-300'}`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <span className="text-[9px] font-black tracking-tight">저니</span>
          </button>

          <button 
            onClick={() => setView('social')} 
            className={`flex flex-col items-center gap-1 transition-all ${view === 'social' ? 'text-black' : 'text-stone-300'}`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span className="text-[9px] font-black tracking-tight">정원</span>
          </button>
        </nav>
      )}
    </div>
  );
};

export default App;
