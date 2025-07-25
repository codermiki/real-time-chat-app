import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import MainLayout from "../Layouts/Main/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Auth from "../components/Auth/Auth";

function AppRoutes() {
   return (
      <>
         <Routes>
            <Route
               path="/"
               element={
                  <ProtectedRoute>
                     <MainLayout>
                        <Home />
                     </MainLayout>
                  </ProtectedRoute>
               }
            />
            <Route path="/auth/:authType" element={<Auth />} />
            <Route path="*" element={"404"} />
         </Routes>
      </>
   );
}

export default AppRoutes;
