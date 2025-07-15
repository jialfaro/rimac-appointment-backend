import { APIGatewayProxyHandler } from 'aws-lambda';
import serverlessExpress from '@vendia/serverless-express';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const app = express();

const swaggerDocument = YAML.load(path.resolve(__dirname, '../../../../swagger/openapi.yaml'));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export const handler: APIGatewayProxyHandler = serverlessExpress({ app });