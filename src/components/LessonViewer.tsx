import React, { useState } from 'react';
import { Lesson, ScratchBlockDef } from '../types';
import { ScratchBlock } from './ScratchBlock';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Target,
  Sparkles,
  Play,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Trophy,
  ChevronRight,
  BookMarked,
  Eye,
  Search,
  CheckCheck,
  GraduationCap,
  Lightbulb,
  ListOrdered
} from 'lucide-react';

interface LessonViewerProps {
  lesson: Lesson;
  onOpenPlaygroundWithBlocks?: (blocks: ScratchBlockDef[]) => void;
  onCompleteLesson?: (lessonId: string, xpReward: number) => void;
  onNavigateNextLesson?: (nextLessonId: string) => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  lesson,
  onOpenPlaygroundWithBlocks,
  onCompleteLesson,
  onNavigateNextLesson
}) => {
  // Evaluation Check state (Part 7: Kiểm tra kết quả)
  const [evalChecked, setEvalChecked] = useState<boolean>(false);
  const [evalStatus, setEvalStatus] = useState<'correct' | 'partial' | 'review' | null>(null);
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);

  const handleCheckEvaluation = (status: 'correct' | 'partial' | 'review') => {
    sounds.playSnap();
    setEvalChecked(true);
    setEvalStatus(status);

    if (status === 'correct') {
      sounds.playSuccess();
      try {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      } catch (e) {
        // ignore
      }
      setHasCompleted(true);
      if (onCompleteLesson) {
        onCompleteLesson(lesson.id, lesson.xpReward);
      }
    } else {
      sounds.playBoop();
    }
  };

  const objectives = lesson.objectives || lesson.objective || {
    know: 'Nhận biết các khối lệnh và môi trường lập trình trực quan Scratch.',
    do: 'Thực hiện thao tác kéo thả và chạy chương trình.',
    thinking: 'Hình thành tư duy thuật toán và thứ tự thực hiện các bước.'
  };

  const keyKnowledge = lesson.keyKnowledge || {
    summary: lesson.discovery?.summary || '',
    points: lesson.discovery?.points || []
  };

  const practiceBlocks =
    lesson.practice?.targetBlocks ||
    lesson.practice?.initialBlocks ||
    lesson.example?.blocks ||
    [];

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 p-6 text-white">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
            {lesson.themeTitle}
          </span>
          <span className="text-xs font-black bg-black/20 px-3 py-1 rounded-full">
            Lớp {lesson.grade} • Bài {lesson.lessonNumber}
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-black mt-2 tracking-tight">
          {lesson.title}
        </h1>

        {/* PHẦN 1: MỤC TIÊU BÀI HỌC (3 câu hỏi cốt lõi SGK) */}
        <div className="mt-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div>
            <span className="font-black text-amber-200 block mb-0.5">🎯 1. Học sinh biết gì?</span>
            <p className="text-white/90 font-medium leading-relaxed">{objectives.know}</p>
          </div>
          <div>
            <span className="font-black text-emerald-200 block mb-0.5">🛠️ 2. Học sinh làm được gì?</span>
            <p className="text-white/90 font-medium leading-relaxed">{objectives.do}</p>
          </div>
          <div>
            <span className="font-black text-cyan-200 block mb-0.5">🧠 3. Phát triển tư duy gì?</span>
            <p className="text-white/90 font-medium leading-relaxed">{objectives.thinking}</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* PHẦN 2: KIẾN THỨC CẦN BIẾT */}
        {keyKnowledge.summary && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-xl bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center">
                1
              </span>
              <h2 className="text-base font-black text-slate-800">Kiến Thức Cần Biết</h2>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <p className="text-xs md:text-sm font-bold text-slate-700 leading-relaxed">
                {keyKnowledge.summary}
              </p>

              {keyKnowledge.points && keyKnowledge.points.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                  {keyKnowledge.points.map((pt, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                      <div className="text-xl mb-1">{pt.icon || '✨'}</div>
                      <h4 className="text-xs font-black text-slate-900">{pt.title}</h4>
                      <p className="text-[11px] text-slate-600 mt-0.5 font-medium leading-relaxed">
                        {pt.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* PHẦN 3: THUẬT NGỮ CẦN NHỚ */}
        {lesson.keywords && lesson.keywords.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-xl bg-purple-100 text-purple-700 font-black text-xs flex items-center justify-center">
                2
              </span>
              <h2 className="text-base font-black text-slate-800 flex items-center gap-1.5">
                <BookMarked className="w-4 h-4 text-purple-600" />
                <span>Thuật Ngữ Chuẩn SGK Cần Nhớ</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {lesson.keywords.map((kw, idx) => (
                <div key={idx} className="p-3 bg-purple-50/60 rounded-2xl border border-purple-200 text-xs">
                  <span className="font-black text-purple-900 block mb-0.5 font-mono">
                    📌 {kw.term}
                  </span>
                  <p className="text-slate-600 font-medium leading-relaxed">{kw.meaning}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PHẦN 4: QUAN SÁT */}
        {lesson.observation && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-xl bg-cyan-100 text-cyan-700 font-black text-xs flex items-center justify-center">
                3
              </span>
              <h2 className="text-base font-black text-slate-800 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-cyan-600" />
                <span>Quan Sát & Trực Quan Hóa</span>
              </h2>
            </div>

            <div className="p-4 bg-cyan-50/50 rounded-2xl border border-cyan-200 space-y-3">
              <h3 className="text-xs md:text-sm font-black text-cyan-950">
                {lesson.observation.title}
              </h3>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                {lesson.observation.description}
              </p>

              {lesson.observation.sampleBlocks && lesson.observation.sampleBlocks.length > 0 && (
                <div className="pt-2">
                  <span className="text-[11px] font-black uppercase text-cyan-900 block mb-1.5">
                    Các khối lệnh mẫu cần quan sát:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {lesson.observation.sampleBlocks.map((b) => (
                      <div key={b.id} className="space-y-1">
                        <ScratchBlock block={b} size="sm" />
                        {b.explanation && (
                          <p className="text-[10px] text-slate-500 font-medium">{b.explanation}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {lesson.observation.highlight && (
                <div className="p-2.5 bg-white rounded-xl border border-cyan-200 text-xs font-bold text-cyan-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-600 shrink-0" />
                  <span>{lesson.observation.highlight}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PHẦN 5: TÌM HIỂU */}
        {lesson.exploration && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-xl bg-amber-100 text-amber-700 font-black text-xs flex items-center justify-center">
                4
              </span>
              <h2 className="text-base font-black text-slate-800 flex items-center gap-1.5">
                <Search className="w-4 h-4 text-amber-600" />
                <span>Tìm Hiểu & Tư Duy Thuật Toán</span>
              </h2>
            </div>

            <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-3">
              <div className="p-3 bg-white rounded-xl border border-amber-200">
                <span className="text-[10px] font-black uppercase text-amber-700 block mb-1">
                  Câu hỏi gợi mở:
                </span>
                <p className="text-xs md:text-sm font-black text-slate-800 leading-relaxed">
                  ❓ {lesson.exploration.question}
                </p>
              </div>

              {lesson.exploration.interactivePoints && (
                <div className="space-y-1.5">
                  <span className="text-xs font-black text-amber-950 block">
                    Điểm cần phân tích và suy ngẫm:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-700 font-medium">
                    {lesson.exploration.interactivePoints.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PHẦN 6: THỰC HÀNH */}
        {lesson.practice && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-xl bg-emerald-100 text-emerald-700 font-black text-xs flex items-center justify-center">
                5
              </span>
              <h2 className="text-base font-black text-slate-800 flex items-center gap-1.5">
                <ListOrdered className="w-4 h-4 text-emerald-600" />
                <span>Nhiệm Vụ Thực Hành</span>
              </h2>
            </div>

            <div className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-200 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-black text-emerald-950">{lesson.practice.title}</h3>
                  <p className="text-xs text-emerald-900 font-medium mt-0.5">{lesson.practice.goal}</p>
                </div>

                {onOpenPlaygroundWithBlocks && practiceBlocks.length > 0 && (
                  <button
                    onClick={() => onOpenPlaygroundWithBlocks(practiceBlocks)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-xs flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Nạp Vào Sân Khấu Mô Phỏng</span>
                  </button>
                )}
              </div>

              {/* Steps */}
              {lesson.practice.steps && lesson.practice.steps.length > 0 && (
                <div className="bg-white p-3.5 rounded-xl border border-emerald-200 space-y-2">
                  <span className="text-xs font-black text-slate-800 block">Các bước thực hiện:</span>
                  <div className="space-y-1.5 text-xs text-slate-700 font-medium">
                    {lesson.practice.steps.map((st, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-slate-50 p-2 rounded-lg">
                        <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 font-black text-[11px] flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span>{st}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Practice Blocks preview */}
              {practiceBlocks.length > 0 && (
                <div>
                  <span className="text-[11px] font-black uppercase text-emerald-900 block mb-1.5">
                    Kịch bản khối lệnh thực hành:
                  </span>
                  <div className="bg-white p-3 rounded-xl border border-emerald-200 inline-flex flex-col space-y-1">
                    {practiceBlocks.map((b) => (
                      <ScratchBlock key={b.id} block={b} size="sm" />
                    ))}
                  </div>
                </div>
              )}

              {lesson.practice.hint && (
                <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 text-xs font-bold flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Gợi ý: {lesson.practice.hint}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PHẦN 7: KIỂM TRA KẾT QUẢ */}
        {lesson.checkResult && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-xl bg-indigo-100 text-indigo-700 font-black text-xs flex items-center justify-center">
                6
              </span>
              <h2 className="text-base font-black text-slate-800 flex items-center gap-1.5">
                <CheckCheck className="w-4 h-4 text-indigo-600" />
                <span>Kiểm Tra Kết Quả Bài Làm</span>
              </h2>
            </div>

            <div className="p-5 bg-indigo-50/60 rounded-2xl border border-indigo-200 space-y-4">
              <span className="text-xs font-black text-indigo-950 block">
                Em hãy đối chiếu chương trình trên sân khấu với 3 mức độ đánh giá:
              </span>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleCheckEvaluation('correct')}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs shadow-xs transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Đúng chuẩn (+{lesson.xpReward} XP)</span>
                </button>
                <button
                  onClick={() => handleCheckEvaluation('partial')}
                  className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-black text-xs shadow-xs transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>Gần đúng</span>
                </button>
                <button
                  onClick={() => handleCheckEvaluation('review')}
                  className="px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-black text-xs shadow-xs transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Cần xem lại</span>
                </button>
              </div>

              {/* Feedback messages */}
              {evalStatus === 'correct' && (
                <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl text-emerald-950 text-xs font-bold leading-relaxed">
                  🎉 {lesson.checkResult.correctCriteria}
                </div>
              )}
              {evalStatus === 'partial' && (
                <div className="p-3 bg-amber-100 border border-amber-300 rounded-xl text-amber-950 text-xs font-bold leading-relaxed">
                  ⚠️ {lesson.checkResult.partialCriteria}
                </div>
              )}
              {evalStatus === 'review' && (
                <div className="p-3 bg-rose-100 border border-rose-300 rounded-xl text-rose-950 text-xs font-bold leading-relaxed">
                  💡 {lesson.checkResult.reviewAdvice}
                </div>
              )}
            </div>
          </div>
        )}

        {/* PHẦN 8: GHI NHỚ */}
        {lesson.summary && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-xl bg-violet-100 text-violet-700 font-black text-xs flex items-center justify-center">
                7
              </span>
              <h2 className="text-base font-black text-slate-800 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-violet-600" />
                <span>Ghi Nhớ Cốt Lõi</span>
              </h2>
            </div>

            <div className="p-4 bg-violet-50/60 rounded-2xl border border-violet-200">
              <ul className="space-y-2 text-xs md:text-sm font-bold text-violet-950">
                {lesson.summary.takeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-violet-600 font-black">★</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* KIẾN THỨC MỞ RỘNG (Ghi chú rõ ràng không thuộc kiến thức bắt buộc) */}
        {lesson.expansionHint && (
          <div className="p-4 bg-amber-50/50 rounded-2xl border border-dashed border-amber-300">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-wider bg-amber-200 text-amber-900 px-2 py-0.5 rounded-md">
                Kiến thức mở rộng – không thuộc nội dung bắt buộc của bài học
              </span>
            </div>
            <p className="text-xs text-slate-700 font-medium leading-relaxed mt-1">
              {lesson.expansionHint}
            </p>
          </div>
        )}

        {/* GHI CHÚ CHO GIÁO VIÊN */}
        {lesson.teacherNotes && (
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <span className="font-black text-slate-800 flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
              <span>Ghi chú phương pháp sư phạm dành cho giáo viên:</span>
            </span>
            <p className="font-medium leading-relaxed">{lesson.teacherNotes}</p>
          </div>
        )}

        {/* HOÀN THÀNH BÀI HỌC VÀ CHUYỂN TIẾP */}
        <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-black text-slate-700">
              Phần thưởng bài học: +{lesson.xpReward} XP
            </span>
          </div>

          <div className="flex items-center gap-2">
            {lesson.nextLessonId && onNavigateNextLesson && (
              <button
                onClick={() => onNavigateNextLesson(lesson.nextLessonId!)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs shadow-md transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <span>Học Bài Tiếp Theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
