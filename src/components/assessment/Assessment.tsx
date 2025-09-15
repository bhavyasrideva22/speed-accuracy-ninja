import React from 'react';
import { AssessmentProvider, useAssessment } from '@/contexts/AssessmentContext';
import { AssessmentIntro } from './AssessmentIntro';
import { ProgressBar } from './ProgressBar';
import { ScenarioCard } from './ScenarioCard';
import { ResultsDashboard } from './ResultsDashboard';
import { assessmentSections, scenarios } from '@/data/scenarios';

function AssessmentContent() {
  const { state, nextSection, nextScenario, completeAssessment } = useAssessment();

  const currentSection = assessmentSections[state.currentSection];
  const sectionTitles = assessmentSections.map(section => section.title);

  const handleStart = () => {
    nextSection(); // Move from intro to first section
  };

  const handleNextScenario = () => {
    if (currentSection?.scenarios) {
      const isLastScenario = state.currentScenario >= currentSection.scenarios.length - 1;
      
      if (isLastScenario) {
        // Check if this is the last section
        const isLastSection = state.currentSection >= assessmentSections.length - 2; // -2 because index 0 is intro
        
        if (isLastSection) {
          completeAssessment();
        } else {
          nextSection();
        }
      } else {
        nextScenario();
      }
    }
  };

  const handlePrevious = () => {
    // Implementation for going back would go here
  };

  // Check if user can proceed (has answered required questions)
  const canProceed = () => {
    if (!currentSection?.scenarios) return true;
    
    const currentScenario = currentSection.scenarios[state.currentScenario];
    if (!currentScenario) return true;

    const requiredQuestions = currentScenario.questions.filter(q => q.required);
    return requiredQuestions.every(q => state.answers[q.id]);
  };

  // Show intro
  if (state.currentSection === 0) {
    return <AssessmentIntro onStart={handleStart} />;
  }

  // Show results
  if (state.completed && state.result) {
    return <ResultsDashboard result={state.result} />;
  }

  // Show assessment content
  if (currentSection && currentSection.scenarios) {
    const currentScenario = currentSection.scenarios[state.currentScenario];
    
    return (
      <div className="space-y-6">
        <ProgressBar 
          currentSection={state.currentSection - 1} // -1 because intro is index 0
          totalSections={assessmentSections.length - 1} // -1 to exclude intro
          sectionTitles={sectionTitles.slice(1)} // Remove intro from titles
        />
        
        {currentScenario && (
          <ScenarioCard
            scenario={currentScenario}
            onNext={handleNextScenario}
            onPrevious={handlePrevious}
            canProceed={canProceed()}
            isLast={state.currentScenario >= currentSection.scenarios.length - 1}
          />
        )}
      </div>
    );
  }

  // Fallback for other sections (not implemented in this demo)
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold mb-4">Section: {currentSection?.title}</h2>
      <p className="text-muted-foreground mb-6">{currentSection?.description}</p>
      <p className="text-sm text-muted-foreground">This section is coming soon...</p>
    </div>
  );
}

export function Assessment() {
  return (
    <AssessmentProvider>
      <div className="min-h-screen bg-gradient-subtle py-8 px-4">
        <div className="container mx-auto">
          <AssessmentContent />
        </div>
      </div>
    </AssessmentProvider>
  );
}