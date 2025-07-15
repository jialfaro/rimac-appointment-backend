import { Appointment } from '../../domain/models/Appointment';
import { IAppointmentRepository } from '../../domain/interfaces/IAppointmentRepository';
import { SnsPublisher } from '../../infrastructure/sns/SnsPublisher';

export class CreateAppointmentUseCase {
  constructor(
    private repo: IAppointmentRepository,
    private snsPublisher: SnsPublisher
  ) {}

  async execute(input: any) {
    const appointment = new Appointment(input.insuredId, input.scheduleId, input.countryISO);
    await this.repo.save(appointment);
    await this.snsPublisher.publish(appointment);
  }
}
