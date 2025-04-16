import { ReactNode, useEffect } from 'react';
import { useNavigate, Navigate } from "react-router-dom";

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
 
  const storedFormStatus = localStorage.getItem("formStatus");
  const formStatus = storedFormStatus ? JSON.parse(storedFormStatus) : {};
  const formFilled = formStatus.formFilled;


  if (!formFilled) {
    return <>{children}</>;
  }

 
  return <AlreadyFilledMessage />;
}

export default CheckingFormFilled;
