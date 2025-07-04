import React, { useRef, useEffect, useState } from 'react';
import Messages from './Messages';
import useGetMessage from '../context/usegetmessage.js';
import { Loading } from '../components/Loading';
import { Typesend } from './Typesend';

const Message = () => {
  const [refresh, setRefresh] = useState(false);
  const [loading, messages] = useGetMessage(refresh);
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [messages]);

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex-1 overflow-y-auto py-2 min-h-0">
        {loading ? (
          <Loading />
        ) : (
          messages.length > 0 ? (
            messages.map((msg, idx) => {
              const isLast = idx === messages.length - 1;
              return (
                <div key={msg._id} ref={isLast ? lastMessageRef : null}>
                  <Messages message={msg} />
                </div>
              );
            })
          ) : (
            <div>
              <p className='text-center mt-[20%]'>
                say!hy to start conversation
              </p>
            </div>
          )
        )}
      </div>
      <Typesend onSent={() => setRefresh(r => !r)} />
    </div>
  );
}

export default Message;
