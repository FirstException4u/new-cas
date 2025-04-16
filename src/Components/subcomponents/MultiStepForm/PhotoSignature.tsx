import { useState } from 'react';
import { useFormStore } from '../../../GlobalStore/FormStore';
import { useStudentDataStore } from '../../../GlobalStore/FormStore';
import uploadFileAndGetDownloadURL from '../GetLinkForDocument';

export const PhotoSignatureForm = () => {
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [signatureFile, setSignatureFile] = useState<File | null>(null);
  const [formError, setFormError] = useState<string>("");
  const { ActiveFormStep, setActiveFormStep } = useFormStore();
  const { updateField } = useStudentDataStore();

  const handleFileChange = (
    setter: React.Dispatch<React.SetStateAction<File | null>>,
    maxSize: number
  ) => async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= maxSize * 1024) {
      setter(file);
      const filePath = `document/College-Admission-Data/${Date.now()}_${file.name}`;
      
      try {
        const fileUrl = await uploadFileAndGetDownloadURL(file, filePath);
        
        if (maxSize === 500) {
          updateField("photoUrl", fileUrl);
        } else {
          updateField("signUrl", fileUrl);
        }
      } catch (error) {
        console.error("File upload failed:", error);
        setFormError("File upload failed. Please try again.");
      }
    } else {
      setFormError(`File exceeds the maximum allowed size of ${maxSize} KB.`);
    }
  };
  
  const handleSaveNext = () => {
    if (!photoFile && !signatureFile) {
      setFormError("Please upload a valid Student and Signature Photo (Max size 500 KB).");
      return
    }
    if (!photoFile) {
      setFormError("Please upload a valid Student Photo (Max size 500 KB).");
      return;
    } else if (photoFile.size > 500 * 1024) {
      setFormError("Student Photo exceeds the maximum allowed size of 500 KB.");
      return;
    }

    if (!signatureFile) {
      setFormError("Please upload a valid Student Signature (Max size 300 KB).");
      return;
    } else if (signatureFile.size > 300 * 1024) {
      setFormError("Student Signature exceeds the maximum allowed size of 300 KB.");
      return;
    }

    setFormError("");
    setActiveFormStep(ActiveFormStep + 1);
  };

  return (
    <div className="container h-[70vh] mx-auto p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">
        Photo and Signature Details
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Student Photo Section */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Student Photo*
            </label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
              <input
                type="file"
                id="photo-upload"
                className="hidden"
                accept="image/jpeg, image/png"
                onChange={handleFileChange(setPhotoFile, 500)}
              />
              <label
                htmlFor="photo-upload"
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Upload Photo
              </label>
              <p className="mt-2 text-xs text-gray-500">
                Format: JPG, PNG (Max size 500 KB)
              </p>
              {photoFile && (
                <p className="mt-2 text-sm text-gray-600">{photoFile.name}</p>
              )}
            </div>
          </div>

          {/* Student Signature Section */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Student Signature*
            </label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
              <input
                type="file"
                id="signature-upload"
                className="hidden"
                accept="image/jpeg, image/png"
                onChange={handleFileChange(setSignatureFile, 300)}
              />
              <label
                htmlFor="signature-upload"
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Upload Sign
              </label>
              <p className="mt-2 text-xs text-gray-500">
                Format: JPG, PNG (Max size 300 KB)
              </p>
              {signatureFile && (
                <p className="mt-2 text-sm text-gray-600">{signatureFile.name}</p>
              )}
            </div>
          </div>
        </div>

        {/* Save & Next Button */}
        <div className="pt-6 flex justify-between">
          <button
            type="button"
            onClick={handleSaveNext}
            className="w-full md:w-auto font-bold px-6 py-2 bg-red-500 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Save & Next
          </button>
          <button
            type="button"
            onClick={() => { setActiveFormStep(ActiveFormStep - 1) }}
            className="w-full md:w-auto font-bold px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Previous
          </button>
        </div>
        {formError && (
            <p className="mt-2 text-sm text-red-600">{formError}</p>
         )}
      </div>
    </div>
  );
};