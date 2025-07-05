import React from 'react';
import { IoArrowBack } from "react-icons/io5";
import Useconversation from '../Zustand/Useconversation';
import { useSocket } from '../context/socketContext.jsx';

const ChatUser = ({ onBackClick }) => {
  const selectedconvo = Useconversation((state) => state.selectedconvo);
  const { socket, isConnected, onlineUsers } = useSocket();
  const isOnline = onlineUsers.includes(selectedconvo._id);
  
  if (!selectedconvo) return null; // Prevent error if no user is selected

  return (
    <header className='sticky top-0 z-20 h-16 border-b border-gray-700 bg-slate-800/90 backdrop-blur flex items-center px-2 sm:px-6 shadow-md'>
      <div className='flex items-center gap-3 w-full max-w-2xl mx-auto'>
        {/* Back button - only visible on mobile */}
        {onBackClick && (
          <button
            onClick={onBackClick}
            className="sm:hidden flex-shrink-0 w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Go back to user list"
          >
            <IoArrowBack className="text-white text-xl" />
          </button>
        )}
        
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-600 shadow-lg transform-gpu transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-blue-500/30 to-purple-500/30">
            <img 
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
              alt="User avatar "
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className='flex-1 min-w-0'>
          <h2 className='font-semibold text-white truncate text-lg sm:text-xl'>
            {selectedconvo.firstname}
          </h2>
          <div className='flex items-center gap-2'>
            <div className={`w-2 h-2 bg-${isOnline?"green-400":"gray-700"} rounded-full animate-pulse  `}></div>
            <span className={`text-xs text-${isOnline?"green":"gray"}`}>{isOnline?"online":"Offline"}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ChatUser;