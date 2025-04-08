
import FormContainer from "@/components/FormContainer";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 gov-container py-8">
          <FormContainer />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
