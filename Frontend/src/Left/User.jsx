import React from 'react'
import Users from './Users'
import GetAllUser from '../context/GetAllUser'

const User = () => {
  const [alluser,setloading]=GetAllUser()
  console.log(alluser)
  return (
    <div className='py-2'>
        <h1 className='  px-8 py-2 text-white font-semibold bg-slate-800 rounded'>message</h1>
        <div className='flex-1 overflow-y-auto scrollbar-hide' style={{minHeight:"calc(80vh - 10vh)"}}>
           
            {alluser.map((user,index)=>{
              return <Users key={index} user={user}/>

            })}


        </div>
        
       
    </div>
  )
}

export default User