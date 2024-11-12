const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection (adjust credentials as needed)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',        // Default username for XAMPP
    password: '',        // Leave blank if no password is set
    database: 'student_registration'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database...');
});

// Register a new student
app.post('/api/register', (req, res) => {
    const { name, class: studentClass, roll_no, address, contact } = req.body;
    const query = 'INSERT INTO students (name, class, roll_no, address, contact) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, studentClass, roll_no, address, contact], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Student registered successfully');
    });
});

// Get all students
app.get('/api/students', (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Delete a student
app.delete('/api/students/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM students WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Student deleted successfully');
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
