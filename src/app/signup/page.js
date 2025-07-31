"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [data, setData] = useState({
    Username: "",
    Email: "",
    Password: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleSettingData = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const isFormFilled =
      data.Username.length > 0 && data.Email.length > 0 && data.Password.length > 0;

    setButtonDisabled(!isFormFilled);
  }, [data]);

  const handleSubmittingData = async () => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.Email);
    if (!isValidEmail) {
      alert("Please enter a valid email address");
      return;
    }

    setSubmitting(true);

    try {
      const res = await axios.post("/api/user/Signup", data);
      console.log(res.data);

      if (res.status === 201) {
        alert("User created successfully");
        router.push("/login");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error occurred while submitting data.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-6">
      <header>
        <p className="absolute top-10 right-10 text-8xl font-bold text-white hidden lg:block">
          Pitch
          <br />Writer
          <br />AI
        </p>
      </header>
      <div className="w-full max-w-md bg-white shadow-2xl rounded-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-indigo-700">Sign Up</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="Username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="Username"
              id="Username"
              value={data.Username}
              placeholder="Enter your username"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              onChange={handleSettingData}
            />
          </div>

          <div>
            <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="Email"
              value={data.Email}
              id="Email"
              placeholder="Enter your email"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              onChange={handleSettingData}
            />
          </div>

          <div>
            <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="Password"
              value={data.Password}
              id="Password"
              placeholder="Enter your password"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              onChange={handleSettingData}
            />
          </div>
        </div>

        <button
          onClick={handleSubmittingData}
          disabled={buttonDisabled}
          type="button"
          className={`cursor-pointer w-full mt-4 py-3 rounded-lg text-white font-semibold transition-colors duration-300 flex justify-center items-center ${
            buttonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {submitting ? (
            <svg
              className="w-8 h-8 text-white animate-spin mr-3"
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
      </div>
    </div>
  );
}
