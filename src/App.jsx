import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PharmacyDashboard from "./pages/PharmacyDashboard";
import HomePage from "./pages/HomePage";
import PharmacyRegisterModal from "./components/PharmacyRegisterModal";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
        <div className="fixed top-20 right-8 z-50 flex items-center">
          {/* keep a top-level dark toggle if you want */}
        </div>

        <Routes>
          <Route path="/" element={<HomePage darkMode={darkMode} openRegisterModal={() => setShowRegisterModal(true)} />} />
          <Route path="/pharmacy-dashboard/*" element={<PharmacyDashboard />} />
        </Routes>

        {showRegisterModal && <PharmacyRegisterModal darkMode={darkMode} onClose={() => setShowRegisterModal(false)} />}
      </div>
    </Router>
  );
}
