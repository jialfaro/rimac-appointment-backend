import { IAppointmentRepository } from '../../domain/interfaces/IAppointmentRepository';

export class GetAppointmentsByInsuredUseCase {
  constructor(private repo: IAppointmentRepository) {}

  async execute(insuredId: string) {
    return this.repo.findByInsuredId(insuredId);
  }
}
