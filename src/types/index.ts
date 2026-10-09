export type GradeLevel = 4 | 5;

export type BlockCategory =
  | 'motion'      // Chuyển động (Xanh lam #4C97FF)
  | 'looks'       // Hiển thị (Tím #9966FF)
  | 'sound'       // Âm thanh (Hồng tím #CF63CF)
  | 'events'      // Sự kiện (Vàng #FFBF00)
  | 'control'     // Điều khiển (Cam #FFAB19)
  | 'sensing'     // Cảm biến (Lục lam #5CB1D6)
  | 'operators'   // Các phép toán (Xanh lá #59C059)
  | 'variables';  // Các biến (Cam đậm #FF8C1A)

export interface ScratchBlockDef {
  id: string;
  category: BlockCategory;
  text: string;
  shape: 'hat' | 'stack' | 'c-block' | 'cap' | 'reporter' | 'boolean';
  params?: (string | number)[];
  explanation?: string;
  actionType?: 'move' | 'turnRight' | 'turnLeft' | 'say' | 'sound' | 'goto' | 'bounce' | 'changeColor' | 'setScore' | 'changeScore' | 'wait' | 'repeat';
}

export type ExerciseLevel = 'recognition' | 'understanding' | 'application'; // Mức 1: Nhận biết, Mức 2: Thông hiểu, Mức 3: Vận dụng
export type ExerciseType =
  | 'multiple_choice'
  | 'true_false'
  | 'match'
  | 'ordering'
  | 'choose_block'
  | 'predict_result'
  | 'find_bug'
  | 'complete_code'
  | 'practice_task'
  | 'fill_blank'
  | 'bug_hunt';

export interface ExerciseFeedback {
  whereIsWrong: string;     // Em chưa đúng ở đâu?
  relatedKnowledge: string; // Kiến thức liên quan là gì?
  rethinkHint: string;      // Gợi ý để em suy nghĩ lại.
}

export interface Exercise {
  id: string;
  grade: GradeLevel;
  lessonId: string; // grade4_lesson13 ... grade5_lesson16
  lessonTitle: string;
  topic?: string;
  level: ExerciseLevel;
  type: ExerciseType;
  typeName?: string;
  title: string;
  question: string;
  codeBlocks?: ScratchBlockDef[];
  options?: string[];
  correctIndex?: number;
  orderingItems?: { id: string; text: string; correctOrder: number }[];
  matchingPairs?: { left: string; right: string }[];
  hint: string;
  explanation: string;
  pedagogicalFeedback: ExerciseFeedback;
  xp: number;
}

// 8 phần chuẩn của Bài học Scratch SGK Tin học Kết nối tri thức
export interface LessonKeyword {
  term: string;
  meaning: string;
}

export interface LessonObservation {
  title: string;
  description: string;
  sampleBlocks?: ScratchBlockDef[];
  highlight?: string;
}

export interface LessonExploration {
  title: string;
  question: string;
  interactivePoints: string[];
}

export interface LessonPractice {
  title: string;
  goal: string;
  steps: string[];
  initialBlocks?: ScratchBlockDef[];
  targetBlocks?: ScratchBlockDef[];
  hint: string;
}

export interface LessonCheckResult {
  correctCriteria: string;
  partialCriteria: string;
  reviewAdvice: string;
}

export interface LessonSummary {
  takeaways: string[];
}

export interface LessonObjective {
  know: string;       // Học sinh biết gì?
  do: string;         // Học sinh làm được gì?
  thinking: string;   // Học sinh phát triển tư duy thuật toán như thế nào?
}

export interface Lesson {
  id: string; // 'grade4_lesson13' ... 'grade5_lesson16'
  grade: GradeLevel;
  lessonNumber: number;
  title: string;
  themeTitle: string;
  
  // 1. Mục tiêu bài học
  objectives: LessonObjective;
  
  // 2. Kiến thức cần biết
  keyKnowledge: {
    summary: string;
    points: { title: string; desc: string; icon?: string }[];
  };
  
  // 3. Thuật ngữ cần nhớ
  keywords: LessonKeyword[];
  
  // 4. Quan sát
  observation: LessonObservation;
  
