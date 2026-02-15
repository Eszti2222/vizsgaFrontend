import React, { useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import "./css/navigation.css";

export default function Navigation() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header>
      <nav className="headnav d-flex justify-content-between align-items-center p-2">
        <p>
          <strong>LOGO</strong>
        </p>

        {/* majd ha megvan a login user */}
        {user ? (
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="userDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Bejelentkezett fiók {/* majd ha megvan a login {user.user.name} */}
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
                    logout(); // majd ha megvan a login
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
          <li>
            <NavLink to="/aboutus">Rólunk</NavLink>
          </li>
          <li>
            <NavLink to="/gyik">GYIK</NavLink>
          </li>
          <li>
            <NavLink to="/contacts">Contacts</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

// </ul> és </nav> közé vissza ha megvan a login!!!!
// <ul>
//   <li>Welcome {user.user.name ? user.user.name : "Guest"}</li>
//   <li className="kiemelt" onClick={logout}>
//     Logout
//   </li>
// </ul>
