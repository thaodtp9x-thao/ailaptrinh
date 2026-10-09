import React, { useState, useEffect } from 'react';
import { GradeLevel, UserProgress, ScratchBlockDef, DailyMission } from './types';
import { STANDARD_BADGES, STUDENT_LEVELS } from './data/challengesData';
import { LESSONS_DATA } from './data/lessonsData';
import { Navbar, NavTab } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { LessonsCatalog } from './components/LessonsCatalog';
import { ExercisePracticeSection } from './components/ExercisePracticeSection';
import { AiTutor } from './components/AiTutor';
import { ChallengesSection } from './components/ChallengesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AiDebugger } from './components/AiDebugger';
import { ScratchPlayground } from './components/ScratchPlayground';
import { ProgressDashboard } from './components/ProgressDashboard';
import { TeacherHub } from './components/TeacherHub';
import { sounds } from './utils/audio';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'scratch_ai_progress_v2';

const DEFAULT_DAILY_MISSIONS: DailyMission[] = [
  { id: 'm1', title: 'Hoàn thành 1 bài học mới', completed: false, xpReward: 20 },
  { id: 'm2', title: 'Làm đúng 3 bài luyện tập', completed: false, xpReward: 15 },
  { id: 'm3', title: 'Hoàn thành 1 thử thách lập trình', completed: false, xpReward: 15 }
];

