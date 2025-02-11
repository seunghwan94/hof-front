import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import Home from "../pages/admin/Home";
import CssExample from "../components/custom/CssExample";
import Index from "../pages/main/layout/Index";

function AppRoutes(){
  return (
    <Routes>
      <Route path="/*" element={<Index />} /> 
      <Route path="/Login" element={<Login />} />
      <Route path="/DashBoard" element={<Home />} />
      <Route path="/CssExample" element={<CssExample/>} />
    </Routes>
  );
};

export default AppRoutes;
