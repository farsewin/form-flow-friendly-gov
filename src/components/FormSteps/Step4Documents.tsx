import React, { useState, useRef } from "react";
import { useForm } from "@/contexts/FormContext";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertCircle, HelpCircle, Upload, X, FilePlus, FileCheck, Download, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf", 
  "image/jpeg", 
  "image/png", 
  "image/heic"
];

// Helper function to format file size
const formatFileSize = (bytes: number) => {
  if (bytes < 1024) {
    return bytes + ' bytes';
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(1) + ' KB';
  } else {
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }
};

const Step4Documents = () => {
  const { 
    formData, 
    updateFormField, 
    errors, 
    setErrors, 
    currentStep, 
    setCurrentStep,
    addDocument,
    removeDocument,
    clearForm
  } = useForm();
  
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState<string>("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    setUploadError(null);
    
    Array.from(files).forEach(file => {
      // Validate file type
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        setUploadError(`File type ${file.type} is not accepted. Please upload PDF, JPEG, PNG, or HEIC files.`);
        return;
      }
      
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        setUploadError(`File ${file.name} exceeds the maximum size of 10MB.`);
        return;
      }
      
      // Add document to form data
      addDocument(file);
      
      // Show success toast
      toast({
        title: "File uploaded successfully",
        description: `${file.name} (${formatFileSize(file.size)})`,
      });
    });
    
    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Check if documents are uploaded
    if (formData.documents.length === 0) {
      newErrors.documents = "At least one document must be uploaded";
      isValid = false;
    }

    // Check if terms are accepted
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms and conditions";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleBack = () => {
    setCurrentStep(2);
  };

  const handleSubmit = () => {
    setTouched({
      documents: true,
      termsAccepted: true
    });

    if (validateForm()) {
      setShowSubmitDialog(true);
    }
  };

  const processSubmission = () => {
    setIsSubmitting(true);
    
    // Simulate submission process
    setTimeout(() => {
      // Generate random confirmation number
      const randomConfirmation = Math.random().toString(36).substring(2, 8).toUpperCase();
      setConfirmationNumber(randomConfirmation);
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Clear form data from localStorage (keep in memory for the summary page)
      localStorage.removeItem("govFormData");
      localStorage.removeItem("govFormStep");
    }, 2000);
  };

  const generatePdf = () => {
    // In a real app, this would generate a PDF using a library like jsPDF
    // Here we'll fake it by creating a data object and downloading it as JSON
    const formDataForExport = {
      ...formData,
      documents: formData.documents.map(doc => ({
        name: doc.name,
        id: doc.id,
        // We can't include the actual file in JSON
        preview: null,
        file: null
      })),
      confirmationNumber,
      submissionDate: new Date().toISOString()
    };
    
    // Create a blob with the data
    const blob = new Blob([JSON.stringify(formDataForExport, null, 2)], { type: 'application/json' });
    
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    
    // Create a link element
    const link = document.createElement('a');
    link.href = url;
    link.download = `gov-service-application-${confirmationNumber}.json`;
    
    // Append the link to the document
    document.body.appendChild(link);
    
    // Trigger the download
    link.click();
    
    // Clean up the URL and link
    setTimeout(() => {
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    }, 100);
    
    toast({
      title: "Application downloaded",
      description: "Your application has been downloaded as a JSON file.",
    });
  };

  const startNewApplication = () => {
    clearForm();
    setIsSubmitted(false);
    setCurrentStep(0);
  };

  // Render the submission confirmation screen
  if (isSubmitted) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Application Submitted Successfully!</h2>
          <p className="text-xl mb-2">Thank you for your submission.</p>
          <p className="text-lg text-muted-foreground">
            Your confirmation number is:{" "}
            <span className="font-semibold text-foreground">{confirmationNumber}</span>
          </p>
        </div>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Application Summary</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Personal Information</h4>
                <p>Name: {formData.fullName}</p>
                <p>Email: {formData.email}</p>
                <p>Phone: {formData.phone}</p>
              </div>
              
              <div>
                <h4 className="font-medium">Service Request</h4>
                <p>Type: {formData.serviceType}</p>
                <p>Urgency: {formData.urgencyLevel}</p>
              </div>
              
              <div>
                <h4 className="font-medium">Submitted Documents</h4>
                <ul className="list-disc pl-5">
                  {formData.documents.map(doc => (
                    <li key={doc.id}>{doc.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-900">
          <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            Please save your confirmation number for future reference. You will need it if you contact us about your application.
          </AlertDescription>
        </Alert>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button onClick={generatePdf} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Application
          </Button>
          <Button variant="outline" onClick={startNewApplication}>
            Start New Application
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Document Upload</h2>
        <p className="text-muted-foreground">Please upload any required documents for your application.</p>
      </div>

      {Object.keys(errors).length > 0 && touched.documents && touched.termsAccepted && (
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
          <Label className="text-base">Required Documents</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6" aria-label="Help for Document Upload">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p>Upload all required documents. Accepted formats: PDF, JPEG, PNG, HEIC. Maximum size: 10MB per file.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Accordion type="single" collapsible className="mt-2">
          <AccordionItem value="required-docs">
            <AccordionTrigger>What documents do I need?</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 text-sm">
                <p>Depending on your service type, you may need to upload:</p>
                <ul className="list-disc pl-5">
                  <li>Government-issued ID (passport, driver's license)</li>
                  <li>Proof of address (utility bill, bank statement)</li>
                  <li>Birth certificate, social security card, or other identification documents</li>
                  <li>Supporting documents specific to your request</li>
                </ul>
                <p className="mt-2">All documents must be clearly legible and complete.</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div
          id="documents"
          className={`mt-4 border-2 border-dashed rounded-lg p-6 text-center 
            ${dragActive ? "border-primary bg-primary/5" : "border-muted"} 
            ${touched.documents && errors.documents ? "border-destructive" : ""}
            transition-colors relative`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          aria-describedby={touched.documents && errors.documents ? "documents-error" : undefined}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.heic"
            onChange={handleFileChange}
            className="hidden"
            aria-label="Upload documents"
          />
          
          <div className="flex flex-col items-center justify-center space-y-3">
            <Upload className="h-10 w-10 text-muted-foreground" />
            <div className="font-medium text-lg">Drag and drop files here</div>
            <div className="text-sm text-muted-foreground">or</div>
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="mt-2"
            >
              <FilePlus className="mr-2 h-4 w-4" />
              Browse files
            </Button>
            <div className="text-xs text-muted-foreground mt-2">
              Accepted formats: PDF, JPEG, PNG, HEIC
              <br />
              Max file size: 10MB
            </div>
          </div>
          
          {dragActive && (
            <div 
              className="absolute inset-0 flex items-center justify-center bg-primary/10 rounded-lg" 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              <div className="text-lg font-medium">Drop files to upload</div>
            </div>
          )}
        </div>

        {uploadError && (
          <Alert variant="destructive" className="mt-2">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Upload Error</AlertTitle>
            <AlertDescription>{uploadError}</AlertDescription>
          </Alert>
        )}

        {touched.documents && errors.documents && (
          <p id="documents-error" className="text-destructive text-sm mt-1">
            {errors.documents}
          </p>
        )}

        {/* Document preview section */}
        {formData.documents.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Uploaded Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.documents.map((doc) => (
                <div key={doc.id} className="flex items-center p-3 border rounded-md group relative">
                  <div className="shrink-0 mr-3">
                    <FileCheck className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {doc.file ? formatFileSize(doc.file.size) : 'Size unavailable'}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeDocument(doc.id)}
                    aria-label={`Remove document ${doc.name}`}
                  >
                    <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="form-group">
        <div className="flex items-start space-x-2 mt-6">
          <Checkbox
            id="termsAccepted"
            checked={formData.termsAccepted}
            onCheckedChange={(checked) => updateFormField("termsAccepted", checked === true)}
            aria-describedby={touched.termsAccepted && errors.termsAccepted ? "termsAccepted-error" : undefined}
            className={`${
              touched.termsAccepted && errors.termsAccepted ? "border-destructive" : ""
            }`}
          />
          <div className="grid gap-1.5 leading-none">
            <Label
              htmlFor="termsAccepted"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I certify that all information provided is accurate and complete
            </Label>
            <p className="text-xs text-muted-foreground">
              By checking this box, you confirm that all submitted information and documents are correct 
              and that you understand providing false information may result in penalties.
            </p>
            {touched.termsAccepted && errors.termsAccepted && (
              <p id="termsAccepted-error" className="text-destructive text-sm">
                {errors.termsAccepted}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={handleBack}>
          Back
        </Button>
        <Button onClick={handleSubmit}>
          Submit Application
        </Button>
      </div>

      {/* Submission confirmation dialog */}
      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Submission</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit your application? Please ensure all information is correct before proceeding.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                After submission, you will receive a confirmation number. Please save this number for future reference.
              </AlertDescription>
            </Alert>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSubmitDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={processSubmission}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Yes, Submit Application"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Step4Documents;
