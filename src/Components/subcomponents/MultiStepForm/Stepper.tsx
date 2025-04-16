import React from "react";

interface StepperProps {
  step: number;
}

const Stepper: React.FC<StepperProps> = ({ step }) => {
  const steps = ["Personal", "Address", "Photo & Sign", "Course", "Documents"];

  return (
    <div className="min-h-[90vh] w-full bg-red-500 rounded-3xl flex items-start justify-evenly p-5 border-4 border-yellow-400">
         {steps[step]}
    </div>
  );
};

export default Stepper;
