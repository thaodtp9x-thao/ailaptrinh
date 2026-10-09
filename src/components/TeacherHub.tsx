import React, { useState } from 'react';
import { GradeLevel } from '../types';
import { LESSONS_DATA } from '../data/lessonsData';
import { sounds } from '../utils/audio';
import {
  GraduationCap,
  Sparkles,
  Printer,
  Copy,
  Loader2,
  FileText,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Download,
  Check,
  Tag,
  Wrench,
  Award
} from 'lucide-react';

interface TeacherHubProps {
  currentGrade: GradeLevel;
}

export const TeacherHub: React.FC<TeacherHubProps> = ({ currentGrade: initialGrade }) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(initialGrade);
  const gradeLessons = LESSONS_DATA.filter((l) => l.grade === selectedGrade);
  const [selectedLessonId, setSelectedLessonId] = useState<string>(gradeLessons[0].id);

  const currentLesson = gradeLessons.find((l) => l.id === selectedLessonId) || gradeLessons[0];

  // Active view tab for teacher: Chuẩn kiến thức SGK vs Công cụ tạo đề AI
  const [activeTab, setActiveTab] = useState<'curriculum' | 'generator'>('curriculum');

  // Generator form state
  const [genMode, setGenMode] = useState<'worksheet' | 'practice' | 'quiz'>('worksheet');
  const [level, setLevel] = useState<'Nhận biết' | 'Thông hiểu' | 'Vận dụng'>('Thông hiểu');
  const [questionCount, setQuestionCount] = useState<number>(3);
  const [questionType, setQuestionType] = useState<string>('Trắc nghiệm 4 lựa chọn');

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Generated worksheet state
  const [generatedWorksheet, setGeneratedWorksheet] = useState<{
    title: string;
    lessonTitle: string;
    objective: string;
    targetGrade: number;
    questions: {
      number: number;
      type: string;
      question: string;
      options?: string[];
      answer: string;
      explanation?: string;
      rubricPoint: string;
    }[];
    practicalTask: {
      title: string;
      requirements: string[];
      expectedCode: string;
    };
    gradingGuide: string[];
  }>({
    title: `PHIẾU BÀI TẬP TIN HỌC SCRATCH – LỚP ${selectedGrade}`,
    lessonTitle: currentLesson.title,
    objective: currentLesson.objectives.know,
    targetGrade: selectedGrade,
    questions: [
      {
        number: 1,
        type: 'Nhận biết',
        question: `Khối lệnh nào sau đây dùng để bắt đầu chạy chương trình trong ${currentLesson.title}?`,
        options: [
          'A. [khi bấm vào cờ xanh]',
          'B. [di chuyển 10 bước]',
          'C. [đặt điểm thành 0]',
          'D. [dừng lại tất cả]'
        ],
        answer: 'Đáp án: A. [khi bấm vào cờ xanh]',
        explanation: 'Khối cờ xanh là lệnh sự kiện bắt đầu theo SGK Tin học.',
        rubricPoint: '2.5 điểm'
      },
      {
        number: 2,
        type: 'Thông hiểu',
        question: 'Thứ tự các khối lệnh trong chương trình ảnh hưởng như thế nào đến kết quả hoạt động của nhân vật?',
        options: [
          'A. Máy tính thực hiện lần lượt từ trên xuống dưới theo đúng thứ tự',
          'B. Máy tính thực hiện ngẫu nhiên',
          'C. Lệnh nào ở dưới chạy trước',
          'D. Không có ảnh hưởng gì'
        ],
        answer: 'Đáp án: A. Máy tính thực hiện lần lượt từ trên xuống dưới theo đúng thứ tự',
        explanation: 'Theo SGK Tin học, các lệnh được máy tính chạy tuần tự từ trên xuống dưới.',
        rubricPoint: '2.5 điểm'
      }
    ],
    practicalTask: {
      title: `Nhiệm vụ thực hành trên máy tính: ${currentLesson.title}`,
      requirements: [
        'Khởi động phần mềm Scratch và chọn nhân vật Chú mèo.',
        'Lập trình đúng các khối lệnh theo yêu cầu của bài học.',
        'Bấm Cờ xanh chạy thử và quan sát kết quả trên sân khấu.'
      ],
      expectedCode: 'Gắn khối [khi bấm vào cờ xanh] ở trên cùng, các lệnh tiếp theo theo đúng thứ tự.'
    },
    gradingGuide: [
      'Tạo đúng cấu trúc chương trình: 4.0 điểm',
      'Chương trình chạy được khi bấm cờ xanh: 4.0 điểm',
      'Trình bày sáng tạo và đúng thứ tự: 2.0 điểm'
    ]
  });

  const handleGenerate = async (overrideMode?: 'worksheet' | 'practice' | 'quiz') => {
    const mode = overrideMode || genMode;
    setIsGenerating(true);
    setCopied(false);
    sounds.playSnap();

    try {
      const res = await fetch('/api/generate-exercise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grade: selectedGrade,
          lessonTitle: currentLesson.title,
          level,
          questionCount: mode === 'quiz' ? 5 : questionCount,
          questionType: mode === 'practice' ? 'Bài thực hành trên máy' : questionType
        })
      });

      const data = await res.json();
      if (data.exercise) {
        setGeneratedWorksheet(data.exercise);
        sounds.playSuccess();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyText = () => {
    let text = `${generatedWorksheet.title}\n`;
    text += `Bài học: ${generatedWorksheet.lessonTitle}\n`;
    text += `Mục tiêu: ${generatedWorksheet.objective}\n\n`;
    text += `I. PHẦN CÂU HỎI:\n`;
    generatedWorksheet.questions.forEach((q) => {
      text += `Câu ${q.number} (${q.type} - ${q.rubricPoint}): ${q.question}\n`;
      if (q.options) {
        q.options.forEach((opt) => (text += `   ${opt}\n`));
      }
      text += `   ${q.answer}\n\n`;
    });
    text += `II. BÀI TẬP THỰC HÀNH:\n${generatedWorksheet.practicalTask.title}\n`;
    generatedWorksheet.practicalTask.requirements.forEach((r, idx) => {
      text += `   ${idx + 1}. ${r}\n`;
    });
    text += `\nIII. TIÊU CHÍ ĐÁNH GIÁ:\n`;
    generatedWorksheet.gradingGuide.forEach((g) => (text += `- ${g}\n`));

    navigator.clipboard.writeText(text);
    setCopied(true);
    sounds.playSnap();
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    sounds.playSnap();
    window.print();
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-6 text-white print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner border border-white/20">
              👩‍🏫
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
                Phân Hệ 5: Dành Cho Giáo Viên Tiểu Học
              </span>
              <h1 className="text-2xl md:text-3xl font-black mt-1">GÓC GIÁO VIÊN</h1>
              <p className="text-blue-100 text-xs md:text-sm mt-0.5 font-medium">
                Tra cứu chuẩn kiến thức SGK Tin học 4 – 5 và tạo bài tập, phiếu thực hành bằng AI.
              </p>
            </div>
          </div>

          {/* Grade & Lesson selectors */}
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
              className="px-3 py-1.5 rounded-xl bg-white text-slate-900 text-xs font-black border border-white/40 outline-none cursor-pointer"
            >
              {gradeLessons.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.title.split('.')[0]} • {l.title.split('.')[1]?.slice(0, 30)}...
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 mt-5">
          <button
            onClick={() => {
              setActiveTab('curriculum');
              sounds.playSnap();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'curriculum'
                ? 'bg-white text-slate-900 shadow-md'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            📖 Tra Cứu Chuẩn Kiến Thức SGK
          </button>
          <button
            onClick={() => {
              setActiveTab('generator');
              sounds.playSnap();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'generator'
                ? 'bg-white text-slate-900 shadow-md'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            ⚡ Tạo Bài Luyện Tập & Phiếu Bài Tập Bằng AI
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* TAB 1: CURRICULUM OVERVIEW */}
        {activeTab === 'curriculum' && (
          <div className="space-y-6">
            <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-black uppercase text-blue-600">
                  {currentLesson.themeTitle}
                </span>
                <h2 className="text-lg font-black text-slate-900 mt-0.5">
                  {currentLesson.title}
                </h2>
              </div>
              <span className="text-xs font-bold bg-white text-blue-800 border border-blue-200 px-3 py-1 rounded-xl">
                SGK Tin học {selectedGrade} Kết nối tri thức
              </span>
            </div>

            {/* 4 Essential Teacher Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* 1. Mục tiêu */}
              <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-2xs space-y-2.5">
                <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs">
                    1
                  </span>
                  <span>Mục Tiêu Bài Học</span>
                </h3>
                <div className="space-y-2 text-xs text-slate-700">
                  <p><span className="font-black text-slate-900">Biết:</span> {currentLesson.objectives.know}</p>
                  <p><span className="font-black text-slate-900">Làm được:</span> {currentLesson.objectives.do}</p>
                  <p><span className="font-black text-slate-900">Tư duy:</span> {currentLesson.objectives.thinking}</p>
                </div>
              </div>

              {/* 2. Kiến thức trọng tâm */}
              <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-2xs space-y-2.5">
                <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs">
                    2
                  </span>
                  <span>Kiến Thức Trọng Tâm</span>
                </h3>
                <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                  {currentLesson.keyKnowledge.summary}
                </p>
                <div className="space-y-1.5 pt-1">
                  {currentLesson.keyKnowledge.points.map((pt, idx) => (
                    <div key={idx} className="text-xs text-slate-600 flex items-start gap-1.5">
                      <span>•</span>
                      <span><strong className="text-slate-800">{pt.title}:</strong> {pt.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Thuật ngữ cần nhớ */}
              <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-2xs space-y-2.5">
                <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center text-xs">
                    3
                  </span>
                  <span>Thuật Ngữ Chuẩn SGK</span>
                </h3>
                <div className="space-y-2">
                  {currentLesson.keywords.map((kw, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                      <span className="font-black text-purple-700 block mb-0.5">[{kw.term}]</span>
                      <p className="text-slate-600 font-medium">{kw.meaning}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Nội dung thực hành */}
              <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-2xs space-y-2.5">
                <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs">
                    4
                  </span>
                  <span>Nội Dung Thực Hành & Đánh Giá</span>
                </h3>
                <div className="space-y-2 text-xs text-slate-700">
                  <p><span className="font-black text-slate-900">Mục tiêu thực hành:</span> {currentLesson.practice.goal}</p>
                  <p><span className="font-black text-slate-900">Tiêu chí đúng chuẩn:</span> {currentLesson.checkResult.correctCriteria}</p>
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 font-semibold mt-2">
                    💡 Ghi chú giáo viên: {currentLesson.teacherNotes}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AI EXERCISE & WORKSHEET GENERATOR */}
        {activeTab === 'generator' && (
          <div className="space-y-6">
            {/* Quick Generator Preset Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 print:hidden">
              <button
                onClick={() => {
                  setGenMode('worksheet');
                  handleGenerate('worksheet');
                }}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                  genMode === 'worksheet'
                    ? 'bg-blue-50 border-blue-500 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-blue-300'
                }`}
              >
                <FileText className="w-5 h-5 text-blue-600 mb-1" />
                <h4 className="text-xs font-black text-slate-900">5. Tạo Phiếu Bài Tập</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Trắc nghiệm + Tự luận + Bài thực hành</p>
              </button>

              <button
                onClick={() => {
                  setGenMode('practice');
                  handleGenerate('practice');
                }}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                  genMode === 'practice'
                    ? 'bg-indigo-50 border-indigo-500 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-indigo-300'
                }`}
              >
                <Wrench className="w-5 h-5 text-indigo-600 mb-1" />
                <h4 className="text-xs font-black text-slate-900">6. Tạo Bài Thực Hành</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Yêu cầu lập trình trên máy tính + Barem</p>
              </button>

              <button
                onClick={() => {
                  setGenMode('quiz');
                  handleGenerate('quiz');
                }}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                  genMode === 'quiz'
                    ? 'bg-purple-50 border-purple-500 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-purple-300'
                }`}
              >
                <Sparkles className="w-5 h-5 text-purple-600 mb-1" />
                <h4 className="text-xs font-black text-slate-900">7. Kiểm Tra Nhanh (5 Câu)</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Đánh giá nhanh đầu giờ hoặc cuối tiết</p>
              </button>
            </div>

            {/* Custom Parameter Controls */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs print:hidden">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Mức độ:</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value as any)}
                  className="w-full p-2 rounded-xl bg-white border border-slate-300 font-bold"
                >
                  <option value="Nhận biết">Mức 1: Nhận biết</option>
                  <option value="Thông hiểu">Mức 2: Thông hiểu</option>
                  <option value="Vận dụng">Mức 3: Vận dụng</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Số câu hỏi:</label>
                <select
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="w-full p-2 rounded-xl bg-white border border-slate-300 font-bold"
                >
                  <option value={2}>2 câu</option>
                  <option value={3}>3 câu</option>
                  <option value={4}>4 câu</option>
                  <option value={5}>5 câu</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Dạng câu hỏi:</label>
                <select
                  value={questionType}
                  onChange={(e) => setQuestionType(e.target.value)}
                  className="w-full p-2 rounded-xl bg-white border border-slate-300 font-bold"
                >
                  <option value="Trắc nghiệm 4 lựa chọn">Trắc nghiệm</option>
                  <option value="Đúng/Sai">Đúng / Sai</option>
                  <option value="Sắp xếp thứ tự các bước">Sắp xếp thứ tự</option>
                  <option value="Dự đoán kết quả">Dự đoán kết quả</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => handleGenerate()}
                  disabled={isGenerating}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-sm transition-transform active:scale-95 cursor-pointer"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Đang tạo đề...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Tạo Đề Mới</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Generated Worksheet Document View (Printable) */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-slate-300 shadow-sm space-y-6 print:border-none print:shadow-none print:p-0">
              {/* Document Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-slate-900 pb-4 gap-2">
                <div>
                  <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider">
                    BỘ GIÁO DỤC VÀ ĐÀO TẠO • TIN HỌC TIỂU HỌC
                  </h3>
                  <h2 className="text-xl font-black text-slate-900 mt-0.5">
                    {generatedWorksheet.title}
                  </h2>
                  <p className="text-xs font-bold text-indigo-700 mt-0.5">
                    Nội dung: {generatedWorksheet.lessonTitle}
                  </p>
                </div>

                <div className="flex items-center gap-2 print:hidden self-end sm:self-auto">
                  <button
                    onClick={handleCopyText}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Đã sao chép' : 'Sao chép'}</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>In Phiếu Bài Tập</span>
                  </button>
                </div>
              </div>

              {/* Document Objectives */}
              <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 font-medium">
                <strong>Mục tiêu đánh giá:</strong> {generatedWorksheet.objective}
              </div>

              {/* Part I: Questions */}
              {generatedWorksheet.questions.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-1">
                    I. Phần Câu Hỏi Kiểm Tra Kiến Thức ({generatedWorksheet.questions.length} câu)
                  </h4>

                  <div className="space-y-4">
                    {generatedWorksheet.questions.map((q) => (
                      <div key={q.number} className="p-4 rounded-2xl bg-slate-50/60 border border-slate-200 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-black text-slate-900 text-sm">
                            Câu {q.number}:
                          </span>
                          <span className="font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                            {q.type} • {q.rubricPoint}
                          </span>
                        </div>

                        <p className="font-bold text-slate-800 text-xs md:text-sm">{q.question}</p>

                        {q.options && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-medium text-slate-700">
                            {q.options.map((opt, oIdx) => (
                              <div key={oIdx} className="p-2 rounded-lg bg-white border border-slate-200">
                                {opt}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Answer and explanation for teachers */}
                        <div className="pt-2 border-t border-slate-200 text-slate-600">
                          <span className="font-black text-emerald-700">{q.answer}</span>
                          {q.explanation && (
                            <p className="text-[11px] text-slate-500 mt-0.5">💡 {q.explanation}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Part II: Practical Task */}
              {generatedWorksheet.practicalTask && (
                <div className="space-y-3">
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-1">
                    II. {generatedWorksheet.practicalTask.title}
                  </h4>

                  <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2 text-xs">
                    <span className="font-black text-emerald-950 block">Yêu cầu thực hành:</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-700 font-medium">
                      {generatedWorksheet.practicalTask.requirements.map((r, rIdx) => (
                        <li key={rIdx}>{r}</li>
                      ))}
                    </ul>

                    <div className="p-2.5 bg-white rounded-xl border border-emerald-200 mt-2 text-emerald-900 font-semibold">
                      💡 Hướng dẫn cấu trúc khối lệnh: {generatedWorksheet.practicalTask.expectedCode}
                    </div>
                  </div>
                </div>
              )}

              {/* Part III: Rubric & Grading Guide */}
              {generatedWorksheet.gradingGuide && (
                <div className="space-y-3">
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-1">
                    III. Hướng Dẫn Chấm Điểm & Barem Đánh Giá
                  </h4>

                  <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs space-y-1 font-medium text-amber-950">
                    {generatedWorksheet.gradingGuide.map((g, gIdx) => (
                      <p key={gIdx}>✓ {g}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
