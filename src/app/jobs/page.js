"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function JobsPage() {
  const [data, setData] = useState({
    JobPreference: "",
    position: "",
    jobType: "",
  });

  const router = useRouter()

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleBackToHomePage = () => {

    router.push("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const res = await axios.post("/api/user/job", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      console.log("Job data submitted successfully");
    } else {
      console.error("Error submitting job data");
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gradient-to-r from-teal-500 via-purple-100 to-slate-500 p-8">
      <header className=" border border-black bg-black-500"></header>
    <Button
        className="absolute top-6 right-6 cursor-pointer"
        variant="destructive"
        onClick={handleBackToHomePage} 
      >
        Home Page
      </Button>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-teal-700 text-center">Job Preferences</h2>

        <div className="text-teal-600">
          <label className="block mb-1 font-medium">Job Preference:</label>
          <input
            type="text"
            name="JobPreference"
            placeholder="Enter your job preference"
            className="border border-gray-300 rounded p-2 w-full"
            onChange={handleChange}
            value={data.JobPreference}
          />
        </div>

        <div className="text-teal-600">
          <label className="block mb-1 font-medium">Position:</label>
          <input
            type="text"
            name="position"
            placeholder="Enter your position preference"
            className="border border-gray-300 rounded p-2 w-full"
            onChange={handleChange}
            value={data.position}
          />
        </div>

        <div className="text-teal-600">
          <label className="block mb-1 font-medium">Job Type:</label>
          <input
            type="text"
            name="jobType"
            placeholder="Enter your job type"
            className="border border-gray-300 rounded p-2 w-full"
            onChange={handleChange}
            value={data.jobType}
          />
        </div>

        <Button
          type="submit"
          variant="destructive"
          className="cursor-pointer w-full bg-teal-600 text-white font-semibold py-2 rounded hover:bg-teal-700 transition"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
