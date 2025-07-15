import { GetAppointmentsByInsuredUseCase } from '../../src/application/use-cases/GetAppointmentsByInsuredUseCase';

describe('GetAppointmentsByInsuredUseCase', () => {
  it('should return appointments for insuredId', async () => {
    const appointments = [{ insuredId: '12345', scheduleId: 1, countryISO: 'PE', status: 'pending' }];
    const mockRepo = {
      findByInsuredId: jest.fn().mockResolvedValue(appointments),
    };

    const useCase = new GetAppointmentsByInsuredUseCase(mockRepo as any);
    const result = await useCase.execute('12345');

    expect(result).toEqual(appointments);
    expect(mockRepo.findByInsuredId).toHaveBeenCalledWith('12345');
  });
});
