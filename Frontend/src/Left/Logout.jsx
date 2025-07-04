import axios from 'axios';
import React, { useState } from 'react';
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';  // ✅ correct import
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const Logout = () => {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();  // ✅ use hook

  const handlelogout = async () => {
    setloading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/logout", {}, {
        withCredentials: true  // ✅ ensures cookie is sent to backend
      });

      localStorage.removeItem("user");
      Cookies.remove("jwt");
      setloading(false);

      toast.success("Logout successfully done");
      window.location.reload();
      navigate('/login');  // ✅ navigate after toast
    } catch (error) {
      console.log("error:", error);
      toast.error("Logout failed");
      setloading(false);
    }
  };

  return (
    <div className='h-[10vh]'>
      <div className="flex px-6 py-4 w-[95%] rounded-full">
        <IoLogOutOutline
          onClick={handlelogout}
          className='text-6xl rounded-full hover:bg-slate-700 cursor-pointer p-2 px-4 py-3'
        />
      </div>
    </div>
  );
};

export default Logout;
