import React, { useState, useEffect } from 'react';
import { Exercise, GradeLevel, ExerciseLevel } from '../types';
import { EXERCISES_DATA } from '../data/exercisesData';
import { LESSONS_DATA } from '../data/lessonsData';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  BrainCircuit,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  Trophy,
  ArrowUp,
  ArrowDown,
  Sparkles,
  ChevronRight,
  Filter,
  RotateCcw,
  BookOpen
} from 'lucide-react';

interface ExercisePracticeSectionProps {
  grade: GradeLevel;
  completedExercises: string[];
  onCompleteExercise: (exerciseId: string, xp: number) => void;
  onRecordMistake?: (topic: string) => void;
}

export const ExercisePracticeSection: React.FC<ExercisePracticeSectionProps> = ({
  grade: initialGrade,
  completedExercises,
  onCompleteExercise,
  onRecordMistake
}) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(initialGrade);
  const gradeLessons = LESSONS_DATA.filter((l) => l.grade === selectedGrade);
  const [selectedLessonId, setSelectedLessonId] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<ExerciseLevel | 'all'>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [activeExerciseIdx, setActiveExerciseIdx] = useState<number>(0);

  // Filter exercises
  const filtered = EXERCISES_DATA.filter((ex) => {
    const matchGrade = ex.grade === selectedGrade;
    const matchLesson = selectedLessonId === 'all' || ex.lessonId === selectedLessonId;
    const matchLevel = selectedLevel === 'all' || ex.level === selectedLevel;
    const matchType = selectedType === 'all' || ex.type === selectedType;
    return matchGrade && matchLesson && matchLevel && matchType;
  });

  const currentExercise: Exercise | undefined = filtered[activeExerciseIdx] || filtered[0];

  // State for current question
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [orderingItems, setOrderingItems] = useState<{ id: string; text: string; correctOrder: number }[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Reset answer when changing exercise
  useEffect(() => {
    setSelectedOption(null);
    setIsSubmitted(false);
    setIsCorrect(null);
    setShowHint(false);
    if (currentExercise && currentExercise.orderingItems) {
      setOrderingItems([...currentExercise.orderingItems].sort(() => Math.random() - 0.5));
    }
  }, [activeExerciseIdx, selectedLessonId, selectedLevel, selectedType, selectedGrade]);

  const handleSelectOption = (index: number) => {
    if (isSubmitted) return;
    sounds.playSnap();
    setSelectedOption(index);
  };

  const moveOrderUp = (index: number) => {
    if (index === 0) return;
    sounds.playSnap();
    setOrderingItems((prev) => {
      const next = [...prev];
      const temp = next[index - 1];
      next[index - 1] = next[index];
      next[index] = temp;
      return next;
    });
  };

  const moveOrderDown = (index: number) => {
    if (index === orderingItems.length - 1) return;
    sounds.playSnap();
    setOrderingItems((prev) => {
      const next = [...prev];
      const temp = next[index + 1];
      next[index + 1] = next[index];
      next[index] = temp;
      return next;
    });
  };

  const handleCheckAnswer = () => {
    if (!currentExercise || isSubmitted) return;

    let correct = false;
    if (currentExercise.type === 'ordering') {
      correct = orderingItems.every((item, idx) => item.correctOrder === idx + 1);
    } else {
      correct = selectedOption === currentExercise.correctIndex;
    }

    setIsSubmitted(true);
    setIsCorrect(correct);

    if (correct) {
      sounds.playSuccess();
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch (e) {
        // ignore
      }
      onCompleteExercise(currentExercise.id, currentExercise.xp);
    } else {
      sounds.playBoop();
      if (onRecordMistake && currentExercise.lessonTitle) {
        onRecordMistake(currentExercise.lessonTitle);
      }
    }
  };

  const handleRetry = () => {
    sounds.playSnap();
    setSelectedOption(null);
    setIsSubmitted(false);
    setIsCorrect(null);
    setShowHint(true);
  };

  const handleNext = () => {
    sounds.playSnap();
    if (activeExerciseIdx < filtered.length - 1) {
      setActiveExerciseIdx((prev) => prev + 1);
    } else {
      setActiveExerciseIdx(0);
    }
  };

  const levelBadges: Record<ExerciseLevel, { label: string; color: string }> = {
    recognition: { label: 'Mức 1: Nhận biết', color: 'bg-blue-100 text-blue-800' },
    understanding: { label: 'Mức 2: Thông hiểu', color: 'bg-emerald-100 text-emerald-800' },
    application: { label: 'Mức 3: Vận dụng', color: 'bg-purple-100 text-purple-800' }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 p-6 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner">
              🎮
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
                Phân Hệ 2: Luyện Tập Tương Tác
              </span>
              <h1 className="text-2xl md:text-3xl font-black mt-1">LUYỆN TẬP THEO BÀI HỌC</h1>
              <p className="text-blue-100 text-xs md:text-sm mt-0.5 font-medium">
                Ngân hàng bài tập phân hóa theo đúng SGK Tin học {selectedGrade} (Nhận biết, Thông hiểu, Vận dụng).
              </p>
            </div>
          </div>

          {/* Grade selector */}
          <div className="bg-white/20 backdrop-blur-md p-1 rounded-xl flex items-center">
            <button
              onClick={() => {
                setSelectedGrade(4);
                setActiveExerciseIdx(0);
                sounds.playSnap();
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                selectedGrade === 4 ? 'bg-amber-400 text-slate-900 shadow-xs' : 'text-white hover:bg-white/10'
              }`}
            >
              Lớp 4
            </button>
            <button
              onClick={() => {
                setSelectedGrade(5);
                setActiveExerciseIdx(0);
                sounds.playSnap();
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                selectedGrade === 5 ? 'bg-white text-slate-900 shadow-xs' : 'text-white hover:bg-white/10'
              }`}
            >
              Lớp 5
            </button>
          </div>
        </div>

        {/* Filters Bar: Bài học & Mức độ */}
        <div className="flex flex-wrap items-center gap-2 mt-5">
          {/* Lesson Filter */}
          <select
            value={selectedLessonId}
            onChange={(e) => {
              setSelectedLessonId(e.target.value);
              setActiveExerciseIdx(0);
              sounds.playSnap();
            }}
            className="px-3 py-1.5 rounded-xl bg-white text-slate-900 text-xs font-black outline-none cursor-pointer border border-white/30"
          >
            <option value="all">Tất cả bài học Lớp {selectedGrade}</option>
            {gradeLessons.map((l) => (
              <option key={l.id} value={l.id}>
                {l.title.split('.')[0]} • {l.title.split('.')[1]?.slice(0, 25)}...
              </option>
            ))}
          </select>

          {/* Level Filter */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => {
                setSelectedLevel('all');
                setActiveExerciseIdx(0);
                sounds.playSnap();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedLevel === 'all'
                  ? 'bg-amber-400 text-slate-900 shadow-md'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              Tất cả mức độ
            </button>
            <button
              onClick={() => {
                setSelectedLevel('recognition');
                setActiveExerciseIdx(0);
                sounds.playSnap();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedLevel === 'recognition'
                  ? 'bg-amber-400 text-slate-900 shadow-md'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              Mức 1: Nhận biết
            </button>
            <button
              onClick={() => {
                setSelectedLevel('understanding');
                setActiveExerciseIdx(0);
                sounds.playSnap();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedLevel === 'understanding'
                  ? 'bg-amber-400 text-slate-900 shadow-md'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              Mức 2: Thông hiểu
            </button>
            <button
              onClick={() => {
                setSelectedLevel('application');
                setActiveExerciseIdx(0);
                sounds.playSnap();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedLevel === 'application'
                  ? 'bg-amber-400 text-slate-900 shadow-md'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              Mức 3: Vận dụng
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6">
        {currentExercise ? (
          <div className="space-y-6">
            {/* Meta info header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${levelBadges[currentExercise.level].color}`}>
                  {levelBadges[currentExercise.level].label}
                </span>
                <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  Dạng: {currentExercise.typeName || 'Trắc nghiệm'}
                </span>
                <span className="text-xs font-bold text-indigo-700 hidden sm:inline">
                  • {currentExercise.lessonTitle}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <span>Câu {activeExerciseIdx + 1} / {filtered.length}</span>
                <span className="text-amber-500 font-black">+{currentExercise.xp} XP</span>
              </div>
            </div>

            {/* Question Text */}
            <div>
              <h3 className="text-base md:text-lg font-black text-slate-900 leading-snug">
                {currentExercise.question}
              </h3>
            </div>

            {/* Ordering Items */}
            {currentExercise.type === 'ordering' && (
              <div className="space-y-2 max-w-xl">
                <span className="text-xs font-bold text-slate-500 block mb-1">
                  Dùng nút mũi tên để di chuyển vị trí các bước theo thứ tự đúng:
                </span>
                {orderingItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs md:text-sm font-bold text-slate-800"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-xl bg-indigo-100 text-indigo-700 text-xs font-black flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span>{item.text}</span>
                    </div>

                    {!isSubmitted && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => moveOrderUp(idx)}
                          disabled={idx === 0}
                          className="p-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => moveOrderDown(idx)}
                          disabled={idx === orderingItems.length - 1}
                          className="p-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Options for Multiple Choice, True/False, Choose Block */}
            {currentExercise.type !== 'ordering' && currentExercise.options && (
              <div className="space-y-2.5 max-w-2xl">
                {currentExercise.options.map((opt, idx) => {
                  const isChosen = selectedOption === idx;
                  const isTheCorrectOne = idx === currentExercise.correctIndex;

                  let btnStyle = 'bg-white border-slate-200 hover:border-indigo-300 text-slate-700';
                  if (isSubmitted) {
                    if (isTheCorrectOne) {
                      btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black';
                    } else if (isChosen) {
                      btnStyle = 'bg-rose-100 border-rose-400 text-rose-950';
                    } else {
                      btnStyle = 'bg-white border-slate-200 text-slate-400';
                    }
                  } else if (isChosen) {
                    btnStyle = 'bg-indigo-50 border-indigo-500 text-indigo-950 font-black shadow-xs';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isSubmitted}
                      className={`w-full text-left p-3.5 rounded-2xl text-xs md:text-sm font-bold transition-all border-2 cursor-pointer flex items-center justify-between ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-xl bg-slate-100 text-slate-700 text-xs font-black flex items-center justify-center shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isSubmitted && isTheCorrectOne && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Hint toggler */}
            {!isSubmitted && (
              <div className="pt-2">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 cursor-pointer"
                >
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>{showHint ? 'Ẩn gợi ý' : 'Bé cần một gợi ý nhỏ từ Thầy Mèo?'}</span>
                </button>
                {showHint && (
                  <p className="text-xs text-indigo-950 bg-indigo-50 p-3 rounded-xl border border-indigo-200 mt-2 font-semibold">
                    💡 {currentExercise.hint}
                  </p>
                )}
              </div>
            )}

            {/* ======================================================== */}
            {/* PHẢN HỒI SƯ PHẠM KHI TRẢ LỜI ĐÚNG HOẶC SAI (3 BƯỚC CHUẨN) */}
            {/* ======================================================== */}
            {isCorrect === true && (
              <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 space-y-1.5 animate-bounce">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <h4 className="text-sm font-black">CHÍNH XÁC! EM ĐÃ LÀM RẤT TỐT! 🎉 (+{currentExercise.xp} XP)</h4>
                </div>
                <p className="text-xs font-semibold pl-8 leading-relaxed">
                  {currentExercise.explanation}
                </p>
              </div>
            )}

            {/* Khi trả lời SAI: Bắt buộc hiện 3 phần theo yêu cầu SGK */}
            {isCorrect === false && (
              <div className="p-5 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-950 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🤔</span>
                  <h4 className="text-sm font-black text-rose-900">
                    Chưa chính xác rồi! Cùng Thầy Mèo xem lại nhé:
                  </h4>
                </div>

                <div className="space-y-2 text-xs">
                  {/* 1. Em chưa đúng ở đâu? */}
                  <div className="p-3 bg-white/80 rounded-xl border border-rose-200">
                    <span className="font-black text-rose-800 block mb-0.5">
                      ❓ Em chưa đúng ở đâu?
                    </span>
                    <p className="text-slate-700 font-medium">
                      {currentExercise.pedagogicalFeedback?.whereIsWrong || 'Câu trả lời em chọn chưa khớp với quy tắc bài toán.'}
                    </p>
                  </div>

                  {/* 2. Kiến thức liên quan là gì? */}
                  <div className="p-3 bg-white/80 rounded-xl border border-rose-200">
                    <span className="font-black text-blue-800 block mb-0.5">
                      📚 Kiến thức liên quan là gì?
                    </span>
                    <p className="text-slate-700 font-medium">
                      {currentExercise.pedagogicalFeedback?.relatedKnowledge || currentExercise.explanation}
                    </p>
                  </div>

                  {/* 3. Gợi ý để em suy nghĩ lại */}
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                    <span className="font-black text-amber-900 block mb-0.5">
                      💡 Gợi ý để em suy nghĩ lại:
                    </span>
                    <p className="text-amber-950 font-bold">
                      {currentExercise.pedagogicalFeedback?.rethinkHint || currentExercise.hint}
                    </p>
                  </div>
                </div>

                {/* Nút Thử lại */}
                <div className="pt-1">
                  <button
                    onClick={handleRetry}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer shadow-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Em muốn suy nghĩ và thử lại</span>
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <span className="text-xs text-slate-400 font-medium">
                {completedExercises.includes(currentExercise.id) ? '✅ Bài này em đã hoàn thành' : '⭕ Chưa hoàn thành'}
              </span>

              <div className="flex items-center gap-2">
                {!isSubmitted ? (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={currentExercise.type !== 'ordering' && selectedOption === null}
                    className={`px-6 py-2.5 rounded-xl text-xs font-black text-white shadow-md transition-transform active:scale-95 cursor-pointer ${
                      currentExercise.type !== 'ordering' && selectedOption === null
                        ? 'bg-slate-300 cursor-not-allowed'
                        : 'bg-emerald-500 hover:bg-emerald-600'
                    }`}
                  >
                    Kiểm Tra Bài Làm
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl text-xs font-black text-white bg-indigo-600 hover:bg-indigo-700 shadow-md transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Bài tiếp theo</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400">
            Không tìm thấy bài tập nào trong phân loại đã chọn.
          </div>
        )}
      </div>
    </div>
  );
};
