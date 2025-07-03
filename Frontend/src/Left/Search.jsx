import React from 'react';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  return (
   <div className='h-[10vh]'>
     <div className="px-6 py-4 w-[95%]">
      <form action="">
        {/* Input Field */}
         <div className='flex space-x-3'>
        <label>
           
        <input
          type="text"
          placeholder="Search"
          aria-label="Search"
          className="input input-bordered w-full pl-12 pr-16 h-12 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
        />

        </label>
        <button>
         <FaSearch  className='text-5xl p-2 hover:bg-gray-600 rounded-full duration-300' />

        </button>
        
        </div>

   
        
      </form>
    </div>

   </div>
  );
};

export default Search;
