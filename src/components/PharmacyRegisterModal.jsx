import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PharmacyRegisterModal = ({ darkMode, onClose }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pharmacyName: "",
    ownerName: "",
    superintendentLicense: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pharmacy registered successfully!");
    onClose();
    navigate("/pharmacy-dashboard");
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <motion.div
        className={`w-full max-w-lg rounded-2xl shadow-lg p-8 relative ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
        }`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Register Your Pharmacy
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {[
            { name: "pharmacyName", placeholder: "Pharmacy Name" },

            {
              name: "superintendentLicense",
              placeholder: "Superintendent Pharmacist License Number",
            },
            { name: "email", placeholder: "Email", type: "email" },
            { name: "phone", placeholder: "Phone Number", type: "tel" },
            { name: "address", placeholder: "Address" },
            { name: "city", placeholder: "City / State" },
            { name: "password", placeholder: "Password", type: "password" },
            {
              name: "confirmPassword",
              placeholder: "Confirm Password",
              type: "password",
            },
          ].map((input) => (
            <input
              key={input.name}
              {...input}
              value={formData[input.name]}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          ))}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-green-500 text-white py-3 rounded-lg mt-4 hover:bg-green-600 transition"
          >
            Register
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default PharmacyRegisterModal;
