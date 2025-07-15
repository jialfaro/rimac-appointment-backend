import { SQSEvent } from 'aws-lambda';
import { AppointmentDynamoRepository } from '../../../infrastructure/db/dynamodb/AppointmentDynamoRepository';

const repo = new AppointmentDynamoRepository();

export const handler = async (event: SQSEvent) => {
  for (const record of event.Records) {
    const message = JSON.parse(record.body);
    await repo.updateStatus(message.insuredId, message.scheduleId, 'completed');
  }
};
