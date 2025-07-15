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
    <div className="relative h-screen w-full flex items-center justify-center text-white overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover opacity-20"
        src="/bg.mp4"
        type="video/mp4"
      />
      <div className="z-10 p-8 bg-black bg-opacity-60 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-4 text-center">Catalog Assistant</h1>
        <select
          className="w-full p-2 mb-4 rounded text-black"
          onChange={(e) => setProductType(e.target.value)}
          value={productType}
        >
          <option value="farmer">Farmer</option>
          <option value="artisan">Artisan</option>
          <option value="kirana">Kirana Store Owner</option>
        </select>
        <input
          type="text"
          placeholder="Enter product name..."
          className="w-full p-2 mb-4 rounded text-black"
          onChange={(e) => setProductName(e.target.value)}
          value={productName}
        />
        <button
          onClick={generateDescription}
          className="w-full bg-green-500 hover:bg-green-600 transition-all p-2 rounded"
        >
          {loading ? "Generating..." : "Generate Description"}
        </button>
        {description && (
          <div className="mt-4 p-4 bg-white text-black rounded">{description}</div>
        )}
      </div>
    </div>
  );
}

export default App;
