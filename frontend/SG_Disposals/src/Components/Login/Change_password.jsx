import React, { useEffect, useRef, useState } from 'react'
import confirm_banner from "../../assets/confirm_banner.png"
import { toast } from 'react-toastify';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const Change_password = ({email,onClose}) => {
  const dRef1 = useRef(null);
    const dRef2 = useRef(null);
    const navigate = useNavigate();
    if (!confirm) return null
  
    useEffect(() => {
      const onKey = (e) => {
        if (e.key === 'Escape' && onClose) onClose()
      }
      document.addEventListener('keydown', onKey)
      return () => document.removeEventListener('keydown', onKey)
    }, [onClose]);
  
    // useEffect(()=>{
  
    //   async function handleEmailSend(){
    //       const res = await api.get(`${import.meta.env.VITE_BASE_URL}/user/forgot?email=${email}`);
    //       console.log({res});
    //       if(res.status == 200){
    //           toast.success("Email Sent")
    //           return;
    //       }
    //       toast.error("Can't Sent Email Right now")
    //   }
  
    //   handleEmailSend();
    // },[])
  
    async function handleVerification(){
  
      const password = dRef1.current.value;
      const ConfPassword = dRef2.current.value;
      if(password != ConfPassword){
        toast.error("Password and Confirm Password Are Not Matching");
        return ;
      }

      const res = await api.put(`${import.meta.env.VITE_BASE_URL}/user/update-password`,{email,password});
      console.log({res});
      if(res.status == 201){
        toast.success("password Changes Sucesfully");
        navigate("/");
        return;
      }
      toast.error(res.data);
    }
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center text-black">
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
  
        <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
  
          <img src={confirm_banner} alt="confirmation" className="mx-auto mb-4" />
  
          <h2 className="text-lg font-semibold text-center mb-2">Enter Your New Password Reset Your Account's Old Password</h2>
  
          <p className="text-sm text-center mb-4">
            You Have Sucessfully Completed the Authentication Process to Change You're Accounts Current Password 
            So, You can Create Your New Password For Your Account Through This Screen 
          </p>
  
          <div>
  
              <span className='gap-1 justify-center my-6'>
              <label className='text-green-400 font-semibold'>Your New Password : </label>
                  <input type='text' className='w-3/4 h-12 border-green-500 border-1 text-center' ref={dRef1}/>
              </span>
              <span className='block gap-1 justify-center my-6'>
              <label className='text-green-400 font-semibold'>Confirm New Password : </label>
                  <input type='text'  className='w-3/4 h-12 border-green-500 border-1 text-center' ref={dRef2}/>
              </span>
  
            <button onClick={handleVerification} className="bg-green-600 text-white px-4 py-2 rounded w-full">
              Verify OTP
            </button>
          </div>
        </div>
      </div>
    )
}

export default Change_password
