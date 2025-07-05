import { useState } from 'react';
import axios from 'axios';
import Useconversation from '../Zustand/Useconversation.js';


const UseSENDmessage = () => {
  const [loading, setLoading] = useState(false);
  const { selectedconvo } = Useconversation();

  // This function sends a message
  const sendMessage = async (text, onSent) => {
    if (!selectedconvo || !selectedconvo._id) return;
    setLoading(true);
    try {
      await axios.post(
        `http://localhost:5000/api/message/send/${selectedconvo._id}`,
        { message: text },
        { withCredentials: true }
      );
      if (typeof onSent === 'function') onSent();
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return [loading, sendMessage];
};

export default UseSENDmessage;