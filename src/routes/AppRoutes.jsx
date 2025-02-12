import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import CssExample from "../components/custom/CssExample";
import Index from "../pages/main/layout/Index";
import BarRoutes from "../pages/admin/layout/BarRoutes";
import "../util/ChartConfigjs";

function AppRoutes(){
  return (
    // <>
 
    // <BarRoutes/>

    <Routes>
      <Route path="/*" element={<Index />} /> 
      <Route path="/Login" element={<Login />} />
      <Route path="/admin/*" element={<BarRoutes />} />
      <Route path="/CssExample" element={<CssExample/>} />
    </Routes>
    // </>
  );
};

export default AppRoutes;
