import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AssessmentResult } from '@/types/assessment';
import { 
  Trophy, 
  TrendingUp, 
  Target, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen,
  BarChart3
} from 'lucide-react';

interface ResultsDashboardProps {
  result: AssessmentResult;
}

export function ResultsDashboard({ result }: ResultsDashboardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'destructive';
  };

  const getProfileIcon = (profile: string) => {
    switch (profile) {
      case 'Balanced Performer':
        return <Trophy className="w-5 h-5 text-success" />;
      case 'Developing Professional':
        return <TrendingUp className="w-5 h-5 text-warning" />;
      default:
        return <Target className="w-5 h-5 text-info" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Overall Score */}
      <Card className="text-center bg-gradient-card shadow-strong">
        <CardHeader>
          <div className="flex items-center justify-center space-x-2 mb-2">
            {getProfileIcon(result.profile)}
            <CardTitle className="text-2xl">Assessment Complete!</CardTitle>
          </div>
          <CardDescription>Speed vs Accuracy Balancer Assessment Results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center space-x-8 mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {result.overallScore}
              </div>
              <div className="text-sm text-muted-foreground">Overall Score</div>
            </div>
            <div className="text-center">
              <Badge 
                variant="secondary" 
                className={`text-${getScoreColor(result.overallScore)} bg-${getScoreColor(result.overallScore)}/10`}
              >
                {result.profile}
              </Badge>
              <div className="text-sm text-muted-foreground mt-1">Profile Type</div>
            </div>
          </div>
          <Progress value={result.overallScore} className="h-3" />
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Section Scores */}
        <Card className="shadow-medium">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <CardTitle>Section Performance</CardTitle>
            </div>
            <CardDescription>Detailed breakdown by assessment area</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(result.sectionScores).map(([section, score]) => (
              <div key={section} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium capitalize">
                    {section.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className={`text-sm font-bold text-${getScoreColor(score)}`}>
                    {Math.round(score)}%
                  </span>
                </div>
                <Progress value={score} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Strengths & Improvements */}
        <div className="space-y-6">
          <Card className="shadow-medium">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <CardTitle>Key Strengths</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {result.strengths.map((strength, index) => (
                  <Badge key={index} variant="secondary" className="bg-success/10 text-success">
                    {strength}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-warning" />
                <CardTitle>Growth Areas</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {result.improvements.map((improvement, index) => (
                  <Badge key={index} variant="secondary" className="bg-warning/10 text-warning">
                    {improvement}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recommendations */}
      <Card className="shadow-medium">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-info" />
            <CardTitle>Personalized Recommendations</CardTitle>
          </div>
          <CardDescription>
            Targeted suggestions to enhance your speed-accuracy balance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {result.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                <div className="flex-shrink-0 w-6 h-6 bg-info text-info-foreground rounded-full flex items-center justify-center text-xs font-semibold">
                  {index + 1}
                </div>
                <p className="text-sm leading-5">{recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}