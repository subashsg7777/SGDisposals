import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaCoins } from 'react-icons/fa';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  // Track quantity per product (default 1)
  const [quantities, setQuantities] = useState({});

  // Handle quantity change
  const handleQuantityChange = (index, delta) => {
    setQuantities(prev => {
      const newQty = (prev[index] || 1) + delta;
      return {
        ...prev,
        [index]: newQty < 1 ? 1 : newQty, // prevent going below 1
      };
    });
  };

  // Add to cart with quantity
  const handleAddToCart = (product, index) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const quantity = quantities[index] || 1;

    const productWithQty = { ...product, quantity };

    const temp = [...existingCart, productWithQty];
    localStorage.setItem("cart", JSON.stringify(temp));
  };

  useEffect(() => {
    async function handleProductsFetch() {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/product`);
      const data = res.data;
      console.log({ data });
      setProducts(data.products);
    }
    handleProductsFetch();
  }, []);

  return (
    <section className="bg-white py-10 px-6 md:px-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
        <button className="text-green-600 font-medium hover:underline">View All Products</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.isArray(products) && products.map((product, index) => (
          <div key={index} className="border rounded-lg shadow-sm p-4 flex flex-col justify-between">
            <img src={product.image} alt={product.name} className="h-58 object-contain mb-4" />
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-700">{product.name}</h3>
              {product.label && (
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                  {product.label}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-4">{product.description}</p>
            <div className="flex justify-between items-center mb-2">
              <span className="text-green-600 font-bold flex">
                <FaCoins size={30} className='text-amber-300'/> {product.points} points
              </span>
              {/* Quantity Controls */}
            <div className="flex items-center gap-2 mb-4 text-black">
              <button 
                className="px-3 py-1 border border-green-500 bg-white rounded" 
                onClick={() => handleQuantityChange(index, -1)}
              >-</button>
              <span>{quantities[index] || 1}</span>
              <button 
                className="px-3 py-1 border border-green-500 bg-white rounded" 
                onClick={() => handleQuantityChange(index, +1)}
              >+</button>
            </div>

            </div>

            
            <button 
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 block"
              onClick={() => handleAddToCart(product, index)}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
