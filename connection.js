const mysql = require('mysql2')

const db = mysql.createConnection (
    {
      host: 'localhost',
      user: 'root',
      password: 'WisemanB3Wrong!',
      database: 'employee_db'
    }); 

module.exports=db;