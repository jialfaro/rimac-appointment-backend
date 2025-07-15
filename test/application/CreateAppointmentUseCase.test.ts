import { CreateAppointmentUseCase } from '../../src/application/use-cases/CreateAppointmentUseCase';
import { Appointment } from '../../src/domain/models/Appointment';

describe('CreateAppointmentUseCase', () => {
  it('should save appointment and publish event', async () => {
    const mockRepo = {
      save: jest.fn().mockResolvedValue(undefined),
    };
    const mockPublisher = {
      publish: jest.fn().mockResolvedValue(undefined),
    };

    const useCase = new CreateAppointmentUseCase(mockRepo as any, mockPublisher as any);

    const input = { insuredId: '12345', scheduleId: 1, countryISO: 'PE' };
    await useCase.execute(input);

    expect(mockRepo.save).toHaveBeenCalledWith(expect.any(Appointment));
    expect(mockPublisher.publish).toHaveBeenCalledWith(expect.any(Appointment));
  });
});
