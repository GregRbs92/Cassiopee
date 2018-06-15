export interface Appointment {
  id: number,
  title: string,
  type: string,
  startDate: Date,
  endDate: Date,
  clientId: number,
  workerId: number;
}
