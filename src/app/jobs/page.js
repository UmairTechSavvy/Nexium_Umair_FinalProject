"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function JobsPage() {
  const [data, setData] = useState({
    JobPreference: "",
    position: "",
    jobType: "",
  });
  const [state, setState] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleBackToHomePage = () => {
    router.push("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/user/job", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        console.log("Job data submitted successfully");
        alert("Job saved locally in backend!");
      } else {
        console.error("Error submitting job data");
      }
    } catch (err) {
      console.error("Backend error:", err.message);
    }
  };

  const handleSendingDataTon8n = async () => {
    try {
      const res = await axios.post("/api/user/n8n", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        console.log("Data sent to n8n successfully");
        alert("Data sent to n8n!");
        setState(true);
      } else {
        console.error("Error sending data to n8n");
      }
    } catch (err) {
      console.error("n8n error:", err.message);
    }
  };

  useEffect(() => {
    if (state) {
      router.push("/data");
    }
  }, [state]);

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gradient-to-r from-teal-500 via-purple-100 to-slate-500 p-8">
      <header className="border border-black bg-black-500"></header>

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
        <h2 className="text-2xl font-bold text-teal-700 text-center">
          Job Preferences
        </h2>

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

        <div className="space-y-2">
          <Button
            type="submit"
            variant="default"
            className="w-full bg-teal-600 text-white hover:bg-teal-700 transition"
          >
            Save in Backend
          </Button>

          <Button
            type="button"
            variant="destructive"
            className="w-full bg-purple-600 text-white hover:bg-purple-700 transition"
            onClick={handleSendingDataTon8n}
          >
            Send to n8n Webhook
          </Button>
          <div></div>
        </div>
      </form>
    </div>
  );
}
