const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const db = require('./data/db-config')

const restricted = require('./restricted/restricted')

const authRouter = require('./endpoints/auth/auth-router')
const plantsRouter = require('./endpoints/plants/plants-router')
const usersRouter = require('./endpoints/users/users-router')

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/auth', authRouter)
server.use('/api/plants', restricted, plantsRouter)
server.use('/api/users', restricted, usersRouter)

// function getAllUsers() { return db('users') }

// async function insertUser(user) {
  // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
  // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
  // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
  // const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password'])
  // return newUserObject // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
// }

// server.get('/api/users', async (req, res) => {
//   res.json(await getAllUsers())
// })

// server.post('/api/users', async (req, res) => {
//   res.status(201).json(await insertUser(req.body))
// })

server.get('/', (req, res)=>{
  res.send(`<h2>Thanks for visiting the "Watering My Plants" API</h2>`)
})

server.use((err, req, res, next)=>{
  res.status(err.status || 500).json({
      message: err.message,
      stack: err.stackS
  })
})

module.exports = server
