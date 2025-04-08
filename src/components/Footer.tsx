
import { Github } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t, language } = useLanguage();
  
  // All content in Arabic
  const arabicText = {
    copyright: "© {year} خدمات الحكومة الرقمية",
    disclaimer: "هذا تطبيق تجريبي. لا تتم معالجة أو تخزين أي بيانات فعلية.",
    privacy: "سياسة الخصوصية",
    terms: "شروط الخدمة",
    accessibility: "إمكانية الوصول"
  };
  
  return (
    <footer className="border-t border-border mt-auto py-6">
      <div className="gov-container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            <p>{arabicText.copyright.replace("{year}", new Date().getFullYear().toString())}</p>
            <p>{arabicText.disclaimer}</p>
          </div>
          <div className="flex space-x-6 space-x-reverse">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {arabicText.privacy}
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {arabicText.terms}
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {arabicText.accessibility}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
