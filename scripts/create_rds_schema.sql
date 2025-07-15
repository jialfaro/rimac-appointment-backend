-- Script para crear tabla en RDS MySQL
CREATE TABLE appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  insured_id VARCHAR(10),
  schedule_id INT,
  country_iso VARCHAR(2),
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);