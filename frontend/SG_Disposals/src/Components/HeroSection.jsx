import React, { useState } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { FaCross, FaFacebook, FaLeaf, FaPlay, FaPlayCircle } from "react-icons/fa";
import banner from "../../public/hero_banner.png";
import AddAddressModal from './AddAddressModal';

const HeroSection = ({showModal,setShowModal}) => {



    async function handleScheduleRequest(){

      const address = localStorage.getItem("address");
      if (!address){
        // const user_id = localStorage.getItem("user_id");
        // if(!user_id){
        //   alert("Error While Trying to Add address Please Log out and Try Again !....");
        //   return ;
        // }
      
        setShowModal(true);
      }
    }

  return (
    <div className='py-7 flex gap-80  bg-linear-to-b from-green-100 to-white'>
      
      <div className=' rounded-4xl w-[50%] px-2 flex flex-col py-21 ml-[3.5%]'>
            <p className='text-green-700 font-semibold flex gap-2 bg-green-300 w-fit p-1 px-3  rounded-4xl'> <FaLeaf /> Sustainable Waste Management</p>
            <h1 className='justify-items-start text-black font-bold'><span className='text-green-500 font-bold block'>Smart Garbage</span> <span className='block text-start'>Collection for a</span> <span className='block'>Cleaner Tommorow</span></h1>
            <p className='text-gray-600 line-clamp-4 text-start my-5'>
            <span className='block text-start'>Join thousands of households making a difference. Schedule pickups,</span>
             <span className='block text-start'> track your waste reduction, and contribute to saving our planet with our intelligent </span>
            waste management system.</p>

            <div className='text-start flex gap-5 my-7'>
              <button className='bg-green-500 text-white rounded-2xl p-3' onClick={() => setShowModal(true)}>Start Schedule</button>
              <button className=' text-gray-600 border rounded-2xl p-3 items-center text-center'><FaPlayCircle className='inline mx-1'/>Watch Demo</button>
            </div>
            
      </div>

      <div className='w-[25%]'>
                <img src={banner} />
      </div>

      <AddAddressModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  )
}

export default HeroSection
