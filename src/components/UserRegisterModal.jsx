import React, { useState } from "react";
import { MapPin, Eye, EyeOff } from "lucide-react";

const UserRegisterModal = ({ onClose, onLogin }) => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registered successfully! You can now order.");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />

          <div className="relative">
            <input
              type="text"
              name="address"
              placeholder="Enter Address or use map"
              value={form.address}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg"
              required
            />
            <MapPin className="absolute right-3 top-2.5 text-gray-400 cursor-pointer" />
          </div>

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />

          {/* Password Field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white w-full py-2 rounded-full hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-3 text-gray-600">
          Already have an account?{" "}
          <button onClick={onLogin} className="text-green-500 underline">
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default UserRegisterModal;
