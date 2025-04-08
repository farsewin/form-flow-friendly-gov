
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b border-border sticky top-0 bg-background z-10">
      <div className="gov-container py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="font-bold text-xl text-gov-blue-dark dark:text-primary">
            <span className="hidden sm:inline">Digital Government Services</span>
            <span className="sm:hidden">DGS</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <SunIcon size={20} /> : <MoonIcon size={20} />}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
