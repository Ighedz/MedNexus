// src/pages/PharmacyDashboard/PharmacyDashboard.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LogOut,
  PackagePlus,
  ClipboardList,
  Home,
  Menu,
} from "lucide-react";
import DashboardHeader from "../components/DashboardHeader";
import DashboardHome from "./DashboardHome";
import DrugUpload from "./DrugUpload";
import ProductList from "./ProductList";
import { useNavigate } from "react-router-dom";

import logoWithText from "/src/assets/logo4.png";
import logoIconOnly from "/src/assets/logo5.png";

const PharmacyDashboard = () => {
  const [activePage, setActivePage] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  // ✅ Mock orders
  const [orders, setOrders] = useState([
    { id: 1, name: "Paracetamol 500mg", amount: 1000, location: "Ikeja, Lagos" },
    { id: 2, name: "Ciprofloxacin 250mg", amount: 1800, location: "Surulere, Lagos" },
  ]);

  const [fulfilledOrders, setFulfilledOrders] = useState([]);

  // ✅ Fulfill order
  const handleFulfillOrder = (orderId) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;

    setFulfilledOrders([...fulfilledOrders, { ...order, date: new Date().toLocaleString() }]);
    setOrders(orders.filter((o) => o.id !== orderId));
  };

  const handleLogout = () => {
    alert("You’ve been logged out.");
    navigate("/");
  };

  const renderContent = () => {
    switch (activePage) {
      case "home":
        return <DashboardHome orders={orders} fulfilledOrders={fulfilledOrders} onFulfill={handleFulfillOrder} />;
      case "upload":
        return <DrugUpload />;
      case "products":
        return <ProductList />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 240 : 70 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col justify-between py-6 shadow-md bg-white border-gray-200 border-r"
      >
        {/* Top Section */}
        <div className="flex flex-col items-center">
          {/* Logo */}
          <div className="flex items-center justify-center w-full py-4">
            <img
              src={sidebarOpen ? logoWithText : logoIconOnly}
              alt="MedNexus Logo"
              className={`transition-all object-contain ${
                sidebarOpen ? "max-w-40" : "w-10"
              }`}
            />
          </div>

          {/* Hamburger icon */}
          <Menu
            className="cursor-pointer text-gray-700 hover:text-green-600 transition mb-4"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />

          {/* Menu items */}
          <nav className="flex flex-col gap-3 px-2 w-full">
            {[
              { name: "home", label: "Home", icon: Home },
              { name: "upload", label: "Upload Drug", icon: PackagePlus },
              { name: "products", label: "Product List", icon: ClipboardList },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.name}
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition w-full ${
                    activePage === item.name
                      ? "bg-green-100 text-green-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setActivePage(item.name)}
                >
                  <Icon size={20} />
                  {sidebarOpen && <span>{item.label}</span>}
                </motion.button>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <div className="px-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition w-full"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <motion.main
          className="p-6 overflow-y-auto"
          key={activePage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {renderContent()}
        </motion.main>
      </div>
    </div>
  );
};

export default PharmacyDashboard;
