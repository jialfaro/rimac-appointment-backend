import { Appointment } from '../models/Appointment';

export interface IAppointmentRepository {
  save(appointment: Appointment): Promise<void>;
  findByInsuredId(insuredId: string): Promise<Appointment[]>;
}