import React, { useContext } from "react";
import { Link } from "react-router"; // sima Link, ne NavLink
import { AuthContext } from "../contexts/AuthContext";
import Navigation from "./Navigation";
import "./css/homepage.css";

export default function HomePage() {
  //const { user } = useContext(AuthContext);

  return (
    <div>
      <h5>
        Üdvözlő szöveg
      </h5>
    </div>

//    <div>
//      <h1>Kezdőlap</h1>
//
//      {user ? (
//        <p>
//          Üdv, {user.name}! Jelenlegi szereped: {user.role}
//        </p>
//      ) : (
//        <p>
//          Kérlek, jelentkezz be a folytatáshoz.{" "}
//          <Link to="/login">Jelentkezz be!</Link>
//        </p>
//      )}
//    </div>
  );
}
