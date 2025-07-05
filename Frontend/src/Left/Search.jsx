import React from 'react';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  return (
   <div className='h-[10vh] flex items-center justify-center w-full'>
     <form action="" className="w-full px-4">
        <div className='relative w-full'>
          <input
            type="text"
            placeholder="Search users..."
            aria-label="Search"
            className="w-full h-12 pl-12 pr-4 rounded-full shadow-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <FaSearch className='text-xl' />
          </span>
        </div>
      </form>
   </div>
  );
};

export default Search;
