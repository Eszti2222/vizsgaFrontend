
import React, { useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import "./css/navigation.css";

export default function Navigation() {
  const { user, logout } = useContext(AuthContext);


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
    { path: "/timetable", label: "Időpont foglalás" },
    { path: "/documents", label: "Dokumentumaim" },
    { path: "/specialorders", label: "Szakrendelések" },
    { path: "/doctors", label: "Orvosok" },
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
      <nav className="headnav d-flex justify-content-between align-items-center p-2">
        <p>
          <strong>LOGO</strong>
        </p>
        {user ? (
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="userDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Bejelentkezett fiók {user.name}
            </button>
            <ul className="dropdown-menu" aria-labelledby="userDropdown">
              <li>
                <NavLink className="dropdown-item" to="/profile">
                  Profilom
                </NavLink>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    logout();
                  }}
                >
                  Kijelentkezés
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <NavLink className="btn btn-primary me-2" to="/login">
              Bejelentkezés
            </NavLink>
            <NavLink className="btn btn-outline-primary" to="/register">
              Regisztráció
            </NavLink>
          </div>
        )}
      </nav>
      <nav className="sidenav">
        <ul>
          {user && user.role === "doctor" && doctorNavItems.map((item) => (
            <li key={item.path}>
              <NavLink to={item.path}>{item.label}</NavLink>
            </li>
          ))}
          {user && user.role === "patient" && patientNavItems.map((item) => (
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

  // Orvos-specifikus menüpontok csak orvosnak
  const showDoctorNav = user.role === "doctor";

  return (
    <header>
      <nav className="headnav d-flex justify-content-between align-items-center p-2">
        <p>
          <strong>LOGO</strong>
        </p>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="userDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Bejelentkezett fiók {user.name}
          </button>
          <ul className="dropdown-menu" aria-labelledby="userDropdown">
            <li>
              <NavLink className="dropdown-item" to="/profile">
                Profilom
              </NavLink>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  logout();
                }}
              >
                Kijelentkezés
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <nav className="sidenav">
        <ul>
          {showDoctorNav && doctorNavItems.map((item) => (
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