import React from 'react'
import Users from './Users'
import GetAllUser from '../context/GetAllUser'

const User = ({ onUserSelect }) => {
  const [alluser, setloading] = GetAllUser()
  return (
    <div className='py-2 px-2 sm:px-4'>
      <h1 className='px-4 py-2 text-white font-semibold bg-slate-800 rounded-xl shadow mb-2 text-lg sm:text-xl'>Messages</h1>
      <div className='flex-1 overflow-y-auto scrollbar-hide' style={{ minHeight: "calc(82vh - 10vh)" }}>
        {alluser.map((user, index) => (
          <Users key={user._id || index} user={user} onUserSelect={onUserSelect} />
        ))}
      </div>
    </div>
  )
}

export default User