import { SQSEvent } from 'aws-lambda';
import { AppointmentRDSRepository } from '../../../infrastructure/db/rds/AppointmentRDSRepository';

const repo = new AppointmentRDSRepository();

export const handler = async (event: SQSEvent) => {
  for (const record of event.Records) {
    const body = JSON.parse(record.body);
    await repo.saveAppointment(body);
  }
};
