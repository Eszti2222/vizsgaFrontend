import React from "react";
import "./css/PatientHomePage.css";

const PatientHomePage = () => {
  return (
    <div className="patient-home-container">
      
      <aside className="sidebar">
        Sidebar tartalom
      </aside>

      <main className="main-content">
        
        <header className="header">
          Header tartalom
        </header>

        <section className="welcome-section">
          <h1>Üdvözlő szöveg</h1>
          <p>Rövid általános információ</p>
        </section>

        <section className="services-section">
          <h2>Szolgáltatásaink:</h2>

          <div className="card-container">
            <div className="service-card">Időpont foglalás</div>
            <div className="service-card">GYIK</div>
            <div className="service-card">Dokumentumok</div>
          </div>
        </section>

        <footer className="footer-info">
          elérhetőségek, social felületek, helyszín
        </footer>

      </main>
    </div>
  );
};

export default PatientHomePage;
