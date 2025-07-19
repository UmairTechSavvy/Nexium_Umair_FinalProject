"use client";
import { useState , useEffect} from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function DataPage() {
  const [data, setData] = useState([]);

  useEffect(() => {

     const handleGetDataFromn8nBackend = async () => {
    try {
      const res = await axios.get("/api/user/n8nget");
      console.log("Fetched from backend:", res.data);

      setData([res.data] || []);
      alert("Data fetched successfully!");
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data");
    }
  };

  handleGetDataFromn8nBackend()

  },[data])
 

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-teal-500 via-purple-100 to-slate-500">
     

    
   <ul className="bg-white p-6 rounded-lg shadow-md w-full lg:max-w-8xl sm:max-w-4xl">
  {data.map((job, index) => (
    <li className="text-slate-500 font-bold italic" key={index}>
      <p><strong>Title: </strong>{job.Title}</p>
      <p><strong>Company: </strong> {job.Company}</p>
     <a className="text-blue-600" href={job.Link} target="_blank" rel="noopener noreferrer">{job.Link}</a>
      <hr />
    </li>
  ))}
</ul>

    </div>
  );
}
