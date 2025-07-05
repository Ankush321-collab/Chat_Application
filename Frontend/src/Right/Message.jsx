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
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto py-2 px-1 sm:px-4 min-h-0 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent bg-gradient-to-br from-slate-800 to-slate-900 shadow-inner rounded-none sm:rounded-2xl transition-all duration-300">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loading />
          </div>
        ) : (
          messages.length > 0 ? (
            <div className="space-y-1">
              {messages.map((msg, idx) => {
                const isLast = idx === messages.length - 1;
                return (
                  <div key={msg._id} ref={isLast ? lastMessageRef : null}>
                    <Messages message={msg} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <div className="text-6xl mb-4">💬</div>
              <p className="text-lg font-medium mb-2">Start a conversation</p>
              <p className="text-sm text-gray-500">Say "Hi" to begin chatting!</p>
            </div>
          )
        )}
      </div>
      
      {/* Message Input */}
      <div className="sticky bottom-0 z-10 border-t border-gray-700 bg-slate-800/95 backdrop-blur shadow-lg rounded-none sm:rounded-b-2xl transition-all duration-300">
        <Typesend onSent={() => setRefresh(r => !r)} />
      </div>
    </div>
  );
}

export default Message;