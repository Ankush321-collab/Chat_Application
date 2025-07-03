import React, { useState } from 'react';
import { Eye, EyeOffIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Signup = () => {
  const [showpass, setshowpass] = useState(false);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const [error, seterror] = useState("");

  const [formdata, setformdata] = useState({
    firstname: "",
    email: "",
    password: "",
    confirmpassword: ""
  });
  console.log(formdata.firstname)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
  };

  const handleSignup = async () => {
    seterror("");
    setloading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/signup",
        {
          firstname: formdata.firstname,
          email: formdata.email,
          password: formdata.password,
          confirmpassword: formdata.confirmpassword,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("Signup successfully done");
      navigate('/login');
    } catch (error) {
      const msg = error?.response?.data?.message || "Signup failed";
      seterror(msg);
      toast.error(msg);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className='bg-black min-h-screen w-full flex items-center justify-center px-4'>
      <div className='bg-gradient-to-b from-[#1e1e1e] to-[#121212] text-white w-full max-w-md rounded-2xl p-8 shadow-xl border-gray-800'>
        <h1 className='text-3xl font-poppins font-bold text-center mb-8 bg-gradient-to-r from-[#7a6ff0] to-[#5e8bff] bg-clip-text text-transparent'>Create your account</h1>

        {/* First Name */}
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-300 mb-1 font-poppins'>
            First Name
          </label>
          <input
            name="firstname"
            value={formdata.firstname}
            onChange={handleChange}
            type="text"
            placeholder="Type here"
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>

        {/* Email */}
        <div className='mb-4'>
          <label className='font-poppins block text-sm font-medium text-gray-300 mb-1'>
            Email
          </label>
          <input
            name="email"
            value={formdata.email}
            onChange={handleChange}
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
              onChange={handleChange}
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

        {/* Confirm Password */}
        <div className='mb-4'>
          <label className='font-poppins block text-sm font-medium text-gray-300 mb-1'>
            Confirm Password
          </label>
          <div className="relative w-full max-w-xs">
            <input
              name="confirmpassword"
              value={formdata.confirmpassword}
              onChange={handleChange}
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
          {error && <span className='text-red-600 ml-2 mt-2 block'>{error}</span>}
        </div>

        {/* Signup button */}
        <div className='flex items-center justify-center'>
          <button
            onClick={handleSignup}
            className="btn glass"
            disabled={loading}
          >
            {loading ? "Signing..." : "Signup"}
          </button>
        </div>
         {/* links */}
        <div className='mt-6 text-center text-sm text-gray-400'>
          Already have an account?{' '}
          <Link 
            to={'/login'} 
            className='text-[#7a6ff0] font-medium hover:underline'
          >
            Log in
          </Link>
        </div>

        {/* divider */}
        <div className='flex items-center my-6'>
          <div className='flex-grow border-t border-gray-700'></div>
     
          <div className='flex-grow border-t border-gray-700'></div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
