
import { FormProvider } from "@/contexts/FormContext";
import FormProgress from "@/components/FormProgress";
import SaveProgressButton from "@/components/SaveProgressButton";
import Step1Personal from "@/components/FormSteps/Step1Personal";
import Step2Address from "@/components/FormSteps/Step2Address";
import Step3Service from "@/components/FormSteps/Step3Service";
import Step4Documents from "@/components/FormSteps/Step4Documents";
import { useForm } from "@/contexts/FormContext";

const FormStepRenderer = () => {
  const { currentStep } = useForm();

  switch (currentStep) {
    case 0:
      return <Step1Personal />;
    case 1:
      return <Step2Address />;
    case 2:
      return <Step3Service />;
    case 3:
      return <Step4Documents />;
    default:
      return <Step1Personal />;
  }
};

const FormContainer = () => {
  return (
    <FormProvider>
      <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
        <div className="flex justify-end mb-2">
          <SaveProgressButton />
        </div>
        <FormProgress />
        <FormStepRenderer />
      </div>
    </FormProvider>
  );
};

export default FormContainer;
