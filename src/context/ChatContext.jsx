import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
   getAllUsers,
   getMessagesForUser,
   markMessageAsRead,
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
      const response = await getAllUsers(token);
      if (response.success) {
         setUsers(response.data);
         let unReadMessages = {};
         response.data.forEach((user) => {
            unReadMessages[user._id] = user.unseenMessages;
         });
         setUnseenMessages(unReadMessages);
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
   useEffect(() => {
      if (!socket) return;

      const handleNewMessage = (newMessage) => {
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
      };

      socket.on("newMessage", handleNewMessage);

      return () => {
         socket.off("newMessage", handleNewMessage);
      };
   }, [socket, selectedUser, token]);

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
