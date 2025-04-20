import { useState, useRef, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import ProcessStep from './subcomponents/ProcessStep';

// Simple throttle to limit updates to ~60fps
function throttle<T extends (...args: any[]) => void>(fn: T, wait = 16): T {
  let lastTime = 0;
  return ((...args: any[]) => {
    const now = performance.now();
    if (now - lastTime >= wait) {
      fn(...args);
      lastTime = now;
    }
  }) as T;
}

export default function LandingPage() {
  const [maskPos, setMaskPos] = useState({ x: 0, y: 0 });
  const [maskSize, setMaskSize] = useState(20);
  const [bgColor, setBgColor] = useState('yellow');
  const textRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Clear localStorage only once
  useEffect(() => {
    localStorage.clear();
  }, []);

  // Throttled mouse-move handler
  const handleMouseMovement = useMemo(
    () =>
      throttle((e: React.MouseEvent<HTMLDivElement>) => {
        const el = textRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setMaskPos({ x, y });

        const edge = 20;
        const near = x <= edge || x >= rect.width - edge || y <= edge || y >= rect.height - edge;
        setBgColor(near ? '#eb3939e3' : 'yellow');
      }),
    []
  );

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-5">
      <div
        className="min-h-[90vh] w-full bg-[#eb3939e3] rounded-3xl border-2 border-yellow-500"
        style={{ boxShadow: '-10px 30px 20px, 10px -30px 20px' }}
      >
        {/* Navbar */}
        <div className="navbar h-[10vh] w-full rounded-tl-3xl rounded-tr-3xl flex justify-between px-5 py-2 text-[4vw] font-[Kajiro] font-thin">
          <h1>College Admission System</h1>
          <div className="flex gap-x-5">
            <button className="cursor-pointer">Admission Brochure</button>
            <button className="cursor-pointer" onClick={() => navigate('/student-login')}>Student Login</button>
            <button className="cursor-pointer" onClick={() => navigate('/admin-login')}>Admin Login</button>
          </div>
        </div>

        {/* Central Section */}
        <div className="centralpart h-[80vh] w-full overflow-hidden">
          <div
            ref={textRef}
            onMouseMove={handleMouseMovement}
            className="relative h-[80%] w-full flex items-center justify-center"
          >
            <h1 className="text-[6vw] font-[Header] relative z-10">
              The Entire Admission Process.
            </h1>

            {/* Mask overlay */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-20"
              animate={{
                WebkitMaskPosition: `${maskPos.x - maskSize / 2}px ${maskPos.y - maskSize / 2}px`,
                maskSize: `${maskSize}px`,
              }}
              style={{
                maskImage: 'url(./circle.svg)',
                background: bgColor,
                maskRepeat: 'no-repeat',
              }}
              transition={{ type: 'tween', ease: 'backOut' }}
            >
              <h1
                className="text-[6vw] font-[Header]"
                onMouseEnter={() => setMaskSize(300)}
                onMouseLeave={() => setMaskSize(20)}
              >
                Please Hover The Below Cards
              </h1>
            </motion.div>
          </div>

          {/* Steps */}
          <div className="h-[20%] w-full flex items-center justify-evenly font-[Kajiro] text-[8vw]">
            {Array.from({ length: 5 }).map((_, i) => (
              <ProcessStep key={i} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}