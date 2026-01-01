export interface Appointment {
  id: number;
  title: string;
  email: string;
  notes: string;
  start: string;
  end: string;
  status: "pending" | "confirmed" | "cancelled";
}
