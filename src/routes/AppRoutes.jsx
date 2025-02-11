import React from "react";
import { Routes, Route } from "react-router-dom";
import Intro from "../pages/main/Intro";
import Shop from "../pages/main/Shop";
import Community from "../pages/main/Community";
import Interior from "../pages/main/Interior";
import Login from "../pages/login/Login";
import Home from "../pages/admin/Home";
import CssExample from "../components/custom/CssExample";
import NotFound from "../pages/not-found/NotFound";

function AppRoutes(){
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Intro" element={<Intro />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/community" element={<Community />} />
      <Route path="/Interior" element={<Interior />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/CssExample" element={<CssExample/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
