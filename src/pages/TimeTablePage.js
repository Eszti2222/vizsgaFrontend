import React, { useContext, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AuthContext } from "../contexts/AuthContext";
import { myAxios } from "../services/api";
import { useParams, useLocation, Link } from "react-router";
import CustomToolbar from "../components/calendar/CustomToolbar";

const localizer = momentLocalizer(moment);
const formats = {
  dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
    `${localizer.format(start, "YYYY.MM.DD.", culture)} – ${localizer.format(
      end,
      "YYYY.MM.DD.",
      culture,
    )}`,
};

export default function TimeTablePage() {
  const { loadUser, user, loading } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const { id: doctorId } = useParams();
  const location = useLocation();
  const doctorName = location.state?.doctorName || "az orvos";
  const [currentDate, setCurrentDate] = useState(new Date());

  //naptár konfiguráció
  const minTime = new Date();
  minTime.setHours(8, 0, 0, 0);
  const maxTime = new Date();
  maxTime.setHours(17, 0, 0, 0);

  // Betöltjük a felhasználót
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // Átalakítjuk a session-öket eseményekké
  useEffect(() => {
    if (!user) return;

    (async () => {
      const { data } = await myAxios.get(
        `/api/doctors/${doctorId}/appointments`,
      );
      const duration = 30 * 60 * 1000;

      const evs = data.map((appt) => {
        const startDate = new Date(appt.appointment_time);
        return {
          title: appt.patient_id === user.id ? "Saját foglalás" : "Foglalt",
          start: startDate,
          end: new Date(startDate.getTime() + duration),
          isMine: appt.patient_id === user.id,
          isBooked: true,
        };
      });

      setEvents(evs);
    })();
  }, [doctorId, user]);

  if (loading) return <div>Betöltés folyamatban...</div>;

  // Kattintás egy szabad időpontra
  // Helper a MySQL dátumformátumhoz
  const formatToMySQL = (date) => {
    const pad = (n) => n.toString().padStart(2, "0");
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleSelectSlot = async ({ start, end }) => {
    const now = new Date();
    const duration = 30 * 60 * 1000;

    if (start < now) {
      alert("Múltbeli időpontra nem foglalhatsz.");
      return;
    }

    const alreadyBooked = events.find(
      (ev) => ev.start.getTime() === start.getTime(),
    );

    if (alreadyBooked) {
      alert("Ez az időpont már foglalt.");
      return;
    }

    const localDateTime = start.toLocaleString("hu-HU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    const ok = window.confirm(
      `Biztosan foglalsz erre az időpontra: ${localDateTime}\n${doctorName}-hoz?`,
    );
    if (!ok) return;

    try {
      await myAxios.post(`/api/doctors/${doctorId}/appointments`, {
        appointment_time: formatToMySQL(start),
      });

      const newEvent = {
        title: "Saját foglalás",
        start,
        end: new Date(start.getTime() + duration),
        isBooked: true,
        isMine: true,
      };

      setEvents((prev) => [...prev, newEvent]);
      alert("Időpont sikeresen lefoglalva!");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Hiba történt az időpont foglalása közben.",
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div className="mb-3 d-flex gap-2 flex-wrap">
        <Link to="/doctors" className="btn btn-outline-secondary btn-sm">
          ← Vissza az orvosokhoz
        </Link>

        <Link to="/specialorders" className="btn btn-outline-secondary btn-sm">
          ← Vissza a szakrendelésekhez
        </Link>

        <Link to="/patient-my-appointments" className="btn btn-primary btn-sm">
          Időpontjaim megtekintése
        </Link>
      </div>

      <h2>Időpont foglalás</h2>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        selectable
        onSelectSlot={handleSelectSlot}
        date={currentDate}
        onNavigate={(date) => setCurrentDate(date)}
        defaultDate={new Date()}
        views={{ work_week: true, day: true }}
        defaultView="work_week"
        min={minTime}
        max={maxTime}
        formats={formats}
        components={{ toolbar: CustomToolbar }}
        step={30}
        timeslots={2}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.isMine ? "#4caf50" : "#888888",
            color: "white",
            pointerEvents: "none",
          },
        })}
      />
    </div>
  );
}
