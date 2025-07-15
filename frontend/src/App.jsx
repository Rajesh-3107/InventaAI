import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import "./index.css";

function App() {
  const [productType, setProductType] = useState("farmer");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const generateDescription = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/generate-description", {
        productType,
        productName,
      });
      setDescription(res.data.description);
    } catch (error) {
      console.error(error);
      setDescription("Error generating description.");
    }
    setLoading(false);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Fullscreen Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Centered Form */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl max-w-lg w-full">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Catalog Assistant
          </h1>

          <select
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
          >
            <option value="farmer">Farmer</option>
            <option value="artisan">Artisan</option>
            <option value="kirana">Kirana Store Owner</option>
          </select>

          <input
            type="text"
            placeholder="Enter product name..."
            className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />

          <button
            onClick={generateDescription}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            {loading ? "Generating..." : "Generate Description"}
          </button>

          {description && (
            <div className="mt-4 p-4 bg-gray-100 text-gray-800 rounded-lg border border-gray-300 whitespace-pre-line">
              {description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;