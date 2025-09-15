import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Target, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle,
  Play
} from 'lucide-react';

interface AssessmentIntroProps {
  onStart: () => void;
}

export function AssessmentIntro({ onStart }: AssessmentIntroProps) {
  const features = [
    {
      icon: <Target className="w-5 h-5 text-primary" />,
      title: 'Real-World Scenarios',
      description: 'Navigate authentic workplace challenges'
    },
    {
      icon: <Clock className="w-5 h-5 text-info" />,
      title: 'Time-Pressured Decisions',
      description: 'Practice balancing speed with accuracy'
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-success" />,
      title: 'Personalized Insights',
      description: 'Get tailored recommendations for growth'
    },
    {
      icon: <Users className="w-5 h-5 text-warning" />,
      title: 'Career Readiness',
      description: 'Assess readiness for various professional roles'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <Card className="text-center bg-gradient-card shadow-strong border-0">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Applied Skills & Real-World Readiness
            </Badge>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Speed vs Accuracy Balancer
          </CardTitle>
          <CardDescription className="text-lg mt-4 max-w-2xl mx-auto">
            In dynamic workplaces, balancing speed with accuracy is a crucial applied skill that often determines success. This assessment measures your capacity to navigate trade-offs between working quickly and ensuring precision in ambiguous, high-pressure environments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-muted/20">
                {feature.icon}
                <div className="text-left">
                  <h4 className="font-semibold text-foreground">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          <Button 
            onClick={onStart}
            size="lg"
            className="bg-gradient-primary hover:opacity-90 text-primary-foreground px-8 py-6 text-lg"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Assessment
          </Button>
        </CardContent>
      </Card>

      {/* Assessment Details */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="shadow-medium">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-info" />
              <CardTitle className="text-lg">Duration</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-info">25-30 min</p>
            <p className="text-sm text-muted-foreground">Self-paced assessment</p>
          </CardContent>
        </Card>

        <Card className="shadow-medium">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <CardTitle className="text-lg">Format</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">Mixed format including:</p>
            <ul className="text-xs space-y-1">
              <li>• Scenario-based questions</li>
              <li>• Multiple choice</li>
              <li>• Text responses</li>
              <li>• Priority ranking</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-medium">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              <CardTitle className="text-lg">Sections</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-1">
              <li>• Scenario Analysis</li>
              <li>• Practical Skills</li>
              <li>• Time Management</li>
              <li>• Problem Solving</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* What You'll Get */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="text-xl">What You'll Receive</CardTitle>
          <CardDescription>
            Your comprehensive assessment results will include:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-sm">Overall Readiness Score (0-100)</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-sm">Skill-specific performance breakdown</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-sm">Professional profile classification</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-sm">Personalized improvement recommendations</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-sm">Role readiness insights</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-sm">4-6 week development plan</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}