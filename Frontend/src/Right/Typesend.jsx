import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import UseSENDmessage from '../context/UseSENDmessage';

export const Typesend = ({ onSent }) => {
  const [loading, sendMessage] = UseSENDmessage();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || loading) return;
    await sendMessage(message);
    setMessage("");
    if (onSent) onSent();
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 sm:p-4">
      <div className="flex items-center gap-2 sm:gap-3 max-w-full">
        {/* Input field */}
        <div className="flex-1 min-w-0">
          <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full h-12 px-4 py-2 bg-gray-700 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none shadow-md"
            disabled={loading}
          />
        </div>
        {/* Send button */}
        <button
          type="submit"
          disabled={loading || !message.trim()}
          className={`flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center transition-all duration-200 transform-gpu shadow-lg text-lg
            ${loading || !message.trim()
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white hover:scale-110 active:scale-95 hover:shadow-blue-400/40'}
          `}
          aria-label="Send message"
        >
          <IoSend className="text-xl" />
        </button>
      </div>
    </form>
  );
};