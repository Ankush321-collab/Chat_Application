import React from 'react'
import { IoLogOutOutline } from "react-icons/io5";


const Logout = () => {
  return (
  <>
  <div className='h-[10vh]'>
    <div className=" flex  px-6 py-4 w-[95%] rounded-full">
        <IoLogOutOutline className='text-6xl rounded-full hover:bg-slate-700 cursor-pointer p-2 px-4 py-3 ' />
      
      </div>
  </div>
  
  </>
  )
}

export default Logout