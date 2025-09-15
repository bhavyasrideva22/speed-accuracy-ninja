import { Scenario, AssessmentSection } from '@/types/assessment';

export const scenarios: Scenario[] = [
  {
    id: 'scenario-1',
    title: 'Urgent Client Request vs Data Validation',
    description: 'Balance client expectations with data accuracy requirements',
    situation: 'A high-priority client urgently needs a comprehensive report by end of day for a board meeting tomorrow. While compiling the data, you notice some anomalies in the numbers that could affect key conclusions. Investigating and correcting these anomalies would require 2-3 additional hours, pushing delivery to tomorrow morning, but ensuring accuracy.',
    questions: [
      {
        id: 'q1-priority',
        text: 'What would be your immediate priority in this situation?',
        type: 'multiple-choice',
        required: true,
        options: [
          'Deliver the report on time with a disclaimer about potential data issues',
          'Delay delivery to thoroughly investigate and correct the anomalies',
          'Deliver preliminary findings now and detailed corrections later',
          'Contact the client to discuss timeline vs accuracy trade-offs'
        ]
      },
      {
        id: 'q1-factors',
        text: 'Which factors would most influence your decision? (Rank in order)',
        type: 'ranking',
        required: true,
        options: [
          'Client relationship and trust',
          'Accuracy of information',
          'Meeting stated deadlines',
          'Potential business impact of errors',
          'Professional reputation'
        ]
      },
      {
        id: 'q1-communication',
        text: 'How would you communicate this situation to the client?',
        type: 'text',
        required: true
      }
    ]
  },
  {
    id: 'scenario-2',
    title: 'Software Bug Fix vs Feature Rollout',
    description: 'Technical decision-making under release pressure',
    situation: 'Your development team is scheduled to release a major feature update tomorrow. During final testing, you discover a minor bug that affects 5% of users in a specific workflow. Fixing it properly would delay the release by one week, but deploying with the bug would require customer support resources and a follow-up patch.',
    questions: [
      {
        id: 'q2-decision',
        text: 'What would be your recommended course of action?',
        type: 'multiple-choice',
        required: true,
        options: [
          'Release as planned with bug documentation and immediate patch timeline',
          'Delay release to fix the bug properly',
          'Release with a quick workaround that may need refinement later',
          'Release to 95% of users while fixing the bug for the affected segment'
        ]
      },
      {
        id: 'q2-impact',
        text: 'How do you assess the impact of this decision?',
        type: 'text',
        required: true
      },
      {
        id: 'q2-confidence',
        text: 'How confident are you in your decision-making approach?',
        type: 'scale',
        required: true
      }
    ]
  },
  {
    id: 'scenario-3',
    title: 'Customer Support Queue Spike',
    description: 'Managing service quality under volume pressure',
    situation: 'Your customer support queue has suddenly doubled due to a product issue. You have the same staffing level but twice the volume. Quick responses might lack thoroughness, while detailed responses will increase wait times significantly. Customer satisfaction scores are tracked for both response time and resolution quality.',
    questions: [
      {
        id: 'q3-triage',
        text: 'How would you prioritize and triage the incoming tickets?',
        type: 'text',
        required: true
      },
      {
        id: 'q3-balance',
        text: 'Which approach would you take for balancing speed and quality?',
        type: 'multiple-choice',
        required: true,
        options: [
          'Categorize issues and apply different response standards to each',
          'Maintain consistent quality standards regardless of volume',
          'Reduce response detail to maintain speed, follow up later if needed',
          'Implement temporary quick-response templates for common issues'
        ]
      },
      {
        id: 'q3-metrics',
        text: 'Rate the importance of these metrics during this crisis',
        type: 'ranking',
        required: true,
        options: [
          'Average response time',
          'First contact resolution rate',
          'Customer satisfaction scores',
          'Queue waiting time',
          'Agent productivity'
        ]
      }
    ]
  }
];

export const assessmentSections: AssessmentSection[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    description: 'Understanding the assessment goals and your workplace context',
    icon: 'BookOpen',
    completed: false,
  },
  {
    id: 'scenarios',
    title: 'Scenario Analysis',
    description: 'Real-world decision-making scenarios',
    icon: 'Users',
    scenarios: scenarios,
    completed: false,
  },
  {
    id: 'practical-skills',
    title: 'Practical Skills',
    description: 'Applied skills and tool usage',
    icon: 'Settings',
    completed: false,
  },
  {
    id: 'time-management',
    title: 'Time Management',
    description: 'Prioritization and workflow optimization',
    icon: 'Clock',
    completed: false,
  },
  {
    id: 'problem-solving',
    title: 'Problem Solving',
    description: 'Analytical thinking and process improvement',
    icon: 'Lightbulb',
    completed: false,
  }
];