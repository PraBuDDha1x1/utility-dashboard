// src/pages/Prediction.jsx
import React, { useContext, useEffect, useState } from "react";
import PredictionCard from "../components/PredictionCard";
import ServiceSelector from "../components/ServiceSelector";
import { DashboardContext } from "../context/DashboardContext";

const APPLIANCE_OPTIONS = [
  "AC",
  "Heater",
  "Fridge",
  "Washing Machine",
  "TV",
  "Refrigerator",
  "Computer",
  "Microwave",
];

export default function Prediction() {
  const { prefillData } = useContext(DashboardContext);

  const [selectedService, setSelectedService] = useState("Electricity");

  const [formData, setFormData] = useState({
    familySize: 1,
    appliances: [],
    pastBills: [],
  });

  const [predictions, setPredictions] = useState([]);
  const [singlePrediction, setSinglePrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  // Prefill from Chatbot if available
  useEffect(() => {
    if (prefillData && formData.pastBills.length === 0) {
      setFormData(prefillData);
    }
  }, [prefillData]);

  // Load saved form data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("predictionForm");
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  // Save form data to localStorage
  useEffect(() => {
    localStorage.setItem("predictionForm", JSON.stringify(formData));
  }, [formData]);

  // Update predictions when formData or service changes
  useEffect(() => {
    if (!formData) return;
    setLoading(true);

    // simulate ML delay
    const timer = setTimeout(() => {
      generatePredictions(formData);
      setSinglePrediction({
        service: selectedService,
        estimate:
          formData.pastBills.length > 0
            ? `$${(
                formData.pastBills[formData.pastBills.length - 1] * 1.05
              ).toFixed(2)}`
            : "$0.00",
        confidence: "85%",
      });
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [formData, selectedService]);

  // Mock forecast: next 3 months = last bill * 1.05^(month number)
  const generatePredictions = (data) => {
    if (!data?.pastBills?.length) {
      setPredictions([]);
      return;
    }

    const lastBill = data.pastBills[data.pastBills.length - 1];
    const forecast = Array(3)
      .fill(0)
      .map((_, idx) => ({
        month: `Month ${idx + 1}`,
        amount: (lastBill * Math.pow(1.05, idx + 1)).toFixed(2),
      }));

    setPredictions(forecast);
  };

  const toggleAppliance = (appliance) => {
    setFormData((prev) => {
      const hasAppliance = prev.appliances.includes(appliance);
      const newAppliances = hasAppliance
        ? prev.appliances.filter((a) => a !== appliance)
        : [...prev.appliances, appliance];

      return {
        ...prev,
        appliances: newAppliances,
      };
    });
  };

  return (
    <div id="prediction-section" className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Bill Prediction</h2>

      {/* Service selection */}
      <div className="mb-6">
        <ServiceSelector
          selected={selectedService}
          setSelected={setSelectedService}
        />
      </div>

      {/* Family / appliances input fields */}
      <div className="mb-6 space-y-3">
        <div>
          <label htmlFor="familySize-input" className="font-semibold mr-2">
            Family Size:
          </label>
          <input
            id="familySize-input"
            type="number"
            min={1}
            value={formData.familySize}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val < 1) return;
              setFormData((prev) => ({ ...prev, familySize: val }));
            }}
            className="border p-1 rounded w-20"
            aria-label="Enter family size"
          />
        </div>

        <div id="appliances-checkboxes">
          <label className="font-semibold mb-2 block">Appliances:</label>
          <div className="flex flex-wrap gap-3">
            {APPLIANCE_OPTIONS.map((appliance) => (
              <label
                key={appliance}
                className="inline-flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  checked={formData.appliances.includes(appliance)}
                  onChange={() => toggleAppliance(appliance)}
                  className="form-checkbox"
                />
                <span>{appliance}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="pastBills-input" className="font-semibold mr-2">
            Past Bills:
          </label>
          <input
            id="pastBills-input"
            type="text"
            value={formData.pastBills.join(", ")}
            onChange={(e) => {
              const bills = e.target.value
                .split(",")
                .map((b) => b.trim())
                .filter((b) => b !== "");

              // validate
              if (bills.some((b) => isNaN(b))) {
                alert("⚠️ Enter numbers only, separated by commas.");
                return;
              }

              setFormData((prev) => ({
                ...prev,
                pastBills: bills.map((b) => parseFloat(b)),
              }));
            }}
            placeholder="120, 150, 130"
            className="border p-1 rounded w-60"
            aria-label="Enter past bills"
          />
        </div>
      </div>

      {/* Single ML Prediction */}
      {loading ? (
        <p className="animate-pulse text-gray-400">
          ⏳ Calculating prediction...
        </p>
      ) : (
        <PredictionCard prediction={singlePrediction} />
      )}

      {/* Multi-month Forecast */}
      {predictions.length > 0 && (
        <div className="mt-4 space-y-2">
          <h3 className="font-semibold">Next 3 Months Forecast:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {predictions.map((p, idx) => (
              <PredictionCard
                key={idx}
                prediction={{ service: selectedService, estimate: `$${p.amount}`, confidence: "80%" }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
