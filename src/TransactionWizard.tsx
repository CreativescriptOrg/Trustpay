import React, { useRef, useState } from "react";
import { Button, Steps } from "antd-mobile";
import {
  PaymentMethodSelection,
  PaymentMethodSelectionRef,
} from "./payment-method-selection/ui/components/PaymentMethodSelection";

// Sample steps for a complete transaction flow
const steps = [
  { title: "Transaction Type" },
  { title: "Product Details" },
  { title: "Payment Method" },
  { title: "Confirmation" },
];

const TransactionWizard: React.FC = () => {
  // Current step state
  const [currentStep, setCurrentStep] = useState(2); // Starting at Payment Method step for demo
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  // Refs for step components
  const paymentMethodRef = useRef<PaymentMethodSelectionRef>(null);

  // Handle moving to next step
  const handleNext = () => {
    setDirection("forward");
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  // Handle moving to previous step
  const handleBack = () => {
    setDirection("backward");
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  // Handle primary action button click based on current step
  const handlePrimaryAction = async () => {
    if (currentStep === 2) {
      // Payment Method step
      if (paymentMethodRef.current) {
        const success = await paymentMethodRef.current.submitPaymentMethod();
        if (success) {
          handleNext();
        }
      }
    } else {
      handleNext();
    }
  };

  // Configure bottom action bar based on current step
  const getBottomActionProps = () => {
    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === steps.length - 1;

    return {
      primaryLabel: isLastStep ? "Complete" : "Next",
      onPrimary: handlePrimaryAction,
      secondaryLabel: isFirstStep ? undefined : "Back",
      onSecondary: isFirstStep ? undefined : handleBack,
      loading: false, // Could be connected to loading state
    };
  };

  // Get current step component
  const renderStepContent = () => {
    switch (currentStep) {
      case 2: // Payment Method step
        return (
          <PaymentMethodSelection ref={paymentMethodRef} onNext={handleNext} />
        );
      default:
        return (
          <div className="p-4 text-center">
            <p className="text-lg">Step {currentStep + 1} Content</p>
            <p className="text-gray-500">
              This is a placeholder for step {currentStep + 1}.
            </p>
          </div>
        );
    }
  };

  const actionProps = getBottomActionProps();

  return (
    <div className="transaction-wizard flex flex-col h-screen">
      {/* Header */}
      <div className="header bg-white shadow-sm p-4">
        <h1 className="text-xl font-bold text-center">TrustPay</h1>
        <Steps
          current={currentStep}
          items={steps.map((step) => ({ title: step.title }))}
        />
      </div>

      {/* Content */}
      <div className="content flex-grow overflow-auto bg-gray-50">
        {renderStepContent()}
      </div>

      {/* Bottom Action Bar */}
      <div className="bottom-action-bar bg-white p-4 shadow-inner flex space-x-4">
        {actionProps.secondaryLabel && (
          <Button
            color="default"
            fill="outline"
            className="flex-1"
            onClick={actionProps.onSecondary}
          >
            {actionProps.secondaryLabel}
          </Button>
        )}
        <Button
          color="primary"
          fill="solid"
          className={actionProps.secondaryLabel ? "flex-1" : "w-full"}
          onClick={actionProps.onPrimary}
          loading={actionProps.loading}
        >
          {actionProps.primaryLabel}
        </Button>
      </div>
    </div>
  );
};

export default TransactionWizard;
