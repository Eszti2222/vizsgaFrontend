import React from "react";
import HomeLayout from "../layouts/HomeLayout";

export default function AboutUsPage() {
  return (
    <HomeLayout
      welcomeTitle="Rólunk"
      welcomeSubtitle="Ismerje meg csapatunkat, küldetésünket és értékeinket!"
      cards={[]}
    >
      <section style={{marginTop: 32}}>
        <h2>Kik vagyunk?</h2>
        <p>
          Egészségügyi szolgáltatásunk célja, hogy a páciensek és orvosok számára biztonságos, átlátható és könnyen kezelhető felületet biztosítsunk.
        </p>
        <h2>Küldetésünk</h2>
        <p>
          A legmagasabb szintű betegellátás támogatása digitális eszközökkel, a személyes adatok védelmével.
        </p>
      </section>
    </HomeLayout>
  );
}
