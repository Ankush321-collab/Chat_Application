import React from 'react'
import Useconversation from '../Zustand/Useconversation'

const ChatUser = () => {
  const {selectedconvo}=Useconversation();
  console.log(selectedconvo)
  return (
    <div className='h-[10vh]'>
      <div className='flex border-dashed justify-center items-center bg-slate-600 hover:bg-slate-700 duration-300 rounded-xl shadow-xl h-[65px] '>
        <div className="avatar avatar-online">
          <div className="w-16 h-16 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div className='px-2 py-3'>
          <h1 className='font-serif'>{selectedconvo ? selectedconvo.firstname : ""}</h1>
          <span className='font-light'>Offline</span>
        </div>
        <footer>
        </footer>
      </div>
    </div>
  )
}

export default ChatUser
