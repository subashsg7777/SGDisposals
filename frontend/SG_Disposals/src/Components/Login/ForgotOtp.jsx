import React, { useEffect, useRef, useState } from 'react'
import confirm_banner from "../../assets/confirm_banner.png"
import { toast } from 'react-toastify';
import api from '../../api/axios';
import Change_password from './Change_password';

const ForgotOtp = ({email,onClose}) => {
const dRef1 = useRef(null);
  const dRef2 = useRef(null);
  const dRef3= useRef(null);
  const dRef4= useRef(null);
  const dRef5= useRef(null);
  const dRef6 = useRef(null);
  const [verified,setVerified] = useState(false);


  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && onClose) onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose]);

  useEffect(()=>{

    async function handleEmailSend(){
        const res = await api.get(`${import.meta.env.VITE_BASE_URL}/user/forgot?email=${email}`);
        console.log({res});
        if(res.status == 200){
            toast.success("Email Sent")
            return;
        }
        toast.error("Can't Sent Email Right now")
    }

    handleEmailSend();
  },[])

  async function handleVerification(){

    const otp = dRef1.current.value + dRef2.current.value + dRef3.current.value + 
    dRef4.current.value + dRef5.current.value + dRef6.current.value;

    console.log("OTP You entered is : ",otp);
    
    const res =  await api.post(`${import.meta.env.VITE_BASE_URL}/user/verify-forgot?email=${email}&otp=${otp}`)
    if(res.status == 200){
      console.log({res});
      localStorage.setItem("token",res.data);
      toast.success("Email Confirmed Sucesfully");
      setVerified(true);
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

        <h2 className="text-lg font-semibold text-center mb-2">Enter OTP To Reset Your Account Password</h2>

        <p className="text-sm text-center mb-4">
          An One-Time Password has been sent to this email : <strong>{email}</strong>. Please check your inbox and Enter 
          The OTP Here To Continue Reseting Your Account Password
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

      {
        verified && (
          <Change_password email={email} onClose={() => setVerified(false)}/>
        )
      }
    </div>
  )
}

export default ForgotOtp
