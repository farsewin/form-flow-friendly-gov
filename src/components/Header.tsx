
import { MoonIcon, SunIcon, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <header className="border-b border-border sticky top-0 bg-background z-10">
      <div className="gov-container py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="font-bold text-xl text-gov-blue-dark dark:text-primary">
            <span className="hidden sm:inline">{t("header.title")}</span>
            <span className="sm:hidden">{t("header.title.short")}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label={t(theme === "dark" ? "header.theme.light" : "header.theme.dark")}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <SunIcon size={20} /> : <MoonIcon size={20} />}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="ml-2"
            onClick={toggleLanguage}
            aria-label={`Switch to ${language === "en" ? "Arabic" : "English"}`}
          >
            <Globe size={20} />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="text-sm hidden sm:flex"
          >
            {t("header.language")}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
