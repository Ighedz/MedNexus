import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo4.png"; // adjust the path if Navbar is nested

const Navbar = () => {
  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-gray-100 dark:border-gray-700"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6 md:px-12">
        {/* Logo Image */}
        <a href="/">
          <img
            src={logo}
            alt="MedNexus Logo"
            className="h-10 md:h-12" // adjust height as needed
          />
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-gray-600 dark:text-gray-300">
          <li className="hover:text-green-500 cursor-pointer transition">
            <a href="#how-it-works">How it Works</a>
          </li>
          <li className="hover:text-green-500 cursor-pointer transition">
            <a href="#for-pharmacies">For Pharmacies</a>
          </li>
          <li className="hover:text-green-500 cursor-pointer transition">
            <a href="#testimonials">Testimonials</a>
          </li>
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;
