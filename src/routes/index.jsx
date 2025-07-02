import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import AuthRoutes from "./AuthRoutes";
import MainLayout from "../Layouts/Main/MainLayout";

function AppRoutes() {
   return (
      <>
         <Routes>
            <Route
               path="/"
               element={
                  <MainLayout>
                     <Home />
                  </MainLayout>
               }
            />
            <Route path="/auth/*" element={<AuthRoutes />} />
            <Route path="*" element={"404"} />
         </Routes>
      </>
   );
}

export default AppRoutes;
