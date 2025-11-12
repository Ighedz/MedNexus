import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Adeola, Lagos",
    feedback:
      "Finding my mum’s hypertension drugs was so much easier with MedNexus. It saved us a lot of stress.",
  },
  {
    name: "Dr. Bello, Abuja",
    feedback:
      "Our pharmacy’s visibility improved drastically since we joined. Great idea and smooth interface!",
  },
  {
    name: "Chika, Enugu",
    feedback:
      "Love how clean and fast the platform is. I found a nearby pharmacy that had what I needed immediately.",
  },
];

const Testimonials = ({ darkMode }) => {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-8 md:px-20 text-center">
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        What Users Are Saying
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            className={`p-6 sm:p-8 rounded-2xl border shadow-sm ${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-100"
            }`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 italic mb-4 leading-relaxed">
              “{t.feedback}”
            </p>
            <h4 className="font-semibold text-green-500 text-base sm:text-lg">
              {t.name}
            </h4>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
