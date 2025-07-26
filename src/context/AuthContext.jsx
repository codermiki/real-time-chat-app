import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
   loginUser,
   logoutUser,
   updateUserProfile,
   checkAuthStatus,
} from "../services/authService";
import { createSocketConnection } from "../services/socketService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [isLoading, setIsLoading] = useState(false);
   const [isAuth, setIsAuth] = useState(null);
   const [token, setToken] = useState(localStorage.getItem("token") || "");
   const [authUser, setAuthUser] = useState(null);
   const [socket, setSocket] = useState(null);
   const [onlineUsers, setOnlineUsers] = useState([]);

   // check auth status
   useEffect(() => {
      const verifyAuth = async () => {
         try {
            setIsLoading(true);
            const data = await checkAuthStatus(token);
            if (data?.success) {
               setAuthUser(data.data);
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

      verifyAuth();
   }, [token]);

   // Create socket only after successful authUser state update
   useEffect(() => {
      if (authUser?._id && !socket) {
         const socketInstance = createSocketConnection(
            authUser._id,
            setOnlineUsers
         );
         setSocket(socketInstance);
      }
   }, [authUser, socket]);

   // login user
   const login = async (state, credentials) => {
      try {
         const data = await loginUser(state, credentials, token);
         if (data?.success) {
            setToken(data.token);
            localStorage.setItem("token", data.token);
            setAuthUser(data.data);
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

   // logout user
   const logout = async () => {
      try {
         logoutUser();
         setToken(null);
         setAuthUser(null);
         setIsAuth(false);
         await socket?.disconnect();
         toast.success("Logged out successfully");
      } catch (error) {
         toast.error(error.message);
      }
   };

   // update user profile
   const updateProfile = async (profileData) => {
      try {
         setIsLoading(true);
         const data = await updateUserProfile(profileData, token);
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

   // context value
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

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
