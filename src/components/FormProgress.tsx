
import { useForm } from "@/contexts/FormContext";

const FormProgress = () => {
  const { currentStep, totalSteps } = useForm();
  
  const steps = [
    { name: "Personal", number: 1 },
    { name: "Address", number: 2 },
    { name: "Service", number: 3 },
    { name: "Documents", number: 4 }
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center w-full">
        {steps.map((step, index) => (
          <div key={step.name} className="relative flex flex-col items-center">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 z-10
              ${currentStep >= index 
                ? "bg-primary border-primary text-primary-foreground"
                : "bg-background border-muted text-muted-foreground"}`}
            >
              {step.number}
            </div>
            <div className="text-xs mt-2 font-medium text-center">
              {step.name}
            </div>
            {index < steps.length - 1 && (
              <div className={`absolute top-5 w-full h-0.5 left-1/2 
                ${currentStep > index ? "bg-primary" : "bg-muted"}`}
              ></div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 text-center text-sm text-muted-foreground">
        Step {currentStep + 1} of {totalSteps}
      </div>
    </div>
  );
};

export default FormProgress;
