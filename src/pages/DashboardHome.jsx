import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardCheck,
  ChevronDown,
  ChevronUp,
  User,
  MapPin,
  Phone,
  Pill,
  Trash2,
} from "lucide-react";

const DashboardHome = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      clientName: "Dr. Sarah Johnson",
      clientPhone: "+2348012345678",
      clientAddress: "Lagos Mainland",
      drug: "Amoxicillin 500mg",
      quantity: 2,
      packSize: 10,
      price: 2500,
      category: "Prescription-only (POM)",
      requiresPrescription: true,
      attachment: "/mock-prescriptions/amoxicillin.png",
      status: "Pending",
      date: "2025-11-07",
    },
    {
      id: 2,
      clientName: "John Doe",
      clientPhone: "+2348098765432",
      clientAddress: "Ikeja, Lagos",
      drug: "Paracetamol 1g",
      quantity: 5,
      packSize: 20,
      price: 500,
      category: "Over-the-Counter (OTC)",
      requiresPrescription: false,
      status: "Pending",
      date: "2025-11-06",
    },
  ]);

  const [fulfilledOrders, setFulfilledOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [showRecent, setShowRecent] = useState(true);
  const [showFulfilled, setShowFulfilled] = useState(false);

  const toggleDetails = (id) => setExpandedOrder(expandedOrder === id ? null : id);

  const markFulfilled = (id) => {
    const fulfilled = orders.find((order) => order.id === id);
    if (fulfilled) {
      setFulfilledOrders((prev) => [...prev, { ...fulfilled, status: "Fulfilled" }]);
      setOrders((prev) => prev.filter((order) => order.id !== id));
    }
    setExpandedOrder(null);
  };

  const deleteOrder = (id) => setOrders((prev) => prev.filter((order) => order.id !== id));

  const openLocation = (address) => {
    const query = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank");
  };

  return (
    <motion.div className="space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      {/* Recent Orders */}
      <section>
        <div
          className="flex justify-between items-center cursor-pointer mb-4"
          onClick={() => setShowRecent(!showRecent)}
        >
          <h2 className="text-2xl font-semibold tracking-tight">Recent Orders ({orders.length})</h2>
          {showRecent ? <ChevronUp /> : <ChevronDown />}
        </div>

        <AnimatePresence>
          {showRecent && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="rounded-2xl p-6 shadow-sm border bg-white">
                {orders.length === 0 ? (
                  <p className="text-gray-500 text-center">No recent orders.</p>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <div key={order.id} className="py-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div>
                            <p className="font-medium text-lg">{order.drug}</p>
                            <p className="text-sm text-gray-500">
                              Ordered by: {order.clientName} • {order.date}
                            </p>
                          </div>

                          <div className="flex items-center mt-3 md:mt-0 space-x-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                order.status === "Fulfilled"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-yellow-100 text-yellow-600"
                              }`}
                            >
                              {order.status}
                            </span>

                            <button
                              onClick={() => toggleDetails(order.id)}
                              className="flex items-center text-blue-500 text-sm hover:underline"
                            >
                              {expandedOrder === order.id ? (
                                <>
                                  <ChevronUp className="w-4 h-4 mr-1" />
                                  Hide Details
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="w-4 h-4 mr-1" />
                                  View Details
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        <AnimatePresence>
                          {expandedOrder === order.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-4 p-5 rounded-xl border bg-gray-50 border-gray-200"
                            >
                              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center space-x-2">
                                  <User className="w-4 h-4 text-gray-400" />
                                  <span>{order.clientName}</span>
                                </div>

                                <div className="flex items-center space-x-2">
                                  <Phone className="w-4 h-4 text-gray-400" />
                                  <span>{order.clientPhone}</span>
                                </div>

                                <button
                                  onClick={() => openLocation(order.clientAddress)}
                                  className="flex items-center space-x-2 text-blue-500 hover:underline"
                                >
                                  <MapPin className="w-4 h-4" />
                                  <span>{order.clientAddress}</span>
                                </button>

                                <div className="flex items-center space-x-2">
                                  <Pill className="w-4 h-4 text-gray-400" />
                                  <span>
                                    {order.drug} • Qty: {order.quantity} • Pack: {order.packSize}
                                  </span>
                                </div>

                                <div>
                                  <span className="font-medium">Category: </span>
                                  {order.category} <br />
                                  <span className="font-medium">Prescription: </span>
                                  {order.requiresPrescription ? "Yes" : "No"}
                                </div>

                                <div>
                                  <span className="font-medium">Total: </span>₦{order.price * order.quantity}
                                </div>

                                {order.requiresPrescription && order.attachment && (
                                  <div className="col-span-2 mt-2">
                                    <a
                                      href={order.attachment}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-500 underline text-sm"
                                    >
                                      View Prescription
                                    </a>
                                  </div>
                                )}
                              </div>

                              {/* CTA Buttons */}
                              <div className="flex flex-wrap gap-3 mt-5">
                                <button
                                  onClick={() => markFulfilled(order.id)}
                                  className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition text-sm font-medium"
                                >
                                  <ClipboardCheck className="w-4 h-4" />
                                  <span>Fulfill Order</span>
                                </button>

                                <button
                                  onClick={() => deleteOrder(order.id)}
                                  className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition text-sm font-medium"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  <span>Delete Order</span>
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Fulfilled Orders */}
      <section>
        <div
          className="flex justify-between items-center cursor-pointer mb-4"
          onClick={() => setShowFulfilled(!showFulfilled)}
        >
          <h2 className="text-2xl font-semibold tracking-tight">
            Fulfilled Orders ({fulfilledOrders.length})
          </h2>
          {showFulfilled ? <ChevronUp /> : <ChevronDown />}
        </div>

        <AnimatePresence>
          {showFulfilled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="rounded-2xl p-6 shadow-sm border bg-white">
                {fulfilledOrders.length === 0 ? (
                  <p className="text-gray-500 text-center">No fulfilled orders yet.</p>
                ) : (
                  <div className="space-y-3">
                    {fulfilledOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0"
                      >
                        <div>
                          <p className="font-medium">{order.drug}</p>
                          <p className="text-sm text-gray-500">
                            {order.clientName} • {order.clientPhone} • {order.clientAddress}
                          </p>
                        </div>
                        <span className="text-green-600 font-medium">
                          ₦{order.price * order.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </motion.div>
  );
};

export default DashboardHome;
