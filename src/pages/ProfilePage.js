import React, { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import Navigation from "./Navigation";

export default function ProfilePage() {
    const { user } = useContext(AuthContext);
    return(
        <div>
           <h1>Profil</h1>
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
    )
};
