import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { GripVertical, Plus, Rocket, Battery } from "lucide-react";
import type { TimeBlock, Pillar } from "@shared/schema";

interface TimeBlockSchedulerProps {
  userId: string;
}

export default function TimeBlockScheduler({ userId }: TimeBlockSchedulerProps) {
  const [energyLevel, setEnergyLevel] = useState<'low' | 'medium' | 'high'>('medium');
  
  const today = new Date().toISOString().split('T')[0];
  
  const { data: timeBlocks, isLoading } = useQuery<TimeBlock[]>({
    queryKey: ['/api/timeblocks', userId],
    queryFn: async () => {
      const response = await fetch(`/api/timeblocks/${userId}?date=${today}`);
      if (!response.ok) throw new Error('Failed to fetch time blocks');
      return response.json();
    }
  });

  const { data: pillars } = useQuery<Pillar[]>({
    queryKey: ['/api/pillars', userId]
  });

  const getPillarById = (pillarId?: string) => {
    if (!pillarId) return null;
    return pillars?.find(p => p.id === pillarId);
  };

  const getEnergyColor = (level: string) => {
    switch (level) {
      case 'high': return 'border-green-200 bg-green-50';
      case 'medium': return 'border-amber-200 bg-amber-50';
      case 'low': return 'border-pink-200 bg-pink-50';
      default: return 'border-slate-300 bg-slate-50';
    }
  };

  const getEnergyTextColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-green-800';
      case 'medium': return 'text-amber-800';
      case 'low': return 'text-pink-800';
      default: return 'text-slate-500';
    }
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getEnergyLevelDisplay = (level: string) => {
    switch (level) {
      case 'high': return 'High energy';
      case 'medium': return 'Medium energy';
      case 'low': return 'Low energy';
      default: return 'Medium energy';
    }
  };

  if (isLoading) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-slate-800">Today's Schedule</h2>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-slate-300"></div>
            <span className="text-sm text-slate-600">Loading...</span>
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 bg-slate-100 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-slate-800" data-testid="text-schedule-title">
          Today's Schedule
        </h2>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${energyLevel === 'high' ? 'bg-green-500' : energyLevel === 'low' ? 'bg-red-500' : 'bg-yellow-500'}`} />
          <span className="text-sm text-slate-600" data-testid="text-energy-level">
            {getEnergyLevelDisplay(energyLevel)}
          </span>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {timeBlocks?.map((block) => {
              const pillar = getPillarById(block.pillarId || undefined);
              const energyColor = getEnergyColor(block.energyRequired || 'medium');
              const energyTextColor = getEnergyTextColor(block.energyRequired || 'medium');
              
              return (
                <div 
                  key={block.id} 
                  className={`flex items-center space-x-4 p-4 border rounded-lg ${energyColor}`}
                  data-testid={`timeblock-${block.id}`}
                >
                  <div className={`text-sm font-medium w-16 ${energyTextColor}`} data-testid={`text-time-${block.id}`}>
                    {formatTime(block.startTime)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      {pillar && (
                        <div 
                          className="w-2 h-2 rounded-full" 
                          style={{ backgroundColor: pillar.color }}
                        />
                      )}
                      <span className="text-sm font-medium text-slate-800" data-testid={`text-title-${block.id}`}>
                        {block.title}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600" data-testid={`text-description-${block.id}`}>
                      {getEnergyLevelDisplay(block.energyRequired || 'medium')} • {pillar?.name || 'General'}
                      {block.type === 'work' && block.projectId && ' • Hyperfocus block'}
                    </div>
                  </div>
                  <GripVertical className="w-4 h-4 text-slate-400 cursor-move" data-testid={`grip-${block.id}`} />
                </div>
              );
            })}

            {/* Available Time Block */}
            <div className="flex items-center space-x-4 p-4 bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg" data-testid="timeblock-available">
              <div className="text-sm text-slate-500 w-16">4:00 PM</div>
              <div className="flex-1">
                <span className="text-sm text-slate-500">Available Time Block</span>
                <div className="text-xs text-slate-400">Drag tasks here or schedule new activity</div>
              </div>
              <Plus className="w-4 h-4 text-slate-400" />
            </div>
          </div>
          
          {/* Energy Level Controls */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Adjust today's energy level:</span>
              <div className="flex space-x-2">
                <Button
                  variant={energyLevel === 'low' ? 'default' : 'outline'}
                  size="sm"
                  className={`w-8 h-8 p-0 ${energyLevel === 'low' ? 'ring-2 ring-red-400' : ''}`}
                  onClick={() => setEnergyLevel('low')}
                  data-testid="button-energy-low"
                >
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                </Button>
                <Button
                  variant={energyLevel === 'medium' ? 'default' : 'outline'}
                  size="sm"
                  className={`w-8 h-8 p-0 ${energyLevel === 'medium' ? 'ring-2 ring-yellow-400' : ''}`}
                  onClick={() => setEnergyLevel('medium')}
                  data-testid="button-energy-medium"
                >
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                </Button>
                <Button
                  variant={energyLevel === 'high' ? 'default' : 'outline'}
                  size="sm"
                  className={`w-8 h-8 p-0 ${energyLevel === 'high' ? 'ring-2 ring-green-400' : ''}`}
                  onClick={() => setEnergyLevel('high')}
                  data-testid="button-energy-high"
                >
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="mt-6 space-y-3">
        <Button
          className="w-full bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700"
          variant="outline"
          data-testid="button-hyperfocus"
        >
          <Rocket className="w-4 h-4 mr-2" />
          Start Hyperfocus Session
        </Button>
        <Button
          className="w-full bg-green-50 hover:bg-green-100 border border-green-200 text-green-700"
          variant="outline"
          data-testid="button-low-energy"
        >
          <Battery className="w-4 h-4 mr-2" />
          Switch to Low Energy Tasks
        </Button>
      </div>
    </div>
  );
}
