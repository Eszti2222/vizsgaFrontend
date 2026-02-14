import React, { useContext } from "react";
import { Link } from "react-router"; // sima Link, ne NavLink
import { AuthContext } from "../contexts/AuthContext";

export default function HomePage() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Kezdőlap</h1>

      {user ? (
        <p>
          Üdv, {user.name}! Jelenlegi szereped: {user.role}
        </p>
      ) : (
        <p>
          Kérlek, jelentkezz be a folytatáshoz.{" "}
          <Link to="/login">Jelentkezz be!</Link>
        </p>
      )}
    </div>
  );
}
