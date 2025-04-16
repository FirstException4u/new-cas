import React, { useState } from "react";
import { useFormStore, useStudentDataStore } from "../../../GlobalStore/FormStore";

export default function CourseSelection(): JSX.Element {
  const [selectedCourse, setSelectedCourse] = useState<string>("FYBSCIT");
  const {ActiveFormStep,setActiveFormStep} = useFormStore();
  const {updateField} = useStudentDataStore();
  const handleCourseChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedCourse(event.target.value);
  };
  const handleNext = () => {
    updateField("course",selectedCourse)
    setActiveFormStep(ActiveFormStep+1);
  };


  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="bg-gray-50  rounded-lg shadow-md p-8 max-w-md w-full">
        <div className="space-y-6">
          <h1 className="text-2xl font-semibold text-gray-900">Course Selection</h1>
          
          <p className="text-sm text-gray-500">
            Please let the page load completely, before proceeding with course selection.
          </p>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Course</label>
            <select 
              value={selectedCourse} 
              onChange={handleCourseChange} 
              className="bg-gray-100 px-3 py-2 rounded font-mono text-gray-900 w-full"
            >
              <option value="FYBSCIT">FYBSCIT</option>
              <option value="SYBSCIT">SYBSCIT</option>
              <option value="TYBSCIT">TYBSCIT</option>
        
            </select>
          </div>

          <div className="border-t border-gray-200 pt-6 flex justify-between">
            <button 
              onClick={handleNext} 
              className="bg-red-500  text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Save & Next
            </button>
            <button 
              onClick={()=>{setActiveFormStep(ActiveFormStep-1)}} 
              className="bg-green-500  text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Previous
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
