export interface AppointmentCreate {
  title: string;
  personName: string;
  personEmail: string;
  startDate: string;
  endDate: string;
  animalId?: number;
}
