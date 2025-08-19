import { createAxiosInstance } from "../utils/axiosInstance";

// Get all users
export const getAllUsers = async (token) => {
   const axiosInstance = await createAxiosInstance(token);
   const { data } = await axiosInstance.get(`/messages/users`);
   return data;
};

// Get messages for a specific user
export const getMessagesForUser = async (userId, token) => {
   const axiosInstance = await createAxiosInstance(token);
   const { data } = await axiosInstance.get(`/messages/${userId}`);
   return data;
};

// Send a message to a specific user
export const sendMessageToUser = async (userId, messageData, token) => {
   const axiosInstance = await createAxiosInstance(token);
   const { data } = await axiosInstance.post(
      `/messages/send/${userId}`,
      messageData
   );
   return data;
};

// Mark a message as read
export const markMessageAsRead = async (messageId, token) => {
   const axiosInstance = await createAxiosInstance(token);
   await axiosInstance.put(`/messages/mark/${messageId}`);
};
