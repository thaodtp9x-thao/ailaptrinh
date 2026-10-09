import React, { useState } from 'react';
import { BUG_SCENARIOS } from '../data/challengesData';
import { ScratchBlock } from './ScratchBlock';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Wrench,
  Search,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  ShieldAlert,
  Loader2,
  FileImage,
  RefreshCw,
  AlertTriangle,
  Upload,
  ArrowRight,
  Check
} from 'lucide-react';

interface AiDebuggerProps {
  grade: 4 | 5;
  onSolvedBug?: () => void;
}

export const AiDebugger: React.FC<AiDebuggerProps> = ({ grade, onSolvedBug }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(BUG_SCENARIOS[0].id);
  const [activeTab, setActiveTab] = useState<'sample' | 'custom'>('sample');

  // Custom inputs according to SGK requirements
  const [codePasted, setCodePasted] = useState<string>('');
  const [programDesc, setProgramDesc] = useState<string>('');
  const [expectedResult, setExpectedResult] = useState<string>('');
  const [actualResult, setActualResult] = useState<string>('');
  const [uploadedImageName, setUploadedImageName] = useState<string | null>(null);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 9-step analysis state
  const [analysis, setAnalysis] = useState<{
    taskGoal: string;
    howRunning: string;
    actualResult: string;
    expectedResult: string;
    whereStepWrong: string;
    whyWrong: string;
    hintFix: string;
    selfFixTask: string;
    verifyGuide: string;
  }>({
    taskGoal: 'Khởi động chương trình và cho nhân vật di chuyển 15 bước khi bấm Cờ xanh.',
    howRunning: 'Khối lệnh [di chuyển 15 bước] đứng đơn độc trong vùng lập trình.',
    actualResult: 'Khi nháy chuột vào Cờ xanh trên sân khấu, nhân vật đứng yên không nhúc nhích.',
    expectedResult: 'Nhân vật lập tức tiến lên 15 bước ngay khi bấm Cờ xanh.',
    whereStepWrong: 'Ở vị trí trên cùng của chương trình (khối lệnh đầu tiên).',
    whyWrong: 'Máy tính cần khối lệnh Sự kiện [khi bấm vào cờ xanh] làm lệnh khởi đầu để kích hoạt chuỗi hành động.',
    hintFix: 'Em hãy xem lại yêu cầu và tìm bước nào chưa được thực hiện: Em đã gắn khối Sự kiện màu vàng vào đầu chưa?',
    selfFixTask: 'Vào nhóm Sự kiện (màu vàng), kéo khối [khi bấm vào cờ xanh] gắn chặt vào phía trên khối [di chuyển 15 bước].',
    verifyGuide: 'Bấm Cờ xanh ở góc trên sân khấu để kiểm tra xem chú Mèo đã bước đi chưa nhé!'
  });

  const [isSelfFixed, setIsSelfFixed] = useState<boolean>(false);
  const [showFullCodeGuide, setShowFullCodeGuide] = useState<boolean>(false);

  const activeScenario = BUG_SCENARIOS.find((s) => s.id === selectedScenarioId) || BUG_SCENARIOS[0];

  const handleSelectScenario = (id: string) => {
    sounds.playSnap();
    setSelectedScenarioId(id);
    const s = BUG_SCENARIOS.find((sc) => sc.id === id);
    if (s) {
      setAnalysis({
        taskGoal: s.taskGoal || s.whatProgramWantsToDo || 'Thực hiện yêu cầu đề bài',
        howRunning: s.howRunning || 'Chương trình đang chạy theo khối lệnh hiện tại',
        actualResult: s.actualResult || s.symptom || 'Kết quả chưa như ý',
        expectedResult: s.expectedResult || 'Nhân vật chạy đúng kịch bản mong đợi',
        whereStepWrong: s.whereStepWrong || s.whereIsBug || 'Trong kịch bản',
        whyWrong: s.whyWrong || s.whyIsBug || 'Chưa đúng thứ tự hoặc cấu trúc',
        hintFix: s.hintFix || s.hint1 || 'Kiểm tra lại thứ tự thực hiện các lệnh.',
        selfFixTask: s.selfFixTask || s.hint2 || 'Thử chỉnh sửa lại khối lệnh nghi ngờ.',
        verifyGuide: s.verifyGuide || s.fullGuide || 'Bấm Cờ xanh để kiểm tra lại.'
      });
    }
    setIsSelfFixed(false);
    setShowFullCodeGuide(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImageName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImagePreview(reader.result as string);
        sounds.playSnap();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeCustomError = async () => {
    if (!programDesc.trim() && !actualResult.trim() && !codePasted.trim()) return;
    setIsLoading(true);
    setIsSelfFixed(false);
    setShowFullCodeGuide(false);
    sounds.playSnap();

    try {
      const combinedDescription = `Mô tả: ${programDesc}\nLệnh: ${codePasted}\nKết quả thực tế: ${actualResult}\nKết quả mong muốn: ${expectedResult}`;
      const res = await fetch('/api/analyze-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          errorDescription: combinedDescription,
          grade
        })
      });

      const data = await res.json();
      if (data.analysis) {
        const a = data.analysis;
        setAnalysis({
          taskGoal: a.taskGoal || a.problem || programDesc || 'Thực hiện yêu cầu bài toán',
          howRunning: a.howRunning || 'Chương trình đang chạy theo các lệnh hiện có',
          actualResult: a.actualResult || actualResult || 'Chương trình chưa chạy đúng',
          expectedResult: a.expectedResult || expectedResult || 'Chương trình chạy đúng mong đợi',
          whereStepWrong: a.whereStepWrong || 'Ở bước kiểm tra thứ tự hoặc cấu trúc',
          whyWrong: a.whyWrong || a.reason || 'Do thứ tự hoặc khối lệnh chưa phù hợp',
          hintFix: a.hintFix || a.hint || 'Em hãy kiểm tra lại thứ tự thực hiện các lệnh.',
          selfFixTask: a.selfFixTask || 'Hãy tách khối lệnh nghi ngờ và thử ghép lại.',
          verifyGuide: a.verifyGuide || 'Bấm Cờ xanh trên sân khấu để quan sát lại.'
        });
        sounds.playSuccess();
      }
    } catch (e) {
      console.error(e);
      setAnalysis({
        taskGoal: programDesc || 'Thực hiện nhiệm vụ lập trình',
        howRunning: 'Các lệnh chưa kết nối chặt chẽ',
        actualResult: actualResult || 'Chưa ra kết quả',
        expectedResult: expectedResult || 'Chạy đúng yêu cầu',
        whereStepWrong: 'Ở các khối lệnh vừa thực hiện',
        whyWrong: 'Có thể sai thứ tự hoặc thiếu lệnh sự kiện cờ xanh',
        hintFix: 'Em hãy kiểm tra lại thứ tự thực hiện các lệnh từ trên xuống dưới.',
        selfFixTask: 'Tháo các khối lệnh ra và ghép lại từng khối một theo đúng suy nghĩ.',
        verifyGuide: 'Bấm Cờ xanh trên sân khấu để kiểm tra lại.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelfFixed = () => {
    setIsSelfFixed(true);
    sounds.playSuccess();
    try {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch (e) {
      // ignore
    }
    if (onSolvedBug) {
      onSolvedBug();
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner">
            🕵️
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
              Phân Hệ 4: Bắt & Sửa Lỗi Sư Phạm
            </span>
            <h1 className="text-2xl md:text-3xl font-black mt-1">THÁM TỬ SỬA LỖI</h1>
            <p className="text-rose-100 text-xs md:text-sm mt-0.5 font-medium">
              Quy trình 9 bước khoa học giúp em tự tìm ra nguyên nhân và tự tay sửa lỗi chương trình Scratch!
            </p>
          </div>
        </div>

        {/* Tab switcher: Lỗi mẫu SGK vs Tự nhập lỗi */}
        <div className="flex gap-2 mt-5">
          <button
            onClick={() => {
              setActiveTab('sample');
              sounds.playSnap();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'sample'
                ? 'bg-white text-slate-900 shadow-md'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            📋 Tình Huống Lỗi Mẫu SGK Lớp {grade}
          </button>
          <button
            onClick={() => {
              setActiveTab('custom');
              sounds.playSnap();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'custom'
                ? 'bg-white text-slate-900 shadow-md'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            🔍 Em Tự Nhập Lỗi Cần Chẩn Đoán
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* TAB 1: SAMPLE BUG SCENARIOS */}
        {activeTab === 'sample' && (
          <div className="space-y-4">
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-500" />
              <span>Chọn Một Tình Huống Lỗi Thường Gặp Để Khám Phá:</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {BUG_SCENARIOS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSelectScenario(s.id)}
                  className={`text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    selectedScenarioId === s.id
                      ? 'bg-rose-50 border-rose-500 text-rose-950 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-rose-300 text-slate-700'
                  }`}
                >
                  <div>
                    <span className="text-xl mb-1 block">🩺</span>
                    <h4 className="text-xs font-black line-clamp-2">{s.title}</h4>
                  </div>
                  <span className="text-[10px] font-bold text-rose-600 mt-2 block">
                    Bấm để chẩn đoán ➔
                  </span>
                </button>
              ))}
            </div>

            {/* Display sample code of current active scenario */}
            {activeScenario.sampleCode && (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-xs font-black text-slate-700 block mb-2">
                  Các khối lệnh đang gây ra hiện tượng lạ:
                </span>
                <div className="inline-flex flex-col space-y-1 bg-white p-3 rounded-xl border border-slate-200">
                  {activeScenario.sampleCode.map((b) => (
                    <ScratchBlock key={b.id} block={b} size="sm" />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CUSTOM ERROR INPUT */}
        {activeTab === 'custom' && (
          <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 space-y-4">
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
              <Search className="w-4 h-4 text-indigo-600" />
              <span>Nhập Thông Tin Chương Trình Đang Gặp Lỗi:</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">
                  1. Mô tả chương trình / bài toán:
                </label>
                <textarea
                  value={programDesc}
                  onChange={(e) => setProgramDesc(e.target.value)}
                  placeholder="Ví dụ: Em muốn làm chú Mèo chào bạn rồi đi 20 bước vào lớp học..."
                  rows={3}
                  className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs font-medium focus:outline-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">
                  2. Các khối lệnh em đang ghép (tên các khối lệnh):
                </label>
                <textarea
                  value={codePasted}
                  onChange={(e) => setCodePasted(e.target.value)}
                  placeholder="Ví dụ: [khi bấm cờ xanh], [di chuyển 20 bước], [nói Xin chào trong 2 giây]..."
                  rows={3}
                  className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs font-medium focus:outline-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">
                  3. Kết quả mong muốn:
                </label>
                <input
                  type="text"
                  value={expectedResult}
                  onChange={(e) => setExpectedResult(e.target.value)}
                  placeholder="Ví dụ: Mèo nói chào trước, đi sau..."
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-xs font-medium focus:outline-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">
                  4. Kết quả thực tế đang xảy ra:
                </label>
                <input
                  type="text"
                  value={actualResult}
                  onChange={(e) => setActualResult(e.target.value)}
                  placeholder="Ví dụ: Mèo lại đi trước rồi mới nói câu chào..."
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-xs font-medium focus:outline-rose-500"
                />
              </div>
            </div>

            {/* Photo upload support */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-black cursor-pointer shadow-2xs">
                <Upload className="w-4 h-4 text-indigo-600" />
                <span>{uploadedImageName ? `Đã chọn: ${uploadedImageName}` : 'Tải ảnh chụp chương trình (nếu có)'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              {uploadedImagePreview && (
                <div className="relative">
                  <img
                    src={uploadedImagePreview}
                    alt="Scratch program"
                    className="w-16 h-16 rounded-xl object-cover border border-slate-300"
                  />
                  <button
                    onClick={() => {
                      setUploadedImageName(null);
                      setUploadedImagePreview(null);
                    }}
                    className="absolute -top-1 -right-1 bg-rose-500 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              )}

              <button
                onClick={handleAnalyzeCustomError}
                disabled={isLoading || (!programDesc.trim() && !actualResult.trim())}
                className={`ml-auto px-6 py-2.5 rounded-xl text-xs font-black text-white shadow-md flex items-center gap-2 transition-transform active:scale-95 cursor-pointer ${
                  isLoading || (!programDesc.trim() && !actualResult.trim())
                    ? 'bg-slate-300 cursor-not-allowed'
                    : 'bg-rose-500 hover:bg-rose-600'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Thám tử AI đang chẩn đoán...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Bắt Đầu Phân Tích Lỗi (9 Bước)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* QUY TRÌNH 9 BƯỚC PHÂN TÍCH LỖI CHUẨN SƯ PHẠM SGK TIN HỌC */}
        {/* ========================================================= */}
        <div className="bg-slate-50/70 p-6 rounded-3xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Hồ Sơ Chẩn Đoán Lỗi (Quy Trình 9 Bước)</span>
            </h3>
            <span className="text-xs font-black bg-rose-100 text-rose-800 px-3 py-1 rounded-full">
              Thám Tử Scratch AI
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Bước 1 */}
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200">
              <span className="font-black text-blue-600 block mb-1">
                1. Yêu cầu của bài toán là gì?
              </span>
              <p className="text-slate-700 font-medium">{analysis.taskGoal}</p>
            </div>

            {/* Bước 2 */}
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200">
              <span className="font-black text-indigo-600 block mb-1">
                2. Chương trình đang thực hiện như thế nào?
              </span>
              <p className="text-slate-700 font-medium">{analysis.howRunning}</p>
            </div>

            {/* Bước 3 */}
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200">
              <span className="font-black text-rose-600 block mb-1">
                3. Kết quả thực tế là gì?
              </span>
              <p className="text-slate-700 font-medium">{analysis.actualResult}</p>
            </div>

            {/* Bước 4 */}
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200">
              <span className="font-black text-emerald-600 block mb-1">
                4. Kết quả mong muốn là gì?
              </span>
              <p className="text-slate-700 font-medium">{analysis.expectedResult}</p>
            </div>

            {/* Bước 5 */}
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200">
              <span className="font-black text-amber-600 block mb-1">
                5. Có khả năng sai ở bước nào?
              </span>
              <p className="text-slate-700 font-medium">{analysis.whereStepWrong}</p>
            </div>

            {/* Bước 6 */}
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200">
              <span className="font-black text-purple-600 block mb-1">
                6. Vì sao?
              </span>
              <p className="text-slate-700 font-medium">{analysis.whyWrong}</p>
            </div>
          </div>

          {/* Bước 7: Gợi ý sửa (Socratic, không đưa code ngay) */}
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-300 text-xs">
            <span className="font-black text-amber-900 block mb-1 text-sm flex items-center gap-1.5">
              <span>💡 7. Gợi ý sửa cho em:</span>
            </span>
            <p className="text-amber-950 font-bold leading-relaxed">{analysis.hintFix}</p>
          </div>

          {/* Bước 8: Cho học sinh tự sửa */}
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-300 text-xs space-y-2">
            <span className="font-black text-blue-900 block text-sm">
              🛠️ 8. Nhiệm vụ để em tự tay sửa:
            </span>
            <p className="text-blue-950 font-medium leading-relaxed">{analysis.selfFixTask}</p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={handleSelfFixed}
                disabled={isSelfFixed}
                className={`px-5 py-2 rounded-xl text-xs font-black shadow-sm transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5 ${
                  isSelfFixed
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>{isSelfFixed ? '🎉 Em đã tự sửa xong xuất sắc!' : 'Em đã tự sửa được rồi!'}</span>
              </button>

              <button
                onClick={() => setShowFullCodeGuide(!showFullCodeGuide)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 underline cursor-pointer"
              >
                {showFullCodeGuide ? 'Ẩn đáp án chi tiết' : 'Em thử rồi nhưng vẫn chưa được, cho em xem gợi ý thêm'}
              </button>
            </div>

            {showFullCodeGuide && (
              <div className="p-3 bg-white rounded-xl border border-blue-200 mt-2 text-slate-700 font-medium">
                <span className="font-black text-slate-900 block mb-1">Hướng dẫn khắc phục:</span>
                <p className="whitespace-pre-line">{analysis.verifyGuide}</p>
              </div>
            )}
          </div>

          {/* Bước 9: Kiểm tra lại */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-300 text-xs">
            <span className="font-black text-emerald-900 block mb-1 text-sm">
              ✅ 9. Kiểm tra lại kết quả:
            </span>
            <p className="text-emerald-950 font-medium leading-relaxed">
              Sau khi sửa xong, em hãy nháy chuột vào Cờ xanh (🟩) trên Sân khấu để chạy thử chương trình. Quan sát xem kết quả thực tế đã trùng khớp hoàn toàn với kết quả mong muốn chưa nhé!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
