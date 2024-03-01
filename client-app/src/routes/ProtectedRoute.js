import React from "react"
import { Navigate, Outlet, Route } from "react-router-dom";


export default function PrivateRoutes() {
    let  userid = localStorage.getItem("user") == null ? false : true;
    return (
        <>
            {userid ? <Outlet  /> : <Navigate to="/Login" />};
        </>
  
    )
  }