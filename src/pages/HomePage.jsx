// src/pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar";
import ResultsDropdown from "../components/ResultsDropdown";
import Navbar from "../components/Navbar";
import HowItWorks from "../components/HowItWorks";
import PharmacyCTA from "../components/PharmacyCTA";
import Testimonials from "../components/Testimonials";
import { drugs } from "../mockData";

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

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

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (q.length > 0) {
      const filtered = drugs
        .filter((item) => item.drug.toLowerCase().includes(q))
        .map((item) => item.drug);
      setSuggestions([...new Set(filtered)]);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Navbar />

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
        />
      </div>

      <HowItWorks />
      <PharmacyCTA />
      <Testimonials />

      {/* Hidden Netlify form for detection */}
      <form
        name="mednexus-feedback"
        data-netlify="true"
        netlify-honeypot="bot-field"
        hidden
      >
        <input type="hidden" name="form-name" value="mednexus-feedback" />
        <input type="text" name="features" />
        <input type="text" name="usage" />
        <input type="text" name="preferredSolutions" />
        <select name="wouldUse">
          <option>Yes</option>
          <option>Maybe</option>
          <option>No</option>
        </select>
        <input type="text" name="contact" />
        <input type="hidden" name="bot-field" />
      </form>

      {/* FEEDBACK FORM */}
      <section className="bg-blue-50 py-12 px-4 sm:px-6 lg:px-20 rounded-xl shadow-lg mt-12">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">
          Help Us Improve MedNexus
        </h2>

        {!feedbackSubmitted ? (
          <form
            name="mednexus-feedback"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target;
              fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(new FormData(form)).toString(),
              })
                .then(() => setFeedbackSubmitted(true))
                .catch((err) =>
                  console.error("Form submission failed:", err)
                );
            }}
            className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <input type="hidden" name="form-name" value="mednexus-feedback" />
            <input type="hidden" name="bot-field" />

            <div>
              <label className="block mb-1 font-medium">Features you'd like:</label>
              <textarea
                name="features"
                rows={3}
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="E.g., price comparison, drug availability"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">How would you use MedNexus?</label>
              <textarea
                name="usage"
                rows={3}
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="E.g., checking nearby pharmacy stock"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Preferred solutions:</label>
              <textarea
                name="preferredSolutions"
                rows={3}
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="E.g., real-time stock updates"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Would you use MedNexus?</label>
              <select
                name="wouldUse"
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option>Yes</option>
                <option>Maybe</option>
                <option>No</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Email or phone (optional):</label>
              <input
                type="text"
                name="contact"
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="example@email.com or 08012345678"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        ) : (
          <div className="max-w-3xl mx-auto text-center bg-green-100 border border-green-400 text-green-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Thank you for your feedback!</h3>
            <p>We appreciate your input and may reach out via email or phone.</p>
          </div>
        )}
      </section>

      <footer className="py-10 text-center text-sm text-gray-500 bg-gray-100 mt-auto">
        © {new Date().getFullYear()} MedNexus. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
