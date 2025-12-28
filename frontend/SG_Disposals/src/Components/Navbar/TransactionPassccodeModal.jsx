import axios from "axios";
import React, { useState } from "react";

const TransactionPasscodeModal = ({ isOpen, onClose }) => {
  const [passcode, setPasscode] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
      setPasscode(value);
  };

  const handleSubmit = () => {

        const user_id = localStorage.getItem("user_id");
        const cart = JSON.parse(localStorage.getItem("cart"));
        console.log({cart});
        
        cart.map(async (item) => {
          const product_id = item.id;
          const Transactional_password = passcode;
          console.log("Your Password for this Transaction is : ",Transactional_password);
          
          const quantity = item.quantity;
          const res = await axios.post("http://localhost:8080/api/v1/product/buy",{user_id,product_id,Transactional_password,quantity});

          const data = res.data;
          console.log(`Data for ${item.id} is : `,data);
          
        });


      setPasscode("");
      onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Enter Transaction Passcode
        </h2>
        <input
          type="password"
          value={passcode}
          onChange={handleChange}
          maxLength={6}
          className="w-full border rounded px-3 py-2 text-center tracking-widest text-lg"
          placeholder="••••••"
        />
        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionPasscodeModal;
