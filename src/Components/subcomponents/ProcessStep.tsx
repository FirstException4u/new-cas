import { motion } from "motion/react";
import React from 'react';

interface ProcessStepProps {
    index: number;
}

function ProcessStep({ index }: ProcessStepProps) {
    const [isHovered, setIsHovered] = React.useState(false);
    const dummy = [
        "StudentLogin",
        "FormFillup",
        "getVerifed",
        "getDates",
        "PayTheFees!"
    ]

    return (
        <div
            className="relative"
            key={index}
        >
            <h1 className="cursor-pointer">{index + 1}</h1>
            <motion.div
                animate={{ y: isHovered ? "-30%" : "70%", rotate: isHovered ? -20 : 20 }}
                transition={{ type: "spring", bounce: 0.6 }}
                className={`card bg-black h-50 p-5 rounded-3xl absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rotate-[20deg] z-[999]`}
            >
                <h1 className="text-white ">{dummy[index]}</h1>
            </motion.div>
            <div className="overlay absolute h-20 w-40 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-[9999]" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}></div>
        </div>
    );
}

export default ProcessStep;