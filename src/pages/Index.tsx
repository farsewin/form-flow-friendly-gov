import { ThemeProvider } from "@/hooks/use-theme";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Shield, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Assuming you're using Next.js

const Index = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <section className="bg-gov-blue py-12 mb-12">
            <div className="gov-container">
              <div className="text-white max-w-2xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Digital Government Services
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-8">
                  Submit official documents and forms securely and efficiently
                </p>
                <Button
                  size="lg"
                  className="bg-white text-gov-blue hover:bg-white/90"
                  onClick={() => navigate("/application-form")} // Navigate to ApplicationFormPage
                >
                  Start Application <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </section>

          <section className="gov-container mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Fill Out Form</h3>
                    <p className="text-muted-foreground">
                      Complete the digital form with your personal information
                      and service request details.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">
                      Upload Documents
                    </h3>
                    <p className="text-muted-foreground">
                      Securely upload required documents and identification for
                      verification.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Submit & Save</h3>
                    <p className="text-muted-foreground">
                      Submit your application and receive a confirmation with
                      all your information.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>

        <Footer />
        <AccessibilityWidget />
      </div>
    </ThemeProvider>
  );
};

export default Index;
