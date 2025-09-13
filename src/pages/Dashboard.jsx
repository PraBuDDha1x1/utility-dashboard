import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import ServiceSelector from "../components/ServiceSelector";
import FileUpload from "../components/FileUpload";
import PredictionCard from "../components/PredictionCard";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedService, setSelectedService] = useState("Electricity");
  const [prediction, setPrediction] = useState(null);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* Main Layout */}
        <div className="flex">
          {/* Sidebar */}
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
          />

          {/* Main Content Area */}
          <div className="flex-1 min-h-screen">
            <Topbar 
              onMenuClick={() => setSidebarOpen(true)}
              isDarkMode={isDarkMode}
              onToggleDarkMode={toggleDarkMode}
            />

            {/* Content */}
            <main className="p-4 lg:p-8 max-w-7xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
                  Utility Bill Predictor
                </h1>
                <p className="mt-1 space-mono-bold text-gray-600 dark:text-gray-400">
                  Upload your recent bills to get accurate predictions
                </p>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
                    <h2 className="text-lg font-semibold mb-4">Select Utility</h2>
                    <ServiceSelector 
                      selected={selectedService} 
                      setSelected={setSelectedService} 
                    />
                  </div>

                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
                    <h2 className="text-lg font-semibold mb-4">Upload Bill</h2>
                    <FileUpload 
                      onFileSelected={(file) => {
                        setPrediction({
                          service: selectedService,
                          estimate: "Predicting...",
                          confidence: "-"
                        });
                      }} 
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <PredictionCard prediction={prediction} />
                </div>
              </div>
            </main>
          </div>
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm lg:hidden z-20"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
}