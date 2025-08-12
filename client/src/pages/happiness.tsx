import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Plus, Smile, Sparkles, Music, Camera } from "lucide-react";
import { Link } from "wouter";

export default function HappinessPage() {
  const happinessGoals = [
    { id: 1, title: "Daily gratitude practice", progress: 80, category: "Mindset", color: "bg-yellow-100 text-yellow-800" },
    { id: 2, title: "Weekly creative time", progress: 45, category: "Creativity", color: "bg-purple-100 text-purple-800" },
    { id: 3, title: "Explore new experiences", progress: 30, category: "Adventure", color: "bg-green-100 text-green-800" },
    { id: 4, title: "Celebrate small wins", progress: 90, category: "Recognition", color: "bg-blue-100 text-blue-800" }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/">
              <Button variant="ghost" size="sm" data-testid="button-back">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="h-6 w-px bg-slate-300"></div>
            <Smile className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-semibold text-slate-800">Happiness Pillar</h1>
            <Badge className="bg-blue-100 text-blue-800">Joy & Fulfillment</Badge>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Happiness Philosophy */}
            <Card data-testid="card-happiness-philosophy">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-700">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Your Happiness Foundation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600">
                  Tai Lopez believes true happiness comes when your work contributes to fulfillment and you maintain a positive mindset. For ADHD brains, this means celebrating progress, practicing gratitude, and embracing the journey with all its unique challenges.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-1">Mindset</h4>
                    <p className="text-sm text-yellow-600">Positive thinking and gratitude practices</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-800 mb-1">Creativity</h4>
                    <p className="text-sm text-purple-600">Express yourself and explore your interests</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-1">Adventure</h4>
                    <p className="text-sm text-green-600">New experiences that stimulate your ADHD brain</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-1">Recognition</h4>
                    <p className="text-sm text-blue-600">Acknowledge and celebrate your achievements</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Goals */}
            <Card data-testid="card-happiness-goals">
              <CardHeader>
                <CardTitle>Current Happiness Goals</CardTitle>
                <p className="text-sm text-slate-600">Cultivating joy and fulfillment that works with your ADHD brain</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {happinessGoals.map((goal) => (
                  <div key={goal.id} className="p-4 border border-slate-200 rounded-lg" data-testid={`card-goal-${goal.id}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-slate-800">{goal.title}</h4>
                      <Badge className={goal.color}>{goal.category}</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Progress</span>
                        <span className="font-medium">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                    {goal.id === 1 && (
                      <div className="mt-3 text-xs text-yellow-600">
                        🎯 Current streak: 12 days of gratitude journaling!
                      </div>
                    )}
                    {goal.id === 4 && (
                      <div className="mt-3 text-xs text-blue-600">
                        🎯 Latest win: Completed 2 Security+ chapters this week
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Add New Goal */}
            <Card data-testid="card-add-goal">
              <CardHeader>
                <CardTitle className="text-lg">Add Happiness Goal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">Goal Title</label>
                  <Input 
                    placeholder="e.g., Learn guitar for 20min daily" 
                    data-testid="input-goal-title"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">Category</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm" data-testid="select-goal-category">
                    <option>Mindset</option>
                    <option>Creativity</option>
                    <option>Adventure</option>
                    <option>Recognition</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">ADHD Joy Strategy</label>
                  <Textarea 
                    placeholder="How will this bring you joy and work with your ADHD brain?"
                    rows={3}
                    data-testid="textarea-goal-strategy"
                  />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" data-testid="button-add-goal">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Goal
                </Button>
              </CardContent>
            </Card>

            {/* ADHD Happiness Tips */}
            <Card data-testid="card-adhd-tips">
              <CardHeader>
                <CardTitle className="text-lg text-blue-700">ADHD Happiness Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Sparkles className="w-4 h-4 text-yellow-600 mt-1" />
                    <div>
                      <h4 className="text-sm font-medium text-yellow-800">Micro-Celebrations</h4>
                      <p className="text-xs text-yellow-600">Celebrate every small win - your brain needs the dopamine</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Music className="w-4 h-4 text-purple-600 mt-1" />
                    <div>
                      <h4 className="text-sm font-medium text-purple-800">Creative Outlets</h4>
                      <p className="text-xs text-purple-600">ADHD brains are often highly creative - nurture this gift</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Camera className="w-4 h-4 text-green-600 mt-1" />
                    <div>
                      <h4 className="text-sm font-medium text-green-800">Novel Experiences</h4>
                      <p className="text-xs text-green-600">Seek new experiences to keep your brain engaged</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}