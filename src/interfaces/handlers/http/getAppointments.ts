import { APIGatewayProxyHandler } from 'aws-lambda';
import { GetAppointmentsByInsuredUseCase } from '../../../application/use-cases/GetAppointmentsByInsuredUseCase';
import { AppointmentDynamoRepository } from '../../../infrastructure/db/dynamodb/AppointmentDynamoRepository';

const repo = new AppointmentDynamoRepository();
const useCase = new GetAppointmentsByInsuredUseCase(repo);

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const insuredId = event.pathParameters?.insuredId || '';
    const appointments = await useCase.execute(insuredId);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(appointments),
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, headers: { 'Content-Type': 'application/json' }, body: 'Error al obtener agendamientos' };
  }
};
