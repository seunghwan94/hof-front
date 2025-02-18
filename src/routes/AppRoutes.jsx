import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import CssExample from "../components/custom/CssExample";
import Index from "../pages/main/layout/Index";
import BarRoutes from "../pages/admin/layout/BarRoutes";
import "../util/ChartConfigjs";
import { Provider } from "react-redux";
import store from "../pages/redux/Store";

function AppRoutes(){
  return (
    // <>
 
    // <BarRoutes/>
    <Provider store={store}>
    <Routes>
      <Route path="/*" element={<Index />} /> 
      <Route path="/Login" element={<Login />} />
      <Route path="/admin/*" element={<BarRoutes />} />
      <Route path="/CssExample" element={<CssExample/>} />
    </Routes>
    </Provider>
    // </>
  );
};

export default AppRoutes;
