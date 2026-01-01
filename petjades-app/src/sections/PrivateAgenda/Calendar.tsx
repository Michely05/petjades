import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "../../components/Modal";
import { Appointment } from "../../types/Appointment";

export const Calendar = () => {
  const token = localStorage.getItem("token");

  const [events, setEvents] = useState<EventInput[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState<Appointment | null>(null);

  const [newAppointment, setNewAppointment] = useState({
    title: "",
    email: "",
    notes: "",
    start: "",
    end: ""
  });

  useEffect(() => {
    axios.get("https://localhost:7151/appointments", {
      headers: { Authorization: "Bearer " + token }
    })
    .then(res => {
      setEvents(
        res.data.map((a: any) => ({
          id: a.id,
          title: a.title ?? "Cita",
          start: a.startDate,
          end: a.endDate,
          backgroundColor: getColorByStatus(a.status),
          borderColor: getColorByStatus(a.status),
          extendedProps: {
            email: a.email,
            notes: a.notes,
            status: a.status
          }
        }))
      );
    });
  }, []);

  const handleCreateAppointment = async () => {
    const res = await axios.post(
      "https://localhost:7151/appointments",
      {
        title: newAppointment.title,
        email: newAppointment.email,
        notes: newAppointment.notes,
        startDate: newAppointment.start,
        endDate: newAppointment.end
      },
      { headers: { Authorization: "Bearer " + token } }
    );

    setEvents(prev => [
      ...prev,
      {
        id: res.data.id,
        title: res.data.title,
        start: res.data.startDate,
        end: res.data.endDate,
        backgroundColor: getColorByStatus(res.data.status),
        borderColor: getColorByStatus(res.data.status),
        extendedProps: {
          email: res.data.email,
          notes: res.data.notes,
          status: res.data.status
        }
      }
    ]);

    setModalOpen(false);
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-[--primary-color]">
        Calendari de cites
      </h2>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        selectable
        editable={false}
        events={events}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        select={(info) => {
          setNewAppointment({
            title: "",
            email: "",
            notes: "",
            start: info.startStr,
            end: info.endStr
          });
          setModalOpen(true);
        }}
        eventClick={(info) => {
          setSelectedEvent({
            id: Number(info.event.id),
            title: info.event.title,
            start: info.event.startStr,
            end: info.event.endStr ?? "",
            email: info.event.extendedProps.email,
            notes: info.event.extendedProps.notes,
            status: info.event.extendedProps.status
          });
          setDetailOpen(true);
        }}
      />

      {/* Crear cita */}
      <Modal
        obert={modalOpen}
        titol="Nova cita"
        onClose={() => setModalOpen(false)}
      >
        <div className="flex flex-col gap-3">
          <input
            className="border rounded px-3 py-2"
            placeholder="Títol"
            value={newAppointment.title}
            onChange={(e) =>
              setNewAppointment({ ...newAppointment, title: e.target.value })
            }
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Email"
            value={newAppointment.email}
            onChange={(e) =>
              setNewAppointment({ ...newAppointment, email: e.target.value })
            }
          />
          <textarea
            className="border rounded px-3 py-2"
            placeholder="Notes"
            value={newAppointment.notes}
            onChange={(e) =>
              setNewAppointment({ ...newAppointment, notes: e.target.value })
            }
          />
          <button
            className="bg-[--primary-color] text-white rounded px-4 py-2"
            onClick={handleCreateAppointment}
          >
            Guardar cita
          </button>
        </div>
      </Modal>

      {/* Detalle cita */}
      {selectedEvent && (
        <Modal
          obert={detailOpen}
          titol="Detalls de la cita"
          onClose={() => setDetailOpen(false)}
        >
          <p><b>{selectedEvent.title}</b></p>
          <p>{selectedEvent.email}</p>
          <p>{selectedEvent.notes}</p>
          <p className="text-sm mt-2">
            Estat: <b>{selectedEvent.status}</b>
          </p>
        </Modal>
      )}
    </div>
  );
};


const getColorByStatus = (status: string) => {
  switch (status) {
    case "pending":
      return "#f59e0b"; // taronja
    case "confirmed":
      return "#16a34a"; // verd
    case "cancelled":
      return "#dc2626"; // vermell
    default:
      return "#6b7280"; // gris
  }
};

