import { Navigate, useLocation } from "react-router-dom";
import PreLoader from "../PreLoader/PreLoader";

function ProtectedRoute({ isAuth, isLoading, children }) {
   const location = useLocation();

   // 1. Still loading: show spinner
   if (isLoading || isAuth === null) {
      return <PreLoader />;
   }

   // 2. Auth check finished, user is not authenticated: redirect
   if (isAuth === false) {
      return <Navigate to="/auth/login" replace state={{ from: location }} />;
   }

   // 3. Auth check finished and user is authenticated: render the page
   return children;
}

export default ProtectedRoute;
