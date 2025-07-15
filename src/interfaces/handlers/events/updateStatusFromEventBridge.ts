import { SQSEvent } from 'aws-lambda';
import { AppointmentDynamoRepository } from '../../../infrastructure/db/dynamodb/AppointmentDynamoRepository';

const repo = new AppointmentDynamoRepository();

const parseMessage = (raw: string) => {
  try {
    const parsed = JSON.parse(raw);
    if (parsed.Type === 'Notification' && parsed.Message) {
      return JSON.parse(parsed.Message); // mensaje original dentro de SNS
    }
    return parsed;
  } catch {
    return {}; // o lanzar un error si prefieres
  }
};

export const handler = async (event: SQSEvent) => {
  for (const record of event.Records) {
    const message = parseMessage(record.body);
    const detail = message.detail ?? message;
    const { insuredId, scheduleId } = detail;

    if (insuredId && scheduleId) {
      await repo.updateStatus(insuredId, scheduleId, 'completed');
      console.log(`✅ Estado actualizado en DynamoDB: ${insuredId}, ${scheduleId}`);
    } else {
      console.warn('⚠️ Evento sin insuredId o scheduleId:', detail);
    }
  }
};