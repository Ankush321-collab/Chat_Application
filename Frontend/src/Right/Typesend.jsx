import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import UseSENDmessage from '../context/UseSENDmessage';



export const Typesend = ({ onSent }) => {
  const [loading, sendMessage] = UseSENDmessage();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessage(message);
    setMessage("");
    if (onSent) onSent();
  };

  return (
    <form onSubmit={handleSubmit}
      className=" px-4 flex justify-between items-center gap-3 hover:bg-slate-600">
      {/* Input field */}
      <div className="flex-1 h-[10vh] ">
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="input input-bordered input-primary w-full h-12 px-4 rounded-full transition-all duration-300 focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Send button */}
      <button
        type="submit"
        className="hover:scale-105 transition-transform duration-300 font-serif text-white text-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 h-12 w-14 rounded-full shadow-md flex items-center justify-center"
        disabled={loading}
      >
        <IoSend />
      </button>
    </form>
  );
};
