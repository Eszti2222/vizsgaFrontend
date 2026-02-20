import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import "./css/loginpage.css";
import { AuthContext } from "../contexts/AuthContext";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [password_confirmation, setpassword_confirmation] = useState("");
  const [errors, setErrors] = useState({});
  const {loginReg, serverError}=useContext(AuthContext)
  const navigate = useNavigate();

  function validateForm() {
    const newErrors = {};
    if (!name) {
      newErrors.name = "A név megadása kötelező";
    } else if (name.length < 3) {
      newErrors.name = "A névnek legalább 3 karakter hosszúnak kell lennie";
    }
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
    if (!password_confirmation) {
      newErrors.password_confirmation = "Ismételje meg a jelszót";
    } else if (password !== password_confirmation) {
      newErrors.password_confirmation = "A két jelszó nem egyezik!";
    }

    return newErrors;
  }

  function submit(event) {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const user = { name, email, password, password_confirmation };
    console.log(user);
    loginReg({name, email, password, password_confirmation },"/register");
  }
  return (
    <div className="login">
      <h1>FIÓK LÉTREHOZÁSA</h1>
      <form onSubmit={submit}>
            {serverError && <div className="alert-error">{serverError}</div>}
        <div>
          <label htmlFor="name">Teljes név</label>
          <input
            type="text"
            value={name}
            autoComplete="name"
            placeholder="Enter your full name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            id="name"
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>
        <div>
          <label htmlFor="email">Email cím</label>
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            id="email"
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="password">Jelszó</label>
          <input
            type="password"
            value={password}
            autoComplete="password"
            placeholder="Enter your password"
            onChange={(e) => {
              setPassWord(e.target.value);
            }}
            id="password"
          />
          {errors.password && (
            <span className="error-text">{errors.password}</span>
          )}
        </div>
        <div>
          <label htmlFor="password_confirmation">Jelszó megreősítése</label>
          <input
            type="password"
            autoComplete="password_confirmation"
            value={password_confirmation}
            placeholder="Confirm your password"
            onChange={(e) => {
              setpassword_confirmation(e.target.value);
            }}
            id="password_confirmation"
          />
          {errors.password_confirmation && (
            <span className="error-text">{errors.password_confirmation}</span>
          )}
        </div>
        <div>
          <input type="submit" value="LÉTREHOZÁS" />
        </div>
        <div className="szoveg">
          Van már fiókja?
          <NavLink to="/login">Jelentkezzen be!</NavLink>
        </div>
      </form>
    </div>
  );
}
