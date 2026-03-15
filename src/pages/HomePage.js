import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import DoctorHomePage from "./doctor/DoctorHomePage";
import PatientHomePage from "./PatientHomePage";
import "../pages/css/homelayout.css";

const patientCards = [
  { title: "Időpont foglalás" },
  { title: "GYIK" },
  { title: "Dokumentumok" },
];

export default function HomePage() {
  const { user } = useContext(AuthContext);

  if (user) {
    if (user.role === "doctor") {
      return <DoctorHomePage />;
    }
    //if (user.role === "admin") {
    //  return <AdminHomePage />;
    //}
    if (user.role === "patient") {
      return <PatientHomePage />;
    }
  }

  // vendég vagy ismeretlen szerepkör
  return (
    <div className="home-layout">
      <div className="home-layout__body">
        <main className="home-layout__content">
          <section className="home-layout__welcome">
            <h1>Üdvözöljük!</h1>
            <p>Kérjük, jelentkezzen be a folytatáshoz.</p>
          </section>
        </main>
      </div>
    </div>
  );
}