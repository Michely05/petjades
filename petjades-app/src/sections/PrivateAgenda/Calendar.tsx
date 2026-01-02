import FullCalendar from "@fullcalendar/react";
import { EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "../../components/Modal";
import { AppointmentCreate } from "../../types/AppointmentCreate";

export const Calendar = () => {
    const token = localStorage.getItem("token");

    const [events, setEvents] = useState<EventInput[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [newAppointment, setNewAppointment] = useState<AppointmentCreate>({
        title: "",
        personName: "",
        personEmail: "",
        startDate: "",
        endDate: "",
        animalId: undefined
    });

    const loadAppointments = async () => {
        console.log("🔄 Loading appointments...");
        try {
            const res = await axios.get("https://localhost:7151/appointments", {
                headers: { Authorization: "Bearer " + token }
            });

            console.log("✅ Appointments loaded:", res.data);

            setEvents(
                res.data.map((a: any) => ({
                    id: a.id,
                    title: a.title ?? "Cita",
                    start: a.startDate,
                    end: a.endDate,
                    backgroundColor: getColorByStatus(a.status),
                    borderColor: getColorByStatus(a.status),
                    extendedProps: {
                        personName: a.personName,
                        personEmail: a.personEmail,
                        status: a.status
                    }
                }))
            );
        } catch (err: any) {
            console.error("❌ Error loading appointments:", err);
            console.error("Response:", err.response?.data);
        }
    };

    useEffect(() => {
        if (token) loadAppointments();
    }, [token]);

    // Helper to convert "YYYY-MM-DD" to "YYYY-MM-DDTHH:MM" format
    const formatDateForInput = (dateStr: string, defaultHour: number = 9, defaultMinute: number = 0) => {
        if (!dateStr) return "";
        
        // If it already has time, return as is
        if (dateStr.includes('T')) {
            return dateStr.slice(0, 16); // "YYYY-MM-DDTHH:MM"
        }
        
        // If it's just a date, add default time
        return `${dateStr}T${String(defaultHour).padStart(2, '0')}:${String(defaultMinute).padStart(2, '0')}`;
    };

    const handleCreateAppointment = async () => {
        console.log("📝 Starting appointment creation...");
        
        // Validació bàsica
        if (!newAppointment.title.trim()) {
            alert("El títol és obligatori");
            return;
        }
        if (!newAppointment.personName.trim()) {
            alert("El nom de la persona és obligatori");
            return;
        }
        if (!newAppointment.personEmail.trim()) {
            alert("L'email és obligatori");
            return;
        }
        if (!newAppointment.startDate || !newAppointment.endDate) {
            alert("Les dates són obligatòries");
            return;
        }

        setLoading(true);
        try {
            // Convert datetime-local format to ISO string
            const startDate = new Date(newAppointment.startDate);
            const endDate = new Date(newAppointment.endDate);

            console.log("📅 Parsed dates:", { startDate, endDate });

            // Validation: end must be after start
            if (endDate <= startDate) {
                alert("La data de fi ha de ser posterior a la d'inici");
                setLoading(false);
                return;
            }

            const payload: AppointmentCreate = {
                title: newAppointment.title,
                personName: newAppointment.personName,
                personEmail: newAppointment.personEmail,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                animalId: newAppointment.animalId || undefined
            };

            console.log("📤 Sending payload:", payload);
            console.log("🔑 Using token:", token ? "Present" : "Missing");

            const response = await axios.post(
                "https://localhost:7151/appointments",
                payload,
                { 
                    headers: { 
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json"
                    } 
                }
            );

            console.log("✅ Server response:", response.data);
            console.log("✅ Status code:", response.status);

            // Reseteja el formulari
            setNewAppointment({
                title: "",
                personName: "",
                personEmail: "",
                startDate: "",
                endDate: "",
                animalId: undefined
            });

            setModalOpen(false);
            
            console.log("🔄 Reloading appointments...");
            await loadAppointments();
            
            alert("Cita creada correctament!");
        } catch (err: any) {
            console.error("❌ Error creating appointment:", err);
            console.error("❌ Error message:", err.message);
            console.error("❌ Response status:", err.response?.status);
            console.error("❌ Response data:", err.response?.data);
            
            const errorMsg = err.response?.data?.title 
                || err.response?.data?.message 
                || err.response?.data 
                || err.message;
            
            alert(`No s'ha pogut crear la cita: ${errorMsg}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 text-[--primary-color]">
                Calendari de cites
            </h2>

            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                selectable={!modalOpen}
                editable={false}
                events={events}
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay"
                }}
                select={(info) => {
                    console.log("📅 Date selected:", info);
                    
                    // Format dates properly for datetime-local inputs
                    const startFormatted = formatDateForInput(info.startStr, 9, 0);
                    const endFormatted = formatDateForInput(info.endStr, 9, 30);
                    
                    setNewAppointment({
                        title: "Nova cita",
                        personName: "",
                        personEmail: "",
                        startDate: startFormatted,
                        endDate: endFormatted,
                        animalId: undefined
                    });
                    setModalOpen(true);
                }}
            />

            {/* Crear cita */}
            <Modal 
                obert={modalOpen} 
                titol="Nova cita" 
                missatge="" 
                onClose={() => {
                    console.log("❌ Modal closed without saving");
                    setModalOpen(false);
                }}
                onConfirm={handleCreateAppointment}
            >
                <div className="flex flex-col gap-3" onClick={(e) => e.stopPropagation()}>
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
                        placeholder="Nom de la persona"
                        value={newAppointment.personName}
                        onChange={(e) =>
                            setNewAppointment({ ...newAppointment, personName: e.target.value })
                        }
                    />

                    <input
                        className="border rounded px-3 py-2"
                        placeholder="Email"
                        type="email"
                        value={newAppointment.personEmail}
                        onChange={(e) =>
                            setNewAppointment({ ...newAppointment, personEmail: e.target.value })
                        }
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Data i hora d'inici
                        </label>
                        <input
                            className="border rounded px-3 py-2 w-full"
                            type="datetime-local"
                            value={newAppointment.startDate}
                            onChange={(e) =>
                                setNewAppointment({ ...newAppointment, startDate: e.target.value })
                            }
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Data i hora de fi
                        </label>
                        <input
                            className="border rounded px-3 py-2 w-full"
                            type="datetime-local"
                            value={newAppointment.endDate}
                            onChange={(e) =>
                                setNewAppointment({ ...newAppointment, endDate: e.target.value })
                            }
                        />
                    </div>
                </div>
            </Modal>
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