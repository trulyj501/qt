
import React, { useState } from 'react';
import { ArchiveTab, Reflection } from '../types';
import DailyView from './DailyView';
import WeeklyView from './WeeklyView';
import YearlyView from './YearlyView';

interface Props {
  reflections: Reflection[];
}

const ArchiveScreen: React.FC<Props> = ({ reflections }) => {
  const [activeTab, setActiveTab] = useState<ArchiveTab>('daily');

  return (
    <div className="flex-1 bg-[#EBEBE6] flex flex-col overflow-hidden">
      {/* Header */}
      <header className="px-8 pt-12 pb-6">
        <h2 className="serif text-3xl font-black text-stone-900">저니</h2>
        <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-[0.2em] font-bold">Your Growth Journey</p>
      </header>

      {/* Tabs Navigation */}
      <div className="px-8 pb-6">
        <nav className="flex bg-stone-200/50 p-1 rounded-2xl border border-white/40">
          {(['daily', 'weekly', 'yearly'] as ArchiveTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-xs font-bold transition-all duration-300 rounded-xl ${
                activeTab === tab 
                  ? 'bg-white text-stone-900 shadow-sm' 
                  : 'text-stone-400'
              }`}
            >
              {tab === 'daily' ? '일간' : tab === 'weekly' ? '주간' : '연간'}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Container */}
      <main className="flex-1 overflow-y-auto px-8 pb-10 custom-scrollbar">
        {activeTab === 'daily' && <DailyView reflections={reflections} />}
        {activeTab === 'weekly' && <WeeklyView reflections={reflections} />}
        {activeTab === 'yearly' && <YearlyView reflections={reflections} />}
      </main>
    </div>
  );
};

export default ArchiveScreen;
