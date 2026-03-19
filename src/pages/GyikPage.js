import React, { useState } from "react";
import "../components/css/gyik.css";

const faqs = [
  {
    question: "Hogyan tudok időpontot foglalni orvoshoz?",
    answer: "Az időpontfoglaláshoz jelentkezzen be, majd válassza ki a kívánt orvost és a szabad időpontot a 'Foglalás' menüpontban.",
  },
  {
    question: "Hogyan tudom lemondani a lefoglalt időpontot?",
    answer: "A 'Foglalt időpontok' menüpontban válassza ki a törölni kívánt időpontot, majd kattintson a 'Lemondás' gombra.",
  },
  {
    question: "Hogyan találom meg a szakterületemnek megfelelő orvost?",
    answer: "A 'Szakrendelések' vagy 'Orvosok' menüpontban szűrhet szakterület szerint, így könnyen megtalálja a megfelelő orvost.",
  },
  {
    question: "Milyen adatokat lát az orvos rólam?",
    answer: "Az orvos csak a szükséges egészségügyi adatokat, a TAJ számot, valamint a korábbi időpontok és dokumentumok adatait látja.",
  },
  {
    question: "Kaphatok emlékeztetőt a közelgő időpontomról?",
    answer: "Igen, a rendszer automatikus e-mail emlékeztetőt küld a foglalt időpont előtt 24 órával.",
  },
  {
    question: "Hogyan tölthetek fel orvosi dokumentumot?",
    answer: "A 'Dokumentum feltöltés' menüpontban válassza ki a fájlt, adja meg a szükséges adatokat, majd kattintson a 'Feltöltés' gombra.",
  },
  {
    question: "Milyen formátumú dokumentumokat fogad el a rendszer?",
    answer: "PDF, JPG és PNG formátumú dokumentumokat tölthet fel.",
  },
  {
    question: "Hogyan tudom módosítani a profil adataimat?",
    answer: "A 'Profilom' menüpontban szerkesztheti személyes adatait, majd mentheti a változtatásokat.",
  },
  {
    question: "Mit tegyek, ha nem találok szabad időpontot?",
    answer: "Próbáljon meg másik orvost vagy szakterületet választani, illetve nézzen vissza később, mert a lemondott időpontok felszabadulnak.",
  },
  {
    question: "Hogyan vehetem fel a kapcsolatot az orvosommal?",
    answer: "Az időpont visszaigazoló e-mailben található elérhetőségen keresztül, vagy a rendszer üzenetküldő felületén keresztül tud kapcsolatba lépni az orvossal.",
  },
  {
    question: "Hogyan tudok időpontot foglalni?",
    answer: "Az időpontfoglaláshoz regisztráció és bejelentkezés szükséges, majd a 'Foglalás' menüpontban válassza ki a kívánt orvost és időpontot.",
  },
  {
    question: "Elfelejtettem a jelszavam, mit tegyek?",
    answer: "A bejelentkezési oldalon kattintson az 'Elfelejtett jelszó' linkre, majd kövesse az utasításokat az új jelszó beállításához.",
  },
  {
    question: "Hogyan tölthetek fel dokumentumot?",
    answer: "A 'Dokumentum feltöltés' menüpontban válassza ki a fájlt, adja meg a szükséges adatokat, majd kattintson a 'Feltöltés' gombra.",
  },
  {
    question: "Milyen formátumú dokumentumokat fogad el a rendszer?",
    answer: "PDF, JPG és PNG formátumú dokumentumokat tölthet fel.",
  },
  {
    question: "Hogyan tudom módosítani a profil adataimat?",
    answer: "A 'Profilom' menüpontban szerkesztheti személyes adatait, majd mentheti a változtatásokat.",
  },
  {
    question: "Hogyan vehetem fel a kapcsolatot az ügyfélszolgálattal?",
    answer: "Az 'Elérhetőségek' menüpontban találja az ügyfélszolgálat elérhetőségeit, ahol e-mailben vagy telefonon is kereshet minket.",
  },
  {
    question: "Hogyan törölhetem a fiókomat?",
    answer: "A fiók törléséhez kérjük, vegye fel a kapcsolatot ügyfélszolgálatunkkal az 'Elérhetőségek' menüpontban található elérhetőségek egyikén.",
  },
  {
    question: "Milyen böngészőt érdemes használni?",
    answer: "A legjobb élmény érdekében javasoljuk a Google Chrome, Mozilla Firefox vagy Microsoft Edge legfrissebb verzióját.",
  },
  {
    question: "Biztonságosak az adataim?",
    answer: "Igen, minden adatot titkosítva tárolunk, és csak az arra jogosultak férhetnek hozzá.",
  },
  {
    question: "Mi történik, ha hibát találok az oldalon?",
    answer: "Kérjük, jelezze ügyfélszolgálatunknak az 'Elérhetőségek' menüpontban található elérhetőségek egyikén, hogy mielőbb javíthassuk a problémát.",
  },
];

export default function GyikPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="gyik-bg">
      <div className="gyik-card">
        <h1>GYIK</h1>
        <p className="gyik-desc">Gyakran ismételt kérdések és válaszok a rendszer használatához.</p>
        {faqs.map((faq, idx) => (
          <div key={idx} className="gyik-faq-item">
            <div
              className="gyik-faq-question"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              {faq.question}
              <span className="gyik-arrow">{openIndex === idx ? "\u25BC" : "\u25B6"}</span>
            </div>
            {openIndex === idx && (
              <div className="gyik-faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
