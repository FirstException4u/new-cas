import React from "react";
import PersonalDetails from "./subcomponents/MultiStepForm/PersonalDetails";
import AddressDetails from "./subcomponents/MultiStepForm/AddressDetails";
import EducationDetails from "./subcomponents/MultiStepForm/EducationDetails";
import { PhotoSignatureForm } from "./subcomponents/MultiStepForm/PhotoSignature";
import CourseSelection from "./subcomponents/MultiStepForm/CourseSelection";
import { DocumentUploadForm } from "./subcomponents/MultiStepForm/DocumentUpload";
import { useFormStore } from "../GlobalStore/FormStore";
import { motion } from "motion/react";

const Form: React.FC = () => {
    const steps = ["Personal", "Address", "Education", "Photo & Sign", "Course", "Documents"];
    const stepscomponents = [
        <PersonalDetails />,
        <AddressDetails />,
        <EducationDetails />,
        <PhotoSignatureForm />,
        <CourseSelection />,
        <DocumentUploadForm />,
    ];
    const { ActiveFormStep } = useFormStore();
    return (
        <div className="min-h-screen w-full p-5">
            <div className="min-h-[92vh] w-full bg-red-500 rounded-3xl p-5 border-4 border-yellow-400">
                <div className="flex items-center justify-evenly">
                    {steps.map((step, index) => (
                      <motion.h1
                      key={index}
                      className={`relative z-[999] font-[Kajiro] bg-red-600 text-white px-6 rounded-2xl text-[4vw] font-thin group overflow-hidden after:-z-[1]
                      after:content-[''] after:absolute ${ index < ActiveFormStep ? 'after:top-0' : 'after:top-full'} ${ index < ActiveFormStep ? 'after:rounded-[0%]' : 'after:rounded-[50%]'} after:left-0 after:w-full after:h-full after:bg-black after:transition-all duration-700`}
                      style={{ color: index < ActiveFormStep ? "rgba(0,255,0)" : "",  }}
                    >
                      {step}
                    </motion.h1>
                    
                    ))}
                </div>
                <div className="w-full min-h-[70vh] bg-white rounded-3xl mt-4">
                    {stepscomponents[ActiveFormStep]}
                </div>
            </div>
        </div>
    );
};

export default Form;
