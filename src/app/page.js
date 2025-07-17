"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  const handleFindJob = () => {
    router.push("/jobs");
  };

  return (
    <div className="bg-gradient-to-r from-teal-500 via-purple-100 to-slate-500 min-h-screen flex flex-col items-center justify-center p-8 sm:p-16 gap-12">
      <main className="flex flex-col items-center text-center sm:text-left gap-6 max-w-3xl w-full">
        <h1 className="text-4xl sm:text-5xl font-bold italic text-white drop-shadow-md">
          Welcome to <strong className="text-black">JobFinder</strong>
        </h1>

        <p className="text-lg sm:text-xl text-teal-800 font-medium">
          Discover your next <strong>job</strong> opportunity with ease.
        </p>

       <Image
  src="/img2.png"
  alt="JobFinder Logo"
  width={50}
  height={80}
  priority
  className="absolute right-4 h-auto rounded-lg shadow-lg w-auto max-w-[150px] sm:max-w-[200px] object-contain mb-4"
/>


        <Button
          variant="destructive"
          className="cursor-pointer px-6 py-3 text-lg font-semibold rounded-full shadow hover:scale-105 transition-transform"
          onClick={handleFindJob}
        >
         {" Let’s Start"}
        </Button>

        <Image
          src="/img1.jpg"
          width={800}
          height={500}
          alt="Job Finder Illustration"
          className="rounded-lg shadow-xl max-w-full h-auto object-cover sm:max-w-md md:max-w-lg lg:max-w-xl"
        />
      </main>

      <footer className="mt-10 text-sm text-black-500">
       
        © {new Date().getFullYear()} JobFinder. All rights reserved.
      </footer>
    </div>
  );
}