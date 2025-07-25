import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import PreLoader from "../PreLoader/PreLoader";

function ProtectedRoute({ children }) {
   const { authUser, isLoading } = useContext(AuthContext);

   // Show loading indicator
   if (isLoading) {
      return <PreLoader />;
   }
   // Redirect unauthenticated users to login page
   if (!authUser) {
      return <Navigate to={"/auth/login"} />;
   }
   // render the page
   return children;
}

export default ProtectedRoute;
