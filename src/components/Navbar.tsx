import React from 'react';
import { GradeLevel, UserProgress } from '../types';
import { sounds } from '../utils/audio';
import {
  Home,
  BookOpen,
  Bot,
  BrainCircuit,
  Trophy,
  Rocket,
  Wrench,
  Award,
  GraduationCap,
  Play,
  Menu,
  X
} from 'lucide-react';

export type NavTab =
  | 'home'
  | 'lessons'
  | 'practice'
  | 'tutor'
  | 'challenges'
  | 'projects'
  | 'debugger'
  | 'playground'
  | 'progress'
  | 'teacher';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  grade: GradeLevel;
  onSelectGrade: (grade: GradeLevel) => void;
  progress: UserProgress;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  grade,
  onSelectGrade,
  progress
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems: { id: NavTab; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'lessons', label: '📘 BÀI HỌC SCRATCH', icon: <BookOpen className="w-4 h-4" />, color: 'hover:text-blue-500' },
    { id: 'practice', label: '🎮 LUYỆN TẬP', icon: <BrainCircuit className="w-4 h-4" />, color: 'hover:text-indigo-500' },
    { id: 'tutor', label: '🤖 GIA SƯ SCRATCH', icon: <Bot className="w-4 h-4" />, color: 'hover:text-amber-500' },
    { id: 'debugger', label: '🕵️ THÁM TỬ SỬA LỖI', icon: <Wrench className="w-4 h-4" />, color: 'hover:text-rose-500' },
    { id: 'teacher', label: '👩‍🏫 GÓC GIÁO VIÊN', icon: <GraduationCap className="w-4 h-4" />, color: 'hover:text-blue-600' }
  ];

  const handleTabClick = (tab: NavTab) => {
    sounds.playSnap();
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner: Logo + Grade Switcher + Stats */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-2">
        {/* Logo */}
        <div
          onClick={() => handleTabClick('home')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-2xl shadow-sm group-hover:scale-105 transition-transform">
            🐱
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-sm md:text-base text-slate-900 tracking-tight leading-tight">
                SCRATCH AI
              </span>
              <span className="text-[10px] font-black uppercase bg-amber-400 text-slate-900 px-1.5 py-0.2 rounded-md">
                TIỂU HỌC
              </span>
            </div>
            <p className="text-[10px] font-bold text-slate-500 hidden sm:block">
              Người bạn đồng hành lập trình Lớp 4 – 5
            </p>
          </div>
        </div>

        {/* Center: Grade Switcher (Em học Lớp 4 vs Lớp 5) */}
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button
            onClick={() => {
              sounds.playSnap();
              onSelectGrade(4);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              grade === 4
                ? 'bg-amber-400 text-slate-900 shadow-sm scale-102'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Lớp 4
          </button>
          <button
            onClick={() => {
              sounds.playSnap();
              onSelectGrade(5);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              grade === 5
                ? 'bg-indigo-600 text-white shadow-sm scale-102'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Lớp 5
          </button>
        </div>

        {/* Right: XP / Stars / Profile pill */}
        <div className="flex items-center gap-2">
          {/* XP Pill */}
          <div
            onClick={() => handleTabClick('progress')}
            className="hidden sm:flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2.5 py-1.5 rounded-xl cursor-pointer transition-colors text-xs font-black text-amber-900"
            title="Điểm kinh nghiệm của em"
          >
            <span>⚡</span>
            <span>{progress.xp} XP</span>
          </div>

          {/* Stars Pill */}
          <div
            onClick={() => handleTabClick('practice')}
            className="flex items-center gap-1 bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 px-2.5 py-1.5 rounded-xl cursor-pointer transition-colors text-xs font-black text-yellow-900"
            title="Số ngôi sao đạt được"
          >
            <span>⭐</span>
            <span>{progress.stars}</span>
          </div>

          {/* Nút Học Scratch kèm biểu tượng mèo Scratch */}
          <button
            onClick={() => handleTabClick('lessons')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs shadow-xs hover:shadow transition-all cursor-pointer"
            title="Bắt đầu học Scratch ngay"
          >
            <span className="text-base leading-none">🐱</span>
            <span className="leading-none">Học Scratch</span>
          </button>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Navigation Links Bar */}
      <nav className="border-t border-slate-100 hidden xl:block bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1 py-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                  currentTab === item.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : `text-slate-600 ${item.color} hover:bg-white`
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div
            onClick={() => handleTabClick('practice')}
            className="text-[11px] font-bold text-slate-500 flex items-center gap-1 cursor-pointer hover:text-amber-600 py-1.5"
          >
            <span>🔥 Chuỗi {progress.streakDays} ngày học</span>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white p-4 space-y-2 shadow-lg animate-fadeIn">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  currentTab === item.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
