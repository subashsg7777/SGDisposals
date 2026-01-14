import React, { useState, useEffect } from 'react';
import { FaSortAlphaUp } from 'react-icons/fa';
import Navbar from './Navbar';
import Footer from './Footer.jsx';
import api from '../api/axios';
import { FaCoins } from 'react-icons/fa';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [isLasts, setIsLasts] = useState(false);
  const productsPerPage = 16;

  const handleQuantityChange = (index, delta) => {
    setQuantities(prev => {
      const newQty = (prev[index] || 1) + delta;
      return {
        ...prev,
        [index]: newQty < 1 ? 1 : newQty,
      };
    });
  };

  const handleAddToCart = (product, index) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const quantity = quantities[index] || 1;
    const productWithQty = { ...product, quantity };
    localStorage.setItem('cart', JSON.stringify([...existingCart, productWithQty]));
  };

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

  const pageOffset = currentPage * productsPerPage;
  const currentProducts = products; // server returns page-sized results

  const handleNext = () => {
    if (!isLasts) setCurrentPage(prev => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 0) setCurrentPage(prev => prev - 1);
  };

  function handleSortByPoints(e) {
    const order = e.target.value;
    const sorted = [...products].sort((a, b) => {
      const ap = Number(a.points ?? a.price ?? 0);
      const bp = Number(b.points ?? b.price ?? 0);
      return order === 'Ascending' ? ap - bp : bp - ap;
    });
    setProducts(sorted);
  }

  function handleSortByProductName(e) {
    const order = e.target.value;
    const sorted = [...products].sort((a, b) => {
      const an = (a.name ?? '').toString();
      const bn = (b.name ?? '').toString();
      return order === 'Ascending'
        ? an.localeCompare(bn)
        : bn.localeCompare(an);
    });
    setProducts(sorted);
  }

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-green-100 to-white text-center">
        <h1 className="text-black my-8 italic" style={{ fontWeight: '350' }}>
          All Products Available in SG_Disposals Store
        </h1>
        <section className="mb-12">
          <span className="flex justify-around mb-12">
            <span className="flex text-nowrap items-center gap-3">
              <p className="text-sm font-bold text-green-500 text-nowrap">
                Sort By Alphabetic Order <FaSortAlphaUp />
              </p>
              <select
                className="bg-white border border-gray-200 rounded-[6px] px-8 py-[2px] shadow-2xl shadow-black text-black"
                onChange={handleSortByProductName}
              >
                <option value="Ascending">Ascending</option>
                <option value="Descending">Descending</option>
              </select>
            </span>

            <span className="flex text-nowrap items-center gap-3">
              <p className="text-sm font-bold text-green-500 text-nowrap">
                Sort By Points <FaSortAlphaUp />
              </p>
              <select
                className="bg-white rounded-[6px] border border-gray-200 px-8 py-[2px] shadow-2xl shadow-black text-black"
                onChange={handleSortByPoints}
              >
                <option value="Ascending">Ascending</option>
                <option value="Descending">Descending</option>
              </select>
            </span>
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-4">
            {Array.isArray(currentProducts) &&
              currentProducts.map((product, index) => (
                <div
                  key={pageOffset + index}
                  className="border-2 border-gray-300 rounded-lg shadow-sm p-4 flex flex-col justify-between"
                >
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
                      <FaCoins size={30} className="text-amber-300" />{' '}
                      {Number(product.points ?? product.price ?? 0)} points
                    </span>
                    <div className="flex items-center gap-2 mb-4 text-black">
                      <button
                        className="px-3 py-1 border border-green-500 bg-white rounded"
                        onClick={() => handleQuantityChange(pageOffset + index, -1)}
                      >
                        -
                      </button>
                      <span>{quantities[pageOffset + index] || 1}</span>
                      <button
                        className="px-3 py-1 border border-green-500 bg-white rounded"
                        onClick={() => handleQuantityChange(pageOffset + index, +1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 block"
                    onClick={() => handleAddToCart(product, pageOffset + index)}
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
      </div>
      <Footer />
    </>
  );
};

export default AllProducts;
