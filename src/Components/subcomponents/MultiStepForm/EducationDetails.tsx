import React, { useState, useEffect } from "react";
import { useFormStore, useStudentDataStore } from "../../../GlobalStore/FormStore";
import { InputFieldProps, SelectFieldProps, RecordsTableProps, EducationRecord } from "../../../Interfaces/EducationDetailsInterfaces";

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  value,
  onChange,
  readOnly = false,
  required = false,
}) => (
  <div className="space-y-1">
    <label className="block font-medium">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      className="w-full p-2 border rounded-md"
      value={value}
      onChange={onChange}
      readOnly={readOnly}
    />
  </div>
);

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  options,
  required = false,
}) => (
  <div>
    <label className="block font-medium">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select className="w-full p-2 border rounded-md" value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const RecordsTable: React.FC<RecordsTableProps> = ({ records }) => {
  if (records.length === 0) return null;
  return (
    <div className="mt-8">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2">Exam Name</th>
            <th className="border border-gray-200 p-2">Board/University</th>
            <th className="border border-gray-200 p-2">Year of Passing</th>
            <th className="border border-gray-200 p-2">Obtained Marks</th>
            <th className="border border-gray-200 p-2">Total Marks</th>
            <th className="border border-gray-200 p-2">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td className="border border-gray-200 p-2 text-center">{record.examName}</td>
              <td className="border border-gray-200 p-2 text-center">{record.boardUniversity}</td>
              <td className="border border-gray-200 p-2 text-center">{record.year}</td>
              <td className="border border-gray-200 p-2 text-center">{record.obtainedMarks}</td>
              <td className="border border-gray-200 p-2 text-center">{record.totalMarks}</td>
              <td className="border border-gray-200 p-2 text-center">{record.percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const EducationDetails: React.FC = () => {
  const examOptions: string[] = ["HSC", "SSC"];

  const [examName, setExamName] = useState<string>(examOptions[0]);
  const [boardUniversity] = useState<string>(
    "Maharashtra State Board of Secondary and Higher Secondary Education"
  );
  const [year, setYear] = useState<string>("2022");
  const [obtainedMarks, setObtainedMarks] = useState<string>("50");
  const [totalMarks, setTotalMarks] = useState<string>("800");
  const [records, setRecords] = useState<EducationRecord[]>([]);

  const { ActiveFormStep, setActiveFormStep } = useFormStore();
  const { updateField } = useStudentDataStore();

  const computedPercentage =
    totalMarks && obtainedMarks
      ? ((parseFloat(obtainedMarks) / parseFloat(totalMarks)) * 100).toFixed(2)
      : "0.00";

  const availableExamOptions = examOptions.filter(
    (option) => !records.some((record) => record.examName === option)
  );

  useEffect(() => {
    if (availableExamOptions.length && !availableExamOptions.includes(examName)) {
      setExamName(availableExamOptions[0]);
    }
  }, [availableExamOptions, examName]);

  const handleAdd = () => {
    if (availableExamOptions.length === 0) return;

    const newRecord: EducationRecord = {
      examName,
      boardUniversity,
      year,
      obtainedMarks,
      totalMarks,
      percentage: computedPercentage,
    };

    setRecords((prev) => [...prev, newRecord]);
  };

  const handleNext = () => {
    if (records.length < 2) {
      alert("Please add at least two education entries before proceeding");
      return;
    }
    updateField("records", records);
    setActiveFormStep(ActiveFormStep + 1);
  };

  return (
    <div className="mx-auto p-6 text-gray-600">
      <h2 className="text-[5vw] mb-2 font-[Kajiro]">Education Details</h2>

      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        <SelectField
          label="Exam Name"
          required
          value={examName}
          onChange={(e) => setExamName(e.target.value)}
          options={availableExamOptions}
        />

        {/* Board/University */}
        <div className="col-span-2">
          <InputField
            label="Board/University"
            value={boardUniversity}
            readOnly
            required
            onChange={() => { }}
          />
        </div>

        {/* Year of Passing */}
        <InputField
          label="Year of Passing"
          type="number"
          value={year}
          required
          onChange={(e) => setYear(e.target.value)}
        />

        {/* Obtained Marks */}
        <InputField
          label="Obtained Marks"
          type="number"
          value={obtainedMarks}
          required
          onChange={(e) => setObtainedMarks(e.target.value)}
        />

        {/* Total Marks */}
        <InputField
          label="Total Marks"
          type="number"
          value={totalMarks}
          required
          onChange={(e) => setTotalMarks(e.target.value)}
        />

        {/* Computed Percentage */}
        <InputField
          label="Percentage"
          value={computedPercentage}
          readOnly
          required
          onChange={() => { }}
        />
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={handleAdd}
          disabled={availableExamOptions.length === 0}
          className={`px-4 py-2 border rounded-md ${availableExamOptions.length === 0 ? "cursor-not-allowed" : "hover:bg-gray-50"
            }`}
        >
          Add
        </button>
        <div className="flex gap-x-5">
          <button
            onClick={handleNext}
            className={`bg-red-500 font-bold text-white px-6 py-2 rounded-md ${records.length < 2 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            disabled={records.length < 2}
          >
            Save & Next
          </button>
          <button
            onClick={()=>{setActiveFormStep(ActiveFormStep-1)}}
            className="bg-green-500 font-bold text-white px-6 py-2 rounded-md"
          >
            Previous
          </button>
        </div>
      </div>

      <RecordsTable records={records} />
    </div>
  );
};

export default EducationDetails;