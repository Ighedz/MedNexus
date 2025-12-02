import React from "react";
import { motion } from "framer-motion";
import { MapPin, Database, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: <MapPin className="w-10 h-10 text-green-500" />,
    title: "Locate Pharmacies",
    desc: "Easily find nearby pharmacies with available stock.",
  },
  {
    icon: <Database className="w-10 h-10 text-green-500" />,
    title: "Real-Time Inventory",
    desc: "Get accurate information on drug availability and compare prices.",
  },
  {
    icon: <CheckCircle className="w-10 h-10 text-green-500" />,
    title: "Order or Visit",
    desc: "Reserve or walk in to pick up your medication hassle-free.",
  },
];

const HowItWorks = ({ darkMode }) => {
  return (
    <section  id="how-it-works" className="py-20 px-4 sm:px-8 md:px-20 text-center">
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        How It Works
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            className={`p-8 rounded-2xl shadow-md border ${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-100"
            }`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center">
              {step.icon}
              <h3 className="text-lg sm:text-xl font-semibold mt-4 mb-2">
                {step.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
