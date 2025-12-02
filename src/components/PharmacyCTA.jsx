import React, { useState } from "react";
import { motion } from "framer-motion";
import { Building2, ArrowRight, LogIn } from "lucide-react";
import PharmacyRegisterModal from "./PharmacyRegisterModal";
import PharmacyLoginModal from "./PharmacyLoginModal";

const PharmacyCTA = ({ darkMode }) => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <section
     id="for-pharmacies"
      className={`py-20 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-20 text-center transition-colors duration-500 ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-green-50 text-gray-900"
      }`}
    >
      <motion.div
        className="max-w-4xl mx-auto flex flex-col items-center space-y-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div
          className={`flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full mb-6 ${
            darkMode ? "bg-green-900/40" : "bg-green-100"
          }`}
        >
          <Building2 className="w-7 h-7 sm:w-8 sm:h-8 text-green-500" />
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 leading-snug">
          Are You a Pharmacy Owner?
        </h2>

        <p
          className={`max-w-2xl mb-10 text-base sm:text-lg ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Join <span className="text-green-500 font-medium">MedNexus</span> and
          showcase your available medications to thousands of users searching
          daily. Get discovered, increase visibility, and boost sales.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          <motion.button
            onClick={() => setShowRegister(true)}
            className="flex items-center justify-center space-x-2 bg-green-500 text-white px-6 sm:px-7 py-3 rounded-full font-medium hover:bg-green-600 active:scale-95 transition w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Register Your Pharmacy</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <motion.button
            onClick={() => setShowLogin(true)}
            className="flex items-center justify-center space-x-2 bg-gray-300 text-gray-900 px-6 sm:px-7 py-3 rounded-full font-medium hover:bg-gray-400 active:scale-95 transition w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Login</span>
            <LogIn className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>

      {/* Modals */}
      {showRegister && (
        <PharmacyRegisterModal
          darkMode={darkMode}
          onClose={() => setShowRegister(false)}
        />
      )}
      {showLogin && (
        <PharmacyLoginModal
          darkMode={darkMode}
          onClose={() => setShowLogin(false)}
        />
      )}
    </section>
  );
};

export default PharmacyCTA;
