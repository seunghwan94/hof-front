import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import Home from "../pages/admin/Home";
import CssExample from "../components/custom/CssExample";
import Index from "../pages/main/layout/Index";
import Member from "../pages/admin/Member";
import Prod from "../pages/admin/Prod";
import Popup from "../pages/admin/Popup";
import Cash from "../pages/admin/Cash";
import Qna from "../pages/admin/Qna";
import FWL from "../pages/admin/FWL";

function AppRoutes(){
  return (
    <Routes>
      <Route path="/*" element={<Index />} /> 
      <Route path="/Login" element={<Login />} />
      <Route path="/DashBoard" element={<Home />} />
      <Route path="/member" element={<Member />} />
      <Route path="/prod" element={<Prod />} />
      <Route path="/popup" element={<Popup />} />
      <Route path="/cash" element={<Cash />} />
      <Route path="/qna" element={<Qna />} />
      <Route path="/fwl" element={<FWL />} />
      <Route path="/CssExample" element={<CssExample/>} />
    </Routes>
  );
};

export default AppRoutes;
