import React from 'react';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle } from 'lucide-react';

interface ProgressBarProps {
  currentSection: number;
  totalSections: number;
  sectionTitles: string[];
}

export function ProgressBar({ currentSection, totalSections, sectionTitles }: ProgressBarProps) {
  const progress = ((currentSection + 1) / totalSections) * 100;

  return (
    <div className="w-full bg-card rounded-lg p-6 shadow-soft border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Assessment Progress</h3>
        <span className="text-sm text-muted-foreground">
          {currentSection + 1} of {totalSections} sections
        </span>
      </div>
      
      <Progress value={progress} className="mb-6" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {sectionTitles.map((title, index) => (
          <div
            key={index}
            className={`flex items-center space-x-2 p-2 rounded-md transition-colors ${
              index < currentSection
                ? 'bg-success/10 text-success'
                : index === currentSection
                ? 'bg-primary/10 text-primary'
                : 'bg-muted/50 text-muted-foreground'
            }`}
          >
            {index < currentSection ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <Circle className="w-4 h-4" />
            )}
            <span className="text-xs font-medium truncate">{title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}