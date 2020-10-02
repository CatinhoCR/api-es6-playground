'use strict'

const express = require('express')
const UserCtrl = require('../controllers/user')

const api = express.Router()
var md_auth = require('../middlewares/auth')
var multipart = require('connect-multiparty')
var md_upload = multipart({ uploadDir: './uploads/users' })

api.get('/user/:id', md_auth.ensureAuth, UserCtrl.getUser)
api.get('/users', md_auth.ensureAuth, UserCtrl.getAllUsers)
api.post('/register', UserCtrl.saveUser)
api.post('/login', UserCtrl.loginUser)
api.delete('/delete-user/:id', md_auth.ensureAuth, UserCtrl.deleteUser)
// este parametro de ruta (:id) podria ser opcional (:id?), dado que ya estamos enviando el ensureAuth method del servicio/middleware y por esa razón, ya tenemos el token.
api.put('/update-user/:id', md_auth.ensureAuth, UserCtrl.updateUser)
api.post(
  '/upload-image-user/:id',
  [md_auth.ensureAuth, md_upload],
  UserCtrl.uploadImage
)
api.get('/get-image-user/:imageFile', UserCtrl.getImageFile)

module.exports = api
