// src/layouts/HomeLayout.js
import React from "react";
// ha a felső sávot a NavigationPage csinálja, akkor:
import Navigation from "../pages/Navigation"; 
import "../pages/css/homelayout.css";

const HomeLayout = ({
  welcomeTitle,
  welcomeSubtitle,
  cards = [],
  extraMenuItems = [],
}) => {
  return (
    <div className="home-layout">
      {/* felső sáv */}
      <Navigation />

      <div className="home-layout__body">
        {/* bal oldali menü */}
       

        {/* középső tartalom */}
        <main className="home-layout__content">
          <section className="home-layout__welcome">
            <h1>{welcomeTitle}</h1>
            <p>{welcomeSubtitle}</p>
          </section>

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

          <footer className="home-layout__footer">
            <p>Elérhetőségeink, social felületek, helyszín</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default HomeLayout;