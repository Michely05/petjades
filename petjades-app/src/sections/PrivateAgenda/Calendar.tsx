import "./Calendar.css"
import FullCalendar from "@fullcalendar/react";
import { EventInput, EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import caLocale from '@fullcalendar/core/locales/ca';
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "../../components/Modal";
import { ConfirmModal } from "../../components/ConfirmModal";
import { useModal } from "../../hooks/useModal";
import { AppointmentCreate } from "../../types/AppointmentCreate";
import plusIcon from "../../assets/icons/plus-icon.png"
import { API_URL } from "../../config/api";

export const Calendar = () => {
    const token = localStorage.getItem("token");

    const [events, setEvents] = useState<EventInput[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const { openModal, modalProps } = useModal();
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [animals, setAnimals] = useState<Array<{ id: number; nom: string }>>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [appointmentToDelete, setAppointmentToDelete] = useState<number | null>(null);

    const [newAppointment, setNewAppointment] = useState<AppointmentCreate>({
        title: "",
        startDate: "",
        endDate: "",
        animalId: undefined as number | undefined
    });

    const loadAppointments = async () => {
        try {
            const res = await axios.get(`https://${API_URL}/appointments`, {
                headers: { Authorization: "Bearer " + token }
            });

            setEvents(
                res.data.map((a: any) => ({
                    id: a.id,
                    title: a.title ?? "Cita",
                    start: a.startDate,
                    end: a.endDate,
                    backgroundColor: getColorByStatus(a.status), // Uncomment these
                    borderColor: getColorByStatus(a.status),
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
            const res = await axios.get(`https://${API_URL}/animals`, {
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
            openModal({
                title: "Error",
                message: "Falta el títol de la cita.",
                type: "error"
            });
            return;
        }

        setLoading(true);
        try {
            const startDate = new Date(newAppointment.startDate);
            const endDate = new Date(newAppointment.endDate);

            if (endDate <= startDate) {
                openModal({
                    title: "Error",
                    message: "La data de fi ha de ser posterior a la d'inici.",
                    type: "error"
                });
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
                `https://${API_URL}/appointments`,
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
        } catch (err: any) {
            
            const errorMsg = err.response?.data?.title 
                || err.response?.data?.message 
                || err.response?.data 
                || err.message;
            
            openModal({
                title: "Error",
                message: `No s'ha pogut crear la cita: ${errorMsg}`,
                type: "error"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateAppointment = async () => {
        
        if (!editingId) return;

        if (!newAppointment.title.trim()) {
            openModal({
                title: "Error",
                message: "Falta el títol de la cita.",
                type: "error"
            });
            return;
        }

        setLoading(true);
        try {
            const startDate = new Date(newAppointment.startDate);
            const endDate = new Date(newAppointment.endDate);

            if (endDate <= startDate) {
                openModal({
                    title: "Error",
                    message: "La data de fi ha de ser posterior a la d'inici.",
                    type: "error"
                });
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
                `https://${API_URL}/appointments/${editingId}`,
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
            // alert("Cita actualitzada correctament!");
        } catch (err: any) {
            
            const errorMsg = err.response?.data?.title 
                || err.response?.data?.message 
                || err.response?.data 
                || err.message;
            openModal({
                title: "Error",
                message: `No s'ha pogut actualitzar la cita: ${errorMsg}`,
                type: "error"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAppointment = async (appointmentId: number, e: React.MouseEvent) => {
        e.stopPropagation();

        setAppointmentToDelete(appointmentId);
        setConfirmOpen(true);
    };

    const confirmDelete = async () => {
        if (!appointmentToDelete) return;

        setLoading(true);
        try {
            await axios.delete(
                `https://${API_URL}/appointments/${appointmentToDelete}`,
                { 
                    headers: { 
                        Authorization: "Bearer " + token
                    } 
                }
            );

            await loadAppointments();
            //alert("Cita eliminada correctament!");
        } catch (err: any) {
            
            const errorMsg = err.response?.data?.title 
                || err.response?.data?.message 
                || err.response?.data 
                || err.message;
        
            openModal({
                title: "Error",
                message: `No s'ha pogut eliminar la cita: ${errorMsg}`,
                type: "error"
            });
        } finally {
            setLoading(false);
            setConfirmOpen(false);
            setAppointmentToDelete(null);
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
                        className="h-4 w-4 cursor-pointer" 
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
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl text-(--primary-color) font-bold">AGENDA</h1>

                <button
                    onClick={() => {
                        const now = new Date();
                        const endDate = new Date(now.getTime() + 30 * 60000);
                        
                        setNewAppointment({
                            title: "",
                            startDate: formatDateForInput(now),
                            endDate: formatDateForInput(endDate),
                            animalId: undefined
                        });
                        setIsEditing(false);
                        setEditingId(null);
                        setModalOpen(true);
                    }}
                    className="bg-[--primary-color] text-(--primary-color) rounded-full p-2 shadow-lg hover:opacity-90 z-10"
                    title="Nova cita"
                >
                    <img src={plusIcon} alt="Nova cita" className="w-8 h-8 cursor-pointer"/>
                </button>
            </div>

            <div className="[&_.fc-daygrid-day]:cursor-pointer [&_.fc-timegrid-slot]:cursor-pointer [&_.fc-event]:cursor-pointer [&_.fc-event:hover]:opacity-80">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    locale={caLocale}
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

            <ConfirmModal
                obert={confirmOpen}
                titol="Eliminar cita"
                missatge="Estàs segur que vols eliminar aquesta cita? Aquesta acció no es pot desfer."
                onConfirm={confirmDelete}
                onCancel={() => {
                setConfirmOpen(false);
                setAppointmentToDelete(null);
                }}
            />
        </div>
    );
};

const getColorByStatus = (status: string) => {
    switch (status) {
        case "pending":
            return "#f59e0b"; // orange
        case "confirmed":
            return "#6b945a"; // your primary green color
        case "cancelled":
            return "#dc2626"; // red
        default:
            return "#6b7280"; // gray
    }
};