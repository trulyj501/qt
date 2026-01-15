
export type AppView = 'input' | 'loading' | 'reveal' | 'archive' | 'social';

export interface Reflection {
  id: string;
  date: string;
  month: string;
  dayName: string;
  dayNum: string;
  subDayNum: string;
  image: string;
  title: string;
  contentLines: string[];
  source: string;
  author: string;
  tags: string[];
  music?: string;
  bibleVerse?: string;
}

export type ArchiveTab = 'daily' | 'weekly' | 'yearly';
