import React, { useState } from "react";
import ImageUploader from "./components/ImageUploader";
import "./index.css";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file) => {
    setResult(null);
    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("https://your-model-api-url/predict", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data.result || "No result returned.");
    } catch (error) {
      setResult("Error: Could not connect to the API.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gradient-to-r from-blue-500 to-green-400">
      <div className="bg-white p-10 rounded-xl shadow-xl max-w-3xl w-full flex flex-col items-center">
        <h1 className="text-6xl font-bold text-black mb-8 text-center">
          🛣️ Pothole Detection
        </h1> 
        <ImageUploader onUpload={handleUpload} className='justify-center'  />
        {loading && (
          <p className="mt-6 text-lg text-gray-600 animate-pulse text-center">
            Detecting pothole...
          </p>
        )}
        {result && !loading && (
          <div className="mt-6 px-4 py-3 bg-green-100 text-green-800 border border-green-300 rounded-xl shadow text-center">
            <span className="font-semibold">Detection Result:</span> {result}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
