import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { AuthenticationSchema } from "../ValidationSchema/AuthenticationSchema";
import { useStudentDashboardStore } from "../GlobalStore/StudentDashboardStore";

function Login({type}: {type: string}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const setuserEmail = useStudentDashboardStore((state) => state.setuserEmail);
    
    useEffect(() => {
        localStorage.clear();
      }, []);
    
    const handleLogin = async () => {
        setErrorMessage("");

        try {
            await AuthenticationSchema.validate({ email, password });
        } catch (validationError: any) {
            setErrorMessage(validationError.message);
            return;
        }

        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userEmail = userCredential.user.email;
            if (userEmail) {
                setuserEmail(userEmail);
                localStorage.setItem("userEmail", userEmail);

                if (userEmail.toLowerCase().includes("admin")) {
                    navigate("/admin");
                } else {
                    navigate("/student");
                }
            } else {
                console.error("User email is null");
            }
        } catch (error: any) {
            setErrorMessage("The user email or password is not correct");
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen w-full flex">
            <div className="min-h-screen w-1/2 bg-[#F9F2E0]">
                <img src="/student-login.svg" className="h-screen w-full" alt="Login Illustration" />
            </div>
            <div className="min-h-screen w-1/2 flex flex-col items-center justify-evenly bg-white">
                <div className="w-full text-center">
                    <h1 className="text-[10vw] font-[Kajiro]">Welcome {type}!</h1>
                    <h3 className="text-[2vw] font-[Header]">
                        Simplify the Student Management and boost Your Productivity
                    </h3>
                    <h3 className="text-[2vw] font-[Header]">
                        with <strong className="text-orange-500"> CAS </strong>.
                    </h3>
                </div>
                <div className="w-full flex flex-col items-center justify-evenly">
                    <input
                        type="email"
                        placeholder="Enter Your Email Address"
                        className="rounded-2xl border border-gray-300 p-2 px-4 mb-4 w-1/2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="rounded-2xl border border-gray-300 p-2 px-4 w-1/2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className={`bg-black text-lg p-2 rounded-2xl w-1/2 font-[Header] tracking-widest mt-6 relative after:content-[''] after:absolute after:h-[30px] after:w-[30px] after:top-[50%] after:-left-[10%] after:-translate-x-[50%] after:-translate-y-[50%] after:rounded-[50%] after:border-4 after:border-red-600 after:border-t-yellow-500 after:animate-spin after:transition-all after:duration-500 overflow-hidden ${loading ? 'after:left-[50%]' : 'after:-left-[10%]'} ${loading ? 'text-black' : 'text-white'}`}
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                    {errorMessage && !loading && (
                        <p className="text-red-500 mt-2">{errorMessage}</p>
                    )}
                    <h1 className="font-[Header] text-[2vw] text-black mt-5 cursor-pointer" onClick={() => navigate("/Signup")}>
                        Have N't Register yet?
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default Login;