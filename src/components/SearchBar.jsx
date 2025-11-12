// src/components/SearchBar.jsx
import React from "react";
import { Search, MapPin } from "lucide-react";

const STATES_IN_NIGERIA = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
  "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT - Abuja",
  "Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi",
  "Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo",
  "Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"
];

const SearchBar = ({
  query,
  setQuery,
  location,
  setLocation,
  onSearch,
  suggestions = [],
  onSelectSuggestion, // function receives a selected suggestion (drug or state)
  darkMode,
}) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <div className="relative w-full">
      {/* Main search bar */}
      <div
        className={`flex flex-col sm:flex-row items-center w-full max-w-3xl px-4 py-3 rounded-full border shadow-lg transition-colors
          ${darkMode
            ? "bg-gray-800 border-gray-700 text-gray-200"
            : "bg-white border-gray-200 text-gray-800"
          } space-y-3 sm:space-y-0 sm:space-x-3`}
      >
        {/* Drug input */}
        <div className="flex items-center w-full flex-1 border-b sm:border-b-0 sm:border-r border-gray-300 pr-2">
          <Search className="text-gray-400 mr-2 shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            type="text"
            placeholder="Search for a medication..."
            className={`w-full outline-none bg-transparent text-sm sm:text-base placeholder-gray-400 ${
              darkMode ? "text-gray-100" : "text-gray-800"
            }`}
          />
        </div>

        {/* Location selector */}
        <div className="flex items-center w-full sm:w-48 border-b sm:border-b-0 sm:border-r border-gray-300 pr-2">
          <MapPin className="text-gray-400 mr-2 shrink-0" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={`w-full bg-transparent outline-none text-sm sm:text-base ${
              darkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            <option value="">Select state</option>
            {STATES_IN_NIGERIA.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* Search button */}
        <button
          onClick={onSearch}
          className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 active:scale-95 transition text-sm sm:text-base w-full sm:w-auto"
        >
          Search
        </button>
      </div>

      {/* 🔍 Suggestions dropdown */}
      {suggestions.length > 0 && (
        <ul
          className={`absolute z-30 mt-2 w-full max-w-3xl rounded-xl border shadow-lg overflow-y-auto max-h-56 text-left
            ${darkMode
              ? "bg-gray-800 border-gray-700 text-gray-100"
              : "bg-white border-gray-200 text-gray-800"
            }`}
        >
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => onSelectSuggestion(item)} // Pass the drug object or state to parent
              className={`px-4 py-2 cursor-pointer ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              {typeof item === "string" ? item : item.drug}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
