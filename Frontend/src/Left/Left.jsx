import React from 'react'
import Search from './Search'
import User from './User'
import Logout from './Logout'

const Left = () => {
  return (
    <div className=' text-white w-[30%] h-[100%] bg-black '>
       <Search/>
       <User/>
       <Logout/>

    </div>
  )
}

export default Left