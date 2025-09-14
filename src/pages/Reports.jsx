import React, { useState } from "react";
import { FiDownload } from "react-icons/fi";

export default function Reports() {
  const allBills = [
    { id: 1, type: "Electricity", amount: 2300, date: "2025-07-01" },
    { id: 2, type: "Water", amount: 450, date: "2025-07-01" },
    { id: 3, type: "Gas", amount: 800, date: "2025-07-01" },
    { id: 4, type: "Electricity", amount: 2500, date: "2025-08-01" },
    { id: 5, type: "Water", amount: 500, date: "2025-08-01" },
  ];

  const [filter, setFilter] = useState("All");

  const filteredBills =
    filter === "All" ? allBills : allBills.filter((b) => b.type === filter);

  // Simple CSV export
  const downloadCSV = () => {
    const headers = ["Type", "Amount", "Date"];
    const rows = filteredBills.map((b) => [b.type, b.amount, b.date]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "bills_report.csv";
    link.click();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Reports</h2>

      {/* Top Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        {/* Filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
        >
          <option value="All">All</option>
          <option value="Electricity">Electricity</option>
          <option value="Water">Water</option>
          <option value="Gas">Gas</option>
        </select>

        {/* Download */}
        <button
          onClick={downloadCSV}
          className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg shadow hover:bg-sky-600 transition"
        >
          <FiDownload /> Download CSV
        </button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl overflow-hidden">
        <table className="table-auto w-full text-left">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredBills.map((bill, idx) => (
              <tr
                key={bill.id}
                className={`${
                  idx % 2 === 0
                    ? "bg-gray-50 dark:bg-gray-900"
                    : "bg-white dark:bg-gray-800"
                } hover:bg-sky-50 dark:hover:bg-gray-700 transition`}
              >
                <td className="px-4 py-3">{bill.type}</td>
                <td className="px-4 py-3">₹{bill.amount}</td>
                <td className="px-4 py-3">{bill.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
