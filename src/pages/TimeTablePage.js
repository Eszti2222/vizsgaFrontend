import React, { useContext, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AuthContext } from "../contexts/AuthContext";

const localizer = momentLocalizer(moment);

export default function TimeTablePage() {
  const { loadUser, user, loading } = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  // Betöltjük a felhasználót
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // Átalakítjuk a session-öket eseményekké
  useEffect(() => {
    if (user?.sessions) {
      const evs = user.sessions.map((s) => ({
        title: s.doctor?.name || "Orvos",
        start: new Date(s.appointment_time),
        end: new Date(s.appointment_time),
        isBooked: true, // jelöljük, hogy foglalt
      }));
      setEvents(evs);
    }
  }, [user]);

  if (loading) return <div>Betöltés folyamatban...</div>;

  // Kattintás egy szabad időpontra
  const handleSelectSlot = ({ start, end }) => {
    const alreadyBooked = events.find(
      (ev) => ev.start.getTime() === start.getTime()
    );

    if (alreadyBooked) {
      alert("Ez az időpont már foglalt!");
      return;
    }

    const doctorName = prompt("Add meg az orvos nevét a foglaláshoz:");
    if (!doctorName) return;

    const newEvent = {
      title: doctorName,
      start,
      end,
      isBooked: true,
    };

    setEvents([...events, newEvent]);

    // Itt hívhatod a backend-et is POST-tal, pl. /api/appointments
    // axios.post('/api/appointments', { appointment_time: start, doctor_id: ... })
    alert("Időpont sikeresen lefoglalva!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Időpont foglalás</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        selectable
        onSelectSlot={handleSelectSlot}
        views={["month", "week", "day"]}
        defaultView="week"
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.isBooked ? "#e1528f" : "#4caf50",
            color: "white",
          },
        })}
      />
    </div>
  );
}
