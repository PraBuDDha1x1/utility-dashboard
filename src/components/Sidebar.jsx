import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDashboard, MdUploadFile, MdTimeline, MdTableChart } from "react-icons/md";
import { HiX } from "react-icons/hi";

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", icon: MdDashboard, path: "/" },
    { name: "Upload", icon: MdUploadFile, path: "/upload" },
    { name: "Prediction", icon: MdTimeline, path: "/prediction" },
    { name: "Reports", icon: MdTableChart, path: "/reports" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <div className="w-64 min-h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="h-16 flex items-center px-4">
              <span className="text-xl font-bold bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
                UtilityPredict
              </span>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 p-4 space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                      transition-all duration-200
                      ${isActive
                        ? "bg-sky-500 text-white shadow-lg"
                        : "text-gray-700 dark:text-gray-200 hover:bg-sky-50 dark:hover:bg-gray-700"
                      }
                    `}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800
          transform transition-transform duration-300 ease-in-out
          md:hidden
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center justify-between px-4 border-b dark:border-gray-700">
            <span className="text-xl font-bold bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
              UtilityPredict
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <HiX className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={onClose}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${isActive
                      ? "bg-sky-500 text-white shadow-lg"
                      : "text-gray-700 dark:text-gray-200 hover:bg-sky-50 dark:hover:bg-gray-700"
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
