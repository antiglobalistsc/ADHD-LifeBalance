import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Plus, Heart, Users, MessageCircle, Calendar } from "lucide-react";
import { Link } from "wouter";

export default function LovePage() {
  const loveGoals = [
    { id: 1, title: "Weekly date nights", progress: 75, category: "Romance", color: "bg-pink-100 text-pink-800" },
    { id: 2, title: "Daily check-ins with family", progress: 60, category: "Family", color: "bg-blue-100 text-blue-800" },
    { id: 3, title: "Monthly friend gatherings", progress: 40, category: "Friendship", color: "bg-green-100 text-green-800" },
    { id: 4, title: "Practice active listening", progress: 55, category: "Communication", color: "bg-purple-100 text-purple-800" }
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
            <Heart className="h-6 w-6 text-pink-600" />
            <h1 className="text-xl font-semibold text-slate-800">Love Pillar</h1>
            <Badge className="bg-pink-100 text-pink-800">Relationships</Badge>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Love Philosophy */}
            <Card data-testid="card-love-philosophy">
              <CardHeader>
                <CardTitle className="flex items-center text-pink-700">
                  <Users className="w-5 h-5 mr-2" />
                  Your Relationship Foundation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600">
                  Tai Lopez emphasizes that meaningful relationships provide emotional support, inspiration, and purpose beyond business. For ADHD individuals, strong relationships offer accountability and understanding that helps you thrive.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-pink-50 rounded-lg">
                    <h4 className="font-medium text-pink-800 mb-1">Romance</h4>
                    <p className="text-sm text-pink-600">Deep connection with your life partner</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-1">Family</h4>
                    <p className="text-sm text-blue-600">Nurturing bonds with loved ones</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-1">Friendship</h4>
                    <p className="text-sm text-green-600">Quality friendships that support your growth</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-800 mb-1">Communication</h4>
                    <p className="text-sm text-purple-600">Skills to connect authentically with others</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Goals */}
            <Card data-testid="card-love-goals">
              <CardHeader>
                <CardTitle>Current Relationship Goals</CardTitle>
                <p className="text-sm text-slate-600">Building meaningful connections that support your ADHD journey</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {loveGoals.map((goal) => (
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
                      <div className="mt-3 text-xs text-pink-600">
                        🎯 Next: Plan this Friday's dinner and activity
                      </div>
                    )}
                    {goal.id === 3 && (
                      <div className="mt-3 text-xs text-green-600">
                        🎯 Next: Text Sarah about weekend plans
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
                <CardTitle className="text-lg">Add Relationship Goal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">Goal Title</label>
                  <Input 
                    placeholder="e.g., Call mom twice a week" 
                    data-testid="input-goal-title"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">Category</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm" data-testid="select-goal-category">
                    <option>Romance</option>
                    <option>Family</option>
                    <option>Friendship</option>
                    <option>Communication</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">ADHD-Friendly Plan</label>
                  <Textarea 
                    placeholder="How will you remember and maintain this relationship goal?"
                    rows={3}
                    data-testid="textarea-goal-plan"
                  />
                </div>
                <Button className="w-full bg-pink-600 hover:bg-pink-700" data-testid="button-add-goal">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Goal
                </Button>
              </CardContent>
            </Card>

            {/* ADHD Love Tips */}
            <Card data-testid="card-adhd-tips">
              <CardHeader>
                <CardTitle className="text-lg text-pink-700">ADHD Relationship Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-pink-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <MessageCircle className="w-4 h-4 text-pink-600 mt-1" />
                    <div>
                      <h4 className="text-sm font-medium text-pink-800">Be Honest About ADHD</h4>
                      <p className="text-xs text-pink-600">Help others understand your unique brain</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Calendar className="w-4 h-4 text-blue-600 mt-1" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-800">Calendar Reminders</h4>
                      <p className="text-xs text-blue-600">Set reminders for important dates and check-ins</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Heart className="w-4 h-4 text-purple-600 mt-1" />
                    <div>
                      <h4 className="text-sm font-medium text-purple-800">Quality Over Quantity</h4>
                      <p className="text-xs text-purple-600">Deep connections matter more than many shallow ones</p>
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