import { useStudentDataStore } from "../GlobalStore/FormStore";
import SideContent from "./subcomponents/SideContent"

function StudentDashboard() {
  
  const { StudentData } = useStudentDataStore();



  return (
    <div className="flex">
       <SideContent whoisThis={"student"} />
    </div>
  )
}

export default StudentDashboard