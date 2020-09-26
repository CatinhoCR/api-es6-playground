'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// configs
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// cargar rutas
const user_routes = require('./routes/user')

// config http headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization , X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')

  next()
})

// rutas base
app.get('/', function (req, res) {
  res.redirect('/api')
})
app.get('/api', function (req, res) {
  res.status(200).send({ message: 'Bienvenido al API v 0.1 ' })
})
app.use('/api', user_routes)

module.exports = app
