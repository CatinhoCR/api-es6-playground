'use strict'

var express = require('express')
var ArtistController = require('../controllers/artist')

var api = express.Router()
var md_auth = require('../middlewares/auth')
var multipart = require('connect-multiparty')
var md_upload = multipart({ uploadDir: './uploads/artists' })

api.get('/artist/:id', md_auth.ensureAuth, ArtistController.getArtist)
api.get('/artists/:page?', md_auth.ensureAuth, ArtistController.getArtists)
api.post('/artist', md_auth.ensureAuth, ArtistController.saveArtist)
api.put('/artist/:id', md_auth.ensureAuth, ArtistController.updateArtist)
api.delete('/artist/:id', md_auth.ensureAuth, ArtistController.deleteArtist)
api.post(
  '/upload-image-artist/:id',
  [md_auth.ensureAuth, md_upload],
  ArtistController.uploadAImage
)
api.get(
  '/get-image-artist/:imageFile',
  md_auth.ensureAuth,
  ArtistController.getAImageFile
)

module.exports = api
