import { SQSEvent } from 'aws-lambda';
import { EventBridge } from 'aws-sdk';
import { AppointmentRDSRepository } from '../../../infrastructure/db/rds/AppointmentRDSRepository';

const repo = new AppointmentRDSRepository();
const eventBridge = new EventBridge();

export const handler = async (event: SQSEvent) => {
  for (const record of event.Records) {
    try {
      const body = JSON.parse(record.body);
      const appointment = JSON.parse(body.Message);
      await repo.saveAppointment(appointment);

      await eventBridge.putEvents({
        Entries: [
          {
            Source: 'rimac.appointment',
            DetailType: 'AppointmentSaved',
            Detail: JSON.stringify(appointment),
            EventBusName: 'default'
          }
        ]
      }).promise();

      console.log(`✅ Evento enviado a EventBridge para asegurado: ${appointment.insuredId}`);
    } catch (err) {
      console.error('❌ Error procesando record:', record, err);
    }
  }
};