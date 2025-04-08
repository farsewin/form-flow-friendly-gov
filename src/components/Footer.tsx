
import { Github } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t, language } = useLanguage();
  
  return (
    <footer className="border-t border-border mt-auto py-6">
      <div className="gov-container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            <p>{t("footer.copyright")}</p>
            <p>{t("footer.disclaimer")}</p>
          </div>
          <div className="flex space-x-6 space-x-reverse">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {t("footer.privacy")}
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {t("footer.terms")}
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {t("footer.accessibility")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
