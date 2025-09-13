import React from "react";

/**
 * PredictionCard shows results or placeholder.
 *  - prediction: object | null
 * Props:
 */
export default function PredictionCard({ prediction = null }) {
  return (
    <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-lg font-semibold">Prediction Result</h3>
      {!prediction ? (
        <p className="mt-3 text-gray-600 dark:text-gray-300">
          Upcoming Bill Prediction will appear here after upload.
        </p>
      ) : (
        <div className="mt-4 space-y-2">
          <p className="text-sm text-gray-500">Service: <strong>{prediction.service}</strong></p>
          <p className="text-2xl font-bold">{prediction.estimate}</p>
          <p className="text-xs text-gray-500">Confidence: {prediction.confidence}</p>
        </div>
      )}
    </div>
  );
}
