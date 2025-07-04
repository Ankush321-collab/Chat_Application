import React from 'react'
import ChatUser from './ChatUser'
import Message from './Message'
import { Typesend } from './Typesend'

export const Right = () => {
  return (
    <div className='w-[70%] text-white bg-slate-800 h-screen flex flex-col'>
      <ChatUser />
      {/* Main message area: flex-1, scrollable, does not stretch screen */}
      <div className='flex-1 overflow-y-auto scrollbar-hide' style={{ minHeight: "0" }}>
        <Message />
      </div>
      {/* Typesend always at the bottom */}
    
    </div>
  );
}
export default Right
