export interface Appointment {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  status: "pending" | "confirmed" | "cancelled";
  personName: string;
  personEmail: string;
  animalName?: string;
}
