// src/components/PredictionCard.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

/**
 * PredictionCard shows either:
 *  - single prediction object { service, estimate, confidence }
 *  - OR multiple monthly forecasts [{ month, amount }]
 * Props:
 *  - prediction: object | null
 *  - forecasts: array | null
 */
export default function PredictionCard({ prediction = null, forecasts = null }) {
  // Render multi-month bar chart if forecasts exist
  if (forecasts && forecasts.length > 0) {
    return (
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg animate-fadeIn">
        <h3 className="text-lg font-semibold mb-4">Upcoming Bill Forecast</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={forecasts} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={document.documentElement.classList.contains('dark') ? "#4b5563" : "#e5e7eb"} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: document.documentElement.classList.contains('dark') ? "#d1d5db" : "#374151" }} />
            <YAxis tick={{ fontSize: 12, fill: document.documentElement.classList.contains('dark') ? "#d1d5db" : "#374151" }} />
            <Tooltip formatter={(value) => `$${value}`} />
            <Bar
              dataKey="amount"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Render single prediction card or placeholder
  return (
    <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg animate-fadeIn">
      <h3 className="text-lg font-semibold">Prediction Result</h3>
      {!prediction ? (
        <p className="mt-3 text-gray-600 dark:text-gray-300">
          Upcoming Bill Prediction will appear here after upload or Chatbot prefill.
        </p>
      ) : (
        <div className="mt-4 space-y-2">
          <p className="text-sm text-gray-500">
            Service: <strong>{prediction.service}</strong>
          </p>
          <p className="text-2xl font-bold">{prediction.estimate}</p>
          <p className="text-xs text-gray-500">Confidence: {prediction.confidence}</p>
        </div>
      )}
    </div>
  );
}
