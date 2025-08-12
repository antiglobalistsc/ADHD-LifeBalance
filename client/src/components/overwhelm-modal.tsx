import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ListChecks, CalendarMinus, Flower } from "lucide-react";

interface OverwhelmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function OverwhelmModal({ open, onOpenChange }: OverwhelmModalProps) {
  const handleAction = (action: string) => {
    console.log('Overwhelm action:', action);
    // TODO: Implement actual overwhelm response actions
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md" data-testid="modal-overwhelm">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 text-4xl">🤗</div>
          <DialogTitle className="text-xl font-semibold text-slate-800" data-testid="text-modal-title">
            Take a Deep Breath
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-600" data-testid="text-modal-description">
            ADHD minds can get overwhelmed quickly. That's normal and okay. Let's help you refocus on what truly matters right now.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3 my-6">
          <Button
            variant="outline"
            className="w-full bg-green-50 hover:bg-green-100 border-green-200 text-green-700 justify-start"
            onClick={() => handleAction('prioritize')}
            data-testid="button-prioritize"
          >
            <ListChecks className="w-4 h-4 mr-3" />
            Help me focus on ONE important thing
          </Button>
          
          <Button
            variant="outline"
            className="w-full bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 justify-start"
            onClick={() => handleAction('clear-schedule')}
            data-testid="button-clear-schedule"
          >
            <CalendarMinus className="w-4 h-4 mr-3" />
            Reset my day - clear overwhelm
          </Button>
          
          <Button
            variant="outline"
            className="w-full bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-700 justify-start"
            onClick={() => handleAction('calming-activities')}
            data-testid="button-calming"
          >
            <Flower className="w-4 h-4 mr-3" />
            ADHD-friendly calming techniques
          </Button>
        </div>
        
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
            data-testid="button-im-okay"
          >
            I'm okay now
          </Button>
          <Button
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            onClick={() => handleAction('get-help')}
            data-testid="button-get-help"
          >
            Get Help
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
