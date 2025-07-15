import { APIGatewayProxyHandler } from 'aws-lambda';
import { CreateAppointmentUseCase } from '../../../application/use-cases/CreateAppointmentUseCase';
import { AppointmentDynamoRepository } from '../../../infrastructure/db/dynamodb/AppointmentDynamoRepository';
import { SnsPublisher } from '../../../infrastructure/sns/SnsPublisher';

const repo = new AppointmentDynamoRepository();
const snsPublisher = new SnsPublisher();
const useCase = new CreateAppointmentUseCase(repo, snsPublisher);

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');
    await useCase.execute(body);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: 'Agendamiento en proceso' }),
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, headers: { 'Content-Type': 'application/json' }, body: 'Error al procesar el agendamiento' };
  }
};
