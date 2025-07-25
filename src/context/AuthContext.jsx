import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [token, setToken] = useState(localStorage.getItem("token") || "");
   const [authUser, setAuthUser] = useState(null);
   const [socket, setSocket] = useState(null);
   const [onlineUsers, setOnlineUsers] = useState([]);
   const [isLoading, setIsLoading] = useState(false);

   // create axios instance with token
   const axiosInstance = axios.create({
      baseURL: backendUrl,
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });

   // check if the user is authenticated and if so, set user data and connect the socket
   const checkAuth = async () => {
      try {
         setIsLoading(true);

         const { data } = await axiosInstance.get("/auth/check-auth");
         if (data?.success) {
            setAuthUser(data?.data);
            connectSocket(data.data);
         }
      } catch (error) {
         toast.error(error.message);
      } finally {
         setIsLoading(false);
      }
   };

   // login function to register and signin the user
   const login = async (state, credentials) => {
      try {
         const { data } = await axiosInstance.post(
            `/auth/${state}`,
            credentials
         );
         if (data?.success) {
            setToken(data.token);
            localStorage.setItem("token", data.token);
            setAuthUser(data.data);
            connectSocket(data.data);
            toast.success(data.message);
            return true;
         } else {
            toast.error(data.message);
            return false;
         }
      } catch (error) {
         toast.error(error.message);
         return false;
      }
   };

   // logout function to logout the user and socket disconnection
   const logout = async () => {
      localStorage.removeItem("token");
      setToken(null);
      setAuthUser(null);
      socket?.disconnect();
      toast.success("logged out successfully");
   };

   // update profile function to handle user profile update
   const updateProfile = async (profileData) => {
      try {
         const { data } = await axiosInstance.put(
            `/auth/update-profile`,
            profileData
         );
         if (data?.success) {
            setAuthUser(data.data);
            toast.success(data.message);
         } else {
            toast.error(data.message);
         }
      } catch (error) {
         toast.error(error.message);
      }
   };

   // connect the socket
   const connectSocket = async (userData) => {
      if (!userData || socket?.connected) return;
      const socketInstance = io(backendUrl, {
         query: {
            userId: userData._id,
         },
      });
      socketInstance.connect();
      setSocket(socketInstance);

      socketInstance.on("getOnlineUsers", (userIds) => {
         setOnlineUsers(userIds);
      });
   };

   // check auth on component mount and token state changed
   useEffect(() => {
      checkAuth();
   }, [token]);

   // provide context value
   const value = {
      isLoading,
      axiosInstance,
      authUser,
      socket,
      onlineUsers,
      login,
      logout,
      updateProfile,
   };

   return (
      <>
         <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
      </>
   );
};
