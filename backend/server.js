const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'r$$100200',
    database:'dbSchool',
});

db.connect((err) => {
    if(err) {
        console.log('Database Not Connected...');
    } else {
        console.log('Database Connected Successfully...');
    }
});

app.post('/api/student/add', (req, res) => {
    let student_details = {
        student_name: req.body.student_name,
        course: req.body.course,
        fee: req.body.fee,
    };

    let query1 = "INSERT INTO student SET ?";
    db.query(query1, student_details, (err) => {
        if(err){
            res.send({ status: false, message: err.stack});
        } else {
            res.send({ status: true, message: 'Student Creation Successful!'});
        }
    });
});

app.get('/api/student', (req, res) => {
    let query2 = "SELECT * FROM student";
    db.query(query2, (err, data) => {
        if(err){
            res.send({ status: false, message: err.stack});
        } else {
            res.send({ status: true, message: data});
        }
    });
});

app.get('/api/student/:id', (req, res) => {
    const id = req.params.id;
    let query3 = "SELECT * FROM student WHERE id=" + id;
    db.query(query3, (err, data) => {
        if(err){
            res.send({ status: false, message: err.stack});
        } else {
            res.send({ status: true, message: data});
        }
    });
});

app.put('/api/student/update/:id', (req, res) => {
    let query4 = "UPDATE student SET student_name='" +
    req.body.student_name +
    "', course='" +
    req.body.course +
    "',fee='" +
    req.body.fee +
    "'  WHERE id=" +
    req.params.id;

    db.query(query4, (err, data) => {
        if(err){
            res.send({ status: false, message: err.stack});
        } else {
            res.send({ status: true, message: data});
        }
    });
});

app.delete('/api/student/delete/:id', (req, res) => {
    let query5 = "DELETE FROM student WHERE id=" + req.params.id + "";
    db.query(query5, (err) => {
        if(err){
            res.send({ status: false, message: err.stack});
        } else {
            res.send({ status: true, message: "Deletion Successful!!!"});
        }
    });
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Listening server on port: http://localhost:${PORT}`);
});

