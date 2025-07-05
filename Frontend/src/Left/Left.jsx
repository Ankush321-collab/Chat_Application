import React from 'react'
import Search from './Search'
import User from './User'
import Logout from './Logout'

const Left = ({ onUserSelect }) => {
  return (
    <aside className='flex flex-col h-full w-full bg-black shadow-xl border-r border-gray-800 z-20'>
      {/* Sticky Search Bar */}
      <div className='sticky top-0 z-30 bg-black/90 backdrop-blur-md'>
        <Search/>
      </div>
      {/* User List */}
      <div className='flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700'>
        <User onUserSelect={onUserSelect} />
      </div>
      {/* Sticky Logout Button */}
      <div className='sticky bottom-0 z-30 bg-black/90 backdrop-blur-md'>
        <Logout/>
      </div>
    </aside>
  )
}

export default Left