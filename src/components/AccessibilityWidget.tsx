
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Accessibility, 
  TextSize, 
  Glasses, 
  MonitorCheck,
  MoveHorizontal,
  X
} from "lucide-react";

const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(1);
  const [highContrast, setHighContrast] = useState(false);
  const [spacing, setSpacing] = useState(false);
  
  const toggleWidget = () => setIsOpen(!isOpen);
  
  const increaseFontSize = () => {
    if (fontSize < 1.5) {
      const newSize = fontSize + 0.1;
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${newSize}rem`;
    }
  };
  
  const decreaseFontSize = () => {
    if (fontSize > 0.8) {
      const newSize = fontSize - 0.1;
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${newSize}rem`;
    }
  };
  
  const resetFontSize = () => {
    setFontSize(1);
    document.documentElement.style.fontSize = '1rem';
  };
  
  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    if (!highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };
  
  const toggleSpacing = () => {
    setSpacing(!spacing);
    if (!spacing) {
      document.documentElement.classList.add('increased-spacing');
      document.body.style.letterSpacing = '0.05em';
      document.body.style.wordSpacing = '0.1em';
      document.body.style.lineHeight = '1.8';
    } else {
      document.documentElement.classList.remove('increased-spacing');
      document.body.style.letterSpacing = '';
      document.body.style.wordSpacing = '';
      document.body.style.lineHeight = '';
    }
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="bg-background rounded-lg border border-border shadow-lg p-4 mb-2 w-64 animate-fade-in">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold">Accessibility Options</h2>
            <Button variant="ghost" size="icon" onClick={toggleWidget} className="h-6 w-6">
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium mb-2">Text Size</div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={decreaseFontSize} className="flex-1">A-</Button>
                <Button size="sm" variant="outline" onClick={resetFontSize} className="flex-1">Reset</Button>
                <Button size="sm" variant="outline" onClick={increaseFontSize} className="flex-1">A+</Button>
              </div>
            </div>
            
            <div>
              <div className="text-sm font-medium mb-2">Display Options</div>
              <div className="space-y-2">
                <Button
                  size="sm"
                  variant={highContrast ? "default" : "outline"}
                  onClick={toggleHighContrast}
                  className="w-full justify-start"
                >
                  <Glasses className="mr-2 h-4 w-4" />
                  High Contrast
                </Button>
                <Button
                  size="sm"
                  variant={spacing ? "default" : "outline"}
                  onClick={toggleSpacing}
                  className="w-full justify-start"
                >
                  <MoveHorizontal className="mr-2 h-4 w-4" />
                  Increase Spacing
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Button
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg"
        onClick={toggleWidget}
        aria-label="Accessibility options"
      >
        <Accessibility className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default AccessibilityWidget;
