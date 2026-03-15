import React from "react";
import HomeLayout from "../layouts/HomeLayout";

export default function GyikPage() {
  return (
    <HomeLayout
      welcomeTitle="Gyakran Ismételt Kérdések (GYIK)"
      welcomeSubtitle="Itt talál választ a leggyakoribb kérdésekre."
      cards={[]}
    >
      <section style={{marginTop: 32}}>
        <h2>Hogyan tudok időpontot foglalni?</h2>
        <p>A bal oldali menüben válassza az "Időpont foglalás" menüpontot, majd kövesse az utasításokat.</p>
        <h2>Hogyan tölthetek fel dokumentumot?</h2>
        <p>Bejelentkezés után válassza a "Dokumentumaim" vagy orvosként a "Dokumentum feltöltés" menüpontot.</p>
        <h2>Elfelejtettem a jelszavam, mit tegyek?</h2>
        <p>A bejelentkezési oldalon kattintson az "Elfelejtett jelszó" linkre, és kövesse az utasításokat.</p>
      </section>
    </HomeLayout>
  );
}
