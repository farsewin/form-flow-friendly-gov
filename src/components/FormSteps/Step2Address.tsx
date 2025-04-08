
import { useState } from "react";
import { useForm } from "@/contexts/FormContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

// US States array for the dropdown
const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
  "District of Columbia", "American Samoa", "Guam", "Northern Mariana Islands", "Puerto Rico", "U.S. Virgin Islands"
];

const Step2Address = () => {
  const { formData, updateFormField, errors, setErrors, setCurrentStep } = useForm();
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateFields = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Street address is required";
      isValid = false;
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
      isValid = false;
    }

    // State validation
    if (!formData.state) {
      newErrors.state = "State is required";
      isValid = false;
    }

    // Postal Code validation
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal/ZIP code is required";
      isValid = false;
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.postalCode.trim())) {
      newErrors.postalCode = "Postal/ZIP code format is invalid (e.g., 12345 or 12345-6789)";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleBack = () => {
    setCurrentStep(0);
  };

  const handleContinue = () => {
    const allTouched = {
      address: true,
      city: true,
      state: true,
      postalCode: true
    };
    setTouched(allTouched);
    
    if (validateFields()) {
      setCurrentStep(2);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Address Information</h2>
        <p className="text-muted-foreground">Please provide your current address details.</p>
      </div>

      {Object.keys(errors).length > 0 && touched.address && touched.city && touched.state && touched.postalCode && (
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
          <Label htmlFor="address" className="text-base">Street Address</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6" aria-label="Help for Street Address field">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Enter your full street address, including apartment/unit numbers if applicable.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => updateFormField("address", e.target.value)}
          onBlur={() => handleBlur("address")}
          className={`mt-1 ${touched.address && errors.address ? "border-destructive" : ""}`}
          aria-describedby={touched.address && errors.address ? "address-error" : undefined}
          placeholder="123 Main St, Apt 4B"
          aria-invalid={touched.address && !!errors.address}
        />
        {touched.address && errors.address && (
          <p id="address-error" className="text-destructive text-sm mt-1">{errors.address}</p>
        )}
      </div>

      <div className="form-group">
        <div className="flex items-center gap-2">
          <Label htmlFor="city" className="text-base">City</Label>
        </div>
        <Input
          id="city"
          value={formData.city}
          onChange={(e) => updateFormField("city", e.target.value)}
          onBlur={() => handleBlur("city")}
          className={`mt-1 ${touched.city && errors.city ? "border-destructive" : ""}`}
          aria-describedby={touched.city && errors.city ? "city-error" : undefined}
          aria-invalid={touched.city && !!errors.city}
        />
        {touched.city && errors.city && (
          <p id="city-error" className="text-destructive text-sm mt-1">{errors.city}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-group">
          <div className="flex items-center gap-2">
            <Label htmlFor="state" className="text-base">State</Label>
          </div>
          <Select
            value={formData.state}
            onValueChange={(value) => updateFormField("state", value)}
            onOpenChange={() => handleBlur("state")}
          >
            <SelectTrigger 
              id="state"
              className={`mt-1 ${touched.state && errors.state ? "border-destructive" : ""}`}
              aria-describedby={touched.state && errors.state ? "state-error" : undefined}
              aria-invalid={touched.state && !!errors.state}
            >
              <SelectValue placeholder="Select a state" />
            </SelectTrigger>
            <SelectContent>
              {US_STATES.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {touched.state && errors.state && (
            <p id="state-error" className="text-destructive text-sm mt-1">{errors.state}</p>
          )}
        </div>

        <div className="form-group">
          <div className="flex items-center gap-2">
            <Label htmlFor="postalCode" className="text-base">ZIP/Postal Code</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6" aria-label="Help for ZIP/Postal Code field">
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enter your 5-digit ZIP code or 9-digit ZIP+4 code (e.g., 12345 or 12345-6789).</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="postalCode"
            value={formData.postalCode}
            onChange={(e) => updateFormField("postalCode", e.target.value)}
            onBlur={() => handleBlur("postalCode")}
            className={`mt-1 ${touched.postalCode && errors.postalCode ? "border-destructive" : ""}`}
            aria-describedby={touched.postalCode && errors.postalCode ? "postalCode-error" : undefined}
            placeholder="12345"
            aria-invalid={touched.postalCode && !!errors.postalCode}
          />
          {touched.postalCode && errors.postalCode && (
            <p id="postalCode-error" className="text-destructive text-sm mt-1">{errors.postalCode}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={handleBack}>Back</Button>
        <Button onClick={handleContinue}>Continue to Service Request</Button>
      </div>
    </div>
  );
};

export default Step2Address;
