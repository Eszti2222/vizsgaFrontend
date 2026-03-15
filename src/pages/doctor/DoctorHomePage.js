import React from "react";
import DoctorLayout from "../../layouts/DoctorLayout";

export default function DoctorHomePage() {

  return (
    <DoctorLayout>
      <div className="doctor-home">
        <h1>Üdvözöljük az orvosi felületen!</h1>
        <p>Itt kezelheti pácienseit, időpontjait és dokumentumait.</p>
      </div>
    </DoctorLayout>
  );
}