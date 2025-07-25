import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { fileName, content } = req.body;

    if (!fileName || !content) {
      return res.status(400).json({ message: "File name and content are required." });
    }

    try {
      
      const folderPath = path.join(process.cwd(), "public/results");

   
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      
      const filePath = path.join(folderPath, fileName);

    
      fs.writeFileSync(filePath, content, "utf-8");

      return res.status(200).json({ message: "File saved successfully.", filePath });
    } catch (error) {
      console.error("Error saving file:", error);
      return res.status(500).json({ message: "Error saving file." });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
