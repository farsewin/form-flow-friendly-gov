
import { useState } from "react";
import { useForm } from "@/contexts/FormContext";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  RadioGroup, 
  RadioGroupItem 
} from "@/components/ui/radio-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

// Service Types
const SERVICE_TYPES = [
  "Passport Application",
  "Driver's License Renewal",
  "Social Security Card",
  "Birth Certificate Request",
  "Marriage Certificate",
  "Property Deed",
  "Business License",
  "Tax Document Request",
  "Voter Registration",
  "Other Government Document"
];

const Step3Service = () => {
  const { formData, updateFormField, errors, setErrors, setCurrentStep } = useForm();
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateFields = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Service Type validation
    if (!formData.serviceType) {
      newErrors.serviceType = "Service type is required";
      isValid = false;
    }

    // Request Details validation
    if (!formData.requestDetails.trim()) {
      newErrors.requestDetails = "Request details are required";
      isValid = false;
    } else if (formData.requestDetails.trim().length < 10) {
      newErrors.requestDetails = "Please provide more details (at least 10 characters)";
      isValid = false;
    }

    // Urgency Level validation
    if (!formData.urgencyLevel) {
      newErrors.urgencyLevel = "Urgency level is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleContinue = () => {
    const allTouched = {
      serviceType: true,
      requestDetails: true,
      urgencyLevel: true
    };
    setTouched(allTouched);
    
    if (validateFields()) {
      setCurrentStep(3);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Service Request</h2>
        <p className="text-muted-foreground">Please tell us about the service you're requesting.</p>
      </div>

      {Object.keys(errors).length > 0 && touched.serviceType && touched.requestDetails && touched.urgencyLevel && (
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
          <Label htmlFor="serviceType" className="text-base">Type of Service</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6" aria-label="Help for Service Type field">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Select the government service you're applying for.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Select
          value={formData.serviceType}
          onValueChange={(value) => updateFormField("serviceType", value)}
          onOpenChange={() => handleBlur("serviceType")}
        >
          <SelectTrigger 
            id="serviceType"
            className={`mt-1 ${touched.serviceType && errors.serviceType ? "border-destructive" : ""}`}
            aria-describedby={touched.serviceType && errors.serviceType ? "serviceType-error" : undefined}
            aria-invalid={touched.serviceType && !!errors.serviceType}
          >
            <SelectValue placeholder="Select service type" />
          </SelectTrigger>
          <SelectContent>
            {SERVICE_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {touched.serviceType && errors.serviceType && (
          <p id="serviceType-error" className="text-destructive text-sm mt-1">{errors.serviceType}</p>
        )}
      </div>

      <div className="form-group">
        <div className="flex items-center gap-2">
          <Label htmlFor="requestDetails" className="text-base">Request Details</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6" aria-label="Help for Request Details field">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Please provide specific details about your request, including any relevant information that may help process your application.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Textarea
          id="requestDetails"
          value={formData.requestDetails}
          onChange={(e) => updateFormField("requestDetails", e.target.value)}
          onBlur={() => handleBlur("requestDetails")}
          className={`mt-1 min-h-[120px] ${touched.requestDetails && errors.requestDetails ? "border-destructive" : ""}`}
          aria-describedby={touched.requestDetails && errors.requestDetails ? "requestDetails-error" : undefined}
          placeholder="Please describe your request in detail..."
          aria-invalid={touched.requestDetails && !!errors.requestDetails}
        />
        {touched.requestDetails && errors.requestDetails && (
          <p id="requestDetails-error" className="text-destructive text-sm mt-1">{errors.requestDetails}</p>
        )}
        <p className="text-muted-foreground text-sm mt-2">
          Character count: {formData.requestDetails.length} / 500 (minimum 10)
        </p>
      </div>

      <div className="form-group">
        <div className="flex items-center gap-2 mb-2">
          <Label className="text-base">Urgency Level</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6" aria-label="Help for Urgency Level field">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Indicate how urgent your request is. Standard processing times apply to all requests.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <RadioGroup
          value={formData.urgencyLevel}
          onValueChange={(value) => updateFormField("urgencyLevel", value)}
          className={`mt-1 ${touched.urgencyLevel && errors.urgencyLevel ? "border-destructive p-2 rounded-md" : ""}`}
          aria-describedby={touched.urgencyLevel && errors.urgencyLevel ? "urgencyLevel-error" : undefined}
          aria-invalid={touched.urgencyLevel && !!errors.urgencyLevel}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="standard" id="standard" />
            <Label htmlFor="standard" className="cursor-pointer">Standard (4-6 weeks)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="expedited" id="expedited" />
            <Label htmlFor="expedited" className="cursor-pointer">Expedited (2-3 weeks)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="urgent" id="urgent" />
            <Label htmlFor="urgent" className="cursor-pointer">Urgent (5-7 business days)</Label>
          </div>
        </RadioGroup>
        {touched.urgencyLevel && errors.urgencyLevel && (
          <p id="urgencyLevel-error" className="text-destructive text-sm mt-1">{errors.urgencyLevel}</p>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={handleBack}>Back</Button>
        <Button onClick={handleContinue}>Continue to Document Upload</Button>
      </div>
    </div>
  );
};

export default Step3Service;
