import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import DoctorHomePage from "./doctor/DoctorHomePage";
import PatientHomePage from "./PatientHomePage";
import AdminHomePage from "./admin/AdminHomePage";
import { useNavigate } from "react-router";
import "../pages/css/homelayout.css";

export default function HomePage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Kártyák szerepkör szerint
  let cards = [];
  if (user?.role === "patient") {
    cards = [
      { label: "Időpontfoglalás", path: "/patient-my-appointments", desc: "Foglaljon időpontot egyszerűen és gyorsan, kezelje találkozásait online." },
      { label: "GYIK", path: "/gyik", desc: "Gyakran ismételt kérdések, hasznos információk a rendszer használatához." },
      { label: "Dokumentumok", path: "/documents", desc: "Töltse fel, kezelje és tekintse meg saját orvosi dokumentumait biztonságosan." },
    ];
  } else if (user?.role === "doctor") {
    cards = [
      { label: "Foglalt időpontok", path: "/appointments", desc: "Tekintse meg és kezelje foglalt időpontjait, páciensei adatait." },
      { label: "Dokumentum feltöltés", path: "/document-upload", desc: "Töltsön fel dokumentumokat pácienseihez, biztonságos adatkezeléssel." },
      { label: "GYIK", path: "/gyik", desc: "Gyakran ismételt kérdések, segédletek az orvosi felülethez." },
    ];
  } else if (user?.role === "admin") {
    cards = [
      { label: "Páciensek", path: "/patients", desc: "Páciensek kezelése, adatok és jogosultságok adminisztrációja." },
      { label: "Orvosok", path: "/doctors", desc: "Orvosok kezelése, szakirányok és rendelők adminisztrációja." },
      { label: "Szakrendelések", path: "/specialorders", desc: "Szakrendelések kezelése, időpontok és helyszínek adminisztrációja." },
    ];
  }

  // Szerepkör-specifikus home
  if (user) {
    if (user.role === "doctor") {
      return (
        <div className="home-layout">
          <main className="home-layout__content">
            <section className="home-layout__welcome">
              <h1>Üdvözöljük az orvosi felületen!</h1>
              <p>Itt kezelheti pácienseit, időpontjait és dokumentumait.</p>
            </section>
            <section className="home-layout__cards">
              <div className="home-layout__cards-grid">
                {cards.map((card) => (
                  <div
                    className="info-card clickable"
                    key={card.label}
                    onClick={() => navigate(card.path)}
                    tabIndex={0}
                    role="button"
                  >
                    <h3>{card.label}</h3>
                    {card.desc && <div className="card-desc">{card.desc}</div>}
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      );
    }
    if (user.role === "admin") {
      return (
        <div className="home-layout">
          <main className="home-layout__content">
            <section className="home-layout__welcome">
              <h1>Üdvözöljük az admin felületen!</h1>
              <p>Itt kezelheti a pácienseket, orvosokat és szakrendeléseket.</p>
            </section>
            <section className="home-layout__cards">
              <div className="home-layout__cards-grid">
                {cards.map((card) => (
                  <div
                    className="info-card clickable"
                    key={card.label}
                    onClick={() => navigate(card.path)}
                    tabIndex={0}
                    role="button"
                  >
                    <h3>{card.label}</h3>
                    {card.desc && <div className="card-desc">{card.desc}</div>}
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      );
    }
    if (user.role === "patient") {
      return (
        <div className="home-layout">
          <main className="home-layout__content">
            <section className="home-layout__welcome">
              <h1>Üdvözöljük a páciens felületen!</h1>
              <p>Itt foglalhat időpontot, kezelheti dokumentumait és megtekintheti a GYIK-et.</p>
            </section>
            <section className="home-layout__cards">
              <div className="home-layout__cards-grid">
                {cards.map((card) => (
                  <div
                    className="info-card clickable"
                    key={card.label}
                    onClick={() => navigate(card.path)}
                    tabIndex={0}
                    role="button"
                  >
                    <h3>{card.label}</h3>
                    {card.desc && <div className="card-desc">{card.desc}</div>}
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      );
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