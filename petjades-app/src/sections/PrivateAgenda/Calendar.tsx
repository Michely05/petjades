import FullCalendar from "@fullcalendar/react";
import { EventInput, EventClickArg } from "@fullcalendar/core";
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
    const [animals, setAnimals] = useState<Array<{ id: number; nom: string }>>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const [newAppointment, setNewAppointment] = useState<AppointmentCreate>({
        title: "",
        startDate: "",
        endDate: "",
        animalId: undefined as number | undefined
    });

    const loadAppointments = async () => {
        try {
            const res = await axios.get("https://localhost:7151/appointments", {
                headers: { Authorization: "Bearer " + token }
            });

            setEvents(
                res.data.map((a: any) => ({
                    id: a.id,
                    title: a.title ?? "Cita",
                    start: a.startDate,
                    end: a.endDate,
                    // backgroundColor: getColorByStatus(a.status),
                    // borderColor: getColorByStatus(a.status),
                    extendedProps: {
                        personName: a.personName,
                        personEmail: a.personEmail,
                        status: a.status,
                        animalId: a.animalId
                    }
                }))
            );
        } catch (err: any) {
            console.error("Response:", err.response?.data);
        }
    };

    const loadAnimals = async () => {
        try {
            const res = await axios.get("https://localhost:7151/animals", {
                headers: { Authorization: "Bearer " + token }
            });
            setAnimals(res.data);
        } catch (err) {
            console.error("Error loading animals:", err);
        }
    };

    useEffect(() => {
        if (token) {
            loadAppointments();
            loadAnimals();
        }
    }, [token]);

    const formatDateForInput = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const handleEventClick = (clickInfo: EventClickArg) => {
    
        const event = clickInfo.event;
        const startDate = new Date(event.start!);
        const endDate = new Date(event.end!);

        setNewAppointment({
            title: event.title,
            startDate: formatDateForInput(startDate),
            endDate: formatDateForInput(endDate),
            animalId: event.extendedProps.animalId || undefined
        });
        
        setIsEditing(true);
        setEditingId(Number(event.id));
        setModalOpen(true);
    };

    const handleCreateAppointment = async () => {
        
        if (!newAppointment.title.trim()) {
            alert("El títol és obligatori");
            return;
        }

        setLoading(true);
        try {
            const startDate = new Date(newAppointment.startDate);
            const endDate = new Date(newAppointment.endDate);

            if (endDate <= startDate) {
                alert("La data de fi ha de ser posterior a la d'inici");
                setLoading(false);
                return;
            }

            const payload: AppointmentCreate = {
                title: newAppointment.title,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                animalId: newAppointment.animalId || undefined
            };

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

            resetForm();
            setModalOpen(false);
            await loadAppointments();
            alert("Cita creada correctament!");
        } catch (err: any) {
            
            const errorMsg = err.response?.data?.title 
                || err.response?.data?.message 
                || err.response?.data 
                || err.message;
            
            alert(`No s'ha pogut crear la cita: ${errorMsg}`);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateAppointment = async () => {
        
        if (!editingId) return;

        if (!newAppointment.title.trim()) {
            alert("El títol és obligatori");
            return;
        }

        setLoading(true);
        try {
            const startDate = new Date(newAppointment.startDate);
            const endDate = new Date(newAppointment.endDate);

            if (endDate <= startDate) {
                alert("La data de fi ha de ser posterior a la d'inici");
                setLoading(false);
                return;
            }

            const payload = {
                title: newAppointment.title,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                animalId: newAppointment.animalId || undefined
            };

            await axios.put(
                `https://localhost:7151/appointments/${editingId}`,
                payload,
                { 
                    headers: { 
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json"
                    } 
                }
            );

            resetForm();
            setModalOpen(false);
            await loadAppointments();
            alert("Cita actualitzada correctament!");
        } catch (err: any) {
            console.error("Error actualitzant cita:", err);
            
            const errorMsg = err.response?.data?.title 
                || err.response?.data?.message 
                || err.response?.data 
                || err.message;
            
            alert(`No s'ha pogut actualitzar la cita: ${errorMsg}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAppointment = async (appointmentId: number, e: React.MouseEvent) => {
        e.stopPropagation();
        
        const confirmDelete = window.confirm("Estàs segur que vols eliminar aquesta cita?");
        if (!confirmDelete) return;

        setLoading(true);
        try {
            console.log("🗑️ Deleting appointment:", appointmentId);

            await axios.delete(
                `https://localhost:7151/appointments/${appointmentId}`,
                { 
                    headers: { 
                        Authorization: "Bearer " + token
                    } 
                }
            );

            console.log("✅ Appointment deleted");

            await loadAppointments();
            alert("Cita eliminada correctament!");
        } catch (err: any) {
            console.error("Error deleting appointment:", err);
            
            const errorMsg = err.response?.data?.title 
                || err.response?.data?.message 
                || err.response?.data 
                || err.message;
            
            alert(`No s'ha pogut eliminar la cita: ${errorMsg}`);
        } finally {
            setLoading(false);
        }
    };

    const renderEventContent = (eventInfo: any) => {
        return (
            <div className="flex items-center justify-between w-full px-1 group">
                <span className="truncate flex-1">{eventInfo.event.title}</span>
                <button
                    onClick={(e) => handleDeleteAppointment(Number(eventInfo.event.id), e)}
                    className="transition-opacity ml-1 text-white hover:text-red-200 cursor-pointer"
                    title="Eliminar cita"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="#dc2626"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                        />
                    </svg>
                </button>
            </div>
        );
    };

    const resetForm = () => {
        setNewAppointment({
            title: "",
            startDate: "",
            endDate: "",
            animalId: undefined
        });
        setIsEditing(false);
        setEditingId(null);
    };

    const handleModalClose = () => {
        resetForm();
        setModalOpen(false);
    };

    return (
        <div className="p-8 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 text-[--primary-color]">
                Calendari de cites
            </h2>

            <div className="[&_.fc-daygrid-day]:cursor-pointer [&_.fc-timegrid-slot]:cursor-pointer [&_.fc-event]:cursor-pointer [&_.fc-event:hover]:opacity-80">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="timeGridWeek"
                    selectable={!modalOpen}
                    editable={false}
                    events={events}
                    displayEventTime={false}
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay"
                    }}
                    eventClick={handleEventClick}
                    eventContent={renderEventContent}
                    select={(info) => {
                        
                        const clickedDate = new Date(info.start);
                        const now = new Date();
                        clickedDate.setHours(now.getHours(), now.getMinutes(), 0, 0);
                        const endDate = new Date(clickedDate.getTime() + 30 * 60000);
                        
                        setNewAppointment({
                            title: "",
                            startDate: formatDateForInput(clickedDate),
                            endDate: formatDateForInput(endDate),
                            animalId: undefined
                        });
                        setIsEditing(false);
                        setEditingId(null);
                        setModalOpen(true);
                    }}
                />
            </div>

            <Modal 
                obert={modalOpen} 
                titol={isEditing ? "Editar cita" : "Nova cita"}
                missatge="" 
                onClose={handleModalClose}
                onConfirm={isEditing ? handleUpdateAppointment : handleCreateAppointment}
            >
                <div className="flex flex-col gap-3" onClick={(e) => e.stopPropagation()}>
                    <input
                        className="border rounded px-3 py-2"
                        placeholder="Títol de la cita"
                        value={newAppointment.title}
                        onChange={(e) =>
                            setNewAppointment({ ...newAppointment, title: e.target.value })
                        }
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Data i hora d'inici
                        </label>
                        <input
                            type="datetime-local"
                            className="border rounded px-3 py-2 w-full"
                            value={newAppointment.startDate}
                            onChange={(e) => {
                                const newStartDate = e.target.value;
                                const startDate = new Date(newStartDate);
                                const endDate = new Date(startDate.getTime() + 30 * 60000);
                                
                                setNewAppointment({ 
                                    ...newAppointment, 
                                    startDate: newStartDate,
                                    endDate: formatDateForInput(endDate)
                                });
                            }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Data i hora de fi
                        </label>
                        <input
                            type="datetime-local"
                            className="border rounded px-3 py-2 w-full"
                            value={newAppointment.endDate}
                            onChange={(e) =>
                                setNewAppointment({ ...newAppointment, endDate: e.target.value })
                            }
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Animal (opcional)
                        </label>
                        <select
                            className="border rounded px-3 py-2 w-full"
                            value={newAppointment.animalId ?? ""}
                            onChange={(e) =>
                                setNewAppointment({
                                    ...newAppointment,
                                    animalId: e.target.value ? Number(e.target.value) : undefined
                                })
                            }
                        >
                            <option value="">— Sense animal —</option>
                            {animals.map(a => (
                                <option key={a.id} value={a.id}>
                                    {a.nom}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

// const getColorByStatus = (status: string) => {
//     switch (status) {
//         case "pending":
//             return "#f59e0b";
//         case "confirmed":
//             return "#16a34a";
//         case "cancelled":
//             return "#dc2626";
//         default:
//             return "#6b7280";
//     }
// };