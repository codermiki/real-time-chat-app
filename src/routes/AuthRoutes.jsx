import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

function AuthRoutes() {
   return (
      <>
         <Routes>
            <Route index element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={"404"} />
         </Routes>
      </>
   );
}

export default AuthRoutes;
