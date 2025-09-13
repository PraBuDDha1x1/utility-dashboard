import React from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { FiSun, FiMoon, FiUser } from "react-icons/fi";

export default function Topbar({ onMenuClick, isDarkMode, onToggleDarkMode }) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <HiMenuAlt2 className="w-5 h-5" />
        </button>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <FiSun className="w-5 h-5 text-yellow-500" />
            ) : (
              <FiMoon className="w-5 h-5 text-gray-700" />
            )}
          </button>

          {/* User dropdown */}
          <div className="relative">
            <button className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <FiUser className="w-5 h-5" />
              <span className="hidden lg:block text-sm font-medium">
                John Doe
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}