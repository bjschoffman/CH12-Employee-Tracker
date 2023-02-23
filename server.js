require('console.table');
const inquirer = require ('inquirer');
const db = require('./connection');


db.connect(err => {
    if (err) throw err;
    console.log(`Connected to the employee_db database.`);
    employee_db();
});

const questions = () => {
    inquirer
    .prompt ([{
        type: 'list',
        name: 'options',
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
if(answer.options === 'View All Departments'){
viewAllDepartments()}
});
}
function viewAllDepartments (){
db.promise().query('SELECT * FROM department;')
.then(([rows])=>{
    let departments = rows;
    console.log('\n');
    console.table(departments)

}) .then(()=>{
    questions();
})
}
questions();




