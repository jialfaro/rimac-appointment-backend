import { SNS } from 'aws-sdk';
import { Appointment } from '../../domain/models/Appointment';

const TOPIC_ARN_PE = process.env.SNS_TOPIC_PE || '';
const TOPIC_ARN_CL = process.env.SNS_TOPIC_CL || '';

export class SnsPublisher {
  private sns = new SNS();

  async publish(appointment: Appointment): Promise<void> {
    const topicArn = appointment.countryISO === 'PE' ? TOPIC_ARN_PE : TOPIC_ARN_CL;
    await this.sns.publish({
      TopicArn: topicArn,
      Message: JSON.stringify(appointment),
      MessageAttributes: {
        countryISO: {
          DataType: 'String',
          StringValue: appointment.countryISO
        }
      }
    }).promise();
  }
}
