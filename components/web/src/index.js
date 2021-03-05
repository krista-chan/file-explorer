const express = require('express')
const {Client: Postgres} = require('pg')
const {v4: uuid} = require('uuid');
const postgres = new Postgres({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'postgres'
})
async function db () {
    await postgres.connect()
    await postgres.query(`CREATE TABLE IF NOT EXISTS users (id VARCHAR(100), name VARCHAR(100))`)
};db()
const app = express()

app.get('/:id', async (req, res) => {
    postgres.query(`SELECT * FROM users WHERE id=$1`, [
        req.params['id']
    ]).then(q => res.send(q.rows))
});

app.post('/add', express.json(), async (req, res) => {
    const body = req.body
    const name = body.name
    const id = uuid()
    const query = await postgres.query(`INSERT INTO users (id, name) VALUES ($1, $2)`, [
        id, name
    ])
    console.log(query)
    res.send({id, name})
})

app.listen(3000)