const DEFAULT_PROGRESS: UserProgress = {
  name: 'Lập trình viên nhí',
  grade: 4,
  avatar: '🐱',
  xp: 40,
  stars: 4,
  streakDays: 3,
  currentLessonId: 'l4-b1',
  completedLessons: ['l4-b1'],
  completedExercises: ['ex4-nb-1'],
  completedChallenges: [],
  completedProjects: [],
  fixedBugsCount: 1,
  badges: STANDARD_BADGES,
  dailyMissions: DEFAULT_DAILY_MISSIONS,
  mistakeTopics: {}
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [grade, setGrade] = useState<GradeLevel>(4);

  // Playground blocks passed from lessons/projects
  const [playgroundBlocks, setPlaygroundBlocks] = useState<ScratchBlockDef[] | undefined>(undefined);

  // Load progress from localStorage
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_PROGRESS,
          ...parsed,
          name: 'Lập trình viên nhí',
          badges: STANDARD_BADGES.map((b) => {
            const found = parsed.badges?.find((pb: any) => pb.id === b.id);
            return found ? { ...b, unlocked: found.unlocked } : b;
          })
        };
      }
    } catch (e) {
      console.warn('Failed to parse localStorage progress:', e);
    }
    return DEFAULT_PROGRESS;
  });

  // Save progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('Failed to save progress:', e);
    }
  }, [progress]);

  // Sync grade with user action
  const handleSelectGrade = (newGrade: GradeLevel) => {
    setGrade(newGrade);
    setProgress((prev) => ({ ...prev, grade: newGrade }));
  };

  // Helper: check and unlock 7 standard badges
  const checkAndUnlockBadges = (updated: UserProgress): UserProgress => {
    const newBadges = updated.badges.map((b) => {
      if (b.unlocked) return b;

      // 1. Làm quen Scratch: Hoàn thành ít nhất 1 bài
      if (b.id === 'b-lam-quen' && updated.completedLessons.length >= 1) {
        return { ...b, unlocked: true, unlockedAt: new Date().toLocaleDateString('vi-VN') };
      }
      // 2. Bậc thầy khối lệnh: Ít nhất 15 bài học hoặc bài tập
      if (
        b.id === 'b-bac-thay-khoi-lenh' &&
        updated.completedLessons.length + updated.completedExercises.length >= 15
      ) {
        return { ...b, unlocked: true, unlockedAt: new Date().toLocaleDateString('vi-VN') };
      }
      // 3. Vua vòng lặp: Hoàn thành bài về vòng lặp hoặc thử thách liên quan
      if (
        b.id === 'b-vua-vong-lap' &&
        (updated.completedLessons.includes('l4-b9') ||
          updated.completedLessons.includes('l5-b2') ||
          updated.completedChallenges.includes('ch-4-bat-do-vat'))
      ) {
        return { ...b, unlocked: true, unlockedAt: new Date().toLocaleDateString('vi-VN') };
      }
      // 4. Thám tử sửa lỗi: Có ít nhất 1 lỗi tự sửa
      if (b.id === 'b-tham-tu-loi' && updated.fixedBugsCount >= 1) {
        return { ...b, unlocked: true, unlockedAt: new Date().toLocaleDateString('vi-VN') };
      }
      // 5. Nhà tư duy thuật toán: Hoàn thành bài thuật toán
      if (
        b.id === 'b-nha-tu-duy-thuat-toan' &&
        (updated.completedLessons.includes('l4-b8') ||
          updated.completedChallenges.includes('ch-3-me-cung'))
      ) {
        return { ...b, unlocked: true, unlockedAt: new Date().toLocaleDateString('vi-VN') };
      }
      // 6. Nhà sáng tạo: Hoàn thành ít nhất 2 dự án
      if (b.id === 'b-nha-sang-tao' && updated.completedProjects.length >= 2) {
        return { ...b, unlocked: true, unlockedAt: new Date().toLocaleDateString('vi-VN') };
      }
      // 7. Cao thủ Scratch: Trên 300 XP
      if (b.id === 'b-cao-thu-scratch' && updated.xp >= 300) {
        return { ...b, unlocked: true, unlockedAt: new Date().toLocaleDateString('vi-VN') };
      }

      return b;
    });

    return { ...updated, badges: newBadges };
  };

  // Lesson completion
  const handleCompleteLesson = (lessonId: string, xpReward: number) => {
    setProgress((prev) => {
      const already = prev.completedLessons.includes(lessonId);
      const newCompleted = already ? prev.completedLessons : [...prev.completedLessons, lessonId];
      const updated: UserProgress = {
        ...prev,
        xp: already ? prev.xp : prev.xp + xpReward,
        stars: already ? prev.stars : prev.stars + 1,
        completedLessons: newCompleted,
        currentLessonId: lessonId
      };
      return checkAndUnlockBadges(updated);
    });
  };

  // Exercise completion
  const handleCompleteExercise = (exerciseId: string, xpReward: number) => {
    setProgress((prev) => {
      const already = prev.completedExercises.includes(exerciseId);
      const newCompleted = already ? prev.completedExercises : [...prev.completedExercises, exerciseId];
      const updated: UserProgress = {
        ...prev,
        xp: already ? prev.xp : prev.xp + xpReward,
        stars: already ? prev.stars : prev.stars + 1,
        completedExercises: newCompleted
      };
      return checkAndUnlockBadges(updated);
    });
  };

  // Challenge completion
  const handleCompleteChallenge = (challengeId: string, xpReward: number) => {
    setProgress((prev) => {
      const already = prev.completedChallenges.includes(challengeId);
      const newCompleted = already ? prev.completedChallenges : [...prev.completedChallenges, challengeId];
      const updated: UserProgress = {
        ...prev,
        xp: already ? prev.xp : prev.xp + xpReward,
        stars: already ? prev.stars : prev.stars + 2,
        completedChallenges: newCompleted
      };
      return checkAndUnlockBadges(updated);
    });
  };

  // Project completion
  const handleCompleteProject = (projectId: string) => {
    setProgress((prev) => {
      const already = prev.completedProjects.includes(projectId);
      const newCompleted = already ? prev.completedProjects : [...prev.completedProjects, projectId];
      const updated: UserProgress = {
        ...prev,
        xp: already ? prev.xp : prev.xp + 50,
        stars: already ? prev.stars : prev.stars + 2,
        completedProjects: newCompleted
      };
      return checkAndUnlockBadges(updated);
    });
  };

  // Bug solved in debugger
  const handleSolvedBug = () => {
    setProgress((prev) => {
      const updated: UserProgress = {
        ...prev,
        xp: prev.xp + 30,
        stars: prev.stars + 1,
        fixedBugsCount: prev.fixedBugsCount + 1
      };
      return checkAndUnlockBadges(updated);
    });
  };

  // Record student mistake for AI recommendations
  const handleRecordMistake = (topic: string) => {
    setProgress((prev) => ({
      ...prev,
      mistakeTopics: {
        ...prev.mistakeTopics,
        [topic]: (prev.mistakeTopics[topic] || 0) + 1
      }
    }));
  };

  // Toggle daily mission
  const handleToggleMission = (missionId: string) => {
    sounds.playSnap();
    setProgress((prev) => {
      const updatedMissions = prev.dailyMissions.map((m) =>
        m.id === missionId ? { ...m, completed: !m.completed } : m
      );
      return { ...prev, dailyMissions: updatedMissions };
    });
  };

  // Open playground with blocks
  const handleOpenPlaygroundWithBlocks = (blocks: ScratchBlockDef[]) => {
    sounds.playSnap();
    setPlaygroundBlocks(blocks);
    setCurrentTab('playground');
  };

  // Reset progress
  const handleResetProgress = () => {
    if (window.confirm('Em có chắc chắn muốn làm mới lại toàn bộ tiến trình học tập không?')) {
      setProgress(DEFAULT_PROGRESS);
      sounds.playSnap();
    }
  };

  const currentLessonObj = LESSONS_DATA.find((l) => l.id === progress.currentLessonId);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-['Nunito',sans-serif]">
      {/* Top Navigation Bar with 7 Core Sections */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        grade={grade}
        onSelectGrade={handleSelectGrade}
        progress={progress}
      />

      {/* Main Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {/* 1. TRANG CHỦ (Home Dashboard) */}
        {currentTab === 'home' && (
          <HomeHero
            grade={grade}
            onSelectGrade={handleSelectGrade}
            onNavigate={setCurrentTab}
            progress={progress}
            onToggleMission={handleToggleMission}
          />
        )}

        {/* 2. HỌC SCRATCH (20 Lessons, 9-part pedagogical anatomy) */}
        {currentTab === 'lessons' && (
          <LessonsCatalog
            grade={grade}
            completedLessons={progress.completedLessons}
            onCompleteLesson={handleCompleteLesson}
            onOpenPlaygroundWithBlocks={handleOpenPlaygroundWithBlocks}
          />
        )}

        {/* 3. GIA SƯ AI (Socratic Tutor with 4 hint levels) */}
        {currentTab === 'tutor' && (
          <AiTutor
            grade={grade}
            currentLessonTitle={currentLessonObj?.title}
            onOpenPlaygroundWithBlocks={() => setCurrentTab('playground')}
          />
        )}

        {/* 4. LUYỆN TẬP (60 exercises across Levels 1, 2, 3) */}
        {currentTab === 'practice' && (
          <ExercisePracticeSection
            grade={grade}
            completedExercises={progress.completedExercises}
            onCompleteExercise={handleCompleteExercise}
            onRecordMistake={handleRecordMistake}
          />
        )}

        {/* 5. THỬ THÁCH (8 Epic Challenges) */}
        {currentTab === 'challenges' && (
          <ChallengesSection
            grade={grade}
            completedChallenges={progress.completedChallenges}
            onCompleteChallenge={handleCompleteChallenge}
            onOpenPlaygroundWithBlocks={handleOpenPlaygroundWithBlocks}
          />
        )}

        {/* 6. DỰ ÁN ("XƯỞNG SÁNG TẠO SCRATCH" with 10 projects & AI idea converter) */}
        {currentTab === 'projects' && (
          <ProjectsSection
            grade={grade}
            onOpenPlaygroundWithBlocks={handleOpenPlaygroundWithBlocks}
            onCompleteProject={handleCompleteProject}
          />
        )}

        {/* 7. THÁM TỬ SỬA LỖI (AI Debugger) */}
        {currentTab === 'debugger' && (
          <AiDebugger
            grade={grade}
            onSolvedBug={handleSolvedBug}
          />
        )}

        {/* 8. SÂN KHẤU SCRATCH (Playground Simulator) */}
        {currentTab === 'playground' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  🎮 Sân Khấu Lập Trình Scratch Trực Quan
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Kéo khối lệnh từ danh mục bên trái, ghép kịch bản ở giữa và bấm Cờ Xanh để xem nhân vật biểu diễn!
                </p>
              </div>
            </div>
            <ScratchPlayground
              initialBlocks={playgroundBlocks}
              onSuccessChallenge={() => {
                setProgress((prev) => ({ ...prev, xp: prev.xp + 10 }));
              }}
            />
          </div>
        )}

        {/* 9. TIẾN TRÌNH ("CON ĐƯỜNG LẬP TRÌNH VIÊN NHÍ" with 5 Levels & 7 Badges) */}
        {currentTab === 'progress' && (
          <ProgressDashboard
            progress={progress}
            onResetProgress={handleResetProgress}
          />
        )}

        {/* 10. GÓC GIÁO VIÊN (Teacher Hub & AI Worksheet Generator) */}
        {currentTab === 'teacher' && <TeacherHub currentGrade={grade} />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-black text-slate-800">
            <span className="text-lg">🐱</span>
            <span>SCRATCH AI – NGƯỜI BẠN ĐỒNG HÀNH LẬP TRÌNH</span>
          </div>

          <div className="flex items-center gap-3 font-semibold text-slate-500 text-center flex-wrap justify-center">
            <span>Dành cho học sinh Lớp 4 & Lớp 5 Tiểu học Việt Nam</span>
            <span>•</span>
            <span>Phương pháp Socratic AI: Gợi mở – Tự làm – Tự sửa</span>
            <span>•</span>
            <span>Giáo viên đồng hành & theo dõi</span>
          </div>

          <div className="text-[11px] text-slate-400">
            © 2026 Scratch AI. Tích hợp Google Gemini AI.
          </div>
        </div>
      </footer>
    </div>
  );
}
