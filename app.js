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

// Inquirer function to start initial questions
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
                case "View All Employees By Department":
                    viewAllEmployeesByDepartment()
                    break;
                case "View All Employees By Manager":
                    viewAllEmployeesByManager()
                    break;
                case "Add Employee":
                    addEmployee()
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
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      connection.end();
    });
}

function viewAllEmployeesByDepartment() {
    // Do I need to prompt them to first select the department and then show the employees? Or just showing a table of the departments and employees within?
}

function viewAllEmployeesByManager(){
    // Copy by department logic and update here
}

function addEmployee(){
    // EXAMPLE FROM CLASS
    console.log("Inserting a new employee...\n");
    var query = connection.query(
      "INSERT INTO employee SET ?",
      {
        first_name: "",
        last_name: "",
        role_id: "",
        manager_id: "",
      },
      function(err, res) {
        if (err) throw err;
        console.log(res); // do this to see all of the data
        console.log(res.affectedRows + " employee inserted!\n");
        // Call updateProduct AFTER the INSERT completes
        updateEmployeeRole(); // NEED TO ADD ANOTHER FUNCTION TO ACTUALLY UPDATE
      }
    );
  
    // // logs the actual query being run
    console.log(query.sql);
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





