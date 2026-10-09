import React from 'react';
import { UserProgress } from '../types';
import { STUDENT_LEVELS } from '../data/challengesData';
import { sounds } from '../utils/audio';
import {
  Trophy,
  Award,
  Star,
  CheckCircle2,
  Lock,
  Flame,
  Target,
  Wrench,
  BookOpen,
  Rocket,
  BrainCircuit
} from 'lucide-react';

interface ProgressDashboardProps {
  progress: UserProgress;
  onResetProgress: () => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  progress,
  onResetProgress
}) => {
  // Compute student level from 5 levels
  const currentLevelIndex = STUDENT_LEVELS.findIndex(
    (lvl) => progress.xp >= lvl.minXP && progress.xp <= lvl.maxXP
  );
  const currentLevel = STUDENT_LEVELS[currentLevelIndex !== -1 ? currentLevelIndex : 0];
  const nextLevel = STUDENT_LEVELS[currentLevelIndex + 1] || null;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-6 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl shadow-inner border border-white/30">
              {progress.avatar}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black">Lập trình viên nhí</h2>
                <span className="text-xs font-black bg-black/20 px-2.5 py-0.5 rounded-full">
                  Lớp {progress.grade}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-black text-amber-200 uppercase tracking-wider">
                  Cấp độ:
                </span>
                <span className="text-xs font-black text-white bg-white/20 px-2.5 py-0.5 rounded-lg">
                  {currentLevel.name}
                </span>
              </div>
            </div>
          </div>

          {/* Quick stats counters */}
          <div className="flex items-center gap-3">
            <div className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-center">
              <span className="text-[10px] uppercase font-bold text-amber-200 block">Kinh nghiệm</span>
              <span className="text-xl font-black text-white">{progress.xp} XP</span>
            </div>
            <div className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-center">
              <span className="text-[10px] uppercase font-bold text-amber-200 block">Ngôi sao</span>
              <span className="text-xl font-black text-white flex items-center justify-center gap-1">
                <span>⭐</span> {progress.stars}
              </span>
            </div>
            <div className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-center">
              <span className="text-[10px] uppercase font-bold text-amber-200 block">Chuỗi ngày</span>
              <span className="text-xl font-black text-white flex items-center justify-center gap-1">
                <span>🔥</span> {progress.streakDays}
              </span>
            </div>
          </div>
        </div>

        {/* Level Progression Bar */}
        <div className="mt-6 pt-4 border-t border-white/20">
          <div className="flex justify-between text-xs font-bold text-amber-100 mb-1.5">
            <span>Tiến độ thăng cấp: {currentLevel.name}</span>
            <span>
              {progress.xp} / {nextLevel ? nextLevel.minXP : 'Đỉnh cao'} XP
            </span>
          </div>
          <div className="h-3 w-full bg-black/20 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-amber-300 to-yellow-300 rounded-full transition-all duration-500 shadow-sm"
              style={{
                width: nextLevel
                  ? `${Math.min(100, (progress.xp / nextLevel.minXP) * 100)}%`
                  : '100%'
              }}
            />
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* 6 Key Learning Metrics */}
        <div>
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-3">
            Bảng theo dõi thành tích học tập:
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-100 text-center">
              <span className="text-[10px] font-bold text-blue-700 uppercase block">Bài hoàn thành</span>
              <div className="text-xl font-black text-blue-950 mt-1">
                {progress.completedLessons.length}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-100 text-center">
              <span className="text-[10px] font-bold text-indigo-700 uppercase block">Bài tập đúng</span>
              <div className="text-xl font-black text-indigo-950 mt-1">
                {progress.completedExercises.length}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-100 text-center">
              <span className="text-[10px] font-bold text-purple-700 uppercase block">Thử thách</span>
              <div className="text-xl font-black text-purple-950 mt-1">
                {progress.completedChallenges.length}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-100 text-center">
              <span className="text-[10px] font-bold text-teal-700 uppercase block">Dự án hoàn thành</span>
              <div className="text-xl font-black text-teal-950 mt-1">
                {progress.completedProjects.length}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-100 text-center">
              <span className="text-[10px] font-bold text-rose-700 uppercase block">Lỗi đã tự sửa</span>
              <div className="text-xl font-black text-rose-950 mt-1">
                {progress.fixedBugsCount}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-100 text-center">
              <span className="text-[10px] font-bold text-amber-700 uppercase block">Huy hiệu đạt</span>
              <div className="text-xl font-black text-amber-950 mt-1">
                {progress.badges.filter((b) => b.unlocked).length} / {progress.badges.length}
              </div>
            </div>
          </div>
        </div>

        {/* 7 Standard Badges */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Bộ Sưu Tập 7 Huy Hiệu Vinh Danh</span>
            </h3>
            <span className="text-xs font-bold text-slate-500">
              Đã mở khóa {progress.badges.filter((b) => b.unlocked).length} / 7
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {progress.badges.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border-2 transition-all flex items-start gap-3 ${
                  badge.unlocked
                    ? 'bg-amber-50/70 border-amber-400 text-amber-950 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-400 opacity-75'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 text-xl font-bold ${
                    badge.unlocked ? 'bg-amber-400 text-slate-900 shadow-2xs' : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {badge.unlocked ? '🏅' : <Lock className="w-4 h-4" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4
                      className={`text-xs md:text-sm font-black ${
                        badge.unlocked ? 'text-slate-900' : 'text-slate-500'
                      }`}
                    >
                      {badge.title}
                    </h4>
                    {badge.unlocked && (
                      <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        Đạt được
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed font-medium">
                    {badge.description}
                  </p>
                  <span className="text-[10px] text-slate-400 block mt-1 font-semibold">
                    Điều kiện: {badge.requirement}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5 Levels Roadmap */}
        <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200 space-y-3">
          <span className="text-xs font-black uppercase text-slate-600 tracking-wider block">
            5 Cấp Độ Trên Con Đường Lập Trình Viên Nhí:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
            {STUDENT_LEVELS.map((lvl) => {
              const isCurrent = currentLevel.level === lvl.level;
              const isPassed = progress.xp >= lvl.minXP;

              return (
                <div
                  key={lvl.level}
                  className={`p-3 rounded-2xl border-2 transition-all text-center ${
                    isCurrent
                      ? 'bg-amber-100 border-amber-500 font-black text-amber-950 shadow-xs scale-102 ring-2 ring-amber-300'
                      : isPassed
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : 'bg-white border-slate-200 text-slate-400'
                  }`}
                >
                  <div className="text-lg mb-1">{lvl.name.split(' ')[0]}</div>
                  <div className="font-black text-xs">{lvl.name.slice(2)}</div>
                  <span className="text-[10px] opacity-80 block mt-0.5">
                    {lvl.minXP} XP
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reset progress */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-400">
            Dữ liệu học tập được tự động lưu trong trình duyệt của em.
          </span>
          <button
            onClick={onResetProgress}
            className="text-rose-500 hover:text-rose-700 font-bold underline cursor-pointer"
          >
            Làm mới lại tiến trình từ đầu
          </button>
        </div>
      </div>
    </div>
  );
};
