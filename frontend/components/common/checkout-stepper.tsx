// frontend/components/common/checkout-stepper.tsx
import React from 'react';

interface CheckoutStepperProps {
  currentStep: number;
  steps: string[];
}

export function CheckoutStepper({ currentStep, steps }: CheckoutStepperProps) {
  return (
    <div className="flex justify-between items-center w-full mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${
              index === currentStep
                ? 'bg-primary text-primary-foreground'
                : index < currentStep
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-muted text-muted-foreground'
            }`}>
              {index + 1}
            </div>
            <span className={`text-sm mt-2 ${
              index === currentStep ? 'text-primary' : 'text-muted-foreground'
            }`}>
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={`flex-1 h-1 mx-2 ${
              index < currentStep ? 'bg-accent' : 'bg-muted'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
