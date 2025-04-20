import React, { useState } from 'react';
import { useStudentDataViewStore } from '../GlobalStore/StudentDataView';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const StudentDataView = () => {
  const { StudentData } = useStudentDataViewStore();
  const [rejectReason, setRejectReason] = useState('');
  const navigate = useNavigate();

  const renderValue = (value: any) => {
    if (value && typeof value === 'object' && value.hasOwnProperty('seconds')) {
      return new Date(value.seconds * 1000).toLocaleDateString();
    }
    return value != null ? value.toString() : 'N/A';
  };

  const renderDocument = (url: string | undefined, label: string) => {
    if (!url) {
      return (
        <tr>
          <td className="py-2 px-4 border font-semibold">{label}</td>
          <td className="py-2 px-4 border text-gray-400">None</td>
        </tr>
      );
    }

    const extension = url.split('.').pop()?.toLowerCase() || '';
    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension);

    return (
      <tr>
        <td className="py-2 px-4 border font-semibold">{label}</td>
        <td className="py-2 px-4 border">
          <a href={url} target="_blank" rel="noopener noreferrer" className="inline-block">
            {isImage ? (
              <img src={url} alt={label} className="w-20 h-20 object-cover rounded hover:opacity-80 transition" />
            ) : (
              <span className="text-blue-500 underline hover:text-blue-300">{label} (Click to View)</span>
            )}
          </a>
        </td>
      </tr>
    );
  };

  const handleAccepted = async () => {
    try {
      const adminRef = doc(db, 'admin', StudentData.email);
      await setDoc(adminRef, { ...StudentData, status: 'accepted', timestamp: new Date() });
      toast.success('Student Accepted!', { position: 'top-center' });
    } catch (error) {
      toast.error('Error while accepting student!');
      console.error(error);
    } finally {
      navigate('/admin');
    }
  };

  const handleRejected = async () => {
    const reason = prompt('Please provide a reason for rejection:');
    if (!reason?.trim()) {
      toast.warn('Rejection reason is required.');
      return;
    }

    setRejectReason(reason);
    try {
      await deleteDoc(doc(db, 'Users', StudentData.email));
      const adminRef = doc(db, 'admin', StudentData.email);
      await setDoc(adminRef, {
        ...StudentData,
        status: 'rejected',
        reason,
        timestamp: new Date(),
      });
      toast.error('Student Rejected.', { position: 'top-center' });
    } catch (error) {
      toast.error('Error while rejecting student!');
      console.error(error);
    } finally {
      navigate('/admin');
    }
  };

  if (!StudentData) {
    return <div className="text-white p-5">Loading student data...</div>;
  }

  const recordFields = ['boardUniversity', 'year', 'examName', 'percentage', 'totalMarks', 'obtainedMarks'];

  return (
    <div className="text-white p-5">
      <h1 className="text-2xl font-bold mb-4">Student Details</h1>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="py-2 px-4 border">Field</th>
            <th className="py-2 px-4 border">Details</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="py-2 px-4 border font-semibold">Title</td><td className="py-2 px-4 border">{renderValue(StudentData.title)}</td></tr>
          <tr><td className="py-2 px-4 border font-semibold">Email</td><td className="py-2 px-4 border">{renderValue(StudentData.email)}</td></tr>
          <tr><td className="py-2 px-4 border font-semibold">Name</td><td className="py-2 px-4 border">{`${renderValue(StudentData.firstName)} ${renderValue(StudentData.middleName)} ${renderValue(StudentData.lastName)}`}</td></tr>
          <tr><td className="py-2 px-4 border font-semibold">Mobile No</td><td className="py-2 px-4 border">{renderValue(StudentData.mobileNo)}</td></tr>
          <tr><td className="py-2 px-4 border font-semibold">Blood Group</td><td className="py-2 px-4 border">{renderValue(StudentData.bloodGroup)}</td></tr>
          <tr><td className="py-2 px-4 border font-semibold">Gender</td><td className="py-2 px-4 border">{renderValue(StudentData.gender)}</td></tr>
          <tr><td className="py-2 px-4 border font-semibold">Course</td><td className="py-2 px-4 border">{renderValue(StudentData.course)}</td></tr>
          <tr><td className="py-2 px-4 border font-semibold">Date of Birth</td><td className="py-2 px-4 border">{renderValue(StudentData.dob)}</td></tr>
          <tr><td className="py-2 px-4 border font-semibold">Mother Tongue</td><td className="py-2 px-4 border">{renderValue(StudentData.motherTongue)}</td></tr>
          <tr><td className="py-2 px-4 border font-semibold">Birth Place</td><td className="py-2 px-4 border">{renderValue(StudentData.birthPlace)}</td></tr>
          <tr><td className="py-2 px-4 border font-semibold">Admission Category</td><td className="py-2 px-4 border">{renderValue(StudentData.admissionCategory)}</td></tr>
          <tr><td className="py-2 px-4 border font-semibold">Father's Name</td><td className="py-2 px-4 border">{renderValue(StudentData.fatherName)}</td></tr>
          <tr><td className="py-2 px-4 border font-semibold">Mother's Name</td><td className="py-2 px-4 border">{renderValue(StudentData.motherName)}</td></tr>
          <tr><td className="py-2 px-4 border font-semibold">Occupation</td><td className="py-2 px-4 border">{renderValue(StudentData.occupation)}</td></tr>
          <tr><td className="py-2 px-4 border font-semibold">Family Income</td><td className="py-2 px-4 border">{renderValue(StudentData.familyIncome)}</td></tr>
          <tr><td className="py-2 px-4 border font-semibold">Aadhaar No</td><td className="py-2 px-4 border">{renderValue(StudentData.aadhaarNo)}</td></tr>

          {renderDocument(StudentData.photoUrl, 'Photo')}
          {renderDocument(StudentData.signUrl, 'Signature')}
          {renderDocument(StudentData.aadharUrl, 'Aadhaar Document')}
          {renderDocument(StudentData.tenthCertificateUrl, '10th Certificate')}
          {renderDocument(StudentData.twelvethCertificateUrl, '12th Certificate')}
          {renderDocument(StudentData.categoryCertificateUrl, 'Category Certificate')}

          <tr><td className="py-2 px-4 border font-semibold">Permanent Address</td><td className="py-2 px-4 border">{renderValue(StudentData.Permanentaddress)}</td></tr>
          <tr><td className="py-2 px-4 border font-semibold">Correspondence Address</td><td className="py-2 px-4 border">{renderValue(StudentData.CorrespondenceAddress)}</td></tr>

          {StudentData.records?.length > 0 ? (
            StudentData.records.map((record, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border font-semibold">Record {index + 1}</td>
                <td className="py-2 px-4 border">
                  <table className="w-full">
                    <tbody>
                      {recordFields.map((field) => (
                        <tr key={field}>
                          <td className="py-1 px-2 border font-semibold">{field}</td>
                          <td className="py-1 px-2 border">{renderValue(record[field])}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            ))
          ) : (
            <tr><td className="py-2 px-4 border" colSpan={2}>No records available</td></tr>
          )}
        </tbody>
      </table>

      <div className="w-full flex justify-evenly font-semibold mt-6">
        <button
          onClick={handleAccepted}
          className="bg-green-500 text-white py-2 px-6 rounded shadow-lg shadow-black"
        >
          Accept
        </button>
        <button
          onClick={handleRejected}
          className="bg-red-500 text-white py-2 px-6 rounded shadow-lg shadow-black"
        >
          Reject
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default StudentDataView;
