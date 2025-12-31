import React, { useEffect, useState } from 'react'
import logo from "../../public/icon.png";
import { useNavigate } from 'react-router-dom';
import { FaCoins } from 'react-icons/fa';
import axios from 'axios';
import { FaCartArrowDown } from 'react-icons/fa6';
import CartModal from "./Navbar/CartModal";

const Navbar = ({ setShowModal,serviceRef }) => {
  const [role, setRole] = useState(" ");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [coin, setCoin] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // NEW STATE
  const navigate = useNavigate();

  useEffect(() => {
    const credentials = localStorage.getItem("role");
    if (!credentials) {
      setRole("Guest");
    }
    if (credentials === "COLLECTOR") {
      setRole("COLLECTOR");
    }
    if (credentials === "USER") {
      setRole("USER");
    }

    async function handlePointsFetch() {
      const user_id = localStorage.getItem("user_id");
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/Get-points?id=${user_id}`);
      const data = res.data;
      setCoin(data);
    }
    handlePointsFetch();
  }, []);

  function handleScrollToServices(){
    if(serviceRef?.current){
      serviceRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navbar h-20 flex items-center bg-white relative">
      <section className="h-full flex items-center p-3">
        <img src={logo} alt="SG_Disposals Icon" className="h-full" />
        <h2 className="text-black text-start text-2xl italic font-bold p-0">
          <span className="text-green-600 font-extrabold text-3xl mx-0">SG</span> Disposals
        </h2>
      </section>

      <section className="mx-[25%] items-center">
        <ol className="text-gray-600 flex justify-between gap-4 mx-4">
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={handleScrollToServices}>Services</li>
          <li onClick={() => setShowModal(true)}>Schedule</li>
          <li onClick={() => navigate("/About-Us")}>About</li>
          <li onClick={() => navigate("/Contact-us")}>Contact</li>
        </ol>
      </section>

      <section className="items-center flex gap-2 relative">
        {role === "Guest" ? (
          <>
            <button
              className="text-black rounded-xl h-fit w-fit p-2 text-center"
              onClick={() => navigate("/signup")}
            >
              Sign In
            </button>
            <button
              className="bg-green-500 text-white font-bold italic rounded-xl h-fit w-fit p-2 px-6 text-center"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
          </>
        ) : role === "COLLECTOR" ? (
          <>
            <button
              className="bg-green-500 text-white font-bold italic rounded-xl h-fit w-fit p-2 px-6 text-center"
              onClick={() => navigate("/request")}
            >
              See Requests
            </button>

             <div className="relative ml-16 text-black">
              <img
                src="https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                className="h-12 w-12 rounded-full cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50">
                <button
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </div>
              ) }
              </div>
          </>
        ) : role === "USER" ? (
          <>
            <div
              className="bg-green-300 text-green-800 italic flex py-3 px-5 rounded-3xl items-center text-nowrap cursor-pointer"
              onClick={() => setIsCartOpen(true)}
            >
              <FaCartArrowDown size={24} /> View cart
            </div>
            <div className="bg-green-300 text-green-800 italic flex py-3 px-5 rounded-3xl items-center">
              <FaCoins className="text-amber-300" size={20} />
              <p className="text-green-800 font-bold text-nowrap"> $ {coin}</p>
            </div>

            {/* Avatar with dropdown */}
            <div className="relative text-black">
              <img
                src="https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                className="h-12 w-12 rounded-full cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50">
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex">
                    <FaCoins className='text-amber-300'/> Points: {coin}
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => navigate("/settings")}
                  >
                    Settings
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => navigate("/orders")}
                  >
                    Your Orders
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <p>Please Verify Your Role</p>
        )}
      </section>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Navbar;
