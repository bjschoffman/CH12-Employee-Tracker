require('dotenv').config();
require('console.table');
const inquirer = require ('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection (
    {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: process.env.DB_PASSWORD,
      database: 'employee_db',
    });

db.connect((err) => {
    if (err) throw err;
    console.log(` Connected to the employee_db database. `);
    questions();
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
        console.log('You have exited the application')
        process.exit();
    }

    });
};

function viewAllDepartments() {
    db.promise().query(`SELECT * FROM department`)
    .then(([rows])=>{
        let employee = rows;
        console.log('\n');
        console.table(employee)
    }) .then(()=>{
        questions();
    });
};

function viewAllRoles() {
    db.promise().query(`SELECT * FROM role`)
    .then(([rows])=>{
        let employee = rows;
        console.log('\n');
        console.table(employee)
    }) .then(()=>{
        questions();
    });
};   

function viewAllEmployees () {
    db.promise().query(`SELECT * FROM employee`)
    .then(([rows])=>{
        let employee = rows;
        console.log('\n');
        console.table(employee);
    }) .then(()=>{
        questions();
    });
};

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department_add',
            message: 'What department would you like to add?'
        }
    ]).then((answer) => {
        db.promise().query(`INSERT INTO department (name) VALUES (?)`, [answer.department_add])
        .then(([rows])=>{
            let employee = rows
            console.log('\n');
            console.table(employee);
        })
    }).then(()=>{
        questions();
    });
};

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What job title would you like to add?'  
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this role?'
        },
        {
            type: 'input',
            name: 'department',
            message: 'What is the department ID this role?'
        }
    ]).then((answer) => {
        db.promise().query(`INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`, 
        [answer.title, answer.salary, answer.department])
        .then(([rows]) => {
            let employee = rows;
            console.log('\n');
            console.table(employee);
        })    
    }).then(() => {
        questions();
    });
};

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of emplolyee?'  
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of employee?'
        },
        {
            type: 'input',
            name: 'role_id',
            message: "What is employee's role ID?"
        },
        {
            type: 'input',
            name: 'manager_id',
            message: "What is the employee's manager's ID?"
        }
    ]).then((answer) => {
        db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`, 
        [answer.first_name, answer.last_name, answer.role_id, answer.manager_id])
        .then(([rows]) => {
            let employee = rows;
            console.log('\n');
            console.table(employee);
        })    
    }).then(() => {
        questions();
    });
};

function updateEmployeeRole () {
    db.promise().query(`SELECT * FROM employee`)
    .then(([rows])=>{
        let employee = rows;
        console.log('\n');
        console.table(employee);
    }) 
    inquirer.prompt ()
    .then(()=>{
        questions();
    });
    
};
    
  










