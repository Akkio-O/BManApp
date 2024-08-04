const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();

require('dotenv').config()
const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'bmanbase'
});
con.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
    }
});
const result = con === con ? 'connect' : (err);
console.log(result);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.post('/RegLog', (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    const body = Object.keys(req.body);
    console.log(body.length)
    if (body.length === 4) {
        const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
        con.query(sql, [username, email, password], (err, result) => {
            if (err) {
                console.error('Error inserting data:', err);
                res.status(500).send('Error inserting data');
            } else {
                // console.log(result)
                // console.log('Data inserted successfully:', result);
                res.status(200).send('Data inserted successfully');
            }
        });
    } else {
        res.status(200).send('Авторизация');
    }
});

// app.get('/success', (req, res) => {  res.send('Регистрация прошла успешно.') });

app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
});



