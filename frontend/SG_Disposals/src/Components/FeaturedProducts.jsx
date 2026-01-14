import api from '../api/axios';
import React, { useEffect, useState } from 'react';
import { FaCoins } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [currentPage, setCurrentPage] = useState(0); 
  const [isLasts, setIsLasts] = useState(false);
  const productsPerPage = 4; 
  const navigate = useNavigate();

  // Quantity change handler
  const handleQuantityChange = (index, delta) => {
    setQuantities(prev => {
      const newQty = (prev[index] || 1) + delta;
      return {
        ...prev,
        [index]: newQty < 1 ? 1 : newQty, 
      };
    });
  };

  // Add to cart handler
  const handleAddToCart = (product, index) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const quantity = quantities[index] || 1;

    const productWithQty = { ...product, quantity };
    const temp = [...existingCart, productWithQty];
    localStorage.setItem("cart", JSON.stringify(temp));
  };

  // Fetch products from API
  useEffect(() => {
    async function handleProductsFetch() {
      const res = await api.get(
        `${import.meta.env.VITE_BASE_URL}/product?page=${currentPage}&size=${productsPerPage}`
      );
      const data = res.data;
      setProducts(data.products);
      setIsLasts(data.last);
    }
    handleProductsFetch();
  }, [currentPage]);

  // Server already paginates, so no need to slice again
  const currentProducts = products;

  // Pagination handlers
  const handleNext = () => {
    if (!isLasts) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <section className="bg-white py-10 px-6 md:px-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
        <button 
          className="text-green-600 font-medium hover:underline" 
          onClick={() => navigate("/products")}
        >
          View All Products
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.isArray(currentProducts) && currentProducts.map((product, index) => (
          <div key={index} className="border rounded-lg shadow-sm p-4 flex flex-col justify-between">
            <img 
              src={product.image || product.imageUrl} 
              alt={product.name} 
              className="h-58 object-contain mb-4" 
            />
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
                <FaCoins size={30} className='text-amber-300'/> {product.points || product.price} points
              </span>
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

      {/* Pagination buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <button 
          className="px-4 py-2 bg-green-500 rounded" 
          onClick={handlePrevious} 
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <button 
          className="px-4 py-2 bg-green-500 rounded" 
          onClick={handleNext} 
          disabled={isLasts}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default FeaturedProducts;
