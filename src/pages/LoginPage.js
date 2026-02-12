import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Front-end validáció hibái
  const [errors, setErrors] = useState({});

  // A custom hookból jön a loginReg és a backend hibák
  const { loginReg } = useAuthContext();

  function validateForm() {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Az email cím kötelező";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Érvénytelen email formátum";
    }

    if (!password) {
      newErrors.password = "A jelszó kötelező";
    } else if (password.length < 6) {
      newErrors.password =
        "A jelszónak legalább 6 karakter hosszúnak kell lennie";
    }

    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Először front-end validáció
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Ha nincs front-end hiba, elküldjük a backendnek
    const adat = {
      email,
      password,
    };

    try {
      await loginReg(adat, "/login");
    } catch (error) {

      console.log("Hiba a loginReg-ben:", error);
    }
  }

  return (
    <div className="auth-container">
      <h2>Bejelentkezés</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Jelszó</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <span className="error-text">{errors.password}</span>
          )}
        </div>

        <button type="submit">Bejelentkezés</button>
      </form>

      <p className="auth-link">
        Nincs még fiókod? <NavLink to="/regisztracio">Regisztráció</NavLink>
      </p>
    </div>
  );
}
