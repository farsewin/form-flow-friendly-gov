
import { useState } from "react";
import { useForm } from "@/contexts/FormContext";
import { Button } from "@/components/ui/button";
import { Save, Check, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const SaveProgressButton = () => {
  const { saveProgress, clearForm } = useForm();
  const [showSaveAnimation, setShowSaveAnimation] = useState(false);
  
  const handleSave = () => {
    saveProgress();
    setShowSaveAnimation(true);
    
    toast({
      title: "Progress saved",
      description: "Your form progress has been saved. You can resume later.",
    });
    
    setTimeout(() => {
      setShowSaveAnimation(false);
    }, 2000);
  };
  
  const handleClear = () => {
    clearForm();
    
    toast({
      title: "Form cleared",
      description: "Your form has been reset and all saved progress removed.",
      variant: "destructive",
    });
  };
  
  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-1" 
        onClick={handleSave}
      >
        {showSaveAnimation ? (
          <>
            <Check className="h-4 w-4 text-green-600" />
            <span>Saved</span>
          </>
        ) : (
          <>
            <Save className="h-4 w-4" />
            <span>Save Progress</span>
          </>
        )}
      </Button>
      
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sm:inline hidden">Clear Form</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will clear all your form data and reset your progress. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleClear} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Yes, clear form
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SaveProgressButton;
