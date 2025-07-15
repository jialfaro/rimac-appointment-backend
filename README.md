# Rimac Appointment Backend

Aplicación Serverless para el agendamiento de citas médicas de asegurados, implementada con AWS Lambda, API Gateway, DynamoDB, RDS, SNS, SQS y EventBridge.

## 🧱 Arquitectura

- **Lambda** para crear y listar agendamientos
- **DynamoDB** almacena solicitudes pendientes
- **SNS + SQS** enruta por país (PE/CL)
- **RDS MySQL** guarda confirmaciones
- **EventBridge** para eventos de confirmación
- **Typescript + Serverless Framework**

## 🗂️ Estructura

- `src/domain` → Entidades y contratos
- `src/application` → Casos de uso
- `src/infrastructure` → Conexiones externas (Dynamo, RDS, SNS, etc.)
- `src/interfaces` → Handlers HTTP y eventos
- `test/` → Pruebas unitarias con Jest
- `swagger/openapi.yaml` → Documentación OpenAPI

## 🚀 Despliegue

1. Instalar dependencias:

```bash
npm install
```

2. Compilar y Desplegar con Serverless:

```bash
npx tsc
npx serverless deploy
```

> Asegúrate de tener configuradas tus credenciales AWS.

## 🧪 Pruebas

```bash
npm run test
```

## 📦 Endpoints

### POST `/appointments`

Registra un agendamiento pendiente.

```json
{
  "insuredId": "01234",
  "scheduleId": 100,
  "countryISO": "PE"
}
```

### GET `/appointments/{insuredId}`

Devuelve agendamientos por asegurado:

```
/appointments/01234
```

## 🛠️ Variables necesarias

Estas deben definirse como variables de entorno:

- `DYNAMODB_TABLE`
- `SNS_TOPIC_PE`
- `SNS_TOPIC_CL`
- `RDS_HOST`
- `RDS_USER`
- `RDS_PASSWORD`
- `RDS_DB`

## 🧾 Licencia

MIT – Desarrollado como reto técnico para Rimac Seguros.
