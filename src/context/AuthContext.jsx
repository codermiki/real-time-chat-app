import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { createAxiosInstance } from "../utils/axiosInstance.js";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [isLoading, setIsLoading] = useState(false);
   const [isAuth, setIsAuth] = useState(null);
   const [token, setToken] = useState(localStorage.getItem("token") || "");
   const [authUser, setAuthUser] = useState(null);
   const [socket, setSocket] = useState(null);
   const [onlineUsers, setOnlineUsers] = useState([]);

   // check auth on component mount and token state changed
   useEffect(() => {
      // check if the user is authenticated and if so, set user data and connect the socket
      const checkAuth = async () => {
         try {
            setIsLoading(true);

            const axiosInstance = await createAxiosInstance(token);
            const { data } = await axiosInstance.get("/auth/check-auth");
            if (data?.success) {
               setAuthUser(data?.data);
               connectSocket(data.data);
               setIsAuth(true);
            } else {
               setIsAuth(false);
            }
         } catch (error) {
            setIsAuth(false);
            toast.error(error.message);
         } finally {
            setIsLoading(false);
         }
      };

      checkAuth();
   }, [token]);

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

   // login function to register and signin the user
   const login = async (state, credentials) => {
      try {
         const axiosInstance = await createAxiosInstance(token);
         const { data } = await axiosInstance.post(
            `/auth/${state}`,
            credentials
         );
         if (data?.success) {
            setToken(data.token);
            localStorage.setItem("token", data.token);
            setAuthUser(data.data);
            await connectSocket(data.data);
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
      try {
         localStorage.removeItem("token");
         setToken(null);
         setAuthUser(null);
         setIsAuth(false);
         await socket?.disconnect();
         toast.success("logged out successfully");
      } catch (error) {
         toast.error(error.message);
      }
   };

   // update profile function to handle user profile update
   const updateProfile = async (profileData) => {
      try {
         setIsLoading(true);

         const axiosInstance = await createAxiosInstance(token);
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
      } finally {
         setIsLoading(false);
      }
   };

   // provide context value
   const value = {
      isAuth,
      isLoading,
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
