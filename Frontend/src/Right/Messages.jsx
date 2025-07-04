import React from 'react';

const Messages = React.forwardRef(({ message }, ref) => {
  const authuser = JSON.parse(localStorage.getItem("user"));
  const isSender = authuser && message.senderid === authuser._id;

  return (
    <div className='p-3' ref={ref}>
      <div className={isSender ? "chat chat-end" : "chat chat-start"}>
        <div className={isSender ? "chat-bubble chat-bubble-info" : "chat-bubble chat-bubble-warning"}>
          {message.message}
        </div>
      </div>
    </div>
  );
});

export default Messages;