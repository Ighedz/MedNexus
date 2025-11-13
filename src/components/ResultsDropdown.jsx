import React, { useState } from "react";
import { X, MapPin } from "lucide-react";
import UnifiedModal from "./UnifiedModal";

const ResultsDropdown = ({ results, visible, onClose, query }) => {
  const [selectedDrug, setSelectedDrug] = useState(null);

  if (!visible) return null;

  const safeResults = Array.isArray(results) ? results : [];

  const handleView = (drug) => {
    setSelectedDrug(drug);
  };

  return (
    <>
      <div className="w-full max-w-5xl mx-auto mt-4 rounded-2xl shadow-lg border overflow-hidden bg-white relative">
        <div className="flex justify-between items-center p-4 border-b">
          <h4 className="text-sm text-gray-600">
            {safeResults.length > 0
              ? `Search results for “${query}”`
              : `No results found for “${query}”`}
          </h4>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {safeResults.length > 0 ? (
          <ul className="divide-y max-h-[400px] overflow-y-auto">
            {safeResults.map((drug) => (
              <li
                key={drug.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 hover:bg-gray-50 transition"
              >
                <div className="text-center sm:text-left">
                  <p className="font-semibold text-lg">{drug.drug}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-2 justify-center sm:justify-start">
                    <MapPin size={14} className="text-green-600" />
                    {drug.pharmacy} — {drug.location}
                  </p>
                </div>

                <div className="mt-3 sm:mt-0 text-center sm:text-right">
                  <p className="font-semibold text-green-600">
                    ₦{drug.price?.toLocaleString?.() ?? drug.price}
                  </p>
                  <button
                    onClick={() => handleView(drug)}
                    className="text-sm underline text-green-600 mt-1 hover:text-green-700"
                  >
                    View
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-6 text-center text-gray-500">
            No match found for your search or selected location.
          </div>
        )}
      </div>

      {/* Unified Modal */}
      {selectedDrug && (
        <UnifiedModal drug={selectedDrug} onClose={() => setSelectedDrug(null)} />
      )}
    </>
  );
};

export default ResultsDropdown;
