import React, { useState } from 'react';
import { Lesson, GradeLevel, ScratchBlockDef } from '../types';
import { LESSONS_DATA } from '../data/lessonsData';
import { LessonViewer } from './LessonViewer';
import { sounds } from '../utils/audio';
import {
  BookOpen,
  CheckCircle,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Layers,
  Target
} from 'lucide-react';

interface LessonsCatalogProps {
  grade: GradeLevel;
  completedLessons: string[];
  onCompleteLesson: (lessonId: string, xpReward: number) => void;
  onOpenPlaygroundWithBlocks?: (blocks: ScratchBlockDef[]) => void;
}

export const LessonsCatalog: React.FC<LessonsCatalogProps> = ({
  grade,
  completedLessons,
  onCompleteLesson,
  onOpenPlaygroundWithBlocks
}) => {
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  // Filter lessons for the current grade
  const gradeLessons = LESSONS_DATA.filter((l) => l.grade === grade);

  // Unique themes in current grade
  const themes = Array.from(new Set(gradeLessons.map((l) => l.themeTitle)));

  const filteredLessons = gradeLessons.filter((l) => {
    return selectedTheme === 'all' || l.themeTitle === selectedTheme;
  });

  const activeLesson = LESSONS_DATA.find((l) => l.id === activeLessonId);

  if (activeLesson) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => {
            sounds.playSnap();
            setActiveLessonId(null);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-black text-xs transition-colors cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Danh sách bài học Lớp {grade}</span>
        </button>

        <LessonViewer
          lesson={activeLesson}
          onOpenPlaygroundWithBlocks={onOpenPlaygroundWithBlocks}
          onCompleteLesson={onCompleteLesson}
          onNavigateNextLesson={(nextId) => {
            sounds.playSnap();
            setActiveLessonId(nextId);
          }}
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner">
            📚
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
              Lộ Trình Học Tập Chuẩn Lớp {grade}
            </span>
            <h2 className="text-2xl font-black mt-1">Kho Bài Học Scratch Có Lộ Trình</h2>
            <p className="text-blue-100 text-xs md:text-sm mt-0.5 font-medium">
              Thiết kế trực quan, từng bước theo cấu trúc 9 phần chuẩn sư phạm Tiểu học.
            </p>
          </div>
        </div>

        {/* Theme Tabs */}
        <div className="flex flex-wrap gap-2 mt-5">
          <button
            onClick={() => {
              sounds.playSnap();
              setSelectedTheme('all');
            }}
            className={`px-3.5 py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
              selectedTheme === 'all'
                ? 'bg-amber-400 text-slate-900 shadow-md scale-105'
                : 'bg-white/15 text-white hover:bg-white/25'
            }`}
          >
            Tất cả bài học ({gradeLessons.length})
          </button>
          {themes.map((th, idx) => (
            <button
              key={idx}
              onClick={() => {
                sounds.playSnap();
                setSelectedTheme(th);
              }}
              className={`px-3.5 py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                selectedTheme === th
                  ? 'bg-amber-400 text-slate-900 shadow-md scale-105'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              {th.split(':')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredLessons.map((lesson) => {
            const isCompleted = completedLessons.includes(lesson.id);

            return (
              <div
                key={lesson.id}
                onClick={() => {
                  sounds.playSnap();
                  setActiveLessonId(lesson.id);
                }}
                className={`p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between group ${
                  isCompleted
                    ? 'bg-emerald-50/60 border-emerald-300 hover:border-emerald-400 shadow-2xs'
                    : 'bg-white border-slate-200 hover:border-indigo-400 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                      {lesson.themeTitle.split(':')[0]}
                    </span>
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        <span>Đã học</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400">
                        Chưa học
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {lesson.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed font-medium">
                    {lesson.keyKnowledge?.summary || lesson.discovery?.summary || ''}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-indigo-600">
                  <span>Mục tiêu: {(lesson.objectives?.know || lesson.objective?.know || '').slice(0, 30)}...</span>
                  <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
