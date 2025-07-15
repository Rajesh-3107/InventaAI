import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Assuming you have Tailwind set up here
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
    <div className="fixed inset-0 overflow-hidden flex items-center justify-center bg-transparent">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed top-0 left-0 w-screen h-screen object-cover z-[-1]"
      >
        <source src="/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Foreground Content */}
      <div className="z-10 max-w-lg w-full mx-4 p-10 bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-3xl shadow-2xl backdrop-blur-lg border border-gray-200 font-sans text-center">
        <h1 className="text-5xl font-extrabold mb-10 text-gray-900 tracking-wide font-[Poppins]">
          Inventa AI
        </h1>

        <select
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
          className="w-full p-4 mb-6 rounded-lg border border-gray-300 bg-white text-black text-lg font-medium focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        >
          <option value="farmer">Farmer</option>
          <option value="artisan">Artisan</option>
          <option value="kirana">Kirana Store Owner</option>
        </select>

        <input
          type="text"
          placeholder="Enter product name..."
          className="w-full p-4 mb-8 rounded-lg border border-gray-300 bg-white text-black text-lg font-medium placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <button
          onClick={generateDescription}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Description"}
        </button>

        {description && (
          <div className="mt-8 p-6 bg-white rounded-xl shadow-inner border border-gray-200 text-gray-900 text-left whitespace-pre-line font-sans text-base">
            {description}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;