require('dotenv').config({ path: '.env' })
// Librerias
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')

const app = express()

// Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Rutas Endpoints
app.use('/api', require('./routes'))

app.use(function (req, res) {
  res.status(404).send(process.env.MSG_RND)
})

module.exports = app
