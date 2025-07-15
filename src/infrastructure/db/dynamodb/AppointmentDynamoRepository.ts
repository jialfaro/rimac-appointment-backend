import { DynamoDB } from 'aws-sdk';
import { Appointment } from '../../../domain/models/Appointment';
import { IAppointmentRepository } from '../../../domain/interfaces/IAppointmentRepository';

const TABLE_NAME = process.env.DYNAMODB_TABLE || 'Appointments';

export class AppointmentDynamoRepository implements IAppointmentRepository {
  private db = new DynamoDB.DocumentClient();

  async save(appointment: Appointment): Promise<void> {
    await this.db.put({
      TableName: TABLE_NAME,
      Item: {
        insuredId: appointment.insuredId,
        scheduleId: appointment.scheduleId,
        countryISO: appointment.countryISO,
        status: appointment.status,
        createdAt: new Date().toISOString(),
      }
    }).promise();
  }

  async findByInsuredId(insuredId: string): Promise<Appointment[]> {
    const result = await this.db.query({
      TableName: TABLE_NAME,
      KeyConditionExpression: 'insuredId = :id',
      ExpressionAttributeValues: { ':id': insuredId }
    }).promise();

    return (result.Items || []).map(item => new Appointment(item.insuredId, item.scheduleId, item.countryISO, item.status));
  }

  async updateStatus(insuredId: string, scheduleId: number, status: string): Promise<void> {
    await this.db.update({
      TableName: TABLE_NAME,
      Key: { insuredId },
      UpdateExpression: 'set #s = :s',
      ExpressionAttributeNames: { '#s': 'status' },
      ExpressionAttributeValues: { ':s': status }
    }).promise();
  }
}
