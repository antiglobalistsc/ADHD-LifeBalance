import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, ChevronDown, Clock, Lightbulb } from "lucide-react";
import type { Project, Task, Pillar } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

interface ProjectManagementProps {
  userId: string;
}

export default function ProjectManagement({ userId }: ProjectManagementProps) {
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
  const queryClient = useQueryClient();

  const { data: projects, isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects', userId]
  });

  const { data: pillars } = useQuery<Pillar[]>({
    queryKey: ['/api/pillars', userId]
  });

  const updateTaskMutation = useMutation({
    mutationFn: async ({ taskId, updates }: { taskId: string; updates: Partial<Task> }) => {
      return apiRequest('PATCH', `/api/tasks/${taskId}`, updates);
    },
    onSuccess: (_, { taskId }) => {
      // Invalidate tasks for the project
      const task = allTasks.find(t => t.id === taskId);
      if (task) {
        queryClient.invalidateQueries({ queryKey: ['/api/tasks', task.projectId] });
      }
    }
  });

  // Create a stable array for task queries
  const projectIds = projects?.map(p => p.id) || [];
  
  // Use a single hook to get all tasks data
  const taskQueries = useQuery<Record<string, Task[]>>({
    queryKey: ['/api/tasks', 'all', projectIds],
    queryFn: async () => {
      if (!projectIds.length) return {};
      
      const taskPromises = projectIds.map(async (projectId) => {
        const response = await fetch(`/api/tasks/${projectId}`);
        if (!response.ok) throw new Error(`Failed to fetch tasks for ${projectId}`);
        const tasks = await response.json();
        return [projectId, tasks] as const;
      });
      
      const results = await Promise.all(taskPromises);
      return Object.fromEntries(results);
    },
    enabled: projectIds.length > 0
  });

  const allTasks = Object.values(taskQueries.data || {}).flat();

  const toggleProjectExpansion = (projectId: string) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedProjects(newExpanded);
  };

  const getPillarById = (pillarId: string) => {
    return pillars?.find(p => p.id === pillarId);
  };

  const getProjectTasks = (projectId: string) => {
    return taskQueries.data?.[projectId] || [];
  };

  const getTaskStatusClass = (task: Task) => {
    if (task.completed) {
      return "bg-slate-50 border-slate-200";
    }
    return "bg-amber-50 border-amber-200";
  };

  const getTaskStatusText = (task: Task) => {
    if (task.completed) return "Completed";
    return "In Progress";
  };

  const getTaskStatusTextClass = (task: Task) => {
    if (task.completed) return "text-slate-500";
    return "text-amber-600 font-medium";
  };

  const handleTaskToggle = (task: Task) => {
    updateTaskMutation.mutate({
      taskId: task.id,
      updates: { completed: !task.completed }
    });
  };

  const getProjectStatusColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getProjectStatusTitle = (progress: number) => {
    if (progress >= 80) return "On track";
    if (progress >= 40) return "Needs attention";
    return "Behind schedule";
  };

  if (projectsLoading) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-slate-800">Active Projects</h2>
          <Button data-testid="button-new-project">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
                <div className="h-2 bg-slate-200 rounded mb-4"></div>
                <div className="space-y-3">
                  <div className="h-12 bg-slate-100 rounded"></div>
                  <div className="h-12 bg-slate-100 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-slate-800" data-testid="text-projects-title">
          Active Projects
        </h2>
        <Button data-testid="button-new-project">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>
      
      <div className="space-y-4">
        {projects?.map((project) => {
          const pillar = getPillarById(project.pillarId);
          const tasks = getProjectTasks(project.id);
          const isExpanded = expandedProjects.has(project.id);
          
          return (
            <Card key={project.id} data-testid={`card-project-${project.id}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: pillar?.color }}
                    />
                    <h3 className="text-lg font-semibold text-slate-800" data-testid={`text-project-title-${project.id}`}>
                      {project.title}
                    </h3>
                    {pillar && (
                      <Badge 
                        variant="secondary" 
                        className="text-xs"
                        style={{ 
                          backgroundColor: `${pillar.color}1A`,
                          color: pillar.color 
                        }}
                        data-testid={`badge-pillar-${project.id}`}
                      >
                        {pillar.name}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-600" data-testid={`text-project-due-${project.id}`}>
                      Due: {project.dueDate}
                    </span>
                    <div 
                      className={`w-3 h-3 rounded-full ${getProjectStatusColor(project.progress || 0)}`}
                      title={getProjectStatusTitle(project.progress || 0)}
                      data-testid={`indicator-project-status-${project.id}`}
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600">Progress</span>
                    <span className="font-medium text-slate-800" data-testid={`text-project-progress-${project.id}`}>
                      {project.progress || 0}% complete
                    </span>
                  </div>
                  <Progress 
                    value={project.progress || 0} 
                    className="h-2"
                    style={{ 
                      '--progress-background': pillar?.color 
                    } as React.CSSProperties}
                    data-testid={`progress-project-${project.id}`}
                  />
                </div>
                
                {/* Sub-tasks */}
                <div className="space-y-3 mb-4">
                  {tasks.slice(0, isExpanded ? tasks.length : 3).map((task) => (
                    <div 
                      key={task.id} 
                      className={`flex items-center space-x-3 p-3 rounded-lg ${getTaskStatusClass(task)}`}
                      data-testid={`task-item-${task.id}`}
                    >
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => handleTaskToggle(task)}
                        className="data-[state=checked]:bg-current"
                        style={{ color: pillar?.color }}
                        data-testid={`checkbox-task-${task.id}`}
                      />
                      <span 
                        className={`text-sm flex-1 ${task.completed ? 'line-through text-slate-600' : 'text-slate-700'}`}
                        data-testid={`text-task-title-${task.id}`}
                      >
                        {task.title}
                      </span>
                      <span 
                        className={`text-xs ml-auto ${getTaskStatusTextClass(task)}`}
                        data-testid={`text-task-status-${task.id}`}
                      >
                        {getTaskStatusText(task)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <Clock className="w-4 h-4" />
                    <span data-testid={`text-project-next-${project.id}`}>
                      Next: 2h study block today at 2pm
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleProjectExpansion(project.id)}
                    className="text-sm font-medium"
                    style={{ color: pillar?.color }}
                    data-testid={`button-expand-${project.id}`}
                  >
                    <ChevronDown 
                      className={`w-4 h-4 mr-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    />
                    {isExpanded ? 'Collapse' : 'Expand'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* ADHD-Specific Intervention Messages */}
        <Card className="border-blue-200 bg-blue-50" data-testid="card-adhd-intervention">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Lightbulb className="w-5 h-5 text-blue-500 mt-1" />
              <div>
                <h4 className="text-sm font-medium text-blue-800 mb-1">ADHD Check-In</h4>
                <p className="text-sm text-blue-700">
                  Your ADHD brain has been hyperfocusing on Wealth projects. Time to nurture your Health and Love pillars to prevent burnout and maintain sustainable progress.
                </p>
                <div className="mt-2 text-xs text-blue-600">
                  🧠 Remember: Balance prevents the ADHD crash-and-burn cycle
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* ADHD Success Celebration */}
        <Card className="border-green-200 bg-green-50" data-testid="card-adhd-celebration">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="text-green-600 text-lg">🎉</div>
              <div>
                <h4 className="text-sm font-medium text-green-800 mb-1">You're Crushing It!</h4>
                <p className="text-sm text-green-700">
                  You've completed 2 tasks this week without jumping to new projects. This is exactly how ADHD brains achieve big goals - one focused step at a time.
                </p>
                <div className="mt-2 text-xs text-green-600">
                  🏆 Tai Lopez would be proud - you're building wealth through sustained focus
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
