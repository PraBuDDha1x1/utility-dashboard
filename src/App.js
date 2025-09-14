// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Prediction from "./pages/Prediction";
import Reports from "./pages/Reports";
import Chatbot from "./components/Chatbot";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Topbar
            isDarkMode={isDarkMode}
            onToggleDarkMode={toggleDarkMode}
            onMenuClick={() => {}}
          />
          <main className="p-4 transition-colors duration-500 ease-in-out">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/prediction" element={<Prediction />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </main>
        </div>
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
