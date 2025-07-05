import React, { useEffect } from 'react';
import ChatUser from './ChatUser';
import Message from './Message';
import Useconversation from '../Zustand/Useconversation.js';
import { Loading } from '../components/Loading';

export const Right = ({ onBackClick }) => {
  const selectedconvo = Useconversation((state) => state.selectedconvo);
  const setselectedconvo = Useconversation((state) => state.setselectedconvo);

  // Optional: clear conversation on unmount
  useEffect(() => {
    return () => setselectedconvo(null);
  }, [setselectedconvo]);

  if (!selectedconvo) {
    return (
      <div className='flex-1 h-full bg-slate-800 flex items-center justify-center w-full rounded-none sm:rounded-2xl shadow-xl transition-all duration-300'>
        <div className="text-center px-4">
          <div className="text-6xl sm:text-8xl mb-4">💬</div>
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">Welcome to Chat</h2>
          <p className="text-sm sm:text-base text-gray-400">Select a conversation to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <section className='flex-1 text-white bg-slate-800 h-full flex flex-col overflow-hidden w-full rounded-none sm:rounded-2xl shadow-xl transition-all duration-300'>
      <ChatUser onBackClick={onBackClick} />
      <div className='flex-1 overflow-hidden'>
        <Message />
      </div>
    </section>
  );
};

export default Right;