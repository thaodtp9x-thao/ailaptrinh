import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, GradeLevel } from '../types';
import { LESSONS_DATA } from '../data/lessonsData';
import { sounds } from '../utils/audio';
import {
  Send,
  Bot,
  Sparkles,
  HelpCircle,
  Loader2,
  BookOpen,
  Play,
  RotateCcw,
  CheckCircle2,
  Lightbulb,
  Compass,
  Smile
} from 'lucide-react';

interface AiTutorProps {
  grade: GradeLevel;
  currentLessonTitle?: string;
  onOpenPlaygroundWithBlocks?: () => void;
}

// 4 tình huống kiểm tra chuẩn và các nhiệm vụ thực hành tiêu biểu
const SAMPLE_MISSIONS = [
  { id: 'm1', label: '📐 Vẽ hình tam giác', prompt: 'Em muốn tạo chương trình để nhân vật Mèo vẽ một hình tam giác.' },
  { id: 'm2', label: '🚶 Di chuyển 5 bước liên tiếp', prompt: 'Em muốn nhân vật chú Mèo di chuyển 5 bước liên tiếp.' },
  { id: 'm3', label: '💬 Nói lời chào khi bấm cờ xanh', prompt: 'Em muốn nhân vật nói lời chào khi bấm cờ xanh.' },
  { id: 'm4', label: '🐞 Sửa lỗi nhân vật chạy không đúng', prompt: 'Em muốn sửa chương trình nhưng khi chạy nhân vật không thực hiện đúng yêu cầu.' },
  { id: 'm5', label: '🍎 Game hứng táo tính điểm', prompt: 'Em muốn lập trình khi Chén hứng chạm Quả táo thì được cộng 1 điểm.' }
];

const QUICK_HELPER_CHIPS = [
  'Em chưa biết dùng lệnh nào',
  'Em không biết, thầy gợi ý giúp em',
  'Cho em xem đáp án hoàn chỉnh',
  'Em nên ghép lệnh theo thứ tự nào?'
];

