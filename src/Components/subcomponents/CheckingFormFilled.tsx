import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../../config/firebase';
import { LoadingSpinner} from './SideContent';


interface CheckingFormFilledProps {

  children: ReactNode;
}

function AlreadyFilledMessage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/student", { replace: true });
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div style={containerStyle}>
      <h2>You have already filled the form.</h2>
      <p>Redirecting you to your dashboard shortly...</p>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: "#f0f0f0",
  textAlign: "center",
  padding: "20px",
};

function CheckingFormFilled({ children }: CheckingFormFilledProps) {
  
  const [formFilled, setFormFilled] = useState<boolean | null>(null);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const checkFormStatus = async () => {
      if (userEmail) {
        try {
          const docRef = doc(db, "Users", userEmail);
          const docSnap = await getDoc(docRef);
          setFormFilled(docSnap.exists());
        } catch (error) {
          console.error("Error checking form status:", error);
          setFormFilled(false);
        }
      } else {
        setFormFilled(false);
      }
    };

    checkFormStatus();
  }, [userEmail]);

  if (formFilled === null) {
    return (<LoadingSpinner/>) 
  }


  if (!formFilled) {
    return <>{children}</>;
  }

  return <AlreadyFilledMessage />;
}

export default CheckingFormFilled;
