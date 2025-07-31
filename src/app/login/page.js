"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [data, setData] = useState({
    Email: "",
    Password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitButtonClicked, setIsSubmitButtonClicked] = useState(false); 

  const router = useRouter();

  const handleSendingData = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async () => {
    setSubmitting(true); 
    setIsSubmitButtonClicked(true); 
    try {
      const res = await axios.post("/api/user/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res?.status === 200) {
        router.push("/");
      } else {
        router.push("/signup");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again.");
      router.push("/signup");
    } finally {
      setSubmitting(false); 
      setIsSubmitButtonClicked(false); 
    }
  };

  const handleMoveToSignup = () => {
    router.push("/signup");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      <header>
        <p className="absolute top-10 right-10 text-8xl font-bold text-white hidden lg:block">
          Pitch
          <br />
          Writer <br />
          AI
        </p>
      </header>
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-indigo-700">Login</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              name="Email"
              id="Email"
              placeholder="Enter your email"
              onChange={handleSendingData}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 shadow-sm"
            />
          </div>

          <div>
            <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="Password"
              id="Password"
              placeholder="Enter your password"
              onChange={handleSendingData}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 shadow-sm"
            />
          </div>
        </div>

    
        <button
          onClick={handleLoginSubmit}
          type="button"
          className="cursor-pointer w-full mt-4 py-3 rounded-lg text-white font-semibold transition-colors duration-300 flex justify-center items-center bg-indigo-600 hover:bg-indigo-700"
        >
          {isSubmitButtonClicked && submitting ? (
            <svg
              className={`w-8 h-8 text-white animate-spin mr-3`} 
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"
              ></path>
            </svg>
          ) : (
            "Submit"
          )}
        </button>

       
        <button
          onClick={handleMoveToSignup}
          className="cursor-pointer w-full mt-4 py-3 rounded-lg text-white font-semibold transition-colors duration-300 flex justify-center items-center bg-red-600 hover:bg-red-700"
        >
          SignUp
        </button>
      </div>
    </div>
  );
}
