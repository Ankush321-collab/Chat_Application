import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [authUser] = useAuth();

  useEffect(() => {
    if (authUser && authUser._id) {
      console.log("Connecting to socket with user:", authUser._id);
      
      const newSocket = io("http://localhost:5000", {
        query: {
          userid: authUser._id,
        },
      });

      setSocket(newSocket);

      newSocket.on("connect", () => {
        setIsConnected(true);
        console.log("✅ Connected to socket server");
      });

      newSocket.on("disconnect", () => {
        setIsConnected(false);
        console.log("❌ Disconnected from socket server");
      });

      newSocket.on("getonlineusers", (users) => {
        console.log("📱 Received online users:", users);
        setOnlineUsers(users);
      });

      newSocket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });

      return () => {
        console.log("Cleaning up socket connection");
        newSocket.close();
        setSocket(null);
        setIsConnected(false);
        setOnlineUsers([]);
      };
    } else {
      console.log("No auth user, cleaning up socket");
      if (socket) {
        socket.close();
        setSocket(null);
        setIsConnected(false);
        setOnlineUsers([]);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, isConnected, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