  // 5. Tìm hiểu
  exploration: LessonExploration;
  
  // 6. Thực hành
  practice: LessonPractice;
  
  // 7. Kiểm tra kết quả
  checkResult: LessonCheckResult;
  
  // 8. Ghi nhớ
  summary: LessonSummary;
  
  // Ghi chú cho giáo viên & Mở rộng
  teacherNotes: string;
  expansionHint?: string; // "Kiến thức mở rộng – không thuộc nội dung bắt buộc của bài học"

  xpReward: number;
  nextLessonId?: string;

  // Backward-compatibility properties
  objective?: LessonObjective;
  discovery?: {
    summary: string;
    points: { title: string; desc: string; icon?: string }[];
  };
  blockRecognition?: {
    name: string;
    category: BlockCategory;
    categoryName: string;
    functionDesc: string;
    exampleUse: string;
    sampleBlock: ScratchBlockDef;
  }[];
  example?: {
    title: string;
    goal: string;
    steps: string[];
    blocks: ScratchBlockDef[];
    whyOrderedThisWay: string;
  };
  selfBuild?: {
    title: string;
    goal: string;
    requirements: string[];
    recommendedBlocks: ScratchBlockDef[];
    rubric: string[];
  };
  checkGuide?: LessonCheckResult;
  advancedChallenge?: {
    title: string;
    description: string;
    bonusXP: number;
  };
}

export interface EpicChallenge {
  id: string;
  challengeNumber: number;
  title: string;
  grade: GradeLevel | 'both';
  badgeTitle: string;
  icon: string;
  missionDesc: string;
  requirements: string[];
  hint: string;
  successCondition: string;
  xpReward: number;
  sampleBlocks: ScratchBlockDef[];
}

export interface ScratchProject {
  id: string;
  projectNumber: number;
  title: string;
  grade: GradeLevel | 'both';
  difficulty: 'Cơ bản' | 'Trung bình' | 'Nâng cao';
  thumbnailIcon: string;
  idea: string;
  objective: string;
  knowledgeUsed: string[];
  characters: string[];
  backgrounds: string[];
  steps: string[];
  starterBlocks: ScratchBlockDef[];
  hint: string;
  extendedChallenge: string;
  rubric: { criteria: string; points: number }[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  requirement: string;
}

export interface DailyMission {
  id: string;
  title: string;
  completed: boolean;
  xpReward: number;
}

export interface UserProgress {
  name: string;
  grade: GradeLevel;
  avatar: string;
  xp: number;
  stars: number;
  streakDays: number;
  currentLessonId: string;
  completedLessons: string[];
  completedExercises: string[];
  completedChallenges: string[];
  completedProjects: string[];
  fixedBugsCount: number;
  badges: Badge[];
  dailyMissions: DailyMission[];
  mistakeTopics: Record<string, number>;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  hintLevel?: 1 | 2 | 3 | 4 | 5;
  suggestedBlocks?: ScratchBlockDef[];
  quickReplies?: string[];
  presetBlocks?: ScratchBlockDef[];
  currentStep?: number;
}

export interface BugScenario {
  id: string;
  lessonId?: string;
  grade?: GradeLevel;
  title: string;
  taskGoal?: string;              // 1. Yêu cầu của bài toán là gì?
  howRunning?: string;            // 2. Chương trình đang thực hiện như thế nào?
  actualResult?: string;          // 3. Kết quả thực tế là gì?
  expectedResult?: string;        // 4. Kết quả mong muốn là gì?
  whereStepWrong?: string;        // 5. Có khả năng sai ở bước nào?
  whyWrong?: string;              // 6. Vì sao?
  hintFix?: string;               // 7. Gợi ý sửa
  selfFixTask?: string;           // 8. Cho học sinh tự sửa
  verifyGuide?: string;           // 9. Kiểm tra lại
  sampleCode: ScratchBlockDef[];
  correctedCode?: ScratchBlockDef[];
  // Compatibility fields
  symptom?: string;
  whatProgramWantsToDo?: string;
  likelyBugBlock?: string;
  whereIsBug?: string;
  whyIsBug?: string;
  hint1?: string;
  hint2?: string;
  fullGuide?: string;
}
