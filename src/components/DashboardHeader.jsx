
import React from "react";

const DashboardHeader = ({ darkMode }) => {
  return (
    <header
      className={`flex items-center justify-between px-6 py-4 border-b shadow-sm transition-all duration-300 ${
        darkMode
          ? "bg-gray-800 border-gray-700 text-white"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      <h2 className="text-xl font-semibold">Pharmacy Dashboard</h2>
      <div className="flex items-center gap-3">
        <span
          className={`font-medium ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Welcome!
        </span>
        
      </div>
    </header>
  );
};

export default DashboardHeader;
