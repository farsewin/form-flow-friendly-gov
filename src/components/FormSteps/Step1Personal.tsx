
import { useState } from "react";
import { useForm } from "@/contexts/FormContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

const Step1Personal = () => {
  const { formData, updateFormField, errors, setErrors, setCurrentStep } = useForm();
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateFields = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email format is invalid";
      isValid = false;
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^[0-9()\-\s+]{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Phone number format is invalid";
      isValid = false;
    }

    // Date of Birth validation
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
      isValid = false;
    } else {
      const dobDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const minAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
      
      if (isNaN(dobDate.getTime())) {
        newErrors.dateOfBirth = "Invalid date format";
        isValid = false;
      } else if (dobDate > today) {
        newErrors.dateOfBirth = "Date of birth cannot be in the future";
        isValid = false;
      } else if (dobDate > minAgeDate) {
        newErrors.dateOfBirth = "You must be at least 18 years old";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleContinue = () => {
    const allTouched = {
      fullName: true,
      email: true,
      phone: true,
      dateOfBirth: true
    };
    setTouched(allTouched);
    
    if (validateFields()) {
      setCurrentStep(1);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
        <p className="text-muted-foreground">Please provide your personal details below.</p>
      </div>

      {Object.keys(errors).length > 0 && touched.fullName && touched.email && touched.phone && touched.dateOfBirth && (
        <div className="error-summary" role="alert">
          <h3 className="text-lg font-semibold">There is a problem</h3>
          <ul className="list-disc pl-5 mt-2">
            {Object.entries(errors).map(([field, error]) => (
              <li key={field}>
                <a href={`#${field}`} className="underline hover:no-underline">
                  {error}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="form-group">
        <div className="flex items-center gap-2">
          <Label htmlFor="fullName" className="text-base">Full Name</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6" aria-label="Help for Full Name field">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Enter your legal full name as it appears on your official ID.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id="fullName"
          value={formData.fullName}
          onChange={(e) => updateFormField("fullName", e.target.value)}
          onBlur={() => handleBlur("fullName")}
          className={`mt-1 ${touched.fullName && errors.fullName ? "border-destructive" : ""}`}
          aria-describedby={touched.fullName && errors.fullName ? "fullName-error" : undefined}
          aria-invalid={touched.fullName && !!errors.fullName}
        />
        {touched.fullName && errors.fullName && (
          <p id="fullName-error" className="text-destructive text-sm mt-1">{errors.fullName}</p>
        )}
      </div>

      <div className="form-group">
        <div className="flex items-center gap-2">
          <Label htmlFor="email" className="text-base">Email Address</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6" aria-label="Help for Email field">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>We'll use this email address to send you updates about your application.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormField("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          className={`mt-1 ${touched.email && errors.email ? "border-destructive" : ""}`}
          aria-describedby={touched.email && errors.email ? "email-error" : undefined}
          aria-invalid={touched.email && !!errors.email}
        />
        {touched.email && errors.email && (
          <p id="email-error" className="text-destructive text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div className="form-group">
        <div className="flex items-center gap-2">
          <Label htmlFor="phone" className="text-base">Phone Number</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6" aria-label="Help for Phone field">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Enter a phone number where we can contact you if needed.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => updateFormField("phone", e.target.value)}
          onBlur={() => handleBlur("phone")}
          className={`mt-1 ${touched.phone && errors.phone ? "border-destructive" : ""}`}
          aria-describedby={touched.phone && errors.phone ? "phone-error" : undefined}
          placeholder="e.g., (555) 123-4567"
          aria-invalid={touched.phone && !!errors.phone}
        />
        {touched.phone && errors.phone && (
          <p id="phone-error" className="text-destructive text-sm mt-1">{errors.phone}</p>
        )}
      </div>

      <div className="form-group">
        <div className="flex items-center gap-2">
          <Label htmlFor="dateOfBirth" className="text-base">Date of Birth</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6" aria-label="Help for Date of Birth field">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>You must be at least 18 years old to use this service.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => updateFormField("dateOfBirth", e.target.value)}
          onBlur={() => handleBlur("dateOfBirth")}
          className={`mt-1 ${touched.dateOfBirth && errors.dateOfBirth ? "border-destructive" : ""}`}
          aria-describedby={touched.dateOfBirth && errors.dateOfBirth ? "dateOfBirth-error" : undefined}
          aria-invalid={touched.dateOfBirth && !!errors.dateOfBirth}
        />
        {touched.dateOfBirth && errors.dateOfBirth && (
          <p id="dateOfBirth-error" className="text-destructive text-sm mt-1">{errors.dateOfBirth}</p>
        )}
      </div>

      <div className="flex justify-end mt-8">
        <Button onClick={handleContinue}>Continue to Address</Button>
      </div>
    </div>
  );
};

export default Step1Personal;
