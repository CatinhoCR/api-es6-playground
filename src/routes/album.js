'use strict'

var express = require('express')
var AlbumController = require('../controllers/album')

var api = express.Router()
var md_auth = require('../middlewares/auth')
var multipart = require('connect-multiparty')
var md_upload = multipart({ uploadDir: './uploads/albums' })

api.get('/album/:id', md_auth.ensureAuth, AlbumController.getAlbum)
api.get('/albums/:artist?', md_auth.ensureAuth, AlbumController.getAlbums)
api.post('/album', md_auth.ensureAuth, AlbumController.saveAlbum)
api.put('/album/:id', md_auth.ensureAuth, AlbumController.updateAlbum)
api.delete('/album/:id', md_auth.ensureAuth, AlbumController.deleteAlbum)
api.post(
  '/upload-image-album/:id',
  [md_auth.ensureAuth, md_upload],
  AlbumController.uploadAImage
)
api.get(
  '/get-image-album/:imageFile',
  md_auth.ensureAuth,
  AlbumController.getAImageFile
)

module.exports = api
