import React, { useState, useMemo } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import toast from "react-hot-toast";
import postOffices from "../../data/pincode.json";

const OffersModal = ({ isOpen, onClose, model, brand }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clean office name
  const cleanOfficeName = (name) =>
    name.replace(/\b(B\.O|D\.O|S\.O)\b/gi, "").trim();

  // Search filter
  const filteredLocations = useMemo(() => {
    if (!location || location.trim().length === 0) {
      return [];
    }

    const query = location.toLowerCase().trim();
    
    return postOffices
      .filter((office) => {
        return (
          office.officename.toLowerCase().includes(query) ||
          office.district.toLowerCase().includes(query) ||
          office.pincode.includes(query) ||
          office.statename.toLowerCase().includes(query)
        );
      })
      .slice(0, 8);
  }, [location]);

  const handleSubmit = async () => {
    if (!name || !contact || !selectedLocation) {
      toast.error("Name, Contact Number and Location are required!");
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "user_data"), {
        name,
        email,
        contact,
        address: {
          pincode: selectedLocation.pincode,
          officeName: cleanOfficeName(selectedLocation.officename),
          district: selectedLocation.district,
          state: selectedLocation.statename,
        },
        car: {
          brand: brand,
          model: model,
        },
        createdAt: new Date(),
      });

      toast.success("Details submitted successfully!");
      onClose();

      // Clear fields
      setName("");
      setEmail("");
      setContact("");
      setLocation("");
      setSelectedLocation(null);
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Something went wrong while saving data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle location selection
  const handleLocationSelect = (office) => {
    setSelectedLocation(office);
    setLocation(
      `${cleanOfficeName(office.officename)}, ${office.district}, ${office.statename} (${office.pincode})`
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg">
        {/* Modal Card */}
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200">
          {/* Header */}
          <div className="bg-white border-b rounded-xl border-gray-200 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Get Exclusive Offers
                </h2>
                <p className="text-gray-600">
                  For your {brand} {model}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-5">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white pr-12"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white pr-12"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Contact Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Enter your contact number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white pr-12"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Location Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Location <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    setSelectedLocation(null);
                  }}
                  placeholder="Search by city, district, or pincode"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white pr-12"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>

                {/* Location Suggestions */}
                {filteredLocations.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredLocations.map((office, idx) => (
                      <div
                        key={`${office.pincode}-${idx}`}
                        onClick={() => handleLocationSelect(office)}
                        className="px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-blue-50 cursor-pointer"
                      >
                        <div className="font-medium text-gray-800">
                          {cleanOfficeName(office.officename)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {office.district}, {office.statename} • {office.pincode}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={onClose}
                disabled={isSubmitting}
                className="px-5 py-2.5 text-gray-700 hover:text-gray-900 font-medium rounded-lg hover:bg-gray-100 disabled:opacity-50 border border-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Submit Details
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Footer Note */}
          <div className="bg-gray-50 px-6 py-3 rounded-xl border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              We'll contact you shortly with personalized offers for your {brand} {model}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersModal;