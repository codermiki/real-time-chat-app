import { io } from "socket.io-client";

const socketUrl = import.meta.env.VITE_SOCKET_URL;

export const createSocketConnection = (userId, setOnlineUsers) => {
   const socketInstance = io(socketUrl, {
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
