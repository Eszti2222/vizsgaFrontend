import React from "react";
import { Link } from "react-router";

export default function Navigation() {
    return (
        <nav className="navbar navbar-expand-sm bg-light">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <li className="navbar-item">
                        <Link className="nav-link" to="/">
                            Kezdőlap
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link className="nav-link" to="/login">
                            Bejelentkezés
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link className="nav-link" to="/register">
                            Regisztráció
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}