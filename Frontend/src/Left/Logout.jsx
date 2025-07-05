import axios from 'axios';
import React, { useState } from 'react';
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const Logout = () => {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handlelogout = async () => {
    setloading(true);
    try {
      await axios.post("http://localhost:5000/api/logout", {}, {
        withCredentials: true
      });
      localStorage.removeItem("user");
      Cookies.remove("jwt");
      setloading(false);
      toast.success("Logout successfully done");
      window.location.reload();
      navigate('/login');
    } catch (error) {
      console.log("error:", error);
      toast.error("Logout failed");
      setloading(false);
    }
  };

  return (
    <div className='flex items-center justify-center h-[10vh] w-full'>
      <button
        onClick={handlelogout}
        className='flex items-center justify-center w-full max-w-xs py-3 rounded-full bg-slate-800 hover:bg-slate-700 transition text-white text-lg font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed'
        disabled={loading}
        aria-label="Logout"
      >
        <IoLogOutOutline className='text-3xl mr-2' />
        {loading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
};

export default Logout;
