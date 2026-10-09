import React from 'react';
import { GradeLevel, UserProgress } from '../types';
import { LESSONS_DATA } from '../data/lessonsData';
import { STUDENT_LEVELS } from '../data/challengesData';
import { sounds } from '../utils/audio';
import { NavTab } from './Navbar';
import {
  BookOpen,
  Play,
  Bot,
  BrainCircuit,
  Trophy,
  Rocket,
  Wrench,
  Award,
  Sparkles,
  ArrowRight,
  Target,
  CheckCircle2,
  Circle,
  Lightbulb,
  Flame
} from 'lucide-react';

interface HomeHeroProps {
  grade: GradeLevel;
  onSelectGrade: (grade: GradeLevel) => void;
  onNavigate: (tab: NavTab) => void;
  progress: UserProgress;
  onToggleMission?: (missionId: string) => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  grade,
  onSelectGrade,
  onNavigate,
  progress,
  onToggleMission
}) => {
  // Current student level computation
  const currentLevel =
    STUDENT_LEVELS.find((lvl) => progress.xp >= lvl.minXP && progress.xp <= lvl.maxXP) ||
    STUDENT_LEVELS[0];

  // Grade lessons count and completion
  const gradeLessons = LESSONS_DATA.filter((l) => l.grade === grade);
  const completedInGrade = gradeLessons.filter((l) =>
    progress.completedLessons.includes(l.id)
  ).length;
  const progressPercent = Math.round((completedInGrade / Math.max(1, gradeLessons.length)) * 100);

  // Current lesson in progress
  const currentLesson =
    LESSONS_DATA.find((l) => l.id === progress.currentLessonId) ||
    gradeLessons.find((l) => !progress.completedLessons.includes(l.id)) ||
    gradeLessons[0];

  // AI Recommendation engine based on student mistakes or progress
  const getAiRecommendation = () => {
    const mistakes = progress.mistakeTopics || {};
    const mistakeEntries = Object.entries(mistakes);

    if (mistakeEntries.length > 0) {
      const topMistake = mistakeEntries.sort((a, b) => b[1] - a[1])[0];
      return `Thầy Mèo nhận thấy em cần củng cố thêm phần "${topMistake[0]}". Hãy vào khu Luyện Tập để làm thêm vài bài nhé!`;
    }

    if (completedInGrade >= 5) {
      return `Em học rất chăm chỉ và đã hoàn thành ${completedInGrade} bài học! Thầy Mèo khuyên em hãy thử sức với Thử Thách Mê Cung hoặc Dự Án Hứng Táo nhé! 🍎`;
    }

    return `Chào bạn nhỏ! Hôm nay em hãy hoàn thành "${currentLesson.title}" để nhận thêm 30 XP và mở khóa huy hiệu mới nhé! 🚀`;
  };

  // Find nearest badge to unlock
  const nextBadge = progress.badges.find((b) => !b.unlocked) || progress.badges[0];

  return (
    <div className="space-y-6 pb-8">
      {/* Top Welcome Banner with Scratch Cat */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white p-6 md:p-8 shadow-md">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider text-white border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Nền Tảng Học Scratch Chuẩn Sư Phạm Lớp 4 – 5</span>
            </div>

            <h1 className="text-2xl md:text-4xl font-black tracking-tight leading-tight">
              Xin chào, lập trình viên nhí! 🐱
            </h1>

            <p className="text-amber-100 text-xs md:text-sm font-semibold max-w-2xl leading-relaxed">
              Chào mừng em đến với thế giới Scratch! Hãy cùng Mèo Scratch khám phá những khối lệnh thú vị và sáng tạo các trò chơi thật vui nhé!
            </p>

            {/* Current Level Pill */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-black text-white border border-white/20 flex items-center gap-1.5">
                <span>Cấp độ:</span>
                <span className="text-amber-200">{currentLevel.name}</span>
              </div>
              <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-black text-white border border-white/20 flex items-center gap-1.5">
                <span>⚡ {progress.xp} XP</span>
              </div>
              <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-black text-white border border-white/20 flex items-center gap-1.5">
                <span>⭐ {progress.stars} Sao</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  sounds.playSnap();
                  onNavigate('lessons');
                }}
                className="px-5 py-2.5 rounded-xl bg-white text-slate-900 font-black text-xs md:text-sm shadow-md hover:bg-amber-50 transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span>Học Tiếp: {currentLesson.title.split(':')[0]}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  sounds.playSnap();
                  onNavigate('tutor');
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-amber-300 font-black text-xs md:text-sm shadow-md transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <Bot className="w-4 h-4 text-amber-400" />
                <span>Hỏi Gia Sư AI</span>
              </button>
            </div>
          </div>

          {/* Animated Scratch Cat Figure */}
          <div className="md:col-span-4 flex flex-col items-center justify-center">
            <div
              className="relative group cursor-pointer"
              onClick={() => sounds.playMeow()}
              title="Bấm vào chú mèo để nghe tiếng Meow!"
            >
              <div className="w-36 h-36 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-4 border-white/40 shadow-inner group-hover:scale-105 transition-transform">
                <span className="text-7xl drop-shadow-md select-none">🐱</span>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-900 text-amber-300 font-extrabold text-[11px] px-3 py-0.5 rounded-full shadow-md whitespace-nowrap">
                Thầy Mèo Scratch
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grade Selector & Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Left: Grade toggle & Lessons in Progress */}
        <div className="md:col-span-7 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Tiến Độ Lộ Trình Học Tập Lớp {grade}</span>
            </h3>

            {/* Grade Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => {
                  sounds.playSnap();
                  onSelectGrade(4);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  grade === 4 ? 'bg-amber-400 text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Lớp 4
              </button>
              <button
                onClick={() => {
                  sounds.playSnap();
                  onSelectGrade(5);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  grade === 5 ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Lớp 5
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5">
              <span>Đã hoàn thành: {completedInGrade} / {gradeLessons.length} bài</span>
              <span className="text-indigo-600 font-black">{progressPercent}%</span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Current Lesson card */}
          <div className="p-4 bg-indigo-50/70 rounded-2xl border border-indigo-100 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider">
                Bài học đang học:
              </span>
              <h4 className="text-sm font-black text-indigo-950 mt-0.5">
                {currentLesson.title}
              </h4>
              <p className="text-xs text-slate-600 line-clamp-1 mt-0.5 font-medium">
                {currentLesson.objectives?.know || currentLesson.objective?.know || 'Khám phá kiến thức lập trình Scratch'}
              </p>
            </div>

            <button
              onClick={() => {
                sounds.playSnap();
                onNavigate('lessons');
              }}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-xs shrink-0 cursor-pointer"
            >
              Học Ngay ➔
            </button>
          </div>
        </div>

        {/* Right: Daily Missions Checklist */}
        <div className="md:col-span-5 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-emerald-600" />
              <span>Nhiệm Vụ Hôm Nay</span>
            </h3>
            <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
              Thưởng +50 XP
            </span>
          </div>

          <div className="space-y-2">
            {progress.dailyMissions?.map((m) => (
              <div
                key={m.id}
                onClick={() => onToggleMission && onToggleMission(m.id)}
                className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  m.completed
                    ? 'bg-emerald-50/60 border-emerald-300 text-emerald-900'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  {m.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                  <span className={`text-xs font-bold ${m.completed ? 'line-through opacity-75' : ''}`}>
                    {m.title}
                  </span>
                </div>
                <span className="text-[10px] font-black text-amber-600">+{m.xpReward} XP</span>
              </div>
            ))}
          </div>

          {/* Nearest Badge */}
          {nextBadge && (
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-semibold text-[11px]">Huy hiệu gần đạt:</span>
              <span className="font-black text-amber-600">{nextBadge.title}</span>
            </div>
          )}
        </div>
      </div>

      {/* AI Recommendation Banner (Personalized) */}
      <div className="bg-amber-50 rounded-3xl p-4 border border-amber-200 flex items-start gap-3">
        <div className="w-9 h-9 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center shrink-0 text-lg shadow-2xs font-bold">
          🤖
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase text-amber-900 tracking-wider">
              AI Gợi Ý Cho Em:
            </span>
          </div>
          <p className="text-xs text-amber-950 font-bold mt-0.5 leading-relaxed">
            {getAiRecommendation()}
          </p>
        </div>
      </div>

      {/* 5 Main Core Learning Hubs Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>🚀 5 Phân Hệ Học Tập Trọng Tâm</span>
          </h2>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            Bám sát SGK Tin học {grade} Kết nối tri thức
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Phân hệ 1: BÀI HỌC SCRATCH */}
          <div
            onClick={() => {
              sounds.playSnap();
              onNavigate('lessons');
            }}
            className="group bg-white rounded-3xl p-6 border-2 border-slate-200 hover:border-blue-500 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                📘
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                Phân hệ 1
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-2 group-hover:text-blue-600 transition-colors">
                BÀI HỌC SCRATCH
              </h3>
              <p className="text-xs text-slate-600 mt-2 font-medium leading-relaxed">
                Học lý thuyết, quan sát, tìm hiểu và thực hành theo đúng cấu trúc 8 phần SGK Tin học Lớp {grade}.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-blue-600">
              <span>Vào học ngay</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Phân hệ 2: LUYỆN TẬP */}
          <div
            onClick={() => {
              sounds.playSnap();
              onNavigate('practice');
            }}
            className="group bg-white rounded-3xl p-6 border-2 border-slate-200 hover:border-indigo-500 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🎮
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                Phân hệ 2
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-2 group-hover:text-indigo-600 transition-colors">
                LUYỆN TẬP
              </h3>
              <p className="text-xs text-slate-600 mt-2 font-medium leading-relaxed">
                Ngân hàng bài tập tương tác: Trắc nghiệm, Đúng/Sai, Sắp xếp thứ tự lệnh, Dự đoán kết quả với phản hồi sư phạm 3 bước.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-indigo-600">
              <span>Bắt đầu luyện tập</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Phân hệ 3: GIA SƯ SCRATCH */}
          <div
            onClick={() => {
              sounds.playSnap();
              onNavigate('tutor');
            }}
            className="group bg-white rounded-3xl p-6 border-2 border-slate-200 hover:border-amber-500 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🤖
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">
                Phân hệ 3
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-2 group-hover:text-amber-600 transition-colors">
                GIA SƯ SCRATCH
              </h3>
              <p className="text-xs text-slate-600 mt-2 font-medium leading-relaxed">
                Thầy Mèo AI hỗ trợ theo 5 cấp độ Socratic: gợi mở, gợi ý, chỉ nhóm lệnh, giải thích, đưa ví dụ. Không làm bài thay!
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-amber-600">
              <span>Trò chuyện cùng Gia sư</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Phân hệ 4: THÁM TỬ SỬA LỖI */}
          <div
            onClick={() => {
              sounds.playSnap();
              onNavigate('debugger');
            }}
            className="group bg-white rounded-3xl p-6 border-2 border-slate-200 hover:border-rose-500 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🕵️
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full">
                Phân hệ 4
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-2 group-hover:text-rose-600 transition-colors">
                THÁM TỬ SỬA LỖI
              </h3>
              <p className="text-xs text-slate-600 mt-2 font-medium leading-relaxed">
                Quy trình phân tích 9 bước sư phạm: chẩn đoán sai thứ tự, thiếu lệnh hay sai cấu trúc để em tự tay sửa lỗi.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-rose-600">
              <span>Khám lỗi chương trình</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Phân hệ 5: GÓC GIÁO VIÊN */}
          <div
            onClick={() => {
              sounds.playSnap();
              onNavigate('teacher');
            }}
            className="group bg-white rounded-3xl p-6 border-2 border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between md:col-span-2 lg:col-span-1"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                👩‍🏫
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Phân hệ 5
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-2 group-hover:text-emerald-600 transition-colors">
                GÓC GIÁO VIÊN
              </h3>
              <p className="text-xs text-slate-600 mt-2 font-medium leading-relaxed">
                Khu vực chuyên biệt cho giáo viên: tra cứu chuẩn kiến thức, tạo phiếu bài tập bằng AI, bài thực hành và in đề kiểm tra.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-emerald-600">
              <span>Cổng giáo viên</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
