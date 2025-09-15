import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Scenario, Question, Answer } from '@/types/assessment';
import { useAssessment } from '@/contexts/AssessmentContext';
import { ChevronRight, ChevronLeft, Clock, AlertTriangle } from 'lucide-react';

interface ScenarioCardProps {
  scenario: Scenario;
  onNext: () => void;
  onPrevious: () => void;
  canProceed: boolean;
  isLast: boolean;
}

export function ScenarioCard({ scenario, onNext, onPrevious, canProceed, isLast }: ScenarioCardProps) {
  const { state, saveAnswer } = useAssessment();

  const handleAnswerChange = (questionId: string, value: string | number | string[]) => {
    saveAnswer(questionId, value);
  };

  const renderQuestion = (question: Question) => {
    const currentAnswer = state.answers[question.id]?.value;

    switch (question.type) {
      case 'multiple-choice':
        return (
          <RadioGroup
            value={currentAnswer as string}
            onValueChange={(value) => handleAnswerChange(question.id, value)}
            className="space-y-3"
          >
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                <Label htmlFor={`${question.id}-${index}`} className="text-sm leading-5">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
      case 'text':
        return (
          <Textarea
            value={currentAnswer as string || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            placeholder="Enter your response..."
            className="min-h-[100px]"
          />
        );
      case 'scale':
        return (
          <RadioGroup
            value={currentAnswer as string}
            onValueChange={(value) => handleAnswerChange(question.id, value)}
            className="flex space-x-4"
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <div key={value} className="flex flex-col items-center space-y-2">
                <RadioGroupItem value={value.toString()} id={`${question.id}-${value}`} />
                <Label htmlFor={`${question.id}-${value}`} className="text-xs">
                  {value}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-medium border-0 bg-gradient-card">
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-warning" />
          <span className="text-sm font-medium text-warning">Workplace Scenario</span>
        </div>
        <CardTitle className="text-xl font-bold">{scenario.title}</CardTitle>
        <CardDescription className="text-base">{scenario.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="bg-muted/30 p-4 rounded-lg border-l-4 border-l-info">
          <div className="flex items-start space-x-2 mb-2">
            <Clock className="w-4 h-4 text-info mt-1 flex-shrink-0" />
            <h4 className="font-semibold text-info">Situation</h4>
          </div>
          <p className="text-sm text-foreground leading-6">{scenario.situation}</p>
        </div>

        <div className="space-y-6">
          {scenario.questions.map((question, index) => (
            <div key={question.id} className="space-y-3">
              <div className="flex items-start space-x-2">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold">
                  {index + 1}
                </span>
                <h4 className="font-medium text-foreground">{question.text}</h4>
                {question.required && (
                  <span className="text-destructive text-xs">*</span>
                )}
              </div>
              <div className="ml-8">
                {renderQuestion(question)}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between pt-6 border-t">
          <Button 
            variant="outline" 
            onClick={onPrevious}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>
          
          <Button 
            onClick={onNext}
            disabled={!canProceed}
            className="flex items-center space-x-2 bg-gradient-primary text-primary-foreground hover:opacity-90"
          >
            <span>{isLast ? 'Complete Section' : 'Next Scenario'}</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}