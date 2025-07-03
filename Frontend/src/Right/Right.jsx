import React from 'react'
import ChatUser from './ChatUser'
import Message from './Message'
import { Typesend } from './Typesend'

export const Right = () => {
  return (
    <div className='w-[70%] h-[100%] text-white   bg-slate-800'>
        <ChatUser/>
        <Message/>
        <Typesend/>
        </div>
  )
}
