"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [data, setData] = useState({
    Username: "",
    Email: "",
    Password: "",
  });

  const router = useRouter();

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleSettingData = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const isFormFilled =
      data.Username.length > 0 &&
      data.Email.length > 0 &&
      data.Password.length > 0;

    setButtonDisabled(!isFormFilled);
  }, [data]);

  const handleSubmittingData = async () => {
    try {
      const res = await axios.post("/api/user/signup", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        alert("User created successfully");
        router.push("/login");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-400 to-slate-800 p-6">
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
          className={`w-full mt-4 py-2 rounded-lg text-white font-semibold transition-colors duration-300 ${
            buttonDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
