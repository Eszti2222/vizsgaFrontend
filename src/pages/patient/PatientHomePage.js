import React from "react";
import HomeLayout from "../../layouts/HomeLayout";

export default function PatientHomePage() {
  const patientMenuItems = [
    { label: "Időpont foglalás", to: "/timetable" },
    { label: "Dokumentumaim", to: "/documents" },
    { label: "Szakrendelések", to: "/specialorders" },
  ];

  const patientCards = [
    { title: "Időpont foglalás" },
    { title: "GYIK" },
    { title: "Dokumentumok" },
  ];

  return (
    <HomeLayout
      welcomeTitle="Üdvözöljük a páciens felületen!"
      welcomeSubtitle="Itt foglalhat időpontot, kezelheti dokumentumait és megtekintheti a szakrendeléseket."
      cards={patientCards}
      extraMenuItems={patientMenuItems}
    />
  );
}