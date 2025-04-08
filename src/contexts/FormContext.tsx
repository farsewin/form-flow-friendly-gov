import React, { createContext, useContext, useState, useEffect } from "react";

// Define our form data structure to match government form fields
type FormData = {
  // Personal Information
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  
  // Address Information
  address: string;
  city: string;
  state: string;
  postalCode: string;
  
  // Service Request
  serviceType: string;
  requestDetails: string;
  urgencyLevel: string;
  
  // Document Upload
  documents: Array<{id: string; name: string; file: File | null; preview: string}>;
  
  // Confirmation
  termsAccepted: boolean;
};

// Initial empty form data
const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  serviceType: "",
  requestDetails: "",
  urgencyLevel: "normal",
  documents: [],
  termsAccepted: false
};

// Form validation errors
type FormErrors = {
  [key in keyof FormData]?: string;
} & {
  documents?: Array<{id: string; error: string}>;
};

// Form context type
type FormContextType = {
  formData: FormData;
  updateFormField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  errors: FormErrors;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  saveProgress: () => void;
  clearForm: () => void;
  addDocument: (file: File) => void;
  removeDocument: (id: string) => void;
  totalSteps: number;
};

// Create the context
const FormContext = createContext<FormContextType | undefined>(undefined);

// FormProvider component
export const FormProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 4; // Total number of form steps

  // Load form data from localStorage on initial mount
  useEffect(() => {
    const savedFormData = localStorage.getItem("govFormData");
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        
        // We can't restore File objects from localStorage, so we need to handle documents specially
        // Keep the document metadata but set file to null
        if (parsedData.documents) {
          parsedData.documents = parsedData.documents.map((doc: any) => ({
            ...doc,
            file: null
          }));
        }
        
        setFormData(parsedData);
        
        // Also restore the form step if available
        const savedStep = localStorage.getItem("govFormStep");
        if (savedStep) {
          setCurrentStep(parseInt(savedStep, 10));
        }
      } catch (e) {
        console.error("Error restoring form data from localStorage:", e);
      }
    }
  }, []);

  // Update a single form field
  const updateFormField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Save current progress to localStorage
  const saveProgress = () => {
    try {
      // Convert File objects to storable format
      const storableFormData = {...formData};
      if (storableFormData.documents.length > 0) {
        storableFormData.documents = storableFormData.documents.map(doc => ({
          ...doc,
          // We can store the metadata, but not the file itself
          file: null
        }));
      }
      
      localStorage.setItem("govFormData", JSON.stringify(storableFormData));
      localStorage.setItem("govFormStep", currentStep.toString());
    } catch (e) {
      console.error("Error saving form data to localStorage:", e);
    }
  };

  // Clear form data
  const clearForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setCurrentStep(0);
    localStorage.removeItem("govFormData");
    localStorage.removeItem("govFormStep");
  };

  // Add document to the form
  const addDocument = (file: File) => {
    const id = `doc_${Date.now()}`;
    const preview = URL.createObjectURL(file);
    
    setFormData(prev => ({
      ...prev,
      documents: [
        ...prev.documents,
        { id, name: file.name, file, preview }
      ]
    }));
  };

  // Remove document from the form
  const removeDocument = (id: string) => {
    setFormData(prev => {
      // Find the document to revoke its object URL first
      const docToRemove = prev.documents.find(doc => doc.id === id);
      if (docToRemove?.preview) {
        URL.revokeObjectURL(docToRemove.preview);
      }
      
      return {
        ...prev,
        documents: prev.documents.filter(doc => doc.id !== id)
      };
    });
  };

  return (
    <FormContext.Provider value={{
      formData,
      updateFormField,
      errors,
      setErrors,
      currentStep,
      setCurrentStep,
      saveProgress,
      clearForm,
      addDocument,
      removeDocument,
      totalSteps
    }}>
      {children}
    </FormContext.Provider>
  );
};

// Hook to use the form context
export const useForm = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};
