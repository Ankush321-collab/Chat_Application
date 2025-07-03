import React from 'react'

const Users = () => {
  return (
    <div>
        <div className='flex space-x-4 px-8 py-4 hover:bg-slate-700 duration-300 cursor-pointer'>
            <div className="avatar">
  <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  </div>
  
</div>
 <div>
       <h1 className='font-bold'>Ankush</h1>
  <span>Ankushadhikari@gmail.com</span>
         
        </div>

        </div>
    </div>
  )
}

export default Users