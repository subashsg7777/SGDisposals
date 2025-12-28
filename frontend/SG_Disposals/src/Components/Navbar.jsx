import React, { useEffect, useState } from 'react'

import logo from "../../public/icon.png";
import { useNavigate } from 'react-router-dom';
import { FaCoins } from 'react-icons/fa';
import axios from 'axios';
import { FaCartArrowDown, FaCarTunnel } from 'react-icons/fa6';
import CartModal from "./Navbar/CartModal";

const Navbar = () => {

  const [role,setRole] = useState(" ");
  const [isCartOpen,setIsCartOpen] = useState(false);
  const [coin,setCoin] = useState(0);
  const navigate = useNavigate();

  useEffect(()=>{

    const credentials = localStorage.getItem("role");
    if(!credentials){
        setRole("Guest")
    }
    if(credentials == "COLLECTOR"){
      setRole("COLLECTOR")
    }

    if(credentials == "USER"){
      setRole("USER")
    }

    async function handlePointsFetch(){

      const user_id = localStorage.getItem("user_id");
      const res = await axios.get(`http://localhost:8080/api/v1/user/Get-points?id=${user_id}`);
      const data = res.data;
      console.log({data});
      setCoin(data)
    }

    handlePointsFetch();
  },[])

  return (
    <div className='navbar h-20 flex items-center '> {/*  //<- shadow-[0_12px_20px_rgba(34,197,94,0.5)] --> */}
      <section className='h-full flex items-center  p-3'>
        <img src={logo} alt='SG_Disposals Icon' className='h-full'/>
      <h2 className='text-black text-start text-2xl italic font-bold p-0'><span className='text-green-600 font-extrabold text-3xl mx-0'>SG</span> Disposals</h2>
      </section>

      <section className='mx-[25%] items-center'>
        <ol className='text-gray-600 flex justify-between gap-4 mx-4'>
            <li>Home</li>
            <li>Services</li>
            <li>Schedule</li>
            <li>About</li>
            <li>Contact</li>
        </ol>
      </section>

        <section className='items-center flex gap-2 '>
        {
          role == "Guest" ? (
            <>
              <button className=' text-black rounded-xl h-fit w-fit p-2 text-center' onClick={() => navigate("/signup")}>Sign In</button>
        <button className='bg-green-500 text-white font-bold italic rounded-xl h-fit w-fit p-2 px-6 text-center' onClick={() => navigate("/login")}>log In</button>
            </>
          ) : (
            role == "COLLECTOR" ? (
              <>
                <button className='bg-green-500 text-white font-bold italic rounded-xl h-fit w-fit p-2 px-6 text-center' onClick={() => navigate("/request")}>See Requests</button>
              </>
            ) : (
              role == "USER" ? (
                <>
                <div className='bg-green-300 text-green-800 italic flex py-3 px-5 rounded-3xl items-center text-nowrap' onClick={() => setIsCartOpen(true)}><FaCartArrowDown size={24}/> View cart</div>
                <div className='bg-green-300 text-green-800 italic flex py-3 px-5 rounded-3xl items-center'> <FaCoins className='text-amber-300' size={20}/> <p className='text-green-800 font-bold text-nowrap'> $ {coin}</p> </div>
                <img src='https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg' className='h-12 w-12 rounded-full'/>
                </>
              ) : (
                <p>Please Verify Your Role</p>
              )
            )
          )
        }
        </section>

        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}

export default Navbar
