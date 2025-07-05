import React from 'react'
import Useconversation from '../Zustand/Useconversation.js';
import { useSocket } from '../context/socketContext.jsx';

const Users = ({ user, onUserSelect }) => {
  const { socket, isConnected, onlineUsers } = useSocket();
  const isOnline = onlineUsers.includes(user._id);
  const selectedconvo = Useconversation(state => state.selectedconvo);
  const setselectedconvo = Useconversation(state => state.setselectedconvo);

  const isselect = selectedconvo?._id === user._id;
  
  // Debug logging
  console.log(`User ${user.firstname} (${user._id}):`, {
    isOnline,
    onlineUsers,
    userIncluded: onlineUsers.includes(user._id)
  });
  
  const handleUserClick = () => {
    setselectedconvo(user);
    // Only trigger mobile navigation if onUserSelect is provided (mobile only)
    if (onUserSelect) {
      onUserSelect();
    }
  };
  
  return (
    <div 
      className={`hover:bg-slate-500 ${isselect ? 'bg-slate-700' : ''} transition-all duration-200`}
      onClick={handleUserClick}
    >
      <div className='flex space-x-4 px-4 sm:px-8 py-4 hover:bg-slate-700 duration-300 cursor-pointer active:scale-95'>
        <div className="relative">
          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-600 shadow-lg transform-gpu transition-transform duration-300 hover:scale-105">
            <img 
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
              alt="avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Online/Offline indicator */}
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
            isOnline ? 'bg-green-500' : 'bg-gray-400'
          }`}></div>
        </div>
        <div className="flex-1 min-w-0">
          <h1 className='font-bold text-white truncate text-base sm:text-lg'>{user.firstname}</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400 truncate">{user.email}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              isOnline 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-gray-500/20 text-gray-400'
            }`}>
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users