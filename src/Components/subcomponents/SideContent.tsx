// SideContent.tsx
import { useState, useEffect } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react"; // Correct import for motion
import { useStudentDashboardStore } from "../../GlobalStore/StudentDashboardStore";
import { StudentDataViewInterface } from "../../GlobalStore/StudentDataView";
import { useStudentDataViewStore } from "../../GlobalStore/StudentDataView";
import { useFormStore } from "../../GlobalStore/FormStore";

// Helper to format the date
const formatDate = (timestamp: any) => {
  if (!timestamp) return "N/A";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp.seconds * 1000);
  return date.toLocaleDateString();
};

// Custom hook to fetch student data
const useFetchStudentsData = () => {
  const [studentsData, setStudentsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchStudentsData = async () => {
      setIsLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "Users"));
        const students: any[] = [];
        querySnapshot.forEach((doc) => {
          const studentData = doc.data();
          if (!("status" in studentData)) {
            students.push({
              firstName: studentData.firstName || "N/A",
              lastName: studentData.lastName || "N/A",
              dob: formatDate(studentData.dob),
              email: studentData.email || "N/A",
              gender: studentData.gender || "N/A",
            });
          }
        });
        setStudentsData(students);
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudentsData();
  }, []);

  return { studentsData, isLoading };
};

// Loading spinner component
export const LoadingSpinner: React.FC<{ dataToShow: string }> = ({ dataToShow }) => {
  const { uploadProgress } = useFormStore();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center justify-center">
        <svg className="animate-spin h-10 w-10 text-white mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
        <p className="text-white text-2xl font-[Header] tracking-wide">
          {dataToShow}
        </p>
        <h1 className="font-bold text-amber-200">{uploadProgress !== -1 && uploadProgress !== 100 && ` ${uploadProgress}% completed`}</h1>
      </div>
    </div>
  )
}


// Header component
const Header = () => {
  const { userEmail } = useStudentDashboardStore();
  const email = userEmail || localStorage.getItem("userEmail") || "";
  const navigate = useNavigate();
  return (
    <div className="w-full font-[Kajiro] text-[8vw] max-sm:text-[16vw] text-white flex justify-between items-center">
      <h1>Welcome {email.split("@")[0]}</h1>
      <h1 className="text-[4vw] font-[Header] cursor-pointer" onClick={() => { navigate("/") }}>Log Out</h1>
    </div>
  );
}

// Admin section component
const AdminSection = ({ studentsData }: { studentsData: any[] }) => (
  <div className="min-h-[50vh] w-full bg-white p-5 mb-5 rounded-3xl shadow-black shadow-2xl">
    {studentsData.length > 0 ?
      <>
        <div className="w-full text-center relative">
          <h1 className="font-[Header] text-[4vw] text-center">Student Page</h1>
          <img src="/MenuAction.svg" className="h-20 max-sm:h-10 absolute top-0 right-0" />
        </div>
        <StudentTable studentsData={studentsData} />
      </>
      :
      <div className="w-full h-[50vh] flex items-center justify-center">
        <h1 className="font-[Header] text-5xl text-gray-600 ">No Data.</h1>
      </div>
    }
  </div>
);

