import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/member/login/Login";
import CssExample from "../components/custom/CssExample";
import Index from "../pages/main/Index";
import BarRoutes from "../pages/admin/layout/BarRoutes";
import "../util/ChartConfigjs";
import Signup from "../pages/member/signup/Signup";
import { ToastContainer } from "react-toastify";
import ToastComponent from "../components/custom/ToastComponent";

function AppRoutes(){
  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={3000} // 3초 후 자동 닫힘
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    <ToastComponent />
    <Routes>
      <Route path="/*" element={<Index />} /> 
      <Route path="/Login" element={<Login />} />
      <Route path="/admin/*" element={<BarRoutes />} />
      <Route path="/CssExample" element={<CssExample/>} />
      <Route path="/Signup" element={<Signup />} />
    </Routes>
    </>
  );
};

export default AppRoutes;
