import React, { useState } from "react";
import axios from "axios";
import "./App.css";

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
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
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

      {/* Glassmorphic Box */}
      <div
        className="relative z-10 max-w-lg w-full mx-4 p-10 rounded-3xl 
          bg-white/20 backdrop-blur-xl border border-white/30
          shadow-[0_4px_30px_rgba(0,0,0,0.1)]
          hover:shadow-[0_8px_50px_rgba(0,0,0,0.15)]
          transition-shadow duration-500
          animate-float
          overflow-hidden"
        style={{
          // Removed gradient border, keep simple white border
          borderWidth: "1.5px",
          borderStyle: "solid",
        }}
      >
        <h1
          className="text-6xl font-extrabold mb-12 tracking-wider font-[Poppins] drop-shadow-lg bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #A259FF, #F72585, #720026)",
          }}
        >
          Inventa AI
        </h1>

        <select
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
          className="w-full p-4 mb-8 rounded-xl border border-white/40 bg-white/25
            text-black font-semibold text-lg
            focus:outline-none focus:ring-0 focus:border-purple-400
            shadow-lg
            transition-all duration-300"
          style={{
            boxShadow:
              "0 2px 10px rgba(165, 94, 255, 0.25)", // subtle purple shadow
          }}
        >
          <option value="farmer">Farmer</option>
          <option value="artisan">Artisan</option>
          <option value="kirana">Kirana Store Owner</option>
        </select>

        <input
          type="text"
          placeholder="Enter product name..."
          className="w-full p-4 mb-10 rounded-xl border border-white/40 bg-white/25
            text-black font-semibold text-lg placeholder-gray-700
            focus:outline-none focus:ring-0 focus:border-purple-400
            shadow-lg
            transition-all duration-300"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          style={{
            boxShadow:
              "0 2px 10px rgba(165, 94, 255, 0.25)", // subtle purple shadow
          }}
        />

        <button
          onClick={generateDescription}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500
            font-bold text-white text-lg shadow-xl
            hover:from-purple-700 hover:to-pink-600
            active:scale-95
            transition-transform duration-200"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Catalogue"}
        </button>

        {description && (
          <div className="mt-10 p-6 bg-white/30 rounded-2xl border border-white/40 shadow-inner text-black font-sans text-base whitespace-pre-line">
            {description}
          </div>
        )}
      </div>

      {/* Extra Styles */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default App;