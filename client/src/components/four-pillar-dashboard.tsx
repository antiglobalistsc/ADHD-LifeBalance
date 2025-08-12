import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import type { Pillar } from "@shared/schema";

interface FourPillarDashboardProps {
  userId: string;
}

export default function FourPillarDashboard({ userId }: FourPillarDashboardProps) {
  const { data: pillars, isLoading } = useQuery<Pillar[]>({
    queryKey: ['/api/pillars', userId]
  });

  const getStatusColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusTitle = (score: number) => {
    if (score >= 80) return 'Balanced';
    if (score >= 60) return 'Getting Busy';
    return 'Needs Attention';
  };

  const getPillarImage = (name: string) => {
    switch (name.toLowerCase()) {
      case 'health':
        return 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200';
      case 'wealth':
        return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200';
      case 'love':
        return 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200';
      case 'happiness':
        return 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200';
      default:
        return 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200';
    }
  };

  const getPillarDescription = (name: string, score: number) => {
    switch (name.toLowerCase()) {
      case 'health':
        return 'ADHD-friendly nutrition, movement, sleep optimization';
      case 'wealth':
        return 'Strategic wealth building, ADHD-focused business growth';
      case 'love':
        return 'Deep relationships, meaningful connections, emotional support';
      case 'happiness':
        return 'Celebrating wins, gratitude practice, positive mindset';
      default:
        return 'Progress tracking';
    }
  };

  const getPillarRoute = (name: string) => {
    return `/${name.toLowerCase()}`;
  };

  if (isLoading) {
    return (
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold text-slate-800">Your Four Pillars</h2>
          <div className="text-sm text-slate-600">Loading...</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-32 bg-slate-200 rounded-lg mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-2 bg-slate-200 rounded"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const totalScore = pillars?.reduce((sum, pillar) => sum + (pillar.weeklyScore || 0), 0) || 0;
  const averageScore = pillars?.length ? Math.round(totalScore / pillars.length) : 0;

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-semibold text-slate-800" data-testid="text-pillars-title">
          Your Four Pillars
        </h2>
        <div className="text-sm text-slate-600">
          Weekly Balance Score: <span className="font-semibold text-slate-800" data-testid="text-balance-score">{averageScore}/100</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {pillars?.map((pillar) => (
          <Link key={pillar.id} href={getPillarRoute(pillar.name)}>
            <Card className="hover:shadow-lg transition-all cursor-pointer hover:scale-105" data-testid={`card-pillar-${pillar.name.toLowerCase()}`}>
              <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: pillar.color }}
                  />
                  <h3 className="text-lg font-semibold text-slate-800" data-testid={`text-pillar-name-${pillar.name.toLowerCase()}`}>
                    {pillar.name}
                  </h3>
                </div>
                <div 
                  className={`w-3 h-3 rounded-full ${getStatusColor(pillar.weeklyScore || 0)}`}
                  title={getStatusTitle(pillar.weeklyScore || 0)}
                  data-testid={`indicator-pillar-status-${pillar.name.toLowerCase()}`}
                />
              </div>
              
              <img 
                src={getPillarImage(pillar.name)} 
                alt={`${pillar.name} pillar activities`}
                className="w-full h-32 object-cover rounded-lg mb-4"
                data-testid={`img-pillar-${pillar.name.toLowerCase()}`}
              />
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">This Week</span>
                  <span className="font-medium text-slate-800" data-testid={`text-pillar-score-${pillar.name.toLowerCase()}`}>
                    {pillar.weeklyScore || 0}%
                  </span>
                </div>
                <Progress 
                  value={pillar.weeklyScore || 0} 
                  className="h-2"
                  style={{ 
                    '--progress-background': pillar.color 
                  } as React.CSSProperties}
                  data-testid={`progress-pillar-${pillar.name.toLowerCase()}`}
                />
                <div className="text-xs text-slate-500" data-testid={`text-pillar-description-${pillar.name.toLowerCase()}`}>
                  {getPillarDescription(pillar.name, pillar.weeklyScore || 0)}
                </div>
              </div>
            </CardContent>
          </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
