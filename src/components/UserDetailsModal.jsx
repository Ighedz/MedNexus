import React, { useState } from "react";
import { X } from "lucide-react";

const UserDetailsModal = ({ onClose, onComplete }) => {
  const [details, setDetails] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!details.name || !details.phone || !details.address) return alert("Please fill all fields");
    onComplete(details);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={22} />
        </button>

        <h2 className="text-lg font-semibold mb-4 text-center">Enter Your Details</h2>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={details.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 outline-none"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={details.phone}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 outline-none"
              placeholder="08012345678"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Delivery Address</label>
            <textarea
              name="address"
              value={details.address}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 outline-none"
              placeholder="Enter your delivery address"
              rows="3"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 mt-5"
        >
          Complete Order
        </button>
      </div>
    </div>
  );
};

export default UserDetailsModal;
