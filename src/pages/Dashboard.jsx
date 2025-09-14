import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { FaBolt, FaTint, FaFire } from "react-icons/fa";

export default function Dashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Dummy bill data (replace with backend data later)
  const bills = [
    { month: "Jan", electricity: 2200, water: 500, gas: 800 },
    { month: "Feb", electricity: 2500, water: 550, gas: 820 },
    { month: "Mar", electricity: 2300, water: 530, gas: 780 },
    { month: "Apr", electricity: 2600, water: 600, gas: 810 },
  ];

  const kpis = [
    {
      name: "Electricity",
      value: "₹2,600",
      icon: <FaBolt className="text-yellow-400 w-6 h-6" />,
      change: "+5%",
      color: "from-yellow-100 to-yellow-50 dark:from-yellow-600/40 dark:to-yellow-700/30",
    },
    {
      name: "Water",
      value: "₹600",
      icon: <FaTint className="text-blue-400 w-6 h-6" />,
      change: "+3%",
      color: "from-blue-100 to-blue-50 dark:from-blue-600/40 dark:to-blue-700/30",
    },
    {
      name: "Gas",
      value: "₹810",
      icon: <FaFire className="text-orange-400 w-6 h-6" />,
      change: "-2%",
      color: "from-orange-100 to-orange-50 dark:from-orange-600/40 dark:to-orange-700/30",
    },
  ];

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Track your utility bills, monitor predictions, and plan ahead.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {kpis.map((kpi) => (
            <div
              key={kpi.name}
              className={`p-6 rounded-xl shadow-lg bg-gradient-to-br ${kpi.color}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{kpi.name}</p>
                  <h3 className="text-2xl font-bold">{kpi.value}</h3>
                  <p className="text-sm text-green-600 dark:text-green-400">{kpi.change} from last month</p>
                </div>
                {kpi.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Monthly Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={bills}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="electricity" stroke="#facc15" name="Electricity" />
              <Line type="monotone" dataKey="water" stroke="#3b82f6" name="Water" />
              <Line type="monotone" dataKey="gas" stroke="#f97316" name="Gas" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <table className="table-auto w-full text-left">
            <thead className="text-gray-600 dark:text-gray-300 border-b">
              <tr>
                <th className="py-2">Date</th>
                <th>Service</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">2025-09-01</td>
                <td>Electricity</td>
                <td>₹2600</td>
                <td className="text-green-600">Predicted</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">2025-08-01</td>
                <td>Water</td>
                <td>₹600</td>
                <td className="text-blue-600">Uploaded</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
