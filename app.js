// Requiring mysql, inquirer and fs
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const fs = require('fs');
const { get } = require('https');

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
    //console.log("connected as id " + connection.threadId);
  });

// Inquirer function to start initial questions
function startQuestions(){
    inquirer.prompt({
        message: "What would you like to do?",
        type: "list",
        choices: ["QUIT PROGRAM", "View Employees", "View Departments", "View Roles", "Add Employee", "Add Role", "Add Department", "Remove Employee", "Update Employee Role", "Update Employee Manager"],
        name: "userChoice"
    }).then(answers => {
        console.log(answers.userChoice);
        // adding switch statement logic that will run different functions based on user selection
        
            switch (answers.userChoice) {

                case "QUIT PROGRAM":
                    quitProgram()
                    break;
                case "View Employees":
                    viewEmployees()
                    break;
                case "View Departments":
                    viewDepartments()
                    break;
                case "View Roles":
                    viewRoles()
                    break;
                case "Add Employee":
                    addEmployee()
                    break;
                case "Add Role":
                    addRole()
                    break;
                case "Add Department":
                    addDepartment()
                    break;
                case "Remove Employee":
                    removeEmployee()
                    break;
                case "Update Employee Role":
                    updateEmployeeRole()
                    break;
            }
    });
}


// Function to view all employees
function viewEmployees(){
    connection.query("SELECT * FROM employee", function(err, res) {
        console.table(res);
        console.log(err);
        startQuestions();
    });
}

// Function to view all departments
function viewDepartments() {
    connection.query("SELECT * FROM department", function(err, res){
        console.table(res);
        startQuestions();
    })

}

// Function to view all roles
function viewRoles(){
    connection.query("SELECT * FROM role", function(err, res){
        console.table(res);
        startQuestions();
    })
}

// Function to add employee
function addEmployee(){
    // using inquirer prompt to ask user input questions to store
    inquirer.prompt([
        {
            message: "What is the employee's first name?",
            type: "input",
            name: "first_name"
        },
        {
            message: "What is the employee's last name?",
            type: "input",
            name: "last_name" 
        },
        {
            message: "Please enter a role ID for this employee:",
            type: "number",
            name: "role_id" 
        },
        {
            message: "Please enter a manager ID for this employee if applicable:",
            type: "number",
            name: "manager_id" 
        },
    ]).then(answers => {
        // adding mysql syntax to insert the new employee per the user input to the employee table
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) values (?, ?, ?, ?)", [answers.first_name, answers.last_name, answers.role_id, answers.manager_id], function(err, res) {
        startQuestions();
        })
    })
}

// adding a new role function
function addRole() {
    console.log('time to add a role')
    // using inquirer to ask user input questions
    inquirer.prompt([
        {
            message: "What type of role would you like to add?",
            type: "input",
            name: "title"
        },
        {
            message: "Please enter a salary for your role:",
            type: "number",
            name: "salary" 
        },
        {
            message: "Please enter a department ID for this role:",
            type: "number",
            name: "department_id" 
        },
    ]).then(answers => {
        // using mysql syntax to insert new role designated by user input to the role table
        connection.query("INSERT INTO role (title, salary, department_id) values (?, ?, ?)", [answers.title, answers.salary, answers.department_id], function(err, res) {
        startQuestions();
        })
    })
}
// function to add new department
function addDepartment() {
    // using inquirer prompt to ask user input question for new department
    inquirer.prompt({
        message: "What department would you like to add?",
        type: "input",
        name: "newDepartment"
    }).then(answers => {
        // using mysql syntax to insert new department designated by user to department tables
        connection.query("INSERT INTO department (department_name) values (?)", [answers.newDepartment], function(err, res) {
        startQuestions();
        })
    })
}
// Referenced this remove employee section of this github repo to work through this code: https://github.com/omerkatan1/MySQL-Employee-Tracker
function removeEmployee(){
    // using inquirer to ask the user which employee they would like to delete
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "What is the employee's first name that you would like to delete?"
        },
        {
            name: "lastName",
            type: "input",
            message: "What is the employee's last name that you would like to delete?"
        },
    ]).then(answers => {
        // adding the mysql syntax to actually delete the identified employee from the database
    connection.query("DELETE FROM employee WHERE first_name = ? and last_name = ?", [answers.firstName, answers.lastName], function (err) {
        console.log(err);

        console.log(`\n ${answers.firstName} ${answers.lastName} has been deleted from the database! \n`)
        startQuestions();
    })

    });
}

// creating employee list to use in the update employee role table
function getEmployeeList(){
    return connection.query("SELECT * FROM employee", function(err, res) {
        const employeeList = res.map(record => {
            return `${record.id} - ${record.first_name} ${record.last_name}`
        });
        console.log(employeeList)
        return employeeList;
    });
}

// This code is not currently working
// function updateEmployeeRole(){
//     const employeeList = getEmployeeList();
//     console.log("Updating employee...\n");

//     inquirer.prompt([
//         {
//             message: "Which employee's role would you like to update?",
//             name: "selectedEmployeeRole",
//             type: "list",
//             choices: employeeList
//         }, 
//         {
//             message: "Please enter their updated role:",
//             name: "newSelectedRole",
//             type: ["input"]
//         }
//     ]).then(answers => {
//         console.log("Here are our annnnswers", answers);
//         // answers.selectedEmployeeRole = 3 - Karen Sopron   // answers.selectedEmployeeRole.split(' - ')[0]
//         // update employee where id = 3 set values()
//         //split it into first_name = Karen , last_name = Sopron
//         //need to do the update query
//             //break the full name chosen into first and last  WHERE first_name = "Karen" and last_name = "Sopron"
//     });

// }

// function to end the program when the user selects quit program
function quitProgram(){
    connection.end();
}

// starting whole program
startQuestions();





