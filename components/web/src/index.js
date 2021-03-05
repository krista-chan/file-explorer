const fastify = require("fastify")({
  logger: true,
});
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

fastify.get('/:id', async (req, res) => {
     if (!req.params || req.params.id) return res.status(400).reply('Incorrect body')
    postgres.query(`SELECT * FROM users WHERE id=$1`, [
        req.params['id']
    ]).then(q => res.send(q.rows))
});

fastify.post('/add', async (req, res) => {
    if (!req.body || req.body.name) return res.status(400).reply('Incorrect body')
    const body = req.body
    const name = body.name
    const id = uuid()
    const query = await postgres.query(`INSERT INTO users (id, name) VALUES ($1, $2)`, [
        id, name
    ])
    console.log(query)
    res.send({id, name})
})

fastify.listen(3000, function (err, address) {
  if (err) throw `Err ${err}`;
});
