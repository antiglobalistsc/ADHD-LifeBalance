import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "wouter";
import { 
  Scale, 
  Brain, 
  Target, 
  Calendar, 
  CheckCircle, 
  Heart, 
  DollarSign, 
  Users, 
  Smile,
  ArrowRight,
  Star
} from "lucide-react";

export default function Landing() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      setLocation("/dashboard");
    }, 1000);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false);
      setLocation("/dashboard");
    }, 1000);
  };

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-blue-600" />,
      title: "ADHD-Friendly Design",
      description: "Built specifically for ADHD brains with overwhelm detection and positive reinforcement"
    },
    {
      icon: <Target className="h-8 w-8 text-green-600" />,
      title: "Four Pillar System",
      description: "Organize your life around Health, Wealth, Love, and Happiness with strategic project chunking"
    },
    {
      icon: <Calendar className="h-8 w-8 text-purple-600" />,
      title: "Time Block Scheduling",
      description: "Schedule tasks based on your energy levels and prevent overcommitment"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-orange-600" />,
      title: "Smart Progress Tracking",
      description: "Celebrate wins and get weekly insights without the pressure of perfectionism"
    }
  ];

  const pillars = [
    {
      icon: <Heart className="h-12 w-12 text-red-500" />,
      name: "Health",
      description: "Physical and mental wellness tracking",
      color: "from-red-400 to-red-600"
    },
    {
      icon: <DollarSign className="h-12 w-12 text-green-500" />,
      name: "Wealth", 
      description: "Financial goals and career growth",
      color: "from-green-400 to-green-600"
    },
    {
      icon: <Users className="h-12 w-12 text-blue-500" />,
      name: "Love",
      description: "Relationships and social connections",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: <Smile className="h-12 w-12 text-yellow-500" />,
      name: "Happiness",
      description: "Joy, fulfillment and life satisfaction",
      color: "from-yellow-400 to-yellow-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Scale className="h-8 w-8 text-slate-700" />
              <h1 className="text-2xl font-bold text-slate-800">ADHD LifeBalance</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}>
                Sign In
              </Button>
              <Button onClick={() => document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Master Your Life with <span className="text-blue-600">ADHD-Friendly</span> Organization
            </h2>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Stop letting ADHD steer the wheel. Organize your goals around Health, Wealth, Love, and Happiness 
              with smart overwhelm detection and celebration of every win.
            </p>
          </div>
          
          <div className="flex items-center justify-center space-x-4 mb-12">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
            </div>
            <span className="text-slate-600">Loved by ADHD individuals worldwide</span>
          </div>

          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            onClick={() => document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Four Pillars Preview */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              The Four Pillars of Balanced Living
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Organize every aspect of your life into four key areas that matter most for long-term success and happiness
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar) => (
              <Card key={pillar.name} className="text-center border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${pillar.color} flex items-center justify-center mx-auto mb-4`}>
                    {pillar.icon}
                  </div>
                  <CardTitle className="text-xl">{pillar.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{pillar.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Built for ADHD Brains
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Every feature is designed with ADHD challenges in mind - from executive function support to overwhelm prevention
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="flex space-x-4">
                <div className="flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h4>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Auth Section */}
      <section id="auth-section" className="py-20 px-6 bg-white">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Ready to Take Control?
            </h3>
            <p className="text-lg text-slate-600">
              Join thousands of ADHD individuals who have transformed their lives with LifeBalance
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Get Started Today</CardTitle>
              <CardDescription className="text-center">
                Create your account or sign in to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signup" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signup" data-testid="tab-signup">Sign Up</TabsTrigger>
                  <TabsTrigger value="login" data-testid="tab-login">Sign In</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Your name"
                        required
                        data-testid="input-signup-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        data-testid="input-signup-email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Choose a strong password"
                        required
                        data-testid="input-signup-password"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={isLoading}
                      data-testid="button-signup"
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        data-testid="input-login-email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="Your password"
                        required
                        data-testid="input-login-password"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={isLoading}
                      data-testid="button-login"
                    >
                      {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Scale className="h-6 w-6" />
            <span className="text-xl font-semibold">ADHD LifeBalance</span>
          </div>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            Empowering ADHD individuals to achieve balanced, fulfilling lives through strategic organization 
            and positive reinforcement systems.
          </p>
          <div className="text-sm text-slate-500">
            © 2025 ADHD LifeBalance. Made with ❤️ for the ADHD community.
          </div>
        </div>
      </footer>
    </div>
  );
}