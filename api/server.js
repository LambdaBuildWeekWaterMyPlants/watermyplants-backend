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
