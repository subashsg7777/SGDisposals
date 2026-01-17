import React, { useEffect, useRef } from 'react'
import confirm_banner from "../../assets/confirm_banner.png"
import { toast } from 'react-toastify';
import api from '../../api/axios';
import axios from 'axios';

const ConfirmEmail = ({ confirm, name, email, password, transactionalPassword, onClose }) => {

  const dRef1 = useRef(null);
  const dRef2 = useRef(null);
  const dRef3= useRef(null);
  const dRef4= useRef(null);
  const dRef5= useRef(null);
  const dRef6 = useRef(null);
  if (!confirm) return null

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && onClose) onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose]);

  async function handleVerification(){

    const otp = dRef1.current.value + dRef2.current.value + dRef3.current.value + 
    dRef4.current.value + dRef5.current.value + dRef6.current.value;

    console.log("OTP You entered is : ",otp);
    
    const res =  await api.post(`${import.meta.env.VITE_BASE_URL}/user/verify-otp?email=${email}&otp=${otp}`)
    if(res.status == 200){
      toast.success("Email Confirmed Sucesfully");
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/add-user`,{email,password,name,transactionalPassword});
    const data = res.data;
    console.log({res});

    if (res.status == 200){
      localStorage.setItem("user_id",data.id);
      naviagte("/login")
      toast.success(data.message);
      return;
    }
    toast.error(data.message);
    }

    else{
      toast.error("can't Verify Email try Later")
    }
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

        <h2 className="text-lg font-semibold text-center mb-2">Confirm your email</h2>

        <p className="text-sm text-center mb-4">
          A confirmation link has been sent to <strong>{email}</strong>. Please check your inbox and follow
          the instructions to complete signup.
        </p>

        <div>

            <span className='flex gap-1 justify-center my-6'>
                <input type='text' maxLength={1}  className='w-12 h-12 border-green-500 border-1 text-center' ref={dRef1}/>
                <input type='text' maxLength={1}  className='w-12 h-12 border-green-500 border-1 text-center' ref={dRef2}/>
                <input type='text' maxLength={1}  className='w-12 h-12 border-green-500 border-1 text-center' ref={dRef3}/>
                <input type='text' maxLength={1}  className='w-12 h-12 border-green-500 border-1 text-center' ref={dRef4}/>
                <input type='text' maxLength={1}  className='w-12 h-12 border-green-500 border-1 text-center' ref={dRef5}/>
                <input type='text' maxLength={1}  className='w-12 h-12 border-green-500 border-1 text-center' ref={dRef6}/>
            </span>

          <button onClick={handleVerification} className="bg-green-600 text-white px-4 py-2 rounded w-full">
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmEmail
