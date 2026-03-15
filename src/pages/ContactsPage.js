import React from "react";
import HomeLayout from "../layouts/HomeLayout";

export default function ContactsPage() {
  return (
    <HomeLayout
      welcomeTitle="Elérhetőségek"
      welcomeSubtitle="Keressen minket bizalommal az alábbi elérhetőségeken!"
      cards={[]}
    >
      <section style={{marginTop: 32}}>
        <h2>Kapcsolat</h2>
        <p>Email: info@egeszsegapp.hu</p>
        <p>Telefon: +36 1 234 5678</p>
        <p>Cím: 1234 Budapest, Egészség utca 1.</p>
      </section>
    </HomeLayout>
  );
}
