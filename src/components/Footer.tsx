
import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border mt-auto py-6">
      <div className="gov-container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            <p>© {new Date().getFullYear()} Digital Government Services</p>
            <p>This is a demo application. No actual data is processed or stored.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
