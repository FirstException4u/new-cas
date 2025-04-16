import React from "react";

// Define the structure of a single student data
interface Student {
  name: string;
  Rollno: string;
  dob: string;
  email: string;
  gender: string;
}


const studentData: Student[] = [
  {
    name: "John Doe",
    Rollno: "12345",
    dob: "2000-01-01",
    email: "johndoe@example.com",
    gender: "Male",
  },
];

const StudentPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#202020] p-5 relative">
      <div
        className="min-h-[90vh] w-full bg-[#eb3939e3] rounded-3xl p-3"
        style={{
          boxShadow: "-10px 25px 20px , 10px -18px 20px",
        }}
      >
        <div className="w-full text-center relative">
          <h1 className="font-[Header] text-[8vw] text-center">Student Page</h1>
          <img
            src="/MenuAction.svg"
            className="h-20 max-sm:h-10 absolute top-0 right-0"
          />
        </div>
        <table className="w-full text-[2.5vw] font-[Header] border-separate border-spacing-y-[10px]">
          <thead>
            <tr className="bg-black text-white">
              <th className="rounded-tl-3xl rounded-bl-3xl pt-2 border-r-2">Name</th>
              <th className="pt-2 border-r-2">Roll-No</th>
              <th className="pt-2 border-r-2">Date-Of-Birth</th>
              <th className="pt-2 border-r-2">Email-Address</th>
              <th className="rounded-tr-3xl rounded-br-3xl pt-2">Gender</th>
            </tr>
          </thead>
          <tbody>
            {studentData.map((curdata, index) => (
              <tr
                key={index}
                className="text-center text-white text-[2vw]"
                style={{
                  backgroundColor: `rgba(0,0,0,${1 - (index + 1) * 0.1})`,
                  marginBottom: "10px",
                }}
              >
                <td
                  className="rounded-tl-3xl rounded-bl-3xl pt-2"
                  style={{
                    borderRight: `2px solid rgba(255,255,255,${1 - (index + 1) * 0.1})`,
                  }}
                >
                  {curdata.name}
                </td>
                <td
                  className="pt-2"
                  style={{
                    borderRight: `2px solid rgba(255,255,255,${1 - (index + 1) * 0.1})`,
                  }}
                >
                  {curdata.Rollno}
                </td>
                <td
                  className="pt-2"
                  style={{
                    borderRight: `2px solid rgba(255,255,255,${1 - (index + 1) * 0.1})`,
                  }}
                >
                  {curdata.dob}
                </td>
                <td
                  className="pt-2"
                  style={{
                    borderRight: `2px solid rgba(255,255,255,${1 - (index + 1) * 0.1})`,
                  }}
                >
                  {curdata.email}
                </td>
                <td className="rounded-tr-3xl rounded-br-3xl pt-2">
                  {curdata.gender}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentPage;