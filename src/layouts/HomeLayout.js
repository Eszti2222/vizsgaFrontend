// src/layouts/HomeLayout.js
import React from "react";
import Navigation from "../pages/Navigation";
import "../pages/css/homelayout.css";

export default function HomeLayout({
  welcomeTitle,
  welcomeSubtitle,
  cards = [],
  extraMenuItems = [],
}) {
  return (
    <div className="home-layout">
      {/* Header + Sidebar */}
      <Navigation extraMenuItems={extraMenuItems} />

      {/* Központi tartalom */}
      <main className="home-layout__content">
        {/* Üdvözlő szöveg */}
        <section className="home-layout__welcome">
          <h1>{welcomeTitle}</h1>
          <p>{welcomeSubtitle}</p>
        </section>

        {/* Kártyák */}
        <section className="home-layout__cards">
          <h2>Szolgáltatásaink</h2>
          <div className="home-layout__cards-grid">
            {cards.map((card) => (
              <div className="info-card" key={card.title}>
                <h3>{card.title}</h3>
                {card.description && <p>{card.description}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Alsó információs rész */}
        <footer className="home-layout__footer">
          <p>Elérhetőségeink, social felületek, helyszín</p>
        </footer>
      </main>
    </div>
  );
}