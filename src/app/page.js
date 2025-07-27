"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import { Button } from "@/components/ui/button";

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
    <div className="p-2 font-sans antialiased text-gray-800">
      <header className="gradient-bg text-white">
        <div className="container mx-auto px-6 py-16 text-center">
          <Button
            variant={"destructive"}
            className="cursor-pointer bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow transition duration-150 absolute top-6 right-6"
            onClick={handleLogOutFunctionality}
          >
            Log Out
          </Button>
          <h1 className="text-4xl text-black md:text-5xl font-bold mb-4">
            PitchWriterAI - Generate Winning Pitches with AI
          </h1>
          <p className="text-xl text-black md:text-2xl opacity-90">
            Craft perfect pitches and proposals effortlessly with our AI-powered
            tool
          </p>
          <div className="mt-8">
            <div className="inline-flex rounded-md shadow">
              <a
                href="#options"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 transition duration-150"
                onClick={handleMoveToMainPage}
              >
                Get Started
                <i className="fas fa-arrow-down ml-2"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="wave-shape">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-auto"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </header>

      <main className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto w-full flex-grow z-10">
        <section className="lg:w-1/2 flex flex-col space-y-12">
          <section className="space-y-4 mt-12">
            <h2 className="italic text-3xl font-bold underline underline-offset-4 decoration-teal-700">
              Tips for a Good Elevator Pitch
            </h2>
            <p className="text-lg leading-relaxed">
              A strong elevator pitch quickly introduces who you are and what
              you do in a clear, relatable way. It should identify your
              audience&apos;s problem, present your solution, and end with a compelling call to action.
            </p>
          </section>
        </section>

        <div className="lg:w-1/2 space-y-16 mt-12">
          <section className="space-y-6">
            <h2 className="italic text-3xl font-bold underline underline-offset-4 decoration-teal-700">
              Free AI Elevator Pitch Generator Tool
            </h2>
            <p className="text-lg leading-relaxed">
              A great elevator pitch does not just introduce you—it grabs attention and opens the door to real conversations. It is a quick, powerful summary of who you are, what you do, and why someone should work with you.
            </p>
            <p className="text-lg leading-relaxed">
              Not sure where to begin? Try our AI-powered Elevator Pitch Generator—designed to help you create confident, conversion-focused pitches in seconds.
            </p>

            <p className="text-lg leading-relaxed">
              Powered by smart algorithms, PitchWriterAI analyzes popular pitch
              styles and blends them with your unique message to generate impactful results.
            </p>
            <p className="text-lg leading-relaxed">
              Say goodbye to writer&apos;s block. With PitchWriterAI, writing
              your perfect pitch becomes fast, simple, and effective.
            </p>
          </section>
        </div>
      </main>

      <section id="options" className="mb-20 mt-12">
        <h2 className="text-3xl font-bold text-center mb-12">
          How PitchWriterAI Can Help You
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <i className="fas fa-pen text-indigo-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold ml-3">
                  Generate Pitches in Minutes
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Create pitches and proposals with just a few inputs. Our AI tool helps you craft the perfect pitch every time.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Fast and efficient pitch generation</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Tailored to your industry and needs</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Creative, high-quality content</span>
                </li>
              </ul>
              <div className="mt-6">
                <a
                  href="#"
                  onClick={handleMoveToMainPage}
                  className="text-indigo-600 font-medium inline-flex items-center"
                >
                  Try PitchWriterAI
                  <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <i className="fas fa-users text-blue-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold ml-3">
                  Perfect for Startups and Entrepreneurs
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Whether you are a startup or an entrepreneur, PitchWriterAI is
                designed to help you communicate your ideas clearly and persuasively.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Easy to use, no writing skills needed</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>
                    Generate ideas for funding, partnerships, and more
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Customize for any business context</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <i className="fas fa-bolt text-purple-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold ml-3">
                  Boost Your Conversion Rates
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Use AI to refine your pitch and improve your chances of success,
                whether for investors, clients, or partners.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Optimized language for high engagement</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Easy-to-use interface for quick results</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Increase your success rate in securing deals</span>
                </li>
              </ul>
              <div className="mt-6">
                <a
                  href="#"
                  onClick={handleMoveToMainPage}
                  className="text-purple-600 font-medium inline-flex items-center"
                >
                  Try it out now
                  <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-100">
        <div className="container mx-auto px-6 py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                PitchWriterAI
              </h3>
              <p className="text-gray-600 max-w-xs">
                Helping entrepreneurs and startups create winning pitches using
                AI.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">
                  Resources
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-indigo-600 transition duration-150"
                    >
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-indigo-600 transition duration-150"
                    >
                      Tutorials
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-indigo-600 transition duration-150"
                    >
                      API Status
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">
                  Company
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-indigo-600 transition duration-150"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-indigo-600 transition duration-150"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-indigo-600 transition duration-150"
                    >
                      Careers
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">
                  Legal
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-indigo-600 transition duration-150"
                    >
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-indigo-600 transition duration-150"
                    >
                      Terms
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-indigo-600 transition duration-150"
                    >
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2023 PitchWriterAI. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-500 hover:text-indigo-600 transition duration-150"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-indigo-600 transition duration-150"
              >
                <i className="fab fa-github text-xl"></i>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-indigo-600 transition duration-150"
              >
                <i className="fab fa-discord text-xl"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
