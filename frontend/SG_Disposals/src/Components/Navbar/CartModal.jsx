import React, { useState, useEffect } from "react";
import { FaCoins, FaTimes } from "react-icons/fa";
import TransactionPasscodeModal from "./TransactionPassccodeModal";

const CartModal = ({ isOpen, onClose }) => {
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, [isOpen]);

  const subtotal = cart.reduce((sum, item) => sum + (item.points * item.quantity), 0);
  const taxRate = 0.10; // 10% tax
  const taxAmount = subtotal * taxRate;
  const totalPoints = subtotal + taxAmount;

  if (!isOpen) return null;

  async function handlebuy() {
    const user_id = localStorage.getItem("user_id");
    if(!user_id){
      console.error("'No User Id Found");
      return 1;
    }


  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative text-black">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
        >
          <FaTimes size={14} />
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
          🛒 Your Cart
        </h2>

        {cart.length === 0 ? (
          <p className="text-gray-600 text-center">Your cart is empty.</p>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border-b pb-4"
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-contain rounded border"
                />

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-700 text-start">{item.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 text-start">{item.description}</p>
                  <p className="text-sm text-green-600 mt-1">
                    {item.points} points × {item.quantity}
                  </p>
                </div>

                {/* Item Total */}
                <span className="font-bold text-green-700 whitespace-nowrap flex items-center">
                  <FaCoins size={16} className="text-amber-300"/> ${item.points * item.quantity} pts
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Footer - inline summary */}
        <div className="mt-6 flex justify-between items-center border-t pt-4">
          <span className="text-gray-700 flex">
            Subtotal: <strong>{subtotal}</strong> pts | 
            Tax (10%): <strong>{taxAmount}</strong> pts | 
            Total: <strong className="text-green-600 flex"><FaCoins size={16} className="text-amber-300 ml-4"/> ${totalPoints}</strong> pts
          </span>
          <button className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition"
           onClick={() => {setIsModalOpen(true)}}>
            Buy Now
          </button>
          <TransactionPasscodeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
      </div>
    </div>
  );
};

export default CartModal;
