import React from 'react'
import Useconversation from '../Zustand/Useconversation.js';


const Users = ({ user }) => {
  const selectedconvo = Useconversation(state => state.selectedconvo);
  const setselectedconvo = Useconversation(state => state.setselectedconvo);

  const isselect = selectedconvo?._id === user._id;
  return (
    <div className={`hover:bg-slate-500 ${isselect ? 'bg-slate-700' : ''}`}
         onClick={() => setselectedconvo(user)}>
      <div className='flex space-x-4 px-8 py-4 hover:bg-slate-700 duration-300 cursor-pointer'>
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div>
          <h1 className='font-bold'>{user.firstname}</h1>
          <span>{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default Users