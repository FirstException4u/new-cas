import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DocumentUploadInterface } from "../../../Interfaces/DocumentUploadInterface";
import { useFormStore, useStudentDataStore } from "../../../GlobalStore/FormStore";
import uploadFileAndGetDownloadURL from "../GetLinkForDocument";
import { useStudentDashboardStore } from "../../../GlobalStore/StudentDashboardStore";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../config/firebase";
import { usePersonalDetailsStore } from "../../../GlobalStore/PersonalDetailsStore";
import { LoadingSpinner } from "../SideContent";

const FILE_SIZE_LIMIT = 200 * 1024;
const generateId = (): string => Math.random().toString(36).substr(2, 9);

interface DocumentSelectorProps {
  selected: string;
  onSelect: (value: string) => void;
  disabledOptions: string[];
  documentOptions: string[];
}

export const DocumentSelector: React.FC<DocumentSelectorProps> = ({ selected, onSelect, disabledOptions, documentOptions }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Name of Document</label>
    <select
      value={selected}
      onChange={(e) => onSelect(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded-md"
    >
      <option value="">Please select</option>
      {documentOptions.map((option: string) => (
        <option key={option} value={option} disabled={disabledOptions.includes(option)}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const FileUploader: React.FC<DocumentUploadInterface["FileUploaderProps"]> = ({
  uploadedFile,
  onFileChange,
  error,
  isDisabled = false,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Document</label>
    <div className="flex items-center gap-4">
      <input
        type="file"
        id="file-upload"
        className="hidden"
        accept="image/png, .pdf"
        onChange={onFileChange}
        disabled={isDisabled}
      />
      <label
        htmlFor="file-upload"
        className={`px-4 py-2 rounded-md ${
          isDisabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
        }`}
      >
        {isDisabled ? "✓ Uploaded" : "☐ Browse..."}
      </label>
      {uploadedFile && <span className="text-sm text-gray-600">{uploadedFile.name}</span>}
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const DocumentList: React.FC<DocumentUploadInterface["DocumentListProps"]> = ({ groups, onDelete }) => {
  if (groups.length === 0) return null;
  return (
    <div className="border-t border-gray-200 pt-4">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">Document List</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 text-sm font-medium text-gray-700">Document Option</th>
              <th className="text-left py-2 text-sm font-medium text-gray-700">File Format</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) =>
              group.files.map((file) => (
                <tr key={file.id} className="border-b border-gray-200">
                  <td className="py-3 text-sm text-gray-600">{group.option}</td>
                  <td className="py-3 text-sm text-gray-600">{file.format}</td>
                  <td className="py-3 flex gap-3">
                    <a
                      href={file.downloadLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Download
                    </a>
                    <button
                      onClick={() => onDelete(group.option)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Button: React.FC<DocumentUploadInterface["ButtonProps"]> = ({ onClick, children, className, disabled }) => (
  <button onClick={onClick} className={`px-6 py-2 rounded-md ${className}`} disabled={disabled}>
    {children}
  </button>
);

export const DocumentUploadForm: React.FC = () => {
  const { StudentData, updateField } = useStudentDataStore();
  const userEmail = useStudentDashboardStore()?.userEmail || localStorage.getItem("userEmail");
  const { Data } = usePersonalDetailsStore();
  const navigate = useNavigate();

  const { ActiveFormStep, setActiveFormStep, setUploadProgress } = useFormStore();
  const [selectedDoc, setSelectedDoc] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [documentGroups, setDocumentGroups] = useState<DocumentUploadInterface["DocumentGroup"][]>([]);
  const [fileError, setFileError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loader, setLoader] = useState(false);

  const documentOptions = [
    "AadharCard",
    "XII Marksheet",
    "X Marksheet",
    ...(Data.admissionCategory !== 'General' ? ["Category Certificate"] : []),
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError("");
    const file = e.target.files?.[0];
    if (file) {
      if (file.size <= FILE_SIZE_LIMIT) {
        setUploadedFile(file);
      } else {
        setFileError("File exceeds maximum allowed size of 200 KB.");
        setUploadedFile(null);
      }
    }
  };

  const handleAdd = () => {
    if (!uploadedFile) {
      setFileError("Please upload the file!");
      return;
    }
    if (!selectedDoc) {
      setFileError("Please select a document option!");
      return;
    }
    const fileExtension = uploadedFile.name.split(".").pop() || "";
    const newFile: DocumentUploadInterface["FileInfo"] = {
      id: generateId(),
      format: fileExtension.toUpperCase(),
      downloadLink: URL.createObjectURL(uploadedFile),
      file: uploadedFile,
    };
    setDocumentGroups((prevGroups) => {
      const existingGroup = prevGroups.find((group) => group.option === selectedDoc);
      if (existingGroup) {
        return prevGroups.map((group) =>
          group.option === selectedDoc ? { ...group, files: [newFile] } : group
        );
      } else {
        return [...prevGroups, { option: selectedDoc, files: [newFile] }];
      }
    });
    setSelectedDoc("");
    setUploadedFile(null);
    setFileError("");
  };

  const handleDelete = (option: string) => {
    setDocumentGroups((prevGroups) => prevGroups.filter((group) => group.option !== option));
  };

  const handleNext = async () => {
    if (documentGroups.length !== documentOptions.length) {
      setSubmitError("Please upload one file for each document type.");
      return;
    }
    setLoader(true);
    setIsSubmitting(true);
    setSubmitError("");

    // initialize progress
    setUploadProgress(0);

    try {
      const updatedStudentData = { ...StudentData };
      for (let i = 0; i < documentGroups.length; i++) {
        const group = documentGroups[i];
        const file = group.files[0].file;
        const filePath = `document/College-Admission-Data/${Date.now()}_${group.option}`;
        const downloadURL = await uploadFileAndGetDownloadURL(file, filePath);
        switch (group.option) {
          case "AadharCard":
            updatedStudentData.aadharUrl = downloadURL;
            break;
          case "Category Certificate":
            updatedStudentData.categoryCertificateUrl = downloadURL;
            break;
          case "X Marksheet":
            updatedStudentData.tenthCertificateUrl = downloadURL;
            break;
          case "XII Marksheet":
            updatedStudentData.twelvethCertificateUrl = downloadURL;
            break;
        }
        // update overall progress in global store
        const progress = Math.round(((i + 1) / documentGroups.length) * 100);
        setUploadProgress(progress);
      }

      const email = userEmail || localStorage.getItem("userEmail");
      if (email) {
        await setDoc(doc(db, "Users", email), updatedStudentData);
      } else {
        throw new Error("User email is not available.");
      }

      updateField("aadharUrl", updatedStudentData.aadharUrl);
      updateField("categoryCertificateUrl", updatedStudentData.categoryCertificateUrl);
      updateField("tenthCertificateUrl", updatedStudentData.tenthCertificateUrl);
      updateField("twelvethCertificateUrl", updatedStudentData.twelvethCertificateUrl);
      localStorage.setItem("formStatus", JSON.stringify({ userEmail, formFilled: true }));

      navigate("/student");
    } catch (error) {
      console.error("Upload error:", error);
      setSubmitError("Error uploading documents. Please try again.");
    } finally {
      setIsSubmitting(false);
      setLoader(false);
    }
  };

  const getDisabledOptions = () => documentGroups.map((group) => group.option);
  const isFileUploaderDisabled = (option: string) => documentGroups.some((group) => group.option === option);

  return (
    <div className="w-full mx-auto p-6 rounded-lg text-gray-500">
      <h1 className="font-[Kajiro] text-[5vw]">Document Upload</h1>
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <DocumentSelector
            selected={selectedDoc}
            onSelect={setSelectedDoc}
            disabledOptions={getDisabledOptions()}
            documentOptions={documentOptions}
          />
          <FileUploader
            uploadedFile={uploadedFile}
            onFileChange={handleFileChange}
            error={fileError}
            isDisabled={selectedDoc ? isFileUploaderDisabled(selectedDoc) : false}
          />
        </div>
        <div className="text-xs text-gray-500 space-y-1">
          <p>* Please select a valid file (e.g. PNG, JPEG, GIF, PDF)</p>
          <p>* Maximum size 200 KB</p>
        </div>
        <Button onClick={handleAdd} className="flex items-center gap-1 text-blue-600 hover:text-blue-800 bg-transparent">
          <span className="text-xl">+</span> Add
        </Button>
        <DocumentList groups={documentGroups} onDelete={handleDelete} />
        <div className="pt-6 flex justify-between items-center">
          <div>
            <Button
              onClick={handleNext}
              className="mt-4 bg-red-500 font-bold text-white py-2 px-4 rounded"
              disabled={isSubmitting}
            >
              SUBMIT
            </Button>
            {submitError && <p className="text-red-500 text-md font-bold mt-1">{submitError}</p>}
          </div>
          <div>
            <button
              type="button"
              onClick={() => setActiveFormStep(ActiveFormStep - 1)}
              className=" mt-4 bg-green-500 font-bold text-white py-2 px-4 rounded"
            >
              Previous
            </button>
          </div>
        </div>
      </div>
      {loader && <LoadingSpinner dataToShow="Submitting your application" />} 
    </div>
  );
};