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

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

export default function PredictionCard({ prediction = null, forecasts = null }) {
  const hasForecasts = forecasts && forecasts.length > 0;

  return (
    <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg animate-fadeIn">
      <h3 className="text-lg font-semibold mb-4">
        {hasForecasts ? "Upcoming Bill Forecast" : "Prediction Result"}
      </h3>

      {hasForecasts ? (
        // Forecast chart
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={forecasts}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-gray-200 dark:stroke-gray-600"
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              className="text-gray-700 dark:text-gray-300"
            />
            <YAxis
              tick={{ fontSize: 12 }}
              className="text-gray-700 dark:text-gray-300"
            />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      ) : !prediction ? (
        // Empty state
        <p className="mt-3 text-gray-600 dark:text-gray-300">
          Upcoming Bill Prediction will appear here after upload or Chatbot prefill.
        </p>
      ) : (
        // Single prediction
        <div className="space-y-2">
          <p className="text-sm text-gray-500">
            Service: <strong>{prediction.service}</strong>
          </p>
          <p className="text-2xl font-bold">
            {formatCurrency(prediction.estimate)}
          </p>
          <p className="text-xs text-gray-500">
            Confidence: {prediction.confidence}
          </p>
        </div>
      )}
    </div>
  );
}
