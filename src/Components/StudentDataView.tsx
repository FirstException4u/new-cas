import React from 'react';
import { useStudentDataViewStore } from '../GlobalStore/StudentDataView';

const StudentDataView = () => {
  const { StudentData } = useStudentDataViewStore();
  console.log(StudentData);

  const renderValue = (value: any) => {
    if (value && typeof value === 'object' && value.hasOwnProperty('seconds') && value.hasOwnProperty('nanoseconds')) {
      // If the value is a timestamp object, convert it to a readable date string
      return new Date(value.seconds * 1000).toLocaleDateString(); // Format it as a readable date
    }
    return value != null ? value.toString() : 'N/A'; // Ensure all values are strings, return 'N/A' if null or undefined
  };

  const handleClick = () => {
    alert('Add button clicked!');
  };

  if (!StudentData) {
    return <div className="text-white p-5">Loading student data...</div>; // Handle the case when studentData is not available
  }

  // Define the order of the fields for records
  const recordFields = [
    'boardUniversity',
    'year',
    'examName',
    'percentage',
    'totalMarks',
    'obtainedMarks',
  ];

  return (
    <div className="text-white p-5">
      <h1 className="text-2xl font-bold mb-4">Student Details</h1>

      {/* Table to display the student data */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="py-2 px-4 border">Field</th>
            <th className="py-2 px-4 border">Details</th>
          </tr>
        </thead>
        <tbody>
          {/* Title */}
          <tr>
            <td className="py-2 px-4 border font-semibold">Title</td>
            <td className="py-2 px-4 border">{renderValue(StudentData.title)}</td>
          </tr>

          {/* Personal Information */}
          <tr>
            <td className="py-2 px-4 border font-semibold">Email</td>
            <td className="py-2 px-4 border">{renderValue(StudentData.email)}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border font-semibold">Name</td>
            <td className="py-2 px-4 border">{`${renderValue(StudentData.firstName)} ${renderValue(StudentData.middleName)} ${renderValue(StudentData.lastName)}`}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border font-semibold">Mobile No</td>
            <td className="py-2 px-4 border">{renderValue(StudentData.mobileNo)}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border font-semibold">Blood Group</td>
            <td className="py-2 px-4 border">{renderValue(StudentData.bloodGroup)}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border font-semibold">Gender</td>
            <td className="py-2 px-4 border">{renderValue(StudentData.gender)}</td>
          </tr>

          {/* Academic Information */}
          <tr>
            <td className="py-2 px-4 border font-semibold">Course</td>
            <td className="py-2 px-4 border">{renderValue(StudentData.course)}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border font-semibold">Date of Birth</td>
            <td className="py-2 px-4 border">{renderValue(StudentData.dob)}</td>
          </tr>

          {/* Language and Location Information */}
          <tr>
            <td className="py-2 px-4 border font-semibold">Mother Tongue</td>
            <td className="py-2 px-4 border">{renderValue(StudentData.motherTongue)}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border font-semibold">Birth Place</td>
            <td className="py-2 px-4 border">{renderValue(StudentData.birthPlace)}</td>
          </tr>

          {/* Family Information */}
          <tr>
            <td className="py-2 px-4 border font-semibold">Admission Category</td>
            <td className="py-2 px-4 border">{renderValue(StudentData.admissionCategory)}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border font-semibold">Father's Name</td>
            <td className="py-2 px-4 border">{renderValue(StudentData.fatherName)}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border font-semibold">Mother's Name</td>
            <td className="py-2 px-4 border">{renderValue(StudentData.motherName)}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border font-semibold">Occupation</td>
            <td className="py-2 px-4 border">{renderValue(StudentData.occupation)}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border font-semibold">Family Income</td>
            <td className="py-2 px-4 border">{renderValue(StudentData.familyIncome)}</td>
          </tr>

          {/* ID and Document Information */}
          <tr>
            <td className="py-2 px-4 border font-semibold">Aadhaar No</td>
            <td className="py-2 px-4 border">{renderValue(StudentData.aadhaarNo)}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border font-semibold">Photo URL</td>
            <td className="py-2 px-4 border">
              <a href={StudentData.photoUrl} target="_blank" rel="noopener noreferrer">
                <img src={StudentData.photoUrl} alt="Photo" className="w-20 h-20 rounded" />
              </a>
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border font-semibold">Signature URL</td>
            <td className="py-2 px-4 border">
              <a href={StudentData.signUrl} target="_blank" rel="noopener noreferrer">
                <img src={StudentData.signUrl} alt="Signature" className="w-20 h-20 rounded" />
              </a>
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border font-semibold">Aadhaar URL</td>
            <td className="py-2 px-4 border">
              <a href={StudentData.aadharUrl} target="_blank" rel="noopener noreferrer">
                <img src={StudentData.aadharUrl} alt="Aadhar Document" className="w-20 h-20 rounded" />
              </a>
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border font-semibold">10th Certificate URL</td>
            <td className="py-2 px-4 border">
              <a href={StudentData.tenthCertificateUrl} target="_blank" rel="noopener noreferrer">
                <img src={StudentData.tenthCertificateUrl} alt="10th Certificate" className="w-20 h-20 rounded" />
              </a>
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border font-semibold">12th Certificate URL</td>
            <td className="py-2 px-4 border">
              <a href={StudentData.twelvethCertificateUrl} target="_blank" rel="noopener noreferrer">
                <img src={StudentData.twelvethCertificateUrl} alt="12th Certificate" className="w-20 h-20 rounded" />
              </a>
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border font-semibold">Category Certificate URL</td>
            <td className="py-2 px-4 border">
              <a href={StudentData.categoryCertificateUrl} target="_blank" rel="noopener noreferrer">
                <img src={StudentData.categoryCertificateUrl} alt="Category Certificate" className="w-20 h-20 rounded" />
              </a>
            </td>
          </tr>

          {/* Address Information */}
          <tr>
            <td className="py-2 px-4 border font-semibold">Permanent Address</td>
            <td className="py-2 px-4 border">{renderValue(StudentData.Permanentaddress)}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border font-semibold">Correspondence Address</td>
            <td className="py-2 px-4 border">{renderValue(StudentData.CorrespondenceAddress)}</td>
          </tr>

          {/* Additional Records */}
          {StudentData.records && StudentData.records.length > 0 ? (
            StudentData.records.map((record, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border font-semibold">Record {index + 1}</td>
                <td className="py-2 px-4 border">
                  <table className="w-full">
                    <tbody>
                      {recordFields.map((field) => (
                        <tr key={field}>
                          <td className="py-2 px-4 border font-semibold">{field}</td>
                          <td className="py-2 px-4 border">{renderValue(record[field])}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-2 px-4 border" colSpan={2}>No records available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Button */}
      <button
        onClick={handleClick}
        className="mt-4 bg-blue-500 text-white py-2 px-6 rounded"
      >
        Add Student
      </button>
    </div>
  );
};

export default StudentDataView;
