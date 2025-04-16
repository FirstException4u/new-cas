import { motion } from "motion/react";

interface ModelProps {
  dataToshow: string;
}

function Model({ dataToshow }: ModelProps) {
    return (
        <div className="min-h-screen w-full bg-[rgba(0,0,0,0.8)] fixed top-0 left-0 flex items-center justify-center">
            <motion.div
                className="h-[50vh] w-1/2 max-sm:w-[90%] rounded-3xl flex flex-col justify-center items-center bg-[#f02d2d]"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.4 }}
            >
               {dataToshow}
            </motion.div>
        </div>
    );
}

export default Model;