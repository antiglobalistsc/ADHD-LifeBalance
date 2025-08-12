import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { Trophy, Medal, Star, PartyPopper } from "lucide-react";
import type { Pillar } from "@shared/schema";

interface WeeklyProgressProps {
  userId: string;
}

export default function WeeklyProgress({ userId }: WeeklyProgressProps) {
  const { data: pillars, isLoading } = useQuery<Pillar[]>({
    queryKey: ['/api/pillars', userId]
  });

  if (isLoading) {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">Weekly Progress & Insights</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-slate-200 rounded"></div>
                  <div className="h-4 bg-slate-200 rounded"></div>
                  <div className="h-4 bg-slate-200 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const totalHours = pillars?.reduce((sum, pillar) => sum + (pillar.weeklyHours || 0), 0) || 1;

  const achievements = [
    {
      icon: Trophy,
      title: "Completed 3 Security+ chapters",
      subtitle: "ADHD hyperfocus used strategically - building wealth knowledge!",
      color: "green"
    },
    {
      icon: Medal,
      title: "5-day workout streak",
      subtitle: "Health pillar strong - your ADHD brain is getting the movement it craves!",
      color: "blue"
    },
    {
      icon: Star,
      title: "No project switching this week",
      subtitle: "You conquered the ADHD urge to jump projects - this is how success happens!",
      color: "purple"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', subtitle: 'text-green-600', icon: 'text-green-600' };
      case 'blue':
        return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', subtitle: 'text-blue-600', icon: 'text-blue-600' };
      case 'purple':
        return { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-800', subtitle: 'text-purple-600', icon: 'text-purple-600' };
      default:
        return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-800', subtitle: 'text-slate-600', icon: 'text-slate-600' };
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6" data-testid="text-weekly-progress-title">
        Weekly Progress & Insights
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Progress Visualization */}
        <Card data-testid="card-pillar-balance">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Pillar Balance This Week</h3>
            
            <div className="space-y-4">
              {pillars?.map((pillar) => {
                const percentage = totalHours > 0 ? Math.round((pillar.weeklyHours || 0) / totalHours * 100) : 0;
                
                return (
                  <div key={pillar.id} data-testid={`pillar-progress-${pillar.name.toLowerCase()}`}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600 flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: pillar.color }}
                        />
                        {pillar.name}
                      </span>
                      <span className="font-medium text-slate-800" data-testid={`text-hours-${pillar.name.toLowerCase()}`}>
                        {pillar.weeklyHours || 0}h
                      </span>
                    </div>
                    <Progress 
                      value={percentage} 
                      className="h-2"
                      style={{ 
                        '--progress-background': pillar.color 
                      } as React.CSSProperties}
                      data-testid={`progress-hours-${pillar.name.toLowerCase()}`}
                    />
                  </div>
                );
              })}
            </div>
            
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg" data-testid="card-adhd-balance-tip">
              <p className="text-sm text-amber-800">
                💡 Your ADHD brain thrives on balance. Consider adding more Love pillar activities to feel more fulfilled and energized.
              </p>
              <div className="mt-2 text-xs text-amber-700">
                Tai Lopez's philosophy: All four pillars must be strong for true success and happiness.
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Encouragement & Achievements */}
        <Card data-testid="card-achievements">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">This Week's Wins</h3>
            
            <div className="space-y-4">
              {achievements.map((achievement, index) => {
                const colors = getColorClasses(achievement.color);
                const IconComponent = achievement.icon;
                
                return (
                  <div 
                    key={index}
                    className={`flex items-center space-x-3 p-3 ${colors.bg} border ${colors.border} rounded-lg`}
                    data-testid={`achievement-${index}`}
                  >
                    <IconComponent className={`w-5 h-5 ${colors.icon}`} />
                    <div>
                      <div className={`text-sm font-medium ${colors.text}`} data-testid={`achievement-title-${index}`}>
                        {achievement.title}
                      </div>
                      <div className={`text-xs ${colors.subtitle}`} data-testid={`achievement-subtitle-${index}`}>
                        {achievement.subtitle}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Milestone Celebration */}
            <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-blue-50 border border-pink-200 rounded-lg" data-testid="card-milestone">
              <div className="flex items-center space-x-3">
                <PartyPopper className="w-6 h-6 text-pink-500" />
                <div>
                  <div className="text-sm font-semibold text-slate-800" data-testid="text-milestone-title">
                    Milestone Achieved!
                  </div>
                  <div className="text-xs text-slate-600" data-testid="text-milestone-description">
                    You've maintained balanced living for 2 weeks straight 🎉
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
