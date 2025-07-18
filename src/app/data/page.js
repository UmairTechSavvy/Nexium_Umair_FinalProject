"use client";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function DataPage() {
  const [data, setData] = useState([]);

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

  return (
    <div>
      <Button variant="destructive" onClick={handleGetDataFromn8nBackend}>
        Get Data From n8n
      </Button>

      <h1>DATA:</h1>
   <ul>
  {data.map((job, index) => (
    <li key={index}>
      <p>Title: {job.Title}</p>
      <p>Company: {job.Company}</p>
     <a href={job.Link} target="_blank" rel="noopener noreferrer">{job.Link}</a>
      <hr />
    </li>
  ))}
</ul>

    </div>
  );
}
