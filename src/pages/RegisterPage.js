import React, { useState } from "react";
// useNavigate a regisztráció után navigáláshoz
import { useNavigate } from "react-router-dom";
// custom hook a AuthContextből
import useAuthContext from "../contexts/AuthContext";

export default function RegisterPage() {
  // űrlap state-ek
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const navigate = useNavigate();
  // loginReg: regisztráció vagy login függvény
  // errors: szerver oldali validációs hibák
  const { loginReg, errors } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // űrlapadatok objektumba gyűjtése
    const adat = {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation, // fontos: ez a state neve
    };

    console.log("Regisztrációs adatok:", adat);
    loginReg(adat, "/register"); // custom hook hívása
  };

  return (
    <div className="m-auto" style={{ maxWidth: "400px" }}>
      <h1 className="text-center">Regisztráció</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="name" className="form-label">
            Név:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="text-danger">{errors.name}</span>}
        </div>

        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="text-danger">{errors.email}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Jelszó:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <span className="text-danger">{errors.password}</span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="passwordConfirmation" className="form-label">
            Jelszó újra:
          </label>
          <input
            type="password"
            className="form-control"
            id="passwordConfirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          {errors.password_confirmation && (
            <span className="text-danger">{errors.password_confirmation}</span>
          )}
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary w-100">
            Regisztrálok
          </button>
        </div>
      </form>
    </div>
  );
}
