import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import AuthRoutes from "./AuthRoutes";

function AppRoutes() {
   return (
      <>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/*" element={<AuthRoutes />} />
            <Route path="*" element={"404"} />
         </Routes>
      </>
   );
}

export default AppRoutes;
