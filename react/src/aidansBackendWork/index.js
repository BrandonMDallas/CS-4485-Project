// server.js
const express = require('express');
const { Client } = require('pg');
const cors = require('cors');
//const process=require('')
const app = express();
const port = 3001;
const process = require('./connVariables.env');
  app.use(cors());
app.use(express.json());

const clientConnect = new Client({
    
    user: process.USERNAME,
     host: process.HOST,
     port: process.PORT,
    password: process.PASSWORD,
    database: process.DATABASE
    
})

app.post('/api/data', async (req, res) => {
  try {
    const { username } = req.body;
    const client = await clientConnect.connect();
    const queryS=await clientConnect.query('INSERT INTO users(username) VALUES ($1)', [username]);
    res.status(201).send({ message: 'Data inserted into users table' });
    res.json(res.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
app.get('/api/data', async (req, res) => {
  try {
    const { username, password } = req.body;
    const client = await clientConnect.connect();
    const queryS=await clientConnect.query('SELECT (username, password) from users', [username]);
    res.status(201).send({ message: 'Data obtained from users table' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
app.update('/api/data', async (req, res) => {
  try {
    const { id, username, password } = req.body;
    const client = await clientConnect.connect();
    const queryS=await clientConnect.query('UPDATE users SET username=$2, password=$3 WHERE id=$1 RETURNING *', [username]);
    res.status(201).send({ message: 'Data updated in users table' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});