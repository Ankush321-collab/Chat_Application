import React from 'react';

const Messages = React.forwardRef(({ message }, ref) => {
  // Get current user from localStorage
  const authuser = JSON.parse(localStorage.getItem("user"));
  const myId = authuser?._id || authuser?.id;
  
  // Handle populated senderid (now contains user object) or fallback to string
  const senderId = message?.senderid?._id || message?.senderid || message?.from || message?.sender || "";
  
  // Compare IDs as strings to ensure proper comparison
  const isSender = myId && String(senderId) === String(myId);

  // Simple debug log
  console.log(`Message from ${senderId} (me: ${myId}) - Is sender: ${isSender}`);

  return (
    <div className='px-2 sm:px-4 py-1 message-enter' ref={ref}>
      <div className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-2`}>
        <div className={`flex items-end gap-2 max-w-[90vw] sm:max-w-[70%] ${isSender ? 'flex-row-reverse' : 'flex-row'}`}>
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full overflow-hidden shadow-md border-2 border-gray-700 bg-gradient-to-br from-blue-400/20 to-purple-400/20">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Message Bubble */}
          <div className={`relative px-4 py-2 rounded-2xl shadow-xl max-w-full break-words transform-gpu transition-all duration-300 ${
            isSender 
              ? 'bg-blue-500 text-white rounded-br-md hover:scale-105 hover:shadow-blue-400/40' 
              : 'bg-yellow-400 text-gray-800 rounded-bl-md hover:scale-105 hover:shadow-yellow-400/40'
          } hover:-translate-y-1 active:scale-95`}>
            <p className="text-sm leading-relaxed select-text">{message.message}</p>
            
            {/* Message Time */}
            <div className={`text-xs mt-1 opacity-70 ${
              isSender ? 'text-blue-100' : 'text-gray-600'
            }`}>
              {new Date(message.createdAt || Date.now()).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Messages;
