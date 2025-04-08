
import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    "header.title": "Digital Government Services",
    "header.title.short": "DGS",
    "header.theme.light": "Switch to light theme",
    "header.theme.dark": "Switch to dark theme",
    "header.language": "العربية",
    
    // Footer
    "footer.copyright": "© {year} Digital Government Services",
    "footer.disclaimer": "This is a demo application. No actual data is processed or stored.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.accessibility": "Accessibility",
  },
  ar: {
    // Header
    "header.title": "خدمات الحكومة الرقمية",
    "header.title.short": "خ.ح.ر",
    "header.theme.light": "التبديل إلى السمة الفاتحة",
    "header.theme.dark": "التبديل إلى السمة الداكنة",
    "header.language": "English",
    
    // Footer
    "footer.copyright": "© {year} خدمات الحكومة الرقمية",
    "footer.disclaimer": "هذا تطبيق تجريبي. لا تتم معالجة أو تخزين أي بيانات فعلية.",
    "footer.privacy": "سياسة الخصوصية",
    "footer.terms": "شروط الخدمة",
    "footer.accessibility": "إمكانية الوصول",
  }
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Always use Arabic language only
  const [language, setLanguage] = useState<Language>("ar");

  const t = (key: string): string => {
    // Always return Arabic translations regardless of language setting
    const translation = translations["ar"][key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key} in language: ar`);
      return key;
    }
    return translation.replace("{year}", new Date().getFullYear().toString());
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div dir="rtl" className="font-arabic">
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
