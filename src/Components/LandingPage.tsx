import { useState, useRef } from 'react';
import ProcessStep from './subcomponents/ProcessStep';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const [maskPos, setMaskPos] = useState({ x: 0, y: 0 });
  const [maskSize, setmaskSize] = useState(20);
  const [bgColor, setbgColor] = useState("yellow");
  const textContainerRef = useRef<HTMLDivElement>(null);
  const navigate=useNavigate();
  let computedMaskSize = maskSize;

  const handleMouseMovement = (e: React.MouseEvent<HTMLDivElement>) => {
    if (textContainerRef.current) {
      const rect = textContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMaskPos({ x, y });

      const borderThreshold = 20;
      if (
        x <= borderThreshold ||
        x >= rect.width - borderThreshold ||
        y <= borderThreshold ||
        y >= rect.height - borderThreshold
      ) {
        setbgColor("#eb3939e3");
      } else {
        setbgColor("yellow");
      }
      console.log(x, y);
    }
  };


  return (
    <div className="min-h-screen w-full flex items-center justify-center p-5">
      <div
        className="min-h-[90vh] w-full bg-[#eb3939e3] rounded-3xl border-2 border-solid border-yellow-500"
        style={{ boxShadow: "-10px 30px 20px , 10px -30px 20px" }}
      >
        <div className="navbar h-[10vh] w-full rounded-tl-3xl rounded-tr-3xl flex justify-between px-5 py-2 text-[4vw] font-[Kajiro] font-thin">
          <div>
            <h1>College Admission System</h1>
          </div>
          <div className="flex gap-x-5">
            <h1>Admission Brochure</h1>
            <h1 style={{ cursor: 'pointer' }} onClick={()=>{navigate("/student-login")}}>Student Login</h1>
            <h1 style={{ cursor: 'pointer' }} onClick={()=>{navigate("/admin-login")}}>Admin Login</h1>
          </div>
        </div>
        <div className="centralpart h-[80vh] w-full overflow-hidden">
          <div
            ref={textContainerRef}
            onMouseMove={handleMouseMovement}
            className="relative h-[80%] w-full flex items-center justify-center"
          >
            <h1 className="text-[6vw] font-[Header] relative z-10">
              The Entire Admission Process.
            </h1>
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-[20]"
              animate={{
                WebkitMaskPosition: `${maskPos.x - computedMaskSize / 2}px ${maskPos.y - computedMaskSize / 2}px`,
                maskSize: `${computedMaskSize}px`,
              }}
              style={{
                maskImage: "url(./circle.svg)",
                background: bgColor,
                maskRepeat: "no-repeat",
              }}
              transition={{ type: "tween", ease: "backOut" }}
            >
              <h1
                className="text-[6vw] font-[Header]"
                onMouseEnter={() => setmaskSize(300)}
                onMouseLeave={() => setmaskSize(20)}
              >
               Arrey Yaar Hover kar! niche card par
              </h1>
            </motion.div>
          </div>
          <div className="h-[20%] w-full flex items-center justify-evenly font-[Kajiro] text-[8vw]">
            {Array.from({ length: 5 }, (_, index) => (
              <ProcessStep key={index} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
