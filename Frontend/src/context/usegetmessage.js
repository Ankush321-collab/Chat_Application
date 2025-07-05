import { useEffect, useState } from 'react';
import axios from 'axios';
import Useconversation from '../Zustand/Useconversation.js';


const useGetMessage = (refresh) => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const { selectedconvo } = Useconversation();

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedconvo || !selectedconvo._id) return;

      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/message/get/${selectedconvo._id}`, {
          withCredentials: true,
        });
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedconvo, refresh]);

  return [loading, messages];
};

export default useGetMessage;
