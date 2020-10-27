DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employee (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(255) NULL,
  last_name VARCHAR(255) NULL,
  role_id INT(100),
  manager_id INT(100 NULL),

);
