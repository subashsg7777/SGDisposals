import React, { useContext, useEffect, useRef } from 'react';
import { FaMapMarkerAlt, FaBuilding, FaHashtag, FaTimes } from 'react-icons/fa';
import { UserContext } from '../store/UserStore.jsx';
import api from '../api/axios';

const AddAddressModal = ({ isOpen, onClose }) => {
  const { user } = useContext(UserContext);
  const user_id = user ? user.user_id : null;

  const add1Ref = useRef(null);
  const add2Ref = useRef(null);
  const pincodeRef = useRef(null);

  // ✅ Hydrate inputs when modal opens
  useEffect(() => {
    if (isOpen) {
      const address = localStorage.getItem("address");
      if (address) {
        const lines = address.split(",");
        console.log("Hydrating inputs with:", lines);

        if (add1Ref.current) add1Ref.current.value = lines[0]?.trim() || "";
        if (add2Ref.current) add2Ref.current.value = lines[1]?.trim() || "";
        if (pincodeRef.current) pincodeRef.current.value = lines[2]?.trim() || "";
      }
    } else {
      // ✅ Clear inputs when modal closes
      if (add1Ref.current) add1Ref.current.value = "";
      if (add2Ref.current) add2Ref.current.value = "";
      if (pincodeRef.current) pincodeRef.current.value = "";
    }
  }, [isOpen]);

  async function handleAddAddress() {
    const add1 = add1Ref.current.value;
    const add2 = add2Ref.current.value;
    const pincode = pincodeRef.current.value;

    const address = `${add1}, ${add2}, ${pincode}`;
    console.log("The address is ready to be added:", address);

    try {
      const res = await api.post(`${import.meta.env.VITE_BASE_URL}/user/add-request`, {
        user: user_id,
        address
      });

      const data = res.data;
      console.log(data);

      alert(data.message);

      // ✅ Save to localStorage
      localStorage.setItem("address", address);
    } catch (err) {
      console.error("Error adding address:", err);
      alert("Failed to add address. Please try again.");
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 text-black text-start">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
        >
          <FaTimes size={14} />
        </button>

        {/* Header */}
        <div className="flex items-center mb-6">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white mr-3">
            <FaMapMarkerAlt size={16} />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Add Address</h2>
        </div>

        <form className="space-y-5">
          {/* Address Line 1 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address Line 1 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500" size={16} />
              <input
                type="text"
                ref={add1Ref}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                placeholder="Enter street address, building name"
                required
              />
            </div>
          </div>

          {/* Address Line 2 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address Line 2
            </label>
            <div className="relative">
              <FaBuilding className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500" size={16} />
              <input
                type="text"
                ref={add2Ref}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                placeholder="Apartment, suite, unit, floor (optional)"
              />
            </div>
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pincode <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaHashtag className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500" size={16} />
              <input
                type="text"
                ref={pincodeRef}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                placeholder="Enter 6-digit pincode"
                required
              />
            </div>
            <p className="text-sm text-red-500 mt-1 text-center">* NOTE : This Address Will be Used To Collect *</p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={(e) => { e.preventDefault(); handleAddAddress(); }}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddressModal;
