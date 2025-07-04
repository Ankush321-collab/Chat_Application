import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import {toast} from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'



const Login = () => {

  const [loading,setloading]=useState(false)
  const [error,seterror]=useState("");
  const [showpass,setshowpass]=useState(false);
  const[,setauth]=useAuth();

  const [formdata,setformdata]=useState
  ({
    email:"",
    password:""
  })

  const navigate=useNavigate();

const handlechange=(e)=>{
  const value=e.target.value
  const name=e.target.name

  setformdata({
    ...formdata,
    [name]:value,

  })
}

const handlelogin=async ()=>{
  setloading(true);
  seterror("")

  try{
    const {data}=await axios.post(
      "http://localhost:5000/api/login",
      {
        email:formdata.email,
        password:formdata.password
      },{
        withCredentials:true,
      }
    );
    // Print the current logged-in user's id, firstname, and email
    console.log("Logged in user:", {
      id: data.user._id,
      firstname: data.user.firstname,
      email: data.user.email
    });

    toast.success(`welcome back ${data.user.firstname}`)
    localStorage.setItem("user",JSON.stringify(data.user))
    localStorage.setItem("token",data.token);
    setauth(data.user);
    navigate('/')

  }
  catch(error){
    // Use backend 'message' field for error display
    const msg = error?.response?.data?.message || "login failed";
    seterror(msg);
    toast.error(msg);
  }

  finally{

    setloading(false)
  }

}

  return (
    <div className='bg-black min-h-screen w-full flex items-center justify-center px-4'>
      <div className='bg-gradient-to-b from-[#1e1e1e] to-[#121212] text-white w-full max-w-md rounded-2xl p-8 shadow-xl border-gray-800'>
        <h1 className='text-3xl font-poppins font-bold text-center mb-8 bg-gradient-to-r from-[#7a6ff0] to-[#5e8bff] bg-clip-text text-transparent'>Login to your account</h1>

        {/* First Name */}
        

        {/* Email */}
        <div className='mb-4'>
          <label className='font-poppins block text-sm font-medium text-gray-300 mb-1'>
            Email
          </label>
          <input
            name="email"
            value={formdata.email}
            onChange={handlechange}
            type="email"
            placeholder="Type here"
            className="font-poppins input input-bordered input-primary w-full max-w-xs"
          />
        </div>

        {/* Password */}
        <div className='mb-4'>
          <label className='font-poppins block text-sm font-medium text-gray-300 mb-1'>
            Password
          </label>
          <div className="relative w-full max-w-xs">
            <input
              name="password"
              value={formdata.password}
              onChange={handlechange}
              type={showpass ? "text" : "password"}
              placeholder="Type here"
              className="input input-bordered input-primary w-full pr-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"
              onClick={() => setshowpass(!showpass)}
            >
              {showpass ? <EyeOffIcon size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

       

        {/* Signup button */}
        <div className='flex items-center justify-center'>
          <button
            onClick={handlelogin}
            className="btn glass"
            disabled={loading}
          >
            {loading ? "loginging..." : "login"}
          </button>
        </div>
         {/* links */}
        <div className='mt-6 text-center text-sm text-gray-400'>
          Dont't have an account?{' '}
          <Link 
            to={'/signup'} 
            className='text-[#7a6ff0] font-medium hover:underline'
          >
            signup
          </Link>
        </div>

        {/* divider */}
        <div className='flex items-center my-6'>
          <div className='flex-grow border-t border-gray-700'></div>
     
          <div className='flex-grow border-t border-gray-700'></div>
        </div>
      </div>
    </div>
  )
}

export default Login