"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";

export default function Home() {
  const router = useRouter();

  const handleMoveToMainPage = () => {
    router.push("/main");
  };

  const handleLogOutFunctionality = async () => {
    try {
      const res = await axios.get("/api/user/logout");
      console.log(res.data);
      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
   <div className="relative font-sans flex flex-col min-h-screen bg-black text-zinc-100 animate-dawn p-6 sm:p-12 lg:p-20 overflow-hidden">

  
      <div className="absolute top-0 left-1/2 transform  " />

      <header className="relative text-center mb-12 z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl font-extrabold italic underline decoration-slate-800 decoration-8 underline-offset-4 text-wheat-500"
        >
          PitchWriterAI
        </motion.h1>

        <button
          onClick={handleLogOutFunctionality}
          className="cursor-pointer absolute top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-500 z-10"
        >
          Log Out
        </button>

       
      </header>

      <main className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto w-full flex-grow z-10">
  
  <section className="lg:w-1/2 flex flex-col space-y-12">
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-xl sm:text-2xl font-medium leading-relaxed"
    >
      Welcome to <strong>PitchWriterAI</strong>, your AI-powered assistant
      for crafting compelling pitches. Whether you're creating a business
      proposal, a startup pitch, or any persuasive message, PitchWriterAI
      is your step-by-step guide to success.
    </motion.p>

    <button
      onClick={handleMoveToMainPage}
      className="cursor-pointer bg-red-500 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-lg text-lg"
    >
      {"Let's Start"}
    </button>

  
    <section className="space-y-4 mt-140">
      <h2 className="italic text-3xl font-bold underline underline-offset-4 decoration-teal-700">
        Tips for a Good Elevator Pitch
      </h2>
      <p className="text-lg leading-relaxed">
        A strong elevator pitch quickly introduces who you are and what you
        do in a clear, relatable way. It should identify your audience’s
        problem, present your solution, and end with a compelling call to
        action.
      </p>
    </section>
  </section>

 
  <div className="lg:w-1/2 space-y-16 mt-12">
    <Image
      src="/images.jpeg"
      width={500}
      height={300}
      alt="Pitch Tool"
      className="rounded-lg border border-indigo-300 shadow-lg transition-transform duration-500 hover:scale-105 hover:opacity-90"
    />

    <section className="space-y-6">
      <h2 className="italic text-3xl font-bold underline underline-offset-4 decoration-teal-700">
        Free AI Elevator Pitch Generator Tool
      </h2>
      <p className="text-lg leading-relaxed">
        A great elevator pitch doesn’t just introduce you—it grabs attention
        and opens the door to real conversations. {"It’s"} a quick, powerful
        summary of who you are, what you do, and why someone should work
        with you.
      </p>
      <p className="text-lg leading-relaxed">
        Not sure where to begin? Try our AI-powered Elevator Pitch
        Generator—designed to help you create confident, conversion-focused
        pitches in seconds.
      </p>
      <p className="text-lg leading-relaxed">
        Powered by smart algorithms, WriterBuddy analyzes popular pitch
        styles and blends them with your unique message to generate
        impactful results.
      </p>
      <p className="text-lg leading-relaxed">
        Say goodbye to writer’s block. With WriterBuddy, writing your
        perfect pitch becomes fast, simple, and effective.
      </p>
    </section>
  </div>
</main>


      <footer className="mt-auto pt-6 space-y-6 text-white border-t border-zinc-300 text-center text-sm z-10">
        © {new Date().getFullYear()} PitchWriterAI — All rights reserved.
      </footer>
    </div>
  );
}
