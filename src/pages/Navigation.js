import React, { useContext } from "react";
import { NavLink } from "react-router";
import "./css/navigation.css";
import { AuthContext } from "../contexts/AuthContext";

export default function Navigation() {
  const { logout, user, loading } = useContext(AuthContext);

  if (loading || !user) {
    return <nav>Betöltés folyamatban...</nav>;
  }

  return (
    <header>
      <nav>
        <ul>
          <li className="kiemelt">
            <strong>szia</strong>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink to="/home">Kezdőlap</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profilom</NavLink>
          </li>
          <li>
            <NavLink to="/timetable">Időpont foglalás</NavLink>
          </li>
          <li>
            <NavLink to="/documents">Dokumentumaim</NavLink>
          </li>
          <li>
            <NavLink to="/specialorders">Szakrendelések</NavLink>
          </li>
        </ul>
        <ul>
          <li>Welcome {user.user.name ? user.user.name : "Guest"}</li>
          <li className="kiemelt" onClick={logout}>
            Logout
          </li>
        </ul>
      </nav>
    </header>
  );
}