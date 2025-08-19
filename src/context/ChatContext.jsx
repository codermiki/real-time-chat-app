import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
   getAllUsers,
   getMessagesForUser,
   sendMessageToUser,
} from "../services/chatService";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
   const { token, socket } = useContext(AuthContext);

   const [messages, setMessages] = useState([]);
   const [users, setUsers] = useState(null);
   const [selectedUser, setSelectedUser] = useState(null);
   const [unseenMessages, setUnseenMessages] = useState([]);

   // Fetch all users
   const fetchUsers = async () => {
      const data = await getAllUsers(token);
      if (data.success) {
         setUsers(data.data);
         setUnseenMessages(data.unseenMessages);
      }
   };

   // Fetch messages for the selected user
   const fetchMessages = async () => {
      const data = await getMessagesForUser(selectedUser._id, token);
      if (data.success) {
         setMessages(data.data);
      }
   };

   // Send message for selected user
   const sendMessage = async (messageData) => {
      const data = await sendMessageToUser(
         selectedUser._id,
         messageData,
         token
      );
      if (data.success) {
         setMessages((prevMessages) => [...prevMessages, data.data]);
      }
   };

   // Subscribe to messages for selected user
   const subscribeToMessages = async () => {
      if (!socket) return;

      socket.on("newMessage", (newMessage) => {
         if (selectedUser && newMessage.senderId === selectedUser._id) {
            newMessage.isSeen = true;
            markMessageAsRead(newMessage._id, token);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
         } else {
            setUnseenMessages((prevUnseenMessages) => ({
               ...prevUnseenMessages,
               [newMessage.senderId]: prevUnseenMessages[newMessage.senderId]
                  ? prevUnseenMessages[newMessage.senderId] + 1
                  : 1,
            }));
         }
      });
   };

   // unsubscribe from socket events
   const unsubscribeFromMessages = () => {
      if (socket) socket.off("newMessage");
   };

   // Subscribe to socket events
   useEffect(() => {
      subscribeToMessages();
      return () => unsubscribeFromMessages();
   }, [socket, selectedUser]);

   const value = {
      messages,
      users,
      selectedUser,
      unseenMessages,
      setUnseenMessages,
      setSelectedUser,
      sendMessage,
      fetchUsers,
      fetchMessages,
   };

   return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
