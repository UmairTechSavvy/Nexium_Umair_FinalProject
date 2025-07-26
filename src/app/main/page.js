"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function MainPage() {
  const [data, setData] = useState({
    CompanyName: "",
    Idea: "",
    TargetAudience: "",
    Problem: "",
    Unique: "",
  });

  const [aiPitch, setAiPitch] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleGettingBackToHomePage = () => {
    router.push("/");
  };

  const handlePitchData = async (e) => {
    e.preventDefault();

    if (
      !data.CompanyName ||
      !data.Idea ||
      !data.TargetAudience ||
      !data.Problem ||
      !data.Unique
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/user/pitch", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data.generatedPitch);
      setAiPitch(res.data.generatedPitch);
      alert("Pitch submitted successfully!");

      await saveResult("generated_pitch.txt", res.data.generatedPitch);
    } catch (error) {
      console.error(error);
      alert("Failed to submit pitch.");
    } finally {
      setLoading(false);
    }
  };

  const downloadPitch = () => {
    const blob = new Blob([aiPitch], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "generated_pitch.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <header className="bg-white flex justify-center items-center py-6 border-4 border-black font-bold text-4xl relative">
        <Button
          variant={"destructive"}
          className="cursor-pointer absolute right-4 text-2xl bg-red-600 hover:bg-red-700 sm:block md:block lg:hidden rounded-lg shadow-lg p-2"
          onClick={handleGettingBackToHomePage}
        >
          Go Back
        </Button>

        <h1 className="absolute left-4">PitchWriterAI</h1>

        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <path
              d="M0,0 C600,100 600,100 1200,0 L1200,120 L0,120 Z"
              className="fill-white"
            ></path>
          </svg>
        </div>
      </header>

      <main className="flex-grow bg-black text-white p-8 text-center border-y border-white border-4">
        <p className="text-lg">
          Please fill the requirements to find the best solution.
        </p>

        <form
          onSubmit={handlePitchData}
          className="w-full max-w-2xl mx-auto mt-10 flex flex-col gap-6 bg-white p-8 rounded-2xl shadow-lg text-black"
        >
          <h2 className="text-2xl font-semibold text-center">Pitch Form</h2>

          <input
            type="text"
            name="CompanyName"
            placeholder="Your Name or Company"
            className="p-3 border border-gray-300 rounded-md"
            value={data.CompanyName}
            onChange={handleData}
          />

          <textarea
            name="Idea"
            rows="3"
            placeholder="Describe your idea or product"
            className="p-3 border border-gray-300 rounded-md"
            value={data.Idea}
            onChange={handleData}
          />

          <input
            type="text"
            name="TargetAudience"
            placeholder="Target Audience (e.g. investors)"
            className="p-3 border border-gray-300 rounded-md"
            value={data.TargetAudience}
            onChange={handleData}
          />

          <textarea
            name="Problem"
            rows="3"
            placeholder="What problem does it solve?"
            className="p-3 border border-gray-300 rounded-md"
            value={data.Problem}
            onChange={handleData}
          />

          <textarea
            name="Unique"
            rows="3"
            placeholder="What's unique about it?"
            className="p-3 border border-gray-300 rounded-md"
            value={data.Unique}
            onChange={handleData}
          />

          <button
            type="submit"
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate My Pitch"}
          </button>
        </form>

        {aiPitch && (
          <div className="mt-12 bg-white text-black p-6 rounded-xl shadow-md max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4 text-center">
              Your AI-Generated Pitch
            </h3>
            <a
              href="#"
              onClick={downloadPitch}
              className="mt-4 text-green-600 hover:text-green-700 font-bold"
            >
              Download Pitch
            </a>
            <p className="whitespace-pre-wrap text-left">{aiPitch}</p>
          </div>
        )}
      </main>

      <footer className="flex justify-center items-center border border-white border-4 bg-black mt-auto shadow-lg pt-6 pb-10 text-sm text-white text-center">
        <p>© {new Date().getFullYear()} PitchWriterAI — All rights reserved.</p>
      </footer>
    </div>
  );
}
