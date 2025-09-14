import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // tailwind
import App from "./App";
import { DashboardProvider } from "./context/DashboardContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <DashboardProvider>
      <App />
    </DashboardProvider>
  </React.StrictMode>
);
