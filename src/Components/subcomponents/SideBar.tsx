interface SideBarProps {
  header1: string;
  header2: string;
  header3: string;
}

function SideBar({ header1, header2 ,header3 }: SideBarProps) {
  return (
    <div className="min-h-screen max-sm:h-0 w-[12%] max-sm:w-0 bg-gradient-to-b from-[#c2334bf3] to-[rgba(0,0,0,1)] font-[Header] text-white text-[4vw] flex flex-col items-center justify-between py-5">
      <div className="w-full text-[2vw] text-[#f9d49c] flex items-center justify-center flex-col">
        <img src="/student-login.svg" className="rounded-[50%] w-[70%]" />
        <h1 className="text-center">{header1}</h1>
        <h1>{header2}</h1>
      </div>
      <h1>{header3}</h1>
      <h1>Logout</h1>
    </div>
  )
}

export default SideBar