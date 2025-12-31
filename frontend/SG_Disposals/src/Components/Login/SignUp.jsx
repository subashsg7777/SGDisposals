import React, { useRef } from 'react';
import loginbanner from "../../../public/signup_banner.png";
import { BsTwitterX, BsFacebook } from "react-icons/bs";
import axios from 'axios';

const SignUp = () => {
  let emailRef = useRef(null);
  let usernameRef = useRef(null);
  let passwordRef = useRef(null);
  let transactionPasswordRef = useRef(null);

  async function handleSignUp() {
    // signup logic here

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = usernameRef.current.value;
    const Transactional_password = transactionPasswordRef.current.value;

    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/add-user`,{email,password,name,Transactional_password});
    const data = res.data;
    console.log({res});

    if (res.status == 200){
      localStorage.setItem("user_id",data.id);
    }
    alert(data.message);
  }

  return (
    <div className="min-h-screen fixed inset-0 flex items-center justify-center bg-gray-100">
      <div className="max-w-6xl w-full bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row">
        

        <div className="md:w-1/2 bg-blue-50 flex items-center justify-center p-6">
          <img
            src={loginbanner}
            alt="Security Illustration"
            className="h-full w-full object-cover rounded-l-lg"
          />
        </div>

        <div className="md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign Up</h2>
          
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                <input
                  type="email"
                  ref={emailRef}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  ref={usernameRef}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                ref={passwordRef}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Password</label>
              <input
                type="password"
                ref={transactionPasswordRef}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-600">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              onClick={(e) => { e.preventDefault(); handleSignUp(); }}
            >
              SIGN UP
            </button>

            <div className="text-center text-gray-500 text-sm">OR</div>

            <div className="flex flex-col space-y-3">
              <button className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-900 transition flex items-center justify-center">
                <BsFacebook size={16} className="mr-2" /> CONTINUE WITH FACEBOOK
              </button>
              <button className="w-full bg-blue-400 text-white py-2 rounded-md hover:bg-blue-500 transition flex items-center justify-center">
                <BsTwitterX size={16} className="mr-2" /> CONTINUE WITH TWITTER
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
