import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import "../pages/css/homelayout.css";

export default function HomePage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const homeConfigByRole = {
    patient: {
      title: "Üdvözöljük a páciens felületen!",
      subtitle: "Itt foglalhat időpontot, kezelheti dokumentumait és megtekintheti a GYIK-et.",
      cards: [
        { label: "Időpontfoglalás", path: "/patient-my-appointments", desc: "Foglaljon időpontot egyszerűen és gyorsan, kezelje találkozásait online." },
        { label: "GYIK", path: "/gyik", desc: "Gyakran ismételt kérdések, hasznos információk a rendszer használatához." },
        { label: "Dokumentumok", path: "/documents", desc: "Töltse fel, kezelje és tekintse meg saját orvosi dokumentumait biztonságosan." },
      ],
    },
    doctor: {
      title: "Üdvözöljük az orvosi felületen!",
      subtitle: "Itt kezelheti pácienseit, időpontjait és dokumentumait.",
      cards: [
        { label: "Foglalt időpontok", path: "/appointments", desc: "Tekintse meg és kezelje foglalt időpontjait, páciensei adatait." },
        { label: "Dokumentum feltöltés", path: "/document-upload", desc: "Töltsön fel dokumentumokat pácienseihez, biztonságos adatkezeléssel." },
        { label: "GYIK", path: "/gyik", desc: "Gyakran ismételt kérdések, segédletek az orvosi felülethez." },
      ],
    },
    admin: {
      title: "Üdvözöljük az admin felületen!",
      subtitle: "Itt kezelheti a pácienseket, orvosokat és szakrendeléseket.",
      cards: [
        { label: "Páciensek", path: "/patients", desc: "Páciensek kezelése, adatok és jogosultságok adminisztrációja." },
        { label: "Orvosok", path: "/doctors", desc: "Orvosok kezelése, szakirányok és rendelők adminisztrációja." },
        { label: "Szakrendelések", path: "/specialorders", desc: "Szakrendelések kezelése, időpontok és helyszínek adminisztrációja." },
      ],
    },
  };

  const currentHome = user?.role ? homeConfigByRole[user.role] : null;

  if (currentHome) {
    return (
      <div className="home-layout">
        <section className="home-layout__content">
          <section className="home-layout__welcome">
            <h1>{currentHome.title}</h1>
            <p>{currentHome.subtitle}</p>
          </section>
          <section className="home-layout__cards">
            <div className="home-layout__cards-grid">
              {currentHome.cards.map((card) => (
                <div
                  className="info-card clickable"
                  key={card.label}
                  onClick={() => navigate(card.path)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      navigate(card.path);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                >
                  <h3>{card.label}</h3>
                  {card.desc && <div className="card-desc">{card.desc}</div>}
                </div>
              ))}
            </div>
          </section>
        </section>
      </div>
    );
  }

  // vendég vagy ismeretlen szerepkör
  return (
    <div className="home-layout">
      <section className="home-layout__content">
        <section className="home-layout__welcome">
          <h1>Üdvözöljük!</h1>
          <p>Kérjük, jelentkezzen be a folytatáshoz.</p>
        </section>
      </section>
    </div>
  );
}