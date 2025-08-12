import { useState } from "react";
import FourPillarDashboard from "@/components/four-pillar-dashboard";
import ProjectManagement from "@/components/project-management";
import TimeBlockScheduler from "@/components/time-block-scheduler";
import WeeklyProgress from "@/components/weekly-progress";
import OverwhelmModal from "@/components/overwhelm-modal";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import type { BalanceMetrics } from "@shared/schema";
import { Scale, HandIcon, User, Settings, LogOut, HelpCircle, ChevronDown } from "lucide-react";

const DEMO_USER_ID = "default-user";

export default function Dashboard() {
  const [showOverwhelmModal, setShowOverwhelmModal] = useState(false);
  
  const today = new Date().toISOString().split('T')[0];
  
  const { data: balanceMetrics } = useQuery<BalanceMetrics>({
    queryKey: ['/api/balance', DEMO_USER_ID, today]
  });

  const getOverwhelmColor = (level: string) => {
    switch (level) {
      case 'green': return 'bg-green-500';
      case 'yellow': return 'bg-yellow-500';
      case 'red': return 'bg-red-500';
      default: return 'bg-yellow-500';
    }
  };

  const getOverwhelmTitle = (level: string) => {
    switch (level) {
      case 'green': return 'Balanced';
      case 'yellow': return 'Getting Busy - Take a breath';
      case 'red': return 'Overwhelmed - Consider reducing tasks';
      default: return 'Getting Busy - Take a breath';
    }
  };

  return (
    <div className="bg-slate-50 font-inter min-h-screen">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Scale className="h-6 w-6 text-slate-700" />
            <h1 className="text-xl font-semibold text-slate-800">ADHD LifeBalance</h1>
          </div>
          
          {/* Daily Balance Indicator & Profile */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-600">Today's Balance:</span>
              <div 
                className={`w-3 h-3 rounded-full ${getOverwhelmColor(balanceMetrics?.overwhelmLevel || 'yellow')}`}
                title={getOverwhelmTitle(balanceMetrics?.overwhelmLevel || 'yellow')}
              />
            </div>
            
            {/* Emergency Overwhelm Button */}
            <Button
              variant="outline"
              className="bg-red-100 hover:bg-red-200 text-red-700 border-red-200"
              onClick={() => setShowOverwhelmModal(true)}
              data-testid="button-overwhelm"
            >
              <HandIcon className="w-4 h-4 mr-2" />
              I'm Overwhelmed
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="relative h-10 w-10 rounded-full"
                  data-testid="button-profile"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="User profile"
                    />
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount data-testid="menu-profile-dropdown">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">ADHD Warrior</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      warrior@adhdlifebalance.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem data-testid="menu-item-profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem data-testid="menu-item-settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem data-testid="menu-item-help">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>ADHD Tips & Help</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem data-testid="menu-item-logout">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Four Pillars Dashboard */}
        <FourPillarDashboard userId={DEMO_USER_ID} />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-12">
          {/* Project Management */}
          <div className="xl:col-span-2">
            <ProjectManagement userId={DEMO_USER_ID} />
          </div>

          {/* Time Block Scheduler */}
          <div>
            <TimeBlockScheduler userId={DEMO_USER_ID} />
          </div>
        </div>

        {/* Weekly Progress Overview */}
        <WeeklyProgress userId={DEMO_USER_ID} />
      </div>

      {/* Overwhelm Modal */}
      <OverwhelmModal 
        open={showOverwhelmModal} 
        onOpenChange={setShowOverwhelmModal}
      />
    </div>
  );
}
