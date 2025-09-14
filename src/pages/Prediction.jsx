// src/pages/Prediction.jsx
import React, { useContext, useEffect, useState } from "react";
import PredictionCard from "../components/PredictionCard";
import ServiceSelector from "../components/ServiceSelector";
import { DashboardContext } from "../context/DashboardContext";

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

  // Prefill from Chatbot if available
  useEffect(() => {
    if (prefillData && formData.pastBills.length === 0) {
      setFormData(prefillData);
    }
  }, [prefillData]);


  // Update predictions when formData or service changes
  useEffect(() => {
    generatePredictions(formData);
    setSinglePrediction({
      service: selectedService,
      estimate:
        formData.pastBills.length > 0
          ? `$${(formData.pastBills[formData.pastBills.length - 1] * 1.05).toFixed(2)}`
          : "$0.00",
      confidence: "85%",
    });
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
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                familySize: Number(e.target.value),
              }))
            }
            className="border p-1 rounded w-20"
          />
        </div>

        <div>
          <label htmlFor="appliances-input" className="font-semibold mr-2">
            Appliances:
          </label>
          <input
            id="appliances-input"
            type="text"
            value={formData.appliances.join(", ")}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                appliances: e.target.value
                  .split(",")
                  .map((a) => a.trim())
                  .filter(Boolean),
              }))
            }
            placeholder="AC, Heater, Fridge"
            className="border p-1 rounded w-60"
          />
        </div>

        <div>
          <label htmlFor="pastBills-input" className="font-semibold mr-2">
            Past Bills:
          </label>
          <input
            id="pastBills-input"
            type="text"
            value={formData.pastBills.join(", ")}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                pastBills: e.target.value
                  .split(",")
                  .map((b) => parseFloat(b.trim()) || 0)
                  .filter((b) => b >= 0),
              }))
            }
            placeholder="120, 150, 130"
            className="border p-1 rounded w-60"
          />
        </div>
      </div>

      {/* Single ML Prediction */}
      <PredictionCard prediction={singlePrediction} />

      {/* Multi-month Forecast */}
      {predictions.length > 0 && (
        <div className="mt-4 space-y-2">
          <h3 className="font-semibold">Next 3 Months Forecast:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {predictions.map((p, idx) => (
              <PredictionCard key={idx} month={p.month} amount={p.amount} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
