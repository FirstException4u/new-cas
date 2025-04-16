import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from "./Components/AdminDashboard";
import LandingPage from "./Components/LandingPage";
import StudentDashboard from "./Components/StudentDashboard";
import Login from './Components/Login';
import StudentPage from './Components/StudentPage';
import Form from './Components/Form';
import Signup from './Components/Signup';
import StudentDataView from './Components/StudentDataView';
import CheckingFormFilled from './Components/subcomponents/CheckingFormFilled';


function App() {

  return (
    <Router>
      <div className="min-h-screen w-full bg-[#202020]">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/admin-login" element={<Login />} />
          <Route path="/student-login" element={<Login />} />
          <Route path="/student-page" element={<StudentPage />} />
          <Route
            path="/form"
            element={
              <CheckingFormFilled>
                <Form />
              </CheckingFormFilled>
            }
          />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/StudentView" element={<StudentDataView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;