require('dotenv').config();
require('console.table');
const inquirer = require ('inquirer');
const mysql = require('mysql2');


const connection = mysql.createConnection (
    {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: process.env.DB_PASSWORD,
      database: 'employee_db',
    });

connection.connect((err) => {
    if (err) throw err;
    console.log(`Connected to the employee_db database.`);
    employee_db();
});

const questions = () => {
    inquirer
    .prompt ([{
        type: 'list',
        name: 'choices',
        message: 'What would like to do?',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add A Department',
            'Add A Role',
            'Add An Employee',
            'Update An Employee Role',
            'Exit'
        ],
}])
    .then((answer) => {
    if (answer.choices === "View All Departments") {
        viewAllDepartments();
    }

    if (answer.choices === "View All Roles") {
        viewAllRoles();
    }

    if (answer.choices === "View All Employees") {
        viewAllEmployees();
    }

    if (answer.choices === "Add A Department") {
        addDepartment();
    }

    if (answer.choices === "Add A Role") {
        addRole();
    }

    if (answer.choices === "Add An Employee") {
        addEmployee();
    }

    if (answer.choices === "Update An Employee Role") {
        updateEmployeeRole();  
    }

    if (answer.choices === "Exit") {
        exit();
    }

    });
};

function viewAllDepartments() {
    db.promise().query('SELECT * FROM departments')
    .then(([rows])=>{
        let departments = rows;
        console.log('\n');
        console.table(departments)
    }) .then(()=>{
        questions();
    });
};

function viewAllRoles () {
    db.promise().query('SELECT * FROM role')
    .then(([rows])=>{
        let departments = rows;
        console.log('\n');
        console.table(departments)
    }) .then(()=>{
        questions();
    });
};   

function viewAllEmployees () {
    db.promise().query('SELECT * FROM employee')
    .then(([rows])=>{
        let departments = rows;
        console.log('\n');
        console.table(departments)
    }) .then(()=>{
        questions();
    });
};





questions();








