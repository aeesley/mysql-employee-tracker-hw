/* creating database parameters and sample data for mysql databases*/
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

/* designating which database to use*/
USE employee_db;


/* employee table*/
CREATE TABLE employee (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT(10),
  manager_id INT(10) NULL
  FOREIGN KEY (role_id) REFERENCES role(id)
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Alex', 'Eesley', '1', '3');
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Heather', 'Arnold', '2', '3');
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Caitlin', 'Murphy', '3', '5');
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Karen', 'Sopron', '4', '5');

/* role table*/
CREATE TABLE role (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(255) NULL,
  salary VARCHAR(255) NULL,
  department_id INT(100),
  FOREIGN KEY (department_id) REFERENCES department(id)
);

/* department table table*/
CREATE TABLE department (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(30) NULL
);
