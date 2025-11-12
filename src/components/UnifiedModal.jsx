import React, { useState, useEffect } from "react";
import { X, Upload, MessageSquare, CheckCircle, MapPin, Phone } from "lucide-react";

const UnifiedModal = ({ drug, onClose }) => {
  const [step, setStep] = useState("view"); // 'view' | 'prescription' | 'complete'
  const [file, setFile] = useState(null);
  const [comment, setComment] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (drug?.requiresPrescription) setStep("prescription");
    else setStep("view");
  }, [drug]);

  if (!drug) return null;

  const total = drug.price * quantity;

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleSubmitPrescription = () => setStep("complete");
  const handleOrderClick = () => setStep("complete");

  const openMap = () => {
    const query = encodeURIComponent(`${drug.pharmacy}, ${drug.location}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-lg overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={22} />
        </button>

        {/* Product or Prescription Info */}
        {(step === "view" || step === "prescription") && (
          <>
            <div className="flex flex-col items-center mb-4">
              <img
                src={drug.image}
                alt={drug.name || drug.drug}
                className="w-32 h-32 object-cover rounded-lg mb-3"
              />
              <h2 className="text-xl font-bold text-center">
                {drug.name || drug.drug}
              </h2>
              <p className="text-sm text-gray-500">
                {drug.category} —{" "}
                {drug.requiresPrescription ? "Prescription Drug" : "Over-the-Counter"}
              </p>
            </div>

            <div className="space-y-2 mb-4">
              <p className="font-semibold text-green-600 text-lg">
                ₦{drug.price?.toLocaleString?.() ?? drug.price}
              </p>
              <p className="text-sm text-gray-600">
                Quantity Available: {drug.quantity}
              </p>
              <p className="text-sm text-gray-600">Pack Size: {drug.packSize}</p>
              {drug.expiry && (
                <p className="text-sm text-gray-600">Expiry Date: {drug.expiry}</p>
              )}
            </div>

            {/* Only show order options for non-prescription */}
            {!drug.requiresPrescription && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium">Order Quantity</label>
                  <input
                    type="number"
                    min="1"
                    max={drug.quantity}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border rounded-lg px-2 py-1 w-20 text-center"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
                  {/* Order Online */}
                  <button
                    onClick={handleOrderClick}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                  >
                    Order Online
                  </button>

                  {/* Visit Pharmacy */}
                  <button
                    onClick={openMap}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    <MapPin size={18} />
                    {drug.location}, {drug.pharmacy}
                  </button>
                </div>
              </>
            )}

            {/* Prescription Upload & Chat */}
            {drug.requiresPrescription && (
              <div className="space-y-4 mt-4 border-t pt-4">
                <div className="border rounded-lg p-3 w-full">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Upload size={18} />
                    <span>Upload prescription</span>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  {file && (
                    <p className="text-sm text-green-600 mt-2">
                      {file.name} uploaded successfully.
                    </p>
                  )}
                  <div className="flex items-center gap-2 border rounded-lg p-2 mt-2">
                    <MessageSquare size={18} />
                    <input
                      type="text"
                      placeholder="Add any comment (optional)"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="flex-1 outline-none text-sm"
                    />
                  </div>
                  <button
                    onClick={handleSubmitPrescription}
                    disabled={!file}
                    className={`w-full py-2 rounded-lg mt-3 ${
                      file
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Submit Prescription
                  </button>
                </div>

                {/* OR Divider */}
                <div className="text-center text-gray-400 font-medium">----- OR -----</div>

                {/* Chat & Contact */}
                <div className="flex flex-col items-center gap-2">
                  <a
                    href={`https://wa.me/${drug.pharmacyPhone || "2340000000000"}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                  >
                    Chat with Pharmacy
                  </a>
                  {drug.pharmacyPhone && (
                    <p className="text-sm text-gray-700 flex items-center gap-2 justify-center">
                      <Phone size={16} className="text-green-600" />
                      {drug.pharmacyPhone}
                    </p>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* Order Completion View */}
        {step === "complete" && (
          <div className="text-center">
            <CheckCircle
              size={48}
              className="text-green-500 mx-auto mb-4 animate-bounce"
            />
            <h3 className="text-lg font-semibold mb-2">Order Placed!</h3>
            <p className="text-gray-600 mb-4">
              Your order for <strong>{drug.name || drug.drug}</strong> has been
              successfully placed. The pharmacy will reach out via call or text.
            </p>
            <p className="text-gray-800 font-medium mb-6">
              Total: ₦{total?.toLocaleString?.() ?? total}
            </p>
            <button
              onClick={onClose}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnifiedModal;
