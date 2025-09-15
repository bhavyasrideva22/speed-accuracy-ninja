import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AssessmentState, Answer, AssessmentResult } from '@/types/assessment';

interface AssessmentContextType {
  state: AssessmentState;
  saveAnswer: (questionId: string, value: string | number | string[]) => void;
  nextSection: () => void;
  previousSection: () => void;
  nextScenario: () => void;
  previousScenario: () => void;
  completeAssessment: () => void;
  calculateResults: () => AssessmentResult;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

type AssessmentAction =
  | { type: 'SAVE_ANSWER'; payload: { questionId: string; value: string | number | string[] } }
  | { type: 'NEXT_SECTION' }
  | { type: 'PREVIOUS_SECTION' }
  | { type: 'NEXT_SCENARIO' }
  | { type: 'PREVIOUS_SCENARIO' }
  | { type: 'COMPLETE_ASSESSMENT'; payload: AssessmentResult };

const initialState: AssessmentState = {
  currentSection: 0,
  currentScenario: 0,
  answers: {},
  timeStarted: new Date(),
  timeSpent: {},
  completed: false,
};

function assessmentReducer(state: AssessmentState, action: AssessmentAction): AssessmentState {
  switch (action.type) {
    case 'SAVE_ANSWER':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionId]: {
            questionId: action.payload.questionId,
            value: action.payload.value,
          },
        },
      };
    case 'NEXT_SECTION':
      return {
        ...state,
        currentSection: state.currentSection + 1,
        currentScenario: 0,
      };
    case 'PREVIOUS_SECTION':
      return {
        ...state,
        currentSection: Math.max(0, state.currentSection - 1),
        currentScenario: 0,
      };
    case 'NEXT_SCENARIO':
      return {
        ...state,
        currentScenario: state.currentScenario + 1,
      };
    case 'PREVIOUS_SCENARIO':
      return {
        ...state,
        currentScenario: Math.max(0, state.currentScenario - 1),
      };
    case 'COMPLETE_ASSESSMENT':
      return {
        ...state,
        completed: true,
        result: action.payload,
      };
    default:
      return state;
  }
}

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);

  const saveAnswer = (questionId: string, value: string | number | string[]) => {
    dispatch({ type: 'SAVE_ANSWER', payload: { questionId, value } });
  };

  const nextSection = () => dispatch({ type: 'NEXT_SECTION' });
  const previousSection = () => dispatch({ type: 'PREVIOUS_SECTION' });
  const nextScenario = () => dispatch({ type: 'NEXT_SCENARIO' });
  const previousScenario = () => dispatch({ type: 'PREVIOUS_SCENARIO' });

  const calculateResults = (): AssessmentResult => {
    // Simplified scoring logic - in a real app this would be more sophisticated
    const totalAnswers = Object.keys(state.answers).length;
    const baseScore = Math.min(100, totalAnswers * 12); // Rough calculation
    
    return {
      overallScore: baseScore,
      sectionScores: {
        scenarios: baseScore * 0.9,
        practical: baseScore * 0.8,
        timeManagement: baseScore * 0.85,
        problemSolving: baseScore * 0.88,
      },
      profile: baseScore >= 80 ? 'Balanced Performer' : baseScore >= 60 ? 'Developing Professional' : 'Emerging Talent',
      strengths: ['Decision Making', 'Adaptability', 'Time Awareness'],
      improvements: ['Error Prevention', 'Process Optimization'],
      recommendations: [
        'Practice more scenario-based decision making',
        'Develop systematic quality checks',
        'Improve time estimation skills',
      ],
    };
  };

  const completeAssessment = () => {
    const result = calculateResults();
    dispatch({ type: 'COMPLETE_ASSESSMENT', payload: result });
  };

  return (
    <AssessmentContext.Provider
      value={{
        state,
        saveAnswer,
        nextSection,
        previousSection,
        nextScenario,
        previousScenario,
        completeAssessment,
        calculateResults,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
}