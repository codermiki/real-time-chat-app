import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const createSocketConnection = (userId, setOnlineUsers) => {
   const socketInstance = io(backendUrl, {
      query: { userId },
   });

   socketInstance.connect();

   socketInstance.on("getOnlineUsers", (userIds) => {
      if (typeof setOnlineUsers === "function") {
         setOnlineUsers(userIds);
      }
   });

   return socketInstance;
};
