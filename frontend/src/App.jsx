import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "./App.css";

function App() {
const { t, i18n } = useTranslation();
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
setDescription(t("error"));
}
setLoading(false);
};

const changeLanguage = (lang) => {
i18n.changeLanguage(lang);
};

return (
<div className="fixed inset-0 flex items-center justify-center overflow-hidden">
<video autoPlay muted loop playsInline className="fixed top-0 left-0 w-screen h-screen object-cover z-[-1]">
<source src="/bg.mp4" type="video/mp4" />
</video>

  <div
    className="relative z-10 max-w-lg w-full mx-4 p-10 rounded-3xl 
    bg-white/20 backdrop-blur-xl border border-white/30
    shadow-[0_4px_30px_rgba(0,0,0,0.1)]
    hover:shadow-[0_8px_50px_rgba(0,0,0,0.15)]
    transition-shadow duration-500
    animate-float"
    style={{ borderWidth: "1.5px", borderStyle: "solid" }}
  >
    <h1
      className="text-6xl font-extrabold mb-8 tracking-wider font-[Poppins] drop-shadow-lg bg-clip-text text-transparent"
      style={{
        backgroundImage: "linear-gradient(90deg, #A259FF, #F72585, #720026)",
      }}
    >
      {t("title")}
    </h1>

    <div className="flex justify-end gap-2 mb-6">
      <button onClick={() => changeLanguage("en")} className="px-3 py-1 rounded bg-white/40 text-black">EN</button>
      <button onClick={() => changeLanguage("hi")} className="px-3 py-1 rounded bg-white/40 text-black">हिंदी</button>
      <button onClick={() => changeLanguage("ta")} className="px-3 py-1 rounded bg-white/40 text-black">தமிழ்</button>
      <button onClick={() => changeLanguage("te")} className="px-3 py-1 rounded bg-white/40 text-black">తెలుగు</button>
    </div>

    <select
      value={productType}
      onChange={(e) => setProductType(e.target.value)}
      className="w-full p-4 mb-6 rounded-xl border border-white/40 bg-white/25 text-black font-semibold text-lg shadow-lg"
    >
      <option value="farmer">{t("farmer")}</option>
      <option value="artisan">{t("artisan")}</option>
      <option value="kirana">{t("kirana")}</option>
    </select>

    <input
      type="text"
      placeholder={t("placeholder")}
      className="w-full p-4 mb-6 rounded-xl border border-white/40 bg-white/25 text-black font-semibold text-lg placeholder-gray-700 shadow-lg"
      value={productName}
      onChange={(e) => setProductName(e.target.value)}
    />

    <button
      onClick={generateDescription}
      className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 font-bold text-white text-lg shadow-xl hover:from-purple-700 hover:to-pink-600 active:scale-95 transition-transform duration-200"
      disabled={loading}
    >
      {loading ? t("generating") : t("generate")}
    </button>

    {description && (
      <div className="mt-8 p-6 bg-white/30 rounded-2xl border border-white/40 shadow-inner text-black font-sans text-base whitespace-pre-line">
        {description}
      </div>
    )}
  </div>

  <style>{`
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-12px); }
    }
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
  `}</style>
</div>
);
}

export default App;