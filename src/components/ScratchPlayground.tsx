import React, { useState, useEffect, useRef } from 'react';
import { ScratchBlockDef, BlockCategory } from '../types';
import { ScratchBlock } from './ScratchBlock';
import { sounds } from '../utils/audio';
import { Play, Square, RotateCcw, Sparkles, Volume2, Plus, Info } from 'lucide-react';

interface ScratchPlaygroundProps {
  initialBlocks?: ScratchBlockDef[];
  onSuccessChallenge?: () => void;
  miniMode?: boolean;
}

const PALETTE_BLOCKS: ScratchBlockDef[] = [
  // Events
  { id: 'p-ev-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat', actionType: 'wait' },
  // Motion
  { id: 'p-mo-1', category: 'motion', text: 'di chuyển 15 bước', shape: 'stack', actionType: 'move' },
  { id: 'p-mo-2', category: 'motion', text: 'xoay ↻ 15 độ', shape: 'stack', actionType: 'turnRight' },
  { id: 'p-mo-3', category: 'motion', text: 'xoay ↺ 15 độ', shape: 'stack', actionType: 'turnLeft' },
  { id: 'p-mo-4', category: 'motion', text: 'đi tới điểm x: 0 y: 0', shape: 'stack', actionType: 'goto' },
  { id: 'p-mo-5', category: 'motion', text: 'bật lại nếu chạm cạnh', shape: 'stack', actionType: 'bounce' },
  // Looks
  { id: 'p-lo-1', category: 'looks', text: 'nói "Xin chào!" trong 2 giây', shape: 'stack', actionType: 'say' },
  { id: 'p-lo-2', category: 'looks', text: 'thay đổi hiệu ứng [màu] một lượng 25', shape: 'stack', actionType: 'changeColor' },
  { id: 'p-lo-3', category: 'looks', text: 'thay đổi kích thước một lượng 10', shape: 'stack', actionType: 'changeScore' },
  // Sound
  { id: 'p-so-1', category: 'sound', text: 'phát âm thanh "Meow"', shape: 'stack', actionType: 'sound' },
  // Control
  { id: 'p-co-1', category: 'control', text: 'lặp lại (5) lần', shape: 'c-block', actionType: 'repeat' },
  { id: 'p-co-2', category: 'control', text: 'đợi 0.5 giây', shape: 'stack', actionType: 'wait' },
  // Variables
  { id: 'p-va-1', category: 'variables', text: 'đặt [Điểm] thành 0', shape: 'stack', actionType: 'setScore' },
  { id: 'p-va-2', category: 'variables', text: 'thay đổi [Điểm] một lượng 1', shape: 'stack', actionType: 'changeScore' }
];

const PRESET_PROGRAMS: { name: string; blocks: ScratchBlockDef[] }[] = [
  {
    name: 'Mèo đi dạo & Kêu Meow',
    blocks: [
      { id: 'pr1-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat', actionType: 'wait' },
      { id: 'pr1-2', category: 'looks', text: 'nói "Xin chào bạn nhỏ!" trong 2 giây', shape: 'stack', actionType: 'say' },
      { id: 'pr1-3', category: 'sound', text: 'phát âm thanh "Meow"', shape: 'stack', actionType: 'sound' },
      { id: 'pr1-4', category: 'motion', text: 'di chuyển 15 bước', shape: 'stack', actionType: 'move' },
      { id: 'pr1-5', category: 'motion', text: 'di chuyển 15 bước', shape: 'stack', actionType: 'move' }
    ]
  },
  {
    name: 'Chong chóng quay vui nhộn',
    blocks: [
      { id: 'pr2-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat', actionType: 'wait' },
      { id: 'pr2-2', category: 'motion', text: 'xoay ↻ 15 độ', shape: 'stack', actionType: 'turnRight' },
      { id: 'pr2-3', category: 'motion', text: 'xoay ↻ 15 độ', shape: 'stack', actionType: 'turnRight' },
      { id: 'pr2-4', category: 'looks', text: 'thay đổi hiệu ứng [màu] một lượng 25', shape: 'stack', actionType: 'changeColor' },
      { id: 'pr2-5', category: 'sound', text: 'phát âm thanh "Meow"', shape: 'stack', actionType: 'sound' }
    ]
  },
  {
    name: 'Tập thể dục & Tính điểm',
    blocks: [
      { id: 'pr3-1', category: 'events', text: 'khi bấm vào 🟩', shape: 'hat', actionType: 'wait' },
      { id: 'pr3-2', category: 'variables', text: 'đặt [Điểm] thành 0', shape: 'stack', actionType: 'setScore' },
      { id: 'pr3-3', category: 'motion', text: 'di chuyển 15 bước', shape: 'stack', actionType: 'move' },
      { id: 'pr3-4', category: 'variables', text: 'thay đổi [Điểm] một lượng 1', shape: 'stack', actionType: 'changeScore' },
      { id: 'pr3-5', category: 'looks', text: 'nói "Đã được 1 điểm!" trong 2 giây', shape: 'stack', actionType: 'say' }
    ]
  }
];

