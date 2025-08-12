import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Plus, DollarSign, TrendingUp, BookOpen, Target } from "lucide-react";
import { Link } from "wouter";

export default function WealthPage() {
  const wealthGoals = [
    { id: 1, title: "Complete Security+ Certification", progress: 45, category: "Skills", color: "bg-blue-100 text-blue-800" },
    { id: 2, title: "Launch DispatchThrive MVP", progress: 30, category: "Business", color: "bg-purple-100 text-purple-800" },
    { id: 3, title: "Build Emergency Fund", progress: 65, category: "Financial", color: "bg-green-100 text-green-800" },
    { id: 4, title: "Learn Python for automation", progress: 20, category: "Skills", color: "bg-orange-100 text-orange-800" }
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
            <DollarSign className="h-6 w-6 text-amber-600" />
            <h1 className="text-xl font-semibold text-slate-800">Wealth Pillar</h1>
            <Badge className="bg-amber-100 text-amber-800">Strategic Focus</Badge>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Wealth Philosophy */}
            <Card data-testid="card-wealth-philosophy">
              <CardHeader>
                <CardTitle className="flex items-center text-amber-700">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Your Wealth Strategy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600">
                  Tai Lopez teaches that wealth isn't just money - it's knowledge, skills, and systems that create value. For ADHD brains, this means leveraging hyperfocus periods and breaking big goals into manageable chunks.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-1">Skills</h4>
                    <p className="text-sm text-blue-600">Build expertise that compounds over time</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-800 mb-1">Business</h4>
                    <p className="text-sm text-purple-600">Create systems that work while you sleep</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-1">Financial</h4>
                    <p className="text-sm text-green-600">Smart money management and investing</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <h4 className="font-medium text-orange-800 mb-1">Network</h4>
                    <p className="text-sm text-orange-600">Relationships that accelerate success</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Goals */}
            <Card data-testid="card-wealth-goals">
              <CardHeader>
                <CardTitle>Current Wealth Goals</CardTitle>
                <p className="text-sm text-slate-600">Your ADHD-friendly approach to building sustainable wealth</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {wealthGoals.map((goal) => (
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
                      <div className="mt-3 text-xs text-blue-600">
                        🎯 Next: Complete Network+ practice exam
                      </div>
                    )}
                    {goal.id === 2 && (
                      <div className="mt-3 text-xs text-purple-600">
                        🎯 Next: Finish user authentication system
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
                <CardTitle className="text-lg">Add Wealth Goal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">Goal Title</label>
                  <Input 
                    placeholder="e.g., Learn AWS Cloud Architecture" 
                    data-testid="input-goal-title"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">Category</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm" data-testid="select-goal-category">
                    <option>Skills</option>
                    <option>Business</option>
                    <option>Financial</option>
                    <option>Network</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">ADHD Strategy</label>
                  <Textarea 
                    placeholder="How will you break this down into manageable chunks?"
                    rows={3}
                    data-testid="textarea-goal-strategy"
                  />
                </div>
                <Button className="w-full bg-amber-600 hover:bg-amber-700" data-testid="button-add-goal">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Goal
                </Button>
              </CardContent>
            </Card>

            {/* ADHD Wealth Tips */}
            <Card data-testid="card-adhd-tips">
              <CardHeader>
                <CardTitle className="text-lg text-amber-700">ADHD Wealth Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <BookOpen className="w-4 h-4 text-blue-600 mt-1" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-800">Hyperfocus Sessions</h4>
                      <p className="text-xs text-blue-600">Use your natural hyperfocus for deep learning</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Target className="w-4 h-4 text-purple-600 mt-1" />
                    <div>
                      <h4 className="text-sm font-medium text-purple-800">One Project Rule</h4>
                      <p className="text-xs text-purple-600">Resist the urge to start new projects until current ones are done</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <DollarSign className="w-4 h-4 text-green-600 mt-1" />
                    <div>
                      <h4 className="text-sm font-medium text-green-800">Automate Everything</h4>
                      <p className="text-xs text-green-600">Set up systems so you don't have to remember</p>
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