import React from 'react'
import Messages from './Messages'

const Message = () => {
  return (
    <div className='py-2'>
        <div className='flex-1 overflow-y-auto scrollbar-hide  ' style={{ maxHeight: "calc(85vh - 10vh)" }}>
            <Messages/>
                <Messages/>

        <Messages/>
                <Messages/>
                  <Messages/>
                <Messages/>
        </div>


    
    </div>
  )
}

export default Message