require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// TODO: Implement Refresh Tokens on Cookies
// const cookieParser = require('cookie-parser')

// TODO: Move to server.js (?)
// const { verify } = require('jsonwebtoken')
// const { hash, compare } = require('bcryptjs')
// const { fakeDB } = require('../db/fake-db.js')

// TODO: cargar rutas
// var user_routes = require('./routes/user')
// var artist_routes = require('./routes/artist')
// var album_routes = require('./routes/album')
// var song_routes = require('./routes/song')

const {isAuth} = require('./auth/auth.js');

const app = express()

// TODO: Configure CORS if needed
// SEE: http://expressjs.com/en/resources/middleware/cors.html

// configs
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(cookieParser())

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

module.exports = app