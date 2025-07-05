import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState("");
  const [showpass, setshowpass] = useState(false);
  const [, setauth] = useAuth();

  const [formdata, setformdata] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate();

  const handlechange = (e) => {
    const value = e.target.value
    const name = e.target.name
    setformdata({
      ...formdata,
      [name]: value,
    })
  }

  const handlelogin = async () => {
    setloading(true);
    seterror("")

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/login",
        {
          email: formdata.email,
          password: formdata.password
        }, {
          withCredentials: true,
        }
      );
      console.log("Logged in user:", {
        id: data.user._id,
        firstname: data.user.firstname,
        email: data.user.email
      });

      toast.success(`Welcome back ${data.user.firstname}`)
      localStorage.setItem("user", JSON.stringify(data.user))
      localStorage.setItem("token", data.token);
      setauth(data.user);
      navigate('/')
    } catch (error) {
      const msg = error?.response?.data?.message || "Login failed";
      seterror(msg);
      toast.error(msg);
    } finally {
      setloading(false)
    }
  }

  return (
    <div className='min-h-screen w-full flex items-center justify-center px-4 py-8 bg-gradient-to-br from-black via-gray-900 to-black'>
      <div className='bg-gradient-to-b from-[#1e1e1e] to-[#121212] text-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-800 transform-gpu transition-all duration-300 hover:scale-105'>
        <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 bg-gradient-to-r from-[#7a6ff0] to-[#5e8bff] bg-clip-text text-transparent'>
          Login to your account
        </h1>

        {/* Email */}
        <div className='mb-4 sm:mb-6'>
          <label className='block text-sm font-medium text-gray-300 mb-2'>
            Email
          </label>
          <input
            name="email"
            value={formdata.email}
            onChange={handlechange}
            type="email"
            placeholder="Enter your email"
            className="w-full h-12 px-4 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-md"
          />
        </div>

        {/* Password */}
        <div className='mb-6 sm:mb-8'>
          <label className='block text-sm font-medium text-gray-300 mb-2'>
            Password
          </label>
          <div className="relative">
            <input
              name="password"
              value={formdata.password}
              onChange={handlechange}
              type={showpass ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full h-12 px-4 pr-12 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-md"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
              onClick={() => setshowpass(!showpass)}
            >
              {showpass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Login button */}
        <div className='mb-6'>
          <button
            onClick={handlelogin}
            disabled={loading}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-[#7a6ff0] to-[#5e8bff] text-white font-semibold shadow-lg transform-gpu transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>

        {/* Links */}
        <div className='text-center text-sm text-gray-400'>
          Don't have an account?{' '}
          <Link 
            to={'/signup'} 
            className='text-[#7a6ff0] font-medium hover:underline transition-colors duration-200'
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login