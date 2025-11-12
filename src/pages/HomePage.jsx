import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar";
import ResultsDropdown from "../components/ResultsDropdown";
import Navbar from "../components/Navbar";
import HowItWorks from "../components/HowItWorks";
import PharmacyCTA from "../components/PharmacyCTA";
import Testimonials from "../components/Testimonials";
import { drugs } from "../mockData";

const HomePage = ({ darkMode }) => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // 🔍 Filter results when "Search" is clicked
  const handleSearch = () => {
    const q = query.trim().toLowerCase();
    const loc = location.trim().toLowerCase();

    if (!q && !loc) {
      setResults([]);
      setDropdownOpen(false);
      return;
    }

    const filtered = drugs.filter((item) => {
      const matchesDrug =
        item.drug.toLowerCase().includes(q) ||
        item.pharmacy.toLowerCase().includes(q);
      const matchesLocation = loc
        ? item.location.toLowerCase().includes(loc)
        : true;
      return matchesDrug && matchesLocation;
    });

    setResults(filtered.length > 0 ? filtered : "no-results");
    setDropdownOpen(true);
  };

  // 🧠 Live suggestions while typing
  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (q.length > 0) {
      const filtered = drugs
        .filter((item) => item.drug.toLowerCase().includes(q))
        .map((item) => item.drug);
      setSuggestions([...new Set(filtered)]); // remove duplicates
    } else {
      setSuggestions([]);
    }
  }, [query]);

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Navbar darkMode={darkMode} />

      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-12 lg:px-20 pt-32 sm:pt-36 md:pt-44">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-6xl font-semibold leading-tight mb-6 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Find the Medications You Need,
          <br className="hidden sm:block" /> When You Need Them.
        </motion.h1>

        <div className="w-full flex justify-center px-2 sm:px-4 relative">
          <div className="w-full max-w-md sm:max-w-lg relative">
            <SearchBar
              query={query}
              setQuery={setQuery}
              location={location}
              setLocation={setLocation}
              onSearch={handleSearch}
              suggestions={suggestions}
              onSelectSuggestion={(drug) => {
                setQuery(drug);
                setSuggestions([]);
              }}
            />
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-20 mt-6 mb-10">
        <ResultsDropdown
          results={results}
          visible={dropdownOpen}
          onClose={() => setDropdownOpen(false)}
          query={query}
          darkMode={darkMode}
        />
      </div>

      <HowItWorks darkMode={darkMode} />
      <PharmacyCTA darkMode={darkMode} />
      <Testimonials darkMode={darkMode} />

      <footer className="py-10 text-center text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 mt-auto">
        © {new Date().getFullYear()} MedNexus. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
