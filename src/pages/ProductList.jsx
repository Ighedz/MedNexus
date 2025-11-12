import React, { useState } from "react";
import { motion } from "framer-motion";
import { Edit3, Trash2, X } from "lucide-react";

const ProductList = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Amoxicillin 500mg",
      price: 1200,
      expiry: "2025-12-01",
      quantity: 30,
      packSize: 10,
      category: "Prescription-only (POM)",
      requiresPrescription: true,
      image: "https://via.placeholder.com/120x120?text=Amoxicillin",
    },
    {
      id: 2,
      name: "Ibuprofen 400mg",
      price: 850,
      expiry: "2026-03-15",
      quantity: 50,
      packSize: 20,
      category: "Over-the-Counter (OTC)",
      requiresPrescription: false,
      image: "https://via.placeholder.com/120x120?text=Ibuprofen",
    },
  ]);

  const [editingProduct, setEditingProduct] = useState(null);

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct({ ...product }); // clone for editing
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditingProduct({
      ...editingProduct,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    setProducts(
      products.map((p) => (p.id === editingProduct.id ? editingProduct : p))
    );
    setEditingProduct(null);
  };

  const handleCancel = () => setEditingProduct(null);

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl p-6 shadow-sm bg-white"
    >
      <h2 className="text-2xl font-semibold mb-6">Uploaded Drugs Catalog</h2>

      {products.length === 0 ? (
        <p className="text-gray-500 text-center">No products uploaded yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ scale: 1.02 }}
              className="rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-white"
            >
              <div className="relative w-full h-40 bg-gray-100">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>

              <div className="p-4 space-y-1">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="text-gray-500 text-sm">₦{p.price.toLocaleString()}</p>
                <p
                  className={`text-sm ${
                    new Date(p.expiry) < new Date() ? "text-red-500" : "text-gray-600"
                  }`}
                >
                  Expiry: {p.expiry}
                </p>
                <p className="text-sm">Qty: {p.quantity}</p>
                <p className="text-sm">Pack Size: {p.packSize}</p>
                <p className="text-sm">Category: {p.category}</p>
                <p className="text-sm">
                  Prescription: {p.requiresPrescription ? "Yes" : "No"}
                </p>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => handleEditClick(p)}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg text-sm bg-blue-500 text-white hover:bg-blue-600 transition"
                  >
                    <Edit3 className="w-4 h-4" /> Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg text-sm bg-red-500 text-white hover:bg-red-600 transition"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="bg-white p-6 rounded-xl w-full max-w-md relative"
          >
            <button
              onClick={handleCancel}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-semibold mb-4 text-center">Edit Product</h3>

            <div className="space-y-3">
              <input
                name="name"
                placeholder="Drug Name"
                value={editingProduct.name}
                onChange={handleEditChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                name="price"
                type="number"
                placeholder="Price (₦)"
                value={editingProduct.price}
                onChange={handleEditChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                name="expiry"
                type="date"
                value={editingProduct.expiry}
                onChange={handleEditChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                name="quantity"
                type="number"
                placeholder="Quantity"
                value={editingProduct.quantity}
                onChange={handleEditChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                name="packSize"
                type="number"
                placeholder="Pack Size"
                value={editingProduct.packSize}
                onChange={handleEditChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <select
                name="category"
                value={editingProduct.category}
                onChange={handleEditChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  name="requiresPrescription"
                  checked={editingProduct.requiresPrescription}
                  onChange={handleEditChange}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded"
                />
                <span>Requires Prescription</span>
              </label>

              <motion.button
                onClick={handleSave}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 mt-3"
              >
                Save Changes
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default ProductList;
