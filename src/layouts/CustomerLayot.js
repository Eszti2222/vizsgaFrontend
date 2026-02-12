import React from "react";
import Navigation from "../pages/Navigation";
import { Outlet } from "react-router";

export default function CustomerLayout() {
    return (
        <>
            <Navigation />
            <Outlet />
        </>
    );
}