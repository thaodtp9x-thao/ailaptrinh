import React, { useState } from 'react';
import { ScratchProject, ScratchBlockDef } from '../types';
import { PROJECTS_DATA } from '../data/projectsData';
import { ScratchBlock } from './ScratchBlock';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Rocket,
  Trophy,
  Play,
  Lightbulb,
  Sparkles,
  Layers,
  ChevronRight,
  ClipboardList,
  Target,
  Brain,
  PlusCircle,
  Loader2,
  X
} from 'lucide-react';

interface ProjectsSectionProps {
  grade: 4 | 5;
  onOpenPlaygroundWithBlocks?: (blocks: ScratchBlockDef[]) => void;
  onCompleteProject?: (projectId: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  grade,
  onOpenPlaygroundWithBlocks,
  onCompleteProject
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(PROJECTS_DATA[0].id);

  // Filter projects by grade
  const gradeProjects = PROJECTS_DATA.filter((p) => p.grade === grade || p.grade === 'both');
  const currentProject =
    PROJECTS_DATA.find((p) => p.id === selectedProjectId) || gradeProjects[0] || PROJECTS_DATA[0];

  // "Ý tưởng dự án của em" State
  const [showIdeaModal, setShowIdeaModal] = useState<boolean>(false);
  const [studentIdea, setStudentIdea] = useState<string>('');
  const [isPlanningIdea, setIsPlanningIdea] = useState<boolean>(false);
  const [aiPlannedProject, setAiPlannedProject] = useState<{
    title: string;
    objective: string;
    characters: string[];
    background: string;
    requiredBlocks: string[];
    algorithm: string[];
    steps: string[];
    miniTasks: string[];
  } | null>(null);

  const handleSelectProject = (id: string) => {
    sounds.playSnap();
    setSelectedProjectId(id);
  };

  const handleMarkComplete = () => {
    sounds.playSuccess();
    try {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    } catch (e) {
      // ignore
    }
    if (onCompleteProject) {
      onCompleteProject(currentProject.id);
    }
  };

  const handlePlanIdea = async () => {
    if (!studentIdea.trim()) return;
    setIsPlanningIdea(true);
    sounds.playSnap();

    try {
      const res = await fetch('/api/project-planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea: studentIdea, grade })
      });
      const data = await res.json();
      if (data.plan) {
        setAiPlannedProject(data.plan);
        sounds.playSuccess();
      }
    } catch (e) {
      console.error(e);
      setAiPlannedProject({
        title: `Dự án: ${studentIdea.slice(0, 30)}`,
        objective: 'Hiện thực hóa ý tưởng của em qua các bước nhỏ',
        characters: ['Nhân vật chính tự chọn'],
        background: 'Phông nền phù hợp ý tưởng',
        requiredBlocks: ['khi bấm vào cờ xanh', 'liên tục', 'di chuyển 10 bước'],
        algorithm: ['Bước 1: Khởi động', 'Bước 2: Di chuyển', 'Bước 3: Tương tác'],
        steps: ['Tạo nhân vật', 'Gắn khối lệnh', 'Chạy thử'],
        miniTasks: ['Làm nhân vật bước đi', 'Thêm tiếng kêu']
      });
    } finally {
      setIsPlanningIdea(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 p-6 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner">
              🚀
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
                XƯỞNG SÁNG TẠO SCRATCH
              </span>
              <h2 className="text-2xl font-black mt-1">10 Dự Án Mẫu & Thiết Kế Ý Tưởng</h2>
              <p className="text-teal-100 text-xs md:text-sm mt-0.5 font-medium">
                Học sinh tự tay xây dựng các dự án hoạt hình, trò chơi từ đơn giản đến nâng cao!
              </p>
            </div>
          </div>

          {/* Special "Ý tưởng dự án của em" Button */}
          <button
            onClick={() => {
              sounds.playSnap();
              setShowIdeaModal(true);
            }}
            className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-xs md:text-sm shadow-md transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-slate-900" />
            <span>Ý Tưởng Dự Án Của Em (AI)</span>
          </button>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 10 Projects List */}
        <div className="lg:col-span-4 space-y-2.5">
          <span className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-2">
            Danh sách 10 dự án mẫu:
          </span>

          <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
            {PROJECTS_DATA.map((proj) => {
              const isSelected = currentProject.id === proj.id;
              return (
                <div
                  key={proj.id}
                  onClick={() => handleSelectProject(proj.id)}
                  className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-50 border-teal-500 text-teal-950 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-teal-700">
                      Dự án {proj.projectNumber}
                    </span>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                      {proj.difficulty}
                    </span>
                  </div>
                  <h4 className="text-xs md:text-sm font-black mt-1 text-slate-900">
                    {proj.title.replace(/Dự án \d+: /, '')}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 font-medium">
                    {proj.idea}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Project Blueprint Details */}
        <div className="lg:col-span-8 space-y-5">
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-xs font-black text-teal-600 uppercase tracking-wide">
                  Dự án {currentProject.projectNumber} • Độ khó: {currentProject.difficulty}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-0.5">
                  {currentProject.title}
                </h3>
              </div>

              {onOpenPlaygroundWithBlocks && (
                <button
                  onClick={() => onOpenPlaygroundWithBlocks(currentProject.starterBlocks)}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black text-xs shadow-xs flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Mở Sân Khấu Thực Hành</span>
                </button>
              )}
            </div>

            {/* Idea & Objective */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="font-black text-indigo-700 block mb-0.5">💡 Ý tưởng:</span>
                <p className="text-slate-700 font-medium">{currentProject.idea}</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="font-black text-teal-700 block mb-0.5">🎯 Mục tiêu:</span>
                <p className="text-slate-700 font-medium">{currentProject.objective}</p>
              </div>
            </div>

            {/* Knowledge used & Sprites */}
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-700 bg-white p-3 rounded-xl border border-slate-200">
              <div>
                <span className="font-black text-slate-900">🧠 Kiến thức sử dụng: </span>
                <span>{currentProject.knowledgeUsed.join(', ')}</span>
              </div>
              <div>
                <span className="font-black text-slate-900">🎭 Nhân vật: </span>
                <span>{currentProject.characters.join(', ')}</span>
              </div>
            </div>

            {/* Steps */}
            <div>
              <span className="text-xs font-black uppercase text-teal-800 tracking-wider block mb-2">
                📝 Các bước thực hiện:
              </span>
              <div className="space-y-1.5">
                {currentProject.steps.map((st, idx) => (
                  <div key={idx} className="p-2.5 bg-teal-50/50 rounded-xl border border-teal-100 text-xs text-slate-800 font-medium">
                    {st}
                  </div>
                ))}
              </div>
            </div>

            {/* Starter Blocks */}
            <div>
              <span className="text-xs font-black uppercase text-slate-500 tracking-wider block mb-2">
                🧩 Khối lệnh mẫu khởi đầu:
              </span>
              <div className="flex flex-wrap gap-2">
                {currentProject.starterBlocks.map((b) => (
                  <ScratchBlock key={b.id} block={b} size="sm" />
                ))}
              </div>
            </div>

            {/* Extended Challenge & Rubric */}
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-3">
              <div>
                <span className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  Thử thách mở rộng cho em:
                </span>
                <p className="text-xs font-bold text-amber-950 mt-1">
                  {currentProject.extendedChallenge}
                </p>
              </div>

              <div className="pt-2 border-t border-amber-200/80">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-800 block mb-1">
                  📊 Tiêu chí đánh giá dự án:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {currentProject.rubric.map((r, idx) => (
                    <div key={idx} className="bg-white/90 p-2 rounded-xl text-[11px] font-bold text-slate-700 border border-amber-200/60 flex items-center justify-between">
                      <span>{r.criteria}</span>
                      <span className="text-amber-800 font-black">+{r.points}đ</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Complete Project Button */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleMarkComplete}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-black text-xs shadow-md transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <Trophy className="w-4 h-4" />
                <span>Hoàn Thành Dự Án Này (+50 XP)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: "Ý TƯỞNG DỰ ÁN CỦA EM" (AI Project Idea Converter) */}
      {showIdeaModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-black text-slate-900">
                  Ý Tưởng Dự Án Của Em (AI Hướng Dẫn)
                </h3>
              </div>
              <button
                onClick={() => setShowIdeaModal(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 font-medium">
              Em có ý tưởng làm một trò chơi hoặc phim hoạt hình gì? Hãy gõ vào đây, AI sẽ giúp em chia nhỏ thành các mục tiêu, nhân vật và nhiệm vụ từng bước để em tự tay lập trình!
            </p>

            <textarea
              rows={3}
              value={studentIdea}
              onChange={(e) => setStudentIdea(e.target.value)}
              placeholder="Ví dụ: Em muốn làm game lái tàu vũ trụ né thiên thạch và thu thập sao năng lượng..."
              className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
            />

            <button
              onClick={handlePlanIdea}
              disabled={isPlanningIdea || !studentIdea.trim()}
              className={`w-full py-3 rounded-2xl text-xs font-black text-white shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95 ${
                isPlanningIdea || !studentIdea.trim()
                  ? 'bg-slate-300 cursor-not-allowed'
                  : 'bg-teal-600 hover:bg-teal-700'
              }`}
            >
              {isPlanningIdea ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>AI đang phân tích ý tưởng...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Biến Ý Tưởng Thành Kế Hoạch Dự Án</span>
                </>
              )}
            </button>

            {/* AI Planned Project Results */}
            {aiPlannedProject && (
              <div className="p-4 bg-teal-50/70 rounded-2xl border border-teal-200 space-y-3 mt-3 animate-fadeIn">
                <h4 className="text-sm font-black text-teal-950">
                  📋 {aiPlannedProject.title}
                </h4>
                <p className="text-xs text-teal-900 font-medium">
                  🎯 Mục tiêu: {aiPlannedProject.objective}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-teal-100">
                    <span className="font-black text-slate-800 block">🎭 Nhân vật:</span>
                    <span className="text-slate-600">{aiPlannedProject.characters.join(', ')}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-teal-100">
                    <span className="font-black text-slate-800 block">🖼️ Phông nền:</span>
                    <span className="text-slate-600">{aiPlannedProject.background}</span>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-teal-100 space-y-1.5 text-xs">
                  <span className="font-black text-slate-800 block">📝 Nhiệm vụ từng bước cho em:</span>
                  {aiPlannedProject.miniTasks.map((task, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-700 font-medium">
                      <span className="w-4 h-4 rounded-full bg-teal-100 text-teal-800 font-black text-[10px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span>{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
