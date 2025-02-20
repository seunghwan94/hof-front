import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/member/login/Login";
import CssExample from "../components/custom/CssExample";
import Index from "../pages/main/Index";
import BarRoutes from "../pages/admin/layout/BarRoutes";
import "../util/ChartConfigjs";
import Signup from "../pages/member/signup/Signup";

function AppRoutes(){
  return (
    // <>
 
    // <BarRoutes/>

    <Routes>
      <Route path="/*" element={<Index />} /> 
      <Route path="/Login" element={<Login />} />
      <Route path="/admin/*" element={<BarRoutes />} />
      <Route path="/CssExample" element={<CssExample/>} />
      <Route path="/Signup" element={<Signup />} />
    </Routes>
    // </>
  );
};

export default AppRoutes;
