import React from "react";
import { Routes, Route } from "react-router-dom";
import Intro from "../pages/main/Intro";
import Login from "../pages/login/Login";
import Home from "../pages/admin/Home";
import CssExample from "../components/custom/CssExample";
import NotFound from "../pages/not-found/NotFound";

function AppRoutes(){
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Intro" element={<Intro />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/CssExample" element={<CssExample />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
