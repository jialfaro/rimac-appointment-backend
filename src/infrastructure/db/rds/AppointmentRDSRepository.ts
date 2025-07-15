import mysql from 'mysql2/promise';

export class AppointmentRDSRepository {
  private connectionConfig = {
    host: process.env.RDS_HOST,
    user: process.env.RDS_USER,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB
  };

  async saveAppointment(data: any): Promise<void> {
    const conn = await mysql.createConnection(this.connectionConfig);
    await conn.execute(
      'INSERT INTO appointments (insured_id, schedule_id, country_iso) VALUES (?, ?, ?)',
      [data.insuredId, data.scheduleId, data.countryISO]
    );
    await conn.end();
  }
}
