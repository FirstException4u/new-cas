import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth } from "../../config/firebase";
import { AuthenticationSchema } from "../ValidationSchema/AuthenticationSchema";

function Signup() {
  const [isClicked, setisClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(AuthenticationSchema),
  });

  const handleSignup = async (data: { email: string; password: string }) => {
    const { email, password } = data;
    setisClicked(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErrorMessage("Email already in use!");
      setisClicked(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex">
      <div className="min-h-screen w-1/2 bg-[#F9F2E0]">
        <img src="/student-login.svg" className="h-screen w-full" alt="Login Illustration" />
      </div>
      <div className="min-h-screen w-1/2 flex flex-col items-center justify-evenly bg-white">
        <div className="w-full text-center">
          <h1 className="text-[10vw] font-[Kajiro]">Signup!</h1>
          <h3 className="text-[2vw] font-[Header]">
            Simplify the Student Management and boost Your Productivity
          </h3>
          <h3 className="text-[2vw] font-[Header]">
            with <strong className="text-orange-500"> CAS </strong>. Get Started For FREE.
          </h3>
        </div>
        <form onSubmit={handleSubmit(handleSignup)} className="w-full flex flex-col items-center justify-evenly">
          <input
            type="email"
            placeholder="Enter Your Email Address"
            className="rounded-2xl border border-gray-300 p-2 px-4 w-1/2 mb-2"
            {...register("email")}
          />
          {errors.email && <p className="text-red-500 my-2">{errors.email.message}</p>}
          <input
            type="password"
            placeholder="Password"
            className="rounded-2xl border border-gray-300 p-2 px-4 w-1/2 "
            {...register("password")}
          />
          {errors.password && <p className="text-red-500 mt-2">{errors.password.message}</p>}
          <button
            type="submit"
            className={`bg-black text-lg p-2 rounded-2xl w-1/2 font-[Header] tracking-widest mt-6 relative after:content-[''] after:absolute after:h-[30px] after:w-[30px] after:top-[50%] after:-left-[10%] after:-translate-x-[50%] after:-translate-y-[50%] after:rounded-[50%] after:border-4 after:border-red-600 after:border-t-yellow-500 after:animate-spin after:transition-all after:duration-500 overflow-hidden ${isClicked ? 'after:left-[50%]' : 'after:-left-[10%]'} ${isClicked ? 'text-black' : 'text-white'}`}
          >
            Signup
          </button>
          {errorMessage && !isClicked && (
            <p className="text-red-500 mt-2">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Signup;