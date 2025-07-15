import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./i18n"; // 👈 make sure this is added

ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
<App />
</React.StrictMode>
);