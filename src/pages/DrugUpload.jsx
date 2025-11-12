import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { UploadCloud, X, Camera } from "lucide-react";
import Webcam from "react-webcam";

const DrugUpload = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    expiry: "",
    quantity: "",
    packSize: "",
    category: "",
    requiresPrescription: false,
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [useCamera, setUseCamera] = useState(false);
  const webcamRef = useRef(null);

  const categories = [
    "Prescription-only (POM)",
    "Controlled Drugs (Restricted)",
    "Over-the-Counter (OTC)",
    "Cough Syrup",
    "Household & Personal Care",
    "Baby & Infant Care",
    "Medical Devices & Supplies",
    "Supplements & Wellness",
    "Others",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let updatedFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };

    // Automatically check requiresPrescription for specific categories
    if (name === "category") {
      if (
        value === "Prescription-only (POM)" ||
        value === "Controlled Drugs (Restricted)"
      ) {
        updatedFormData.requiresPrescription = true;
      } else {
        updatedFormData.requiresPrescription = false;
      }
    }

    setFormData(updatedFormData);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
      setUseCamera(false);
    }
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPreview(imageSrc);
    setFormData({ ...formData, image: imageSrc });
    setUseCamera(false);
  };

  const removeImage = () => {
    setFormData({ ...formData, image: null });
    setPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      `✅ Drug uploaded successfully!\n\nName: ${formData.name}\nCategory: ${formData.category}\nRequires Prescription: ${
        formData.requiresPrescription ? "Yes" : "No"
      }`
    );

    setFormData({
      name: "",
      price: "",
      expiry: "",
      quantity: "",
      packSize: "",
      category: "",
      requiresPrescription: false,
      image: null,
    });
    setPreview(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-xl mx-auto rounded-2xl p-8 shadow-md bg-white"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">Upload New Drug</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Image Upload */}
        {preview ? (
          <div className="relative w-40 h-40 mx-auto">
            <img
              src={preview}
              alt="Drug Preview"
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : useCamera ? (
          <div className="flex flex-col items-center">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-64 h-64 rounded-lg"
            />
            <button
              type="button"
              onClick={capturePhoto}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Capture
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2 border-2 border-dashed p-6 rounded-xl cursor-pointer relative">
            <UploadCloud className="w-10 h-10 text-gray-400" />
            <p className="text-gray-500 mb-2">Upload from folder</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div
              className="flex items-center gap-2 mt-2 text-gray-600 cursor-pointer"
              onClick={() => setUseCamera(true)}
            >
              <Camera className="w-5 h-5" />
              <span className="text-sm">Take photo</span>
            </div>
          </div>
        )}

        {/* Drug Name */}
        <input
          name="name"
          placeholder="Drug Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
        />

        {/* Price */}
        <input
          name="price"
          type="number"
          placeholder="Price (₦)"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />

        {/* Expiry Date */}
        <input
          name="expiry"
          type="date"
          value={formData.expiry}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />

        {/* Quantity */}
        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />

        {/* Pack Size */}
        <input
          name="packSize"
          type="number"
          placeholder="Pack Size (e.g., 30)"
          value={formData.packSize}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />

        {/* Category */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Requires Prescription */}
        <label className="flex items-center space-x-2 text-sm">
          <input
            type="checkbox"
            name="requiresPrescription"
            checked={formData.requiresPrescription}
            onChange={handleChange}
            className="w-4 h-4 border-gray-300 rounded"
          />
          <span>Requires prescription</span>
        </label>

        {/* Submit */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition font-medium"
        >
          Upload
        </motion.button>
      </form>
    </motion.div>
  );
};

export default DrugUpload;
