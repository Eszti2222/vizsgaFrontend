import React from "react";
import "../components/css/contacts.css";

const contacts = [
  {
    name: "Nagy Eszter",
    company: "Fejlesztő",
    desc: "Frontend, backend fejlesztés és tesztelés.",
    email: "eszter.nagy@betegnyilvantarto.hu",
    phone: "+36 30 123 4567",
  },
  {
    name: "Nádas Viktória",
    company: "Fejlesztő",
    desc: "Frontend, backend fejlesztés és tesztelés.",
    email: "viktoria.nadas@betegnyilvantarto.hu",
    phone: "+36 20 234 5678",
  },
  {
    name: "Varga Dorothea",
    company: "Fejlesztő",
    desc: "Frontend, backend fejlesztés és tesztelés.",
    email: "dorothea.varga@betegnyilvantarto.hu",
    phone: "+36 70 345 6789",
  },
  {
    name: "Dr. Kovács Béla",
    company: "Intézményvezető",
    desc: "Az intézmény szakmai és operatív vezetése.",
    email: "kovacs.bela@betegnyilvantarto.hu",
    phone: "+36 1 111 1111",
  },
  {
    name: "Dr. Szalai Ágnes",
    company: "Orvosigazgató",
    desc: "Orvosszakmai irányítás, minőségbiztosítás.",
    email: "szalai.agnes@betegnyilvantarto.hu",
    phone: "+36 1 222 2222",
  },
  {
    name: "Kerekes Gábor",
    company: "Ügyvezető igazgató",
    desc: "Üzleti és adminisztratív vezetés, kapcsolattartás.",
    email: "kerekes.gabor@betegnyilvantarto.hu",
    phone: "+36 1 333 3333",
  },
];

export default function ContactsPage() {
  // Avatar kezdőbetű generálás
  function getInitials(name) {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  }
  return (
    <div className="contacts-bg">
      <div className="contacts-card large">
        <h2>Elérhetőségek</h2>
        <div className="contacts-list">
          {contacts.map((c, i) => (
            <div className="contact-item" key={i}>
              <div className="contact-avatar">{getInitials(c.name)}</div>
              <div className="contact-name">{c.name}</div>
              <div className="contact-company">{c.company}</div>
              <p className="contact-desc">{c.desc}</p>
              <div className="contact-email">{c.email}</div>
              <div className="contact-phone">{c.phone}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