const StudentTable = ({ studentsData }: { studentsData: any[] }) => {

  const navigate = useNavigate();
  const { updateField } = useStudentDataViewStore();

  const handleRowClick = async (studentEmail: string) => {
    try {

      const studentDocRef = doc(db, "Users", studentEmail);
      const studentDoc = await getDoc(studentDocRef);

      if (studentDoc.exists()) {

        const studentData = studentDoc.data();

        if (studentData) {
          console.log(studentData);

          Object.keys(studentData).forEach((key) => {
            const field = key as keyof StudentDataViewInterface;
            const value = studentData[field];
            updateField(field, value);
          });
          console.log(studentData)


        }


      } else {
        console.log('No student data found');
      }
      navigate('/StudentView');
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };
  return (
    <div>
      <table className="w-full text-[2vw] font-[Header] border-separate border-spacing-y-[10px]">
        <thead>
          <tr className="bg-black text-white">
            <th className="rounded-tl-3xl rounded-bl-3xl pt-2 border-r-2">FirstName</th>
            <th className="pt-2 border-r-2">LastName</th>
            <th className="pt-2 border-r-2">Date-Of-Birth</th>
            <th className="pt-2 border-r-2">Email-Address</th>
            <th className="rounded-tr-3xl rounded-br-3xl pt-2">Gender</th>
          </tr>
        </thead>
        <tbody>
          {studentsData.map((curdata, index) => (
            <tr
              key={index}
              className="text-center text-white text-[2vw]"
              style={{
                backgroundColor: `rgba(0,0,0,${1 - (index + 1) * 0.1})`,
                marginBottom: "10px",
              }}
              onClick={() => handleRowClick(curdata.email)}
            >
              <td className="rounded-tl-3xl rounded-bl-3xl pt-2" style={{ borderRight: `2px solid rgba(255,255,255,${1 - (index + 1) * 0.1})` }}>
                {curdata.firstName}
              </td>
              <td className="pt-2" style={{ borderRight: `2px solid rgba(255,255,255,${1 - (index + 1) * 0.1})` }}>
                {curdata.lastName}
              </td>
              <td className="pt-2" style={{ borderRight: `2px solid rgba(255,255,255,${1 - (index + 1) * 0.1})` }}>
                {curdata.dob}
              </td>
              <td className="pt-2" style={{ borderRight: `2px solid rgba(255,255,255,${1 - (index + 1) * 0.1})` }}>
                {curdata.email}
              </td>
              <td className="rounded-tr-3xl rounded-br-3xl pt-2">{curdata.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* If a student is selected, display the StudentDataView */}

    </div>
  );
};

// Student section component (non-admin)
const StudentSection = ({ NavigateToForm, formStatus, formLoader }: { NavigateToForm: () => void, formStatus: () => void, formLoader: boolean }) => {
  return (
    <div className="w-full h-[50vh] flex gap-x-5">
      {formLoader && <LoadingSpinner dataToShow="loading" />}
      <div
        className="w-1/2 flex items-center cursor-pointer justify-center rounded-3xl border-4 border-amber-500 bg-yellow-50"
        onClick={NavigateToForm}
      >
        <h1 className="text-[4vw] font-[header]">Fill up the Form</h1>
      </div>
      <div
        className="w-1/2 flex items-center cursor-pointer justify-center rounded-3xl border-4 border-amber-500 bg-yellow-50"
        onClick={formStatus}
      >
        <h1 className="text-[4vw] font-[header]">Form Status</h1>
      </div>

    </div>
  )
}

// Model component (used in AnimatePresence)
export const Model = ({ dataToshow }: { dataToshow: string }) => {
  const { showModel, setshowModel } = useStudentDashboardStore();
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-white p-5 rounded-lg w-80 text-center">
        <h2 className="text-xl font-bold font-[Header]">Current Form Status</h2>
        <p className="font-medium mt-2">{dataToshow}</p>
        <button
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => { setshowModel(false) }}
        >
          Close
        </button>
      </div>
    </motion.div>
  )
}

// Main SideContent component
const SideContent = ({ whoisThis }: { whoisThis: string }) => {
  const { showModel, setshowModel, userEmail } = useStudentDashboardStore();
  const [dataToShow, setdataToShow] = useState("empty");
  const { studentsData, isLoading } = useFetchStudentsData();
  const navigate = useNavigate();
  const currentUserEmail = localStorage.getItem("userEmail");
  const [formLoader, setformLoader] = useState(false);

  const NavigateToForm = async () => {
    const emailToUse = currentUserEmail || userEmail;
    setformLoader(true);

    if (!emailToUse) {
      console.error("User email not available. Cannot fetch data.");
      alert("User email not available. Please sign in again.");
      return;
    }

    try {
      const docRef = doc(db, "Users", emailToUse);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        if (!("status" in docSnap.data())) {
          setdataToShow("You have already filled up the form. Check the form status.");
          setshowModel(true);
          navigate("/student");
        }
        else {
          if (docSnap.data().status === 'accepted') {
            setdataToShow("Check the Form Status");
            setshowModel(true);
            navigate("/student");
          }
          else {
            setdataToShow("Your Form is Rejected , Please Fill it With Considering Reason from the Form status ");
            setshowModel(true);
            navigate("/form");
          }
        }
      } else {
        navigate("/form");
      }
    } catch (error) {
      console.error("Error during form page check:", error);
    }
    finally {
      setformLoader(false);
      if (dataToShow === "empty") {
        setshowModel(false);
      }
    }
  };

  const formstatus = async () => {
    const userEmail = localStorage.getItem("userEmail") || useStudentDashboardStore().userEmail;

    if (!userEmail) {
      console.error("User email not found.");
      alert("User email not found. Please sign in again.");
      return;
    }
    setformLoader(true);
    try {
      const docRef = doc(db, "Users", userEmail);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        if (docSnap.data().status === "accepted") {
          setdataToShow("Your Form is Accepted,visit the office for the Fee Payment")
        }
        else if (docSnap.data().status === "rejected") {
          setdataToShow(`
            Your Form is Rejected,
            Please Fill the Form Again 
            (Considering the Reason)
            ${docSnap.data().reason}
            `)
          localStorage.removeItem("formStatus")
        }
        else {
          setdataToShow(`
              Your Form is Under Verification
            `)

        }
        console.log("User email is present in the user collection.");
      } else {
        setdataToShow("Your haven't filled the Form yet! ")
      }
    } catch (error) {
      console.error("Error checking form status:", error);
    }
    finally {
      setshowModel(true)
      setformLoader(false)
    }
  };

  return (
    <div className="min-h-screen w-full max-sm:w-full p-5 max-sm:p-2 relative">
      {isLoading && <LoadingSpinner dataToShow="loading" />}

      <div className="min-h-[90vh] w-full bg-red-500 border-2 border-amber-300 rounded-3xl px-8 max-sm:px-4 py-0 max-sm:py-2 flex items-center justify-center flex-col">
        <Header />
        {whoisThis === "Admin" ? (
          <AdminSection studentsData={studentsData} />
        ) : (
          <StudentSection NavigateToForm={NavigateToForm} formStatus={formstatus} formLoader={formLoader} />
        )}
      </div>

      <AnimatePresence>{showModel && <Model dataToshow={dataToShow} />}</AnimatePresence>
    </div>
  );
};

export default SideContent;
