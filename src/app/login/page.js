"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


export default function LoginPage() {
  const [data, setData] = useState({
    Email: "",
    Password: "",
  });

  const router = useRouter();

  const handleSendingData = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async () => {
    try {
      const res = await axios.post("/api/user/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res?.status === 200) {
        router.push("/");
      } else {
        alert("Login failed.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again.");

    }
  };

  const handleMoveToSignup = () => {

    router.push('/signup')



  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-400 to-slate-800 p-4">
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
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          Submit
        </button>
        <button onClick={handleMoveToSignup}  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition duration-300">SignUp</button>
      </div>
    </div>
  );
}
