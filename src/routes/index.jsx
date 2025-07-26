import { Suspense, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import MainLayout from "../Layouts/Main/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Auth from "../components/Auth/Auth";
import Profile from "../pages/Profile/Profile";
import PreLoader from "../components/PreLoader/PreLoader";
import { AuthContext } from "../context/AuthContext";

function AppRoutes() {
   const { isAuth, isLoading } = useContext(AuthContext);

   return (
      <Suspense fallback={<PreLoader />}>
         <Routes>
            <Route
               path="/"
               element={
                  <ProtectedRoute isAuth={isAuth} isLoading={isLoading}>
                     <MainLayout>
                        <Home />
                     </MainLayout>
                  </ProtectedRoute>
               }
            />
            <Route
               path="/profile"
               element={
                  <ProtectedRoute isAuth={isAuth} isLoading={isLoading}>
                     <Profile />
                  </ProtectedRoute>
               }
            />
            <Route path="/auth/:authType" element={<Auth />} />
            <Route path="*" element={"404"} />
         </Routes>
      </Suspense>
   );
}

export default AppRoutes;
