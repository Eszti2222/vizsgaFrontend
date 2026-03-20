import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import "./css/navigation.css";

export default function Navigation() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Orvos-specifikus menüpontok
  const doctorNavItems = [
    { path: "/", label: "Kezdőlap" },
    { path: "/profile", label: "Profilom" },
    { path: "/appointments", label: "Foglalt időpontok" },
    { path: "/document-upload", label: "Dokumentum feltöltés" },
    { path: "/patients", label: "Páciensek" },
  ];

  // Páciens-specifikus menüpontok
  const patientNavItems = [
    { path: "/", label: "Kezdőlap" },
    { path: "/profile", label: "Profilom" },
    { path: "/patient-my-appointments", label: "Időpontjaim" },
    { path: "/documents", label: "Dokumentumaim" },
    { path: "/specialorders", label: "Szakrendelések" },
    { path: "/doctors", label: "Orvosok" },
  ];

  // Admin-specifikus menüpontok
  const adminNavItems = [
    { path: "/", label: "Kezdőlap" },
    { path: "/profile", label: "Profilom" },
    { path: "/adoctors", label: "Orvosok" },
    { path: "/patients", label: "Páciensek" },
    { path: "/specialorders", label: "Szakrendelések" },
  ];

  // Fix menüpontok minden fióknál
  const fixedNavItems = [
    { path: "/aboutus", label: "Rólunk" },
    { path: "/gyik", label: "GYIK" },
    { path: "/contacts", label: "Elérhetőségek" },
  ];

  // Mindig jelenjen meg a navigációs sáv, ha nincs user, csak a fix menüpontok, de a szerkezet egységes marad
  return (
    <header>
      <nav className="headnav modern-headnav">
        <div className="headnav-logo">
          <span className="logo-circle">
            <img src="/logo.png" alt="LOGO" className="logo-img" />
          </span>
          <span className="logo-text">Betegnyilvántartó</span>
        </div>
        <div className="headnav-account">
          {user ? (
            <div className="account-info">
              <span className="account-name">{user.name}</span>
              <button className="account-btn" onClick={logout}>
                Kijelentkezés
              </button>
            </div>
          ) : (
            <div>
              <NavLink className="account-btn" to="/login">
                Bejelentkezés
              </NavLink>
              <NavLink className="account-btn secondary" to="/register">
                Regisztráció
              </NavLink>
            </div>
          )}
        </div>
      </nav>
      <nav className="sidenav">
        <ul>
          {user &&
            user.role === "doctor" &&
            doctorNavItems.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path}>{item.label}</NavLink>
              </li>
            ))}
          {user &&
            user.role === "patient" &&
            patientNavItems.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path}>{item.label}</NavLink>
              </li>
            ))}
          {user &&
            user.role === "admin" &&
            adminNavItems.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path}>{item.label}</NavLink>
              </li>
            ))}
        </ul>
        <ul className="fixed-bottom-nav">
          {fixedNavItems.map((item) => (
            <li key={item.path}>
              <NavLink to={item.path}>{item.label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
