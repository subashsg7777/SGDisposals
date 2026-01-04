import React, { useContext, useRef } from 'react';
import loginbanner from "../../../public/login_banner.png"
import axios from 'axios';
import { UserContext } from '../../store/UserStore.jsx';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    let emailRef = useRef(null);
    let passwordRef = useRef(null);
    const {login} = useContext(UserContext);
    const naviagte = useNavigate();

async function handleLogin() {
  const email = emailRef.current.value;
  const password = passwordRef.current.value;

  try {
const res = await axios.post(
  `${import.meta.env.VITE_BASE_URL}/user/login`,
  { email, password }
);

    const data = res.data;   // ✅ no await needed

    console.log("User ID:", data.id);

    if (res.status === 200) {
      // persist in localStorage
      localStorage.setItem("user_id", data.id);
      localStorage.setItem("role",data.role);
      localStorage.setItem("token",data.token);
      
      // update context
      login({ user_id: data.id });

      alert(data.message);
    naviagte("/")
    }
  } catch (err) {
    console.error("Login failed:", err);
    alert("Login failed. Please try again.");
  }
}

  return (
    <div className="min-h-screen fixed inset-0 flex items-center justify-center bg-gray-100">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Image Section */}
        <div className="md:w-1/2 bg-blue-50 flex items-center justify-center p-6">
          {/* Replace src with your actual image */}
          <img
            src={loginbanner}
            alt="Security Illustration"
            className="bg-cover object-fill h-full w-full"
          />
        </div>

        {/* Right Form Section */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign In</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                type="email"
                ref={emailRef}
                className="mt-1 block text-black w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                ref={passwordRef}
                className="mt-1 block text-black w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-blue-400">
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
              onClick={(e) => {e.preventDefault(); handleLogin()}}
            >
              SIGN IN
            </button>
            <div className="text-center text-gray-500 text-sm">OR</div>
            <div className="flex flex-col space-y-2">
              <button className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-900 transition">
                CONTINUE WITH FACEBOOK
              </button>
              <button className="w-full bg-blue-400 text-white py-2 rounded-md hover:bg-blue-500 transition">
                CONTINUE WITH TWITTER
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
