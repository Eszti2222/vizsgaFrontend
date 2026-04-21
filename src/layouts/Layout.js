import React from "react";
import Navigation from "../pages/Navigation";
import { Outlet } from "react-router";
import "./css/layout.css";
import Footer from "../components/common/Footer";

export default function Layout() {
  return (
    <div className="layout-container">
      <Navigation />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}