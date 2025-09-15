export interface Scenario {
  id: string;
  title: string;
  description: string;
  situation: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'ranking' | 'text' | 'scale';
  options?: string[];
  required: boolean;
}

export interface Answer {
  questionId: string;
  value: string | number | string[];
}

export interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  scenarios?: Scenario[];
  completed: boolean;
  score?: number;
}

export interface AssessmentResult {
  overallScore: number;
  sectionScores: Record<string, number>;
  profile: string;
  strengths: string[];
  improvements: string[];
  recommendations: string[];
}

export interface AssessmentState {
  currentSection: number;
  currentScenario: number;
  answers: Record<string, Answer>;
  timeStarted: Date;
  timeSpent: Record<string, number>;
  completed: boolean;
  result?: AssessmentResult;
}