export const ScratchPlayground: React.FC<ScratchPlaygroundProps> = ({
  initialBlocks,
  onSuccessChallenge,
  miniMode = false
}) => {
  const [selectedCategory, setSelectedCategory] = useState<BlockCategory>('events');
  const [scriptBlocks, setScriptBlocks] = useState<ScratchBlockDef[]>(
    initialBlocks || PRESET_PROGRAMS[0].blocks
  );

  // Scratch Cat Stage state
  const [catX, setCatX] = useState<number>(0);
  const [catY, setCatY] = useState<number>(0);
  const [catRotation, setCatRotation] = useState<number>(0);
  const [catSpeech, setCatSpeech] = useState<string | null>(null);
  const [catHue, setCatHue] = useState<number>(0);
  const [catScale, setCatScale] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeBlockIndex, setActiveBlockIndex] = useState<number | null>(null);

  const isRunningRef = useRef(false);

  useEffect(() => {
    if (initialBlocks && initialBlocks.length > 0) {
      setScriptBlocks(initialBlocks);
    }
  }, [initialBlocks]);

  // Add block to script
  const handleAddBlock = (block: ScratchBlockDef) => {
    sounds.playSnap();
    const newBlock: ScratchBlockDef = {
      ...block,
      id: `${block.id}-${Date.now()}`
    };
    setScriptBlocks((prev) => [...prev, newBlock]);
  };

  // Remove block
  const handleRemoveBlock = (index: number) => {
    sounds.playSnap();
    setScriptBlocks((prev) => prev.filter((_, i) => i !== index));
  };

  // Reset stage
  const handleReset = () => {
    isRunningRef.current = false;
    setIsRunning(false);
    setActiveBlockIndex(null);
    setCatX(0);
    setCatY(0);
    setCatRotation(0);
    setCatSpeech(null);
    setCatHue(0);
    setCatScale(1);
    setScore(0);
  };

  // Run script
  const handleRunScript = async () => {
    if (isRunning) return;
    setIsRunning(true);
    isRunningRef.current = true;
    sounds.playSnap();

    // Check if script starts with green flag hat
    const hasGreenFlag = scriptBlocks.some((b) => b.category === 'events');
    if (!hasGreenFlag) {
      setCatSpeech('Hãy gắn khối màu vàng [khi bấm vào cờ xanh] trước nhé!');
      setTimeout(() => setCatSpeech(null), 3000);
      setIsRunning(false);
      isRunningRef.current = false;
      return;
    }

    for (let i = 0; i < scriptBlocks.length; i++) {
      if (!isRunningRef.current) break;
      setActiveBlockIndex(i);
      const b = scriptBlocks[i];

      if (b.actionType === 'move') {
        setCatX((prev) => {
          const next = prev + 30;
          return next > 180 ? -160 : next;
        });
      } else if (b.actionType === 'turnRight') {
        setCatRotation((prev) => prev + 15);
      } else if (b.actionType === 'turnLeft') {
        setCatRotation((prev) => prev - 15);
      } else if (b.actionType === 'goto') {
        setCatX(0);
        setCatY(0);
      } else if (b.actionType === 'bounce') {
        setCatX((prev) => (Math.abs(prev) > 150 ? -prev : prev));
      } else if (b.actionType === 'say') {
        setCatSpeech('Xin chào bạn nhỏ!');
        await new Promise((r) => setTimeout(r, 1200));
        setCatSpeech(null);
      } else if (b.actionType === 'sound') {
        sounds.playMeow();
        await new Promise((r) => setTimeout(r, 400));
      } else if (b.actionType === 'changeColor') {
        setCatHue((prev) => (prev + 45) % 360);
      } else if (b.actionType === 'setScore') {
        setScore(0);
      } else if (b.actionType === 'changeScore') {
        setScore((prev) => prev + 1);
      } else if (b.actionType === 'wait') {
        await new Promise((r) => setTimeout(r, 400));
      }

      await new Promise((r) => setTimeout(r, 350));
    }

    setActiveBlockIndex(null);
    setIsRunning(false);
    isRunningRef.current = false;
    sounds.playSuccess();
    if (onSuccessChallenge) {
      onSuccessChallenge();
    }
  };

  const filteredPalette = PALETTE_BLOCKS.filter((b) => b.category === selectedCategory);

  const categories: { id: BlockCategory; label: string; color: string }[] = [
    { id: 'events', label: 'Sự kiện', color: 'bg-[#FFBF00]' },
    { id: 'motion', label: 'Chuyển động', color: 'bg-[#4C97FF]' },
    { id: 'looks', label: 'Hiển thị', color: 'bg-[#9966FF]' },
    { id: 'sound', label: 'Âm thanh', color: 'bg-[#CF63CF]' },
    { id: 'control', label: 'Điều khiển', color: 'bg-[#FFAB19]' },
    { id: 'variables', label: 'Các biến', color: 'bg-[#FF8C1A]' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
      {/* Top Bar with Green Flag, Red Stop and Stage info */}
      <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {/* Green Flag Button */}
          <button
            onClick={handleRunScript}
            disabled={isRunning}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-extrabold text-sm text-white shadow-md transition-transform active:scale-95 cursor-pointer ${
              isRunning ? 'bg-emerald-400 opacity-80 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-600'
            }`}
          >
            <span className="text-base">🚩</span>
            <span>Chạy Cờ Xanh</span>
          </button>

          {/* Red Stop Sign */}
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-sm bg-rose-500 hover:bg-rose-600 text-white shadow-md transition-transform active:scale-95 cursor-pointer"
            title="Dừng lại và Đặt lại vị trí"
          >
            <Square className="w-4 h-4 fill-white" />
            <span>Dừng lại</span>
          </button>

          {/* Reset button */}
          <button
            onClick={handleReset}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
            title="Đưa nhân vật về tâm x: 0, y: 0"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Stage Coordinates & Score Display */}
        <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
          <div className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-lg border border-amber-200">
            Điểm số: <span className="text-amber-900 font-extrabold">{score}</span>
          </div>
          <div className="bg-slate-200 px-2.5 py-1 rounded-lg">
            x: <span className="text-indigo-600 font-mono">{catX}</span>, y:{' '}
            <span className="text-indigo-600 font-mono">{catY}</span>
          </div>
          <div className="bg-slate-200 px-2.5 py-1 rounded-lg">
            Góc: <span className="text-indigo-600 font-mono">{catRotation}°</span>
          </div>
        </div>

        {/* Preset Selector */}
        {!miniMode && (
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-500 font-semibold">Mẫu sẵn:</span>
            <select
              onChange={(e) => {
                const preset = PRESET_PROGRAMS.find((p) => p.name === e.target.value);
                if (preset) {
                  setScriptBlocks(preset.blocks);
                  sounds.playSnap();
                }
              }}
              className="bg-white border border-slate-300 rounded-lg px-2 py-1 text-slate-700 font-semibold text-xs focus:ring-2 focus:ring-amber-400 outline-none cursor-pointer"
            >
              {PRESET_PROGRAMS.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
        {/* Left: Blocks Palette (Catalog) */}
        <div className="lg:col-span-4 border-r border-slate-200 bg-slate-50 flex flex-col">
          {/* Category Tabs */}
          <div className="p-2 border-b border-slate-200 flex flex-wrap gap-1.5 bg-white">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? `${cat.color} text-slate-900 shadow-sm scale-105`
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${cat.color}`} />
                {cat.label}
              </button>
            ))}
          </div>

          {/* Palette Blocks List */}
          <div className="p-3 overflow-y-auto max-h-[380px] space-y-2 flex-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Plus className="w-3 h-3" /> Bấm để thêm khối vào kịch bản:
            </div>
            {filteredPalette.map((block) => (
              <div key={block.id} className="cursor-pointer group flex items-center justify-between">
                <ScratchBlock block={block} size="sm" onClick={() => handleAddBlock(block)} />
              </div>
            ))}
          </div>
        </div>

        {/* Center: Script Area (Where blocks are assembled) */}
        <div className="lg:col-span-4 border-r border-slate-200 bg-[#E9EEF4] p-3 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-black text-slate-700 flex items-center gap-1.5">
              <span>🧩 Khu Lập Trình (Kịch bản của Mèo)</span>
            </div>
            <button
              onClick={() => {
                setScriptBlocks([]);
                sounds.playSnap();
              }}
              className="text-[11px] text-rose-500 hover:text-rose-700 font-bold cursor-pointer"
            >
              Xóa hết
            </button>
          </div>

          {/* Connected Script blocks stack */}
          <div className="bg-white/80 rounded-xl p-3 border-2 border-dashed border-slate-300 flex-1 overflow-y-auto space-y-1 min-h-[300px]">
            {scriptBlocks.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 p-4">
                <Info className="w-8 h-8 mb-2 opacity-50 text-amber-500" />
                <p className="text-xs font-semibold">Chưa có khối lệnh nào!</p>
                <p className="text-[11px] mt-1 text-slate-500">
                  Hãy bấm vào các khối lệnh bên trái để ghép kịch bản cho chú Mèo nhé.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-start space-y-0.5">
                {scriptBlocks.map((block, index) => (
                  <div
                    key={block.id}
                    className={`relative transition-all duration-200 ${
                      activeBlockIndex === index
                        ? 'ring-4 ring-amber-400 ring-offset-2 scale-105 z-10'
                        : ''
                    }`}
                  >
                    <ScratchBlock
                      block={block}
                      size="sm"
                      onRemove={() => handleRemoveBlock(index)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: The Stage (Sân khấu Scratch) */}
        <div className="lg:col-span-4 bg-gradient-to-b from-sky-100 to-emerald-50 p-4 flex flex-col items-center justify-center relative overflow-hidden min-h-[320px]">
          {/* Stage Backdrop details: Cute sky, cloud, grass */}
          <div className="absolute top-3 left-4 text-xs font-extrabold text-sky-800 bg-white/70 px-2 py-0.5 rounded-md backdrop-blur-xs">
            🎭 Sân khấu Scratch
          </div>

          {/* Cloud decoration */}
          <div className="absolute top-6 right-6 text-2xl opacity-60">☁️</div>
          <div className="absolute top-12 left-10 text-xl opacity-50">☁️</div>

          {/* Center Coordinates mark (crosshair subtle) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15">
            <div className="w-full h-px bg-slate-400" />
            <div className="h-full w-px bg-slate-400 absolute" />
          </div>

          {/* Scratch Cat Stage Actor */}
          <div
            className="relative transition-all duration-300 ease-out select-none flex flex-col items-center"
            style={{
              transform: `translate(${catX}px, ${-catY}px) rotate(${catRotation}deg) scale(${catScale})`,
              filter: `hue-rotate(${catHue}deg)`
            }}
          >
            {/* Speech bubble */}
            {catSpeech && (
              <div className="absolute -top-12 z-20 bg-white text-slate-800 font-extrabold text-xs px-3 py-1.5 rounded-xl shadow-lg border-2 border-slate-300 whitespace-nowrap animate-bounce">
                {catSpeech}
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b-2 border-r-2 border-slate-300 rotate-45" />
              </div>
            )}

            {/* Scratch Cat SVG Avatar */}
            <svg
              className="w-24 h-24 drop-shadow-md cursor-pointer hover:scale-105 transition-transform"
              viewBox="0 0 100 100"
              onClick={() => {
                sounds.playMeow();
                setCatSpeech('Meow!');
                setTimeout(() => setCatSpeech(null), 1500);
              }}
            >
              {/* Scratch Cat Body */}
              <circle cx="50" cy="56" r="28" fill="#F49A24" stroke="#D37500" strokeWidth="2.5" />
              {/* White belly patch */}
              <ellipse cx="50" cy="62" rx="16" ry="18" fill="#FFFFFF" />

              {/* Ears */}
              <polygon points="30,34 38,12 48,28" fill="#F49A24" stroke="#D37500" strokeWidth="2" />
              <polygon points="34,30 38,18 44,26" fill="#FFFFFF" />
              <polygon points="70,34 62,12 52,28" fill="#F49A24" stroke="#D37500" strokeWidth="2" />
              <polygon points="66,30 62,18 56,26" fill="#FFFFFF" />

              {/* Head */}
              <ellipse cx="50" cy="40" rx="24" ry="20" fill="#F49A24" stroke="#D37500" strokeWidth="2.5" />

              {/* Whiskers */}
              <line x1="20" y1="40" x2="32" y2="42" stroke="#222" strokeWidth="1.5" />
              <line x1="20" y1="46" x2="32" y2="46" stroke="#222" strokeWidth="1.5" />
              <line x1="80" y1="40" x2="68" y2="42" stroke="#222" strokeWidth="1.5" />
              <line x1="80" y1="46" x2="68" y2="46" stroke="#222" strokeWidth="1.5" />

              {/* Big friendly cartoon eyes */}
              <ellipse cx="42" cy="36" rx="5.5" ry="7" fill="#FFFFFF" stroke="#222" strokeWidth="1.5" />
              <ellipse cx="58" cy="36" rx="5.5" ry="7" fill="#FFFFFF" stroke="#222" strokeWidth="1.5" />
              <circle cx="43" cy="36" r="3" fill="#222" />
              <circle cx="57" cy="36" r="3" fill="#222" />
              <circle cx="44.5" cy="34" r="1.2" fill="#FFFFFF" />
              <circle cx="58.5" cy="34" r="1.2" fill="#FFFFFF" />

              {/* Cute nose and smile */}
              <polygon points="50,44 47,41 53,41" fill="#222" />
              <path d="M46,46 Q50,50 54,46" fill="none" stroke="#222" strokeWidth="1.8" strokeLinecap="round" />

              {/* Tail */}
              <path d="M74,66 Q88,58 84,46" fill="none" stroke="#F49A24" strokeWidth="6" strokeLinecap="round" />
            </svg>
          </div>

          {/* Grass Floor */}
          <div className="absolute bottom-0 inset-x-0 h-6 bg-emerald-400 border-t-2 border-emerald-500 flex items-center justify-around text-xs opacity-75">
            <span>🌱</span>
            <span>🌼</span>
            <span>🌱</span>
            <span>🌱</span>
            <span>🌸</span>
            <span>🌱</span>
          </div>
        </div>
      </div>
    </div>
  );
};