export const AiTutor: React.FC<AiTutorProps> = ({
  grade: initialGrade,
  onOpenPlaygroundWithBlocks
}) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(initialGrade);
  const gradeLessons = LESSONS_DATA.filter((l) => l.grade === selectedGrade);
  const [selectedLessonId, setSelectedLessonId] = useState<string>(gradeLessons[0].id);

  const currentLesson = gradeLessons.find((l) => l.id === selectedLessonId) || gradeLessons[0];

  const getInitialWelcome = (gradeNum: GradeLevel, lessonTitle: string): ChatMessage => ({
    id: 'welcome',
    sender: 'ai',
    text: `Chào bạn nhỏ lớp ${gradeNum}! Thầy Mèo Scratch chào em! 🐱✨

Thầy là Gia sư Scratch đồng hành cùng em theo SGK Tin học ${gradeNum} (Bộ Kết nối tri thức).
Hiện tại chúng mình đang ở bài "${lessonTitle}".

🎯 **Cách Thầy Mèo giúp em:**
Thầy sẽ đọc kỹ nhiệm vụ của em và đặt **câu hỏi gợi mở cụ thể, đúng trọng tâm** từng bước để em tự suy nghĩ và tìm ra lời giải. Thầy sẽ không làm bài hộ ngay từ đầu đâu nhé!

Em muốn lập trình cho nhân vật làm điều gì hôm nay? (Em có thể chọn một nhiệm vụ mẫu bên dưới hoặc gõ trực tiếp cho thầy nhé!)`,
    timestamp: 'Vừa xong'
  });

  const [messages, setMessages] = useState<ChatMessage[]>([
    getInitialWelcome(selectedGrade, currentLesson.title)
  ]);

  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // When grade changes, reset selected lesson and conversation
  useEffect(() => {
    const newGradeLessons = LESSONS_DATA.filter((l) => l.grade === selectedGrade);
    if (newGradeLessons.length > 0) {
      setSelectedLessonId(newGradeLessons[0].id);
      setMessages([getInitialWelcome(selectedGrade, newGradeLessons[0].title)]);
    }
  }, [selectedGrade]);

  const handleResetChat = () => {
    sounds.playSnap();
    setMessages([getInitialWelcome(selectedGrade, currentLesson.title)]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    sounds.playSnap();
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Vừa xong'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          grade: selectedGrade,
          lessonContext: `${currentLesson.title} - Mục tiêu: ${currentLesson.objectives.know}`,
          history: messages.slice(-6).map((m) => ({
            sender: m.sender,
            text: m.text
          }))
        })
      });

      const data = await res.json();
      const replyText = data.reply || 'Thầy Mèo đang suy nghĩ... Em thử hỏi lại nhé!';

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: 'Vừa xong'
      };

      setMessages((prev) => [...prev, aiMsg]);
      sounds.playSuccess();
    } catch (err) {
      console.error(err);
      const fallbackMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: `Chào em! Để thực hiện nhiệm vụ này trong bài "${currentLesson.title}":
Em hãy quan sát nhóm lệnh ${selectedGrade === 4 ? 'Sự kiện (màu vàng) và Chuyển động (màu xanh lam)' : 'Điều khiển (màu cam) và Các biến (màu cam đậm)'} nhé!
Theo em, khối lệnh nào sẽ bắt đầu chuỗi hành động này khi bấm Cờ xanh?`,
        timestamp: 'Vừa xong'
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[780px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-5 text-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner border border-white/20">
              🐱
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-black tracking-tight">GIA SƯ SCRATCH AI</h1>
                <span className="text-[10px] font-black uppercase bg-white/25 px-2 py-0.5 rounded-full">
                  Gợi Mở Trọng Tâm
                </span>
              </div>
              <p className="text-amber-100 text-xs font-semibold mt-0.5">
                Hướng dẫn từng bước bằng câu hỏi gợi mở cụ thể – Chuẩn SGK Tin học Kết nối tri thức
              </p>
            </div>
          </div>

          {/* Controls: Grade Selector & Playground Launcher */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="bg-white/20 backdrop-blur-md p-1 rounded-xl flex items-center">
              <button
                onClick={() => setSelectedGrade(4)}
                className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  selectedGrade === 4 ? 'bg-white text-slate-900 shadow-xs' : 'text-white hover:bg-white/10'
                }`}
              >
                Lớp 4
              </button>
              <button
                onClick={() => setSelectedGrade(5)}
                className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  selectedGrade === 5 ? 'bg-white text-slate-900 shadow-xs' : 'text-white hover:bg-white/10'
                }`}
              >
                Lớp 5
              </button>
            </div>

            <select
              value={selectedLessonId}
              onChange={(e) => setSelectedLessonId(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-white text-slate-900 text-xs font-black border border-white/40 outline-none cursor-pointer max-w-[210px]"
            >
              {gradeLessons.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.title.split('.')[0]} • {l.title.split('.')[1]?.slice(0, 22)}...
                </option>
              ))}
            </select>

            {onOpenPlaygroundWithBlocks && (
              <button
                onClick={() => {
                  sounds.playSnap();
                  onOpenPlaygroundWithBlocks();
                }}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs shadow-xs flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
                title="Mở Sân Khấu Scratch để kéo ghép và chạy thử lệnh"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Mở Sân Khấu</span>
              </button>
            )}

            <button
              onClick={handleResetChat}
              className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
              title="Làm mới cuộc trò chuyện"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Lesson Context Ribbon */}
        <div className="mt-4 pt-3 border-t border-white/20 flex flex-wrap items-center justify-between text-xs gap-2">
          <div className="flex items-center gap-1.5 font-bold text-amber-100">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Đang học: {currentLesson.title}</span>
          </div>
          <span className="text-[11px] font-medium text-white/90 bg-black/20 px-2.5 py-0.5 rounded-lg">
            Mục tiêu: {currentLesson.objectives.know.slice(0, 65)}...
          </span>
        </div>
      </div>

      {/* 6-Step Socratic Guidance Process Ribbon */}
      <div className="bg-amber-50/90 px-4 py-2 border-b border-amber-200 flex items-center justify-between overflow-x-auto scrollbar-none gap-2 text-[11px]">
        <span className="font-black text-amber-900 shrink-0 flex items-center gap-1">
          <Compass className="w-3.5 h-3.5 text-amber-600" />
          <span>Quy trình gợi mở 6 bước:</span>
        </span>
        <div className="flex items-center gap-1 text-[11px] font-bold text-slate-600 whitespace-nowrap">
          <span className="px-2 py-0.5 bg-white rounded-md border border-amber-200 text-amber-900">1. Xác định nhiệm vụ</span>
          <span>➔</span>
          <span className="px-2 py-0.5 bg-white rounded-md border border-amber-200 text-amber-900">2. Kiến thức SGK</span>
          <span>➔</span>
          <span className="px-2 py-0.5 bg-white rounded-md border border-amber-200 text-amber-900">3. Câu hỏi gợi mở</span>
          <span>➔</span>
          <span className="px-2 py-0.5 bg-white rounded-md border border-amber-200 text-amber-900">4. Phản hồi gợi ý</span>
          <span>➔</span>
          <span className="px-2 py-0.5 bg-white rounded-md border border-amber-200 text-amber-900">5. Hoàn thành lệnh</span>
          <span>➔</span>
          <span className="px-2 py-0.5 bg-white rounded-md border border-amber-200 text-amber-900">6. Chạy thử kiểm tra</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs font-bold text-base ${
                  isUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white'
                }`}
              >
                {isUser ? '👦' : '🐱'}
              </div>

              <div
                className={`max-w-[85%] md:max-w-[75%] rounded-3xl p-4 text-xs md:text-sm font-medium leading-relaxed whitespace-pre-wrap shadow-2xs ${
                  isUser
                    ? 'bg-blue-600 text-white rounded-tr-xs'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs'
                }`}
              >
                {!isUser && (
                  <span className="inline-block text-[10px] font-black uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md mb-1.5 border border-amber-200">
                    Gia sư Scratch gợi mở
                  </span>
                )}
                <p>{m.text}</p>
                <span
                  className={`text-[10px] block mt-1.5 font-bold ${
                    isUser ? 'text-blue-200' : 'text-slate-400'
                  }`}
                >
                  {m.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-slate-600 text-xs font-bold p-3 bg-white rounded-2xl border border-slate-200 w-fit shadow-2xs">
            <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
            <span>Thầy Mèo đang suy nghĩ câu hỏi gợi mở tiếp theo cho em...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Missions (4 tình huống mẫu) */}
      <div className="p-3 bg-white border-t border-slate-200 space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-black text-slate-700 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Nhiệm vụ lập trình mẫu để em thử tài:</span>
          </span>
          <span className="text-[10px] text-slate-400 font-bold hidden sm:inline">
            Bấm chọn để bắt đầu đối thoại gợi mở
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
          {SAMPLE_MISSIONS.map((mission) => (
            <button
              key={mission.id}
              onClick={() => handleSendMessage(mission.prompt)}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 hover:text-amber-950 text-amber-900 text-xs font-black whitespace-nowrap transition-colors border border-amber-200 cursor-pointer shrink-0"
            >
              {mission.label}
            </button>
          ))}
        </div>

        {/* Quick Helper Chips during conversation */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
          {QUICK_HELPER_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip)}
              disabled={isLoading}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-bold whitespace-nowrap transition-colors border border-slate-200 cursor-pointer shrink-0"
            >
              💡 {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 pt-1"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Nhập yêu cầu lập trình hoặc trả lời câu hỏi của Thầy Mèo...`}
            className="flex-1 px-4 py-3 rounded-2xl bg-slate-100 border border-slate-200 text-xs md:text-sm font-medium focus:outline-amber-500 transition-colors"
          />

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`p-3 rounded-2xl text-white font-bold transition-all shadow-sm ${
              !input.trim() || isLoading
                ? 'bg-slate-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:scale-105 active:scale-95 cursor-pointer'
            }`}
            title="Gửi câu trả lời"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
