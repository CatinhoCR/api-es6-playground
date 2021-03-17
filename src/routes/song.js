'use strict'

var express = require('express')
var SongCtrl = require('../controllers/song')

var api = express.Router()
var md_auth = require('../middlewares/auth')
var multipart = require('connect-multiparty')
var md_upload = multipart({ uploadDir: './uploads/songs' })

api.get('/song/:id', md_auth.ensureAuth, SongCtrl.getSong)
api.get('/songs/:album?', md_auth.ensureAuth, SongCtrl.getSongs)
api.post('/song', md_auth.ensureAuth, SongCtrl.saveSong)
api.put('/song/:id', md_auth.ensureAuth, SongCtrl.updateSong)
api.delete('/song/:id', md_auth.ensureAuth, SongCtrl.deleteSong)
api.post(
  '/upload-song/:id',
  [md_auth.ensureAuth, md_upload],
  SongCtrl.uploadSongFile
)
api.get('/get-song/:songFile', md_auth.ensureAuth, SongCtrl.getSongFile)

module.exports = api
