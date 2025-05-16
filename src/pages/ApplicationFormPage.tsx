import { ThemeProvider } from "@/hooks/use-theme";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormContainer from "@/components/FormContainer";
import AccessibilityWidget from "@/components/AccessibilityWidget";

const ApplicationFormPage = () => {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1">
          <section id="form-section" className="gov-container mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">Application Form</h2>
            <FormContainer />
          </section>
        </main>
        
        <Footer />
        <AccessibilityWidget />
      </div>
    </ThemeProvider>
  );
};

export default ApplicationFormPage;