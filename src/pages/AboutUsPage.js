import React from "react";
import "../components/css/aboutus.css";

const features = [
  {
    icon: "🌐",
    title: "Digitális egészségügy",
    desc: "Modern, online platform a páciensek és orvosok kényelméért, gyors ügyintézéssel.",
  },
  {
    icon: "🛡️",
    title: "Adatbiztonság",
    desc: "Kiemelt figyelmet fordítunk a személyes és egészségügyi adatok védelmére.",
  },
  {
    icon: "⭐",
    title: "Szakmai elhivatottság",
    desc: "Csapatunk tapasztalt fejlesztőkből és egészségügyi szakemberekből áll.",
  },
];

export default function AboutUsPage() {
  return (
    <div className="aboutus-bg">
      <div className="aboutus-card">
        <div className="aboutus-left">
          <div className="aboutus-label">Rólunk</div>
          <div className="aboutus-headline">Digitális egészségügy, biztonság, szakértelem</div>
          <div className="aboutus-desc">
            Célunk, hogy a páciensek és orvosok számára biztonságos, átlátható és könnyen kezelhető felületet biztosítsunk. A legmagasabb szintű betegellátást támogatjuk digitális eszközökkel, a személyes adatok védelmével és szakmai elhivatottsággal.
          </div>
        </div>
        <div className="aboutus-features">
          {features.map((f, i) => (
            <div className="aboutus-feature" key={i}>
              <div className="aboutus-feature-icon">{f.icon}</div>
              <div>
                <div className="aboutus-feature-title">{f.title}</div>
                <div className="aboutus-feature-desc">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
