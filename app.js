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
        choices: ["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Add Role", "Add Department", "Remove Employee", "Update Employee Role", "Update Employee Manager", "QUIT PROGRAM"],
        name: "userChoice"
    }).then(answers => {
        console.log(answers.userChoice);
        // adding switch statement logic that will run different functions based on user selection
        
            switch (answers.userChoice) {

                case "View All Employees":
                    viewAllEmployees()
                    break;
                case "View All Employees By Department":
                    viewAllEmployeesByDepartment()
                    break;
                case "View All Employees By Manager":
                    viewAllEmployeesByManager()
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



function viewAllEmployees(){
    console.log("Selecting all employees...\n");
    connection.query("SELECT * FROM employee", function(err, res) {
        console.table(' inside seclt *!!!',res);
        if (err) throw err;
      // Log all results of the SELECT statement
 
      //connection.end();
    });
}

function viewAllEmployeesByDepartment() {
    // Do I need to prompt them to first select the department and then show the employees? Or just showing a table of the departments and employees within?
}

function viewAllEmployeesByManager(){
    // Copy by department logic and update here
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
        })
    })
}

function removeEmployee(){
    // EXAMPLE FROM CLASS
//     console.log("Deleting all strawberry icecream...\n");
//     connection.query(
//       "DELETE FROM products WHERE ?",
//       {
//         flavor: "strawberry"
//       },
//       function(err, res) {
//         if (err) throw err;
//         console.log(res.affectedRows + " products deleted!\n");
//         // Call readProducts AFTER the DELETE completes
//         readProducts();
//       }
//     );
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


        })

        





    })

        // then do a prompt and the hcoices are all the roles you just got from select * roles






    // var query = connection.query(
    //   // update products quantity = 100 where favor = "rocky road"
    //   "UPDATE products SET ? WHERE ?", // these question marks map to the keys below. If you have multiple they need to be within an array
    //   [
    //     {
    //       quantity: 100
    //     },
    //     {
    //       flavor: "Rocky Road"
    //     }
    //   ],
    //   function(err, res) {
    //     if (err) throw err;
    //     console.log(res.affectedRows + " products updated!\n");
    //     // Call deleteProduct AFTER the UPDATE completes
    //     deleteProduct();
    //   }
    // );
};

// starting whole program
startQuestions();





