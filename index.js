const mysql = require('mysql')
const express = require('express')

var app = express();

const bodyParser = require('body-parser')

app.use(bodyParser.json())

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'password',
    database: 'employeeDB'
})

mysqlConnection.connect((err) => {
    if (!err) {
        console.log('Connection Successful')
    } else {
        console.log("Connection Error becoz of ", JSON.stringify(err, undefined, 2))
    }
})

app.listen(3000, () => console.log("Express Server is running at port number 3000"))

//get all employees
app.get('/employees', (req, res) => {
    mysqlConnection.query('SELECT * from Employee', (err, rows, fields) => {
        if (!err) {
            res.send(rows)
        } else {
            res.send(err)
        }
    })
})

//get specific employee
app.get('/employees/:id', (req, res) => {
    mysqlConnection.query('SELECT * from Employee where EmpId=?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows)
        } else {
            res.send(err)
        }
    })
})

//insert a value into the