import React from 'react';
import { IoSend } from "react-icons/io5";

export const Typesend = () => {
  return (
    <form className="h-[10vh] px-4 flex justify-between items-center gap-3 hover:bg-slate-600">
      {/* Input field */}
      <div className="flex-1 ">
        <input
          type="text"
          placeholder="Type your message..."
          className="input input-bordered input-primary w-full h-12 px-4 rounded-full transition-all duration-300 focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Send button */}
      <button
        type="submit"
        className="hover:scale-105 transition-transform duration-300 font-serif text-white text-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 h-12 w-14 rounded-full shadow-md flex items-center justify-center"
      >
       <IoSend />
      </button>
    </form>
  );
};
