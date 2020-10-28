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
    //console.log("connected as id " + connection.threadId);
    //connection.end();
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
                case "View All Employees":
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


// NOTHING SHOWING UP HERE!!!
function viewEmployees(){
    connection.query("SELECT * FROM employee", function(err, res) {
        console.table(res);
        console.log(err);
        startQuestions();
    });
}

function viewDepartments() {
    connection.query("SELECT * FROM department", function(err, res){
        console.table(res);
        startQuestions();
    })

}

function viewRoles(){
    connection.query("SELECT * FROM role", function(err, res){
        console.table(res);
        startQuestions();
    })
}

// Function to add employee
function addEmployee(){
    console.log('time to add an employee!!')
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
        console.log("Did we add a new employee??", answers);
        // adding mysql syntax to insert the new employee per the user input to the employee table
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) values (?, ?, ?, ?)", [answers.first_name, answers.last_name, answers.role_id, answers.manager_id], function(err, res) {
            console.log('err , res ?? did we add a new employee??!!', err, res)
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
            name: "newRole"
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
        console.log("Did we add a new role?", answers);
        // using mysql syntax to insert new role designated by user input to the role table
        connection.query("INSERT INTO role (title, salary, department_id) values (?, ?, ?)", [answers.title, answers.salary, answers.department_id], function(err, res) {
            console.log('err , res ?? did we make a new dept!!!', err, res)
        })
    })
}
// function to add new department
function addDepartment() {
    console.log('time to add dpet!!')
    // using inquirer prompt to ask user input question for new department
    inquirer.prompt({
        message: "What department would you like to add?",
        type: "input",
        name: "newDepartment"
    }).then(answers => {
        console.log("Did adding new dept work?", answers);
        // using mysql syntax to insert new department designated by user to department tables
        connection.query("INSERT INTO department (department_name) values (?)", [answers.newDepartment], function(err, res) {
            console.log('err , res ?? did we make a new dept!!!', err, res)
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
        console.log("did we enter an employee to delete????", answers)
        // adding the mysql syntax to actually delete the identified employee from the database
    connection.query("DELETE FROM employee WHERE first_name = ? and last_name = ?", [answers.firstName, answers.lastName], function (err) {
        console.log(err);

        console.log(`\n ${answers.firstName} ${answers.lastName} has been deleted from the database! \n`)
        startQuestions();
    })

    });
}

function updateEmployeeRole(){
    // EXAMPLE FROM CLASS
    console.log("Updating employee...\n");


    // SELECT * from roles so that u have all the rolls to ask with in the prompt
    connection.query('SELECT * FROM role', function(err, roleResults){

        connection.query('SELECT * FROM emplyoee', function(err, empResults){ 

        // you do inquiere pormpt and choies ar the roles

        // .then() of the prompt
            // do annother connection.query() and o the update
        startQuestions();
        })
    })
};

function quitProgram(){

}

// starting whole program
startQuestions();





