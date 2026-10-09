import React, { useState } from 'react';
import { EpicChallenge, GradeLevel, ScratchBlockDef } from '../types';
import { EPIC_CHALLENGES } from '../data/challengesData';
import { ScratchBlock } from './ScratchBlock';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Award,
  CheckCircle2,
  Sparkles,
  Play,
  Lightbulb,
  ShieldCheck,
  ChevronRight,
  Target
} from 'lucide-react';

interface ChallengesSectionProps {
  grade: GradeLevel;
  completedChallenges: string[];
  onCompleteChallenge?: (challengeId: string, xpReward: number) => void;
  onOpenPlaygroundWithBlocks?: (blocks: ScratchBlockDef[]) => void;
}

export const ChallengesSection: React.FC<ChallengesSectionProps> = ({
  grade,
  completedChallenges,
  onCompleteChallenge,
  onOpenPlaygroundWithBlocks
}) => {
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>(EPIC_CHALLENGES[0].id);

  const currentChallenge: EpicChallenge =
    EPIC_CHALLENGES.find((ch) => ch.id === selectedChallengeId) || EPIC_CHALLENGES[0];

  const [showHint, setShowHint] = useState<boolean>(false);

  const handleSelectChallenge = (id: string) => {
    sounds.playSnap();
    setSelectedChallengeId(id);
    setShowHint(false);
  };

  const handleMarkComplete = () => {
    sounds.playSuccess();
    try {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    } catch (e) {
      // ignore
    }
    if (onCompleteChallenge) {
      onCompleteChallenge(currentChallenge.id, currentChallenge.xpReward);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner">
            ⭐
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
              ĐẤU TRƯỜNG THỬ THÁCH SCRATCH
            </span>
            <h2 className="text-2xl font-black mt-1">8 Thử Thách Lập Trình Lớn</h2>
            <p className="text-purple-100 text-xs md:text-sm mt-0.5 font-medium">
              Chinh phục các thử thách từ Điều khiển, Kể chuyện, Mê cung đến Game Bảo vệ đảo để mở khóa huy hiệu!
            </p>
          </div>
        </div>

        {/* 8 Challenge Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5">
          {EPIC_CHALLENGES.map((ch) => {
            const isCompleted = completedChallenges.includes(ch.id);
            const isSelected = currentChallenge.id === ch.id;

            return (
              <button
                key={ch.id}
                onClick={() => handleSelectChallenge(ch.id)}
                className={`p-2.5 rounded-2xl text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-slate-900 shadow-md font-black scale-102 ring-2 ring-white'
                    : 'bg-white/10 hover:bg-white/20 text-white font-bold'
                }`}
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span>Bài {ch.challengeNumber}</span>
                  {isCompleted && <span>✅</span>}
                </div>
                <div className="text-xs font-black truncate mt-0.5">
                  {ch.title.replace(/⭐ Thử thách \d+: /, '')}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Challenge list overview */}
        <div className="lg:col-span-4 space-y-2.5">
          <span className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1">
            Danh sách thử thách:
          </span>

          <div className="space-y-2">
            {EPIC_CHALLENGES.map((ch) => {
              const isCompleted = completedChallenges.includes(ch.id);
              const isSelected = currentChallenge.id === ch.id;

              return (
                <div
                  key={ch.id}
                  onClick={() => handleSelectChallenge(ch.id)}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-purple-50 border-purple-500 text-purple-950 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div>
                    <h4 className="text-xs font-black">{ch.title}</h4>
                    <span className="text-[10px] text-amber-600 font-bold block mt-0.5">
                      +{ch.xpReward} XP • Huy hiệu {ch.badgeTitle}
                    </span>
                  </div>
                  {isCompleted ? (
                    <span className="text-xs font-black text-emerald-600">Đã xong</span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Challenge Mission Details */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-xs font-black uppercase text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
                  Thử thách số {currentChallenge.challengeNumber}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  {currentChallenge.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-amber-700 bg-amber-100 px-3 py-1 rounded-xl">
                  🏆 +{currentChallenge.xpReward} XP
                </span>
                {onOpenPlaygroundWithBlocks && (
                  <button
                    onClick={() => onOpenPlaygroundWithBlocks(currentChallenge.sampleBlocks)}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs shadow-xs flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Làm Trên Sân Khấu</span>
                  </button>
                )}
              </div>
            </div>

            {/* Mission description */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
              <span className="text-xs font-black text-indigo-700 block">🎯 Mô tả nhiệm vụ:</span>
              <p className="text-xs md:text-sm text-slate-700 font-medium leading-relaxed">
                {currentChallenge.missionDesc}
              </p>
            </div>

            {/* Requirements & Success Condition */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-1.5">
                <span className="font-black text-slate-900 block">📋 Yêu cầu cần đạt:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-600 font-medium">
                  {currentChallenge.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1.5">
                <span className="font-black text-emerald-900 block">✅ Điều kiện hoàn thành:</span>
                <p className="text-emerald-950 font-bold leading-relaxed">
                  {currentChallenge.successCondition}
                </p>
              </div>
            </div>

            {/* Sample Blocks */}
            <div>
              <span className="text-xs font-black uppercase text-slate-500 tracking-wider block mb-2">
                🧩 Khối lệnh gợi ý sử dụng:
              </span>
              <div className="flex flex-wrap gap-2">
                {currentChallenge.sampleBlocks.map((b) => (
                  <ScratchBlock key={b.id} block={b} size="sm" />
                ))}
              </div>
            </div>

            {/* Hint Toggler */}
            <div>
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 cursor-pointer"
              >
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>{showHint ? 'Ẩn gợi ý' : 'Bé cần gợi ý từ Thầy Mèo?'}</span>
              </button>
              {showHint && (
                <p className="text-xs text-indigo-950 bg-indigo-50 p-3 rounded-xl border border-indigo-200 mt-2 font-semibold">
                  💡 {currentChallenge.hint}
                </p>
              )}
            </div>

            {/* Complete button */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                {completedChallenges.includes(currentChallenge.id)
                  ? '🎉 Em đã hoàn thành thử thách này!'
                  : 'Chưa hoàn thành'}
              </span>

              <button
                onClick={handleMarkComplete}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-xs shadow-md transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Đánh Dấu Hoàn Thành (+{currentChallenge.xpReward} XP)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
