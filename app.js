// Requiring mysql, inquirer and fs
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const fs = require('fs');

// Creating the mysql connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employee_db"
});

// mysql callback function
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.end();
  });

Inquirer function to start initial questions
function startQuestions(){
    inquirer.prompt({
        message: "What would you like to do?",
        type: "list",
        choices: ["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "QUIT PROGRAM"],
        name: "userChoice"
    }).then(answers => {
        console.log(answers.userChoice);
        // adding switch statement logic that will run different functions based on user selection
            switch (answers.choice) {
                case "View All Employees":
                    viewAllEmployees()
                    break;
            }
    })
}

function viewAllEmployees(){
    console.log("Selecting all employees...\n");
    connection.query("SELECT * FROM employee", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      connection.end();
    });
}

// starting whole program
startQuestions();





