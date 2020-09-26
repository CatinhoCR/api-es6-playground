'use strict'

var fs = require('fs')
var path = require('path')
var mongoosePaginate = require('mongoose-pagination')
var Artist = require('../models/artist')
var Album = require('../models/album')
var Song = require('../models/song')

function getSong(req, res) {
  var songId = req.params.id

  Song.findById(songId)
    .populate({ path: 'album' })
    .exec((err, song) => {
      if (err) {
        res.status(500).send({ message: 'Error en el request.' })
      } else {
        if (!song) {
          res.status(404).send({ message: 'La canción no existe.' })
        } else {
          res.status(200).send({ song })
        }
      }
    })
}

function getSongs(req, res) {
  var albumId = req.params.album

  if (!albumId) {
    var find = Song.find({}).sort('number')
  } else {
    var find = Song.find({ album: albumId }).sort('number')
  }

  find
    .populate({
      path: 'album',
      populate: {
        path: 'Artist',
        model: 'Artist',
      },
    })
    .exec(function (err, songs) {
      if (err) {
        res.status(500).send({ message: 'Error en el request.' })
      } else {
        if (!songs) {
          res.status(404).send({ message: 'No hay canciones.' })
        } else {
          res.status(200).send({ songs })
        }
      }
    })
}

function saveSong(req, res) {
  var song = new Song()

  var params = req.body
  song.name = params.name
  song.duration = params.duration
  song.genre = params.genre
  song.number = params.number
  song.releaseDate = params.releaseDate
  song.bpm = params.bpm
  song.file = null
  song.album = params.album

  song.save((err, songStored) => {
    if (err) {
      res.status(500).send({ message: 'Error en el servidor' })
    } else {
      if (!songStored) {
        res.status(404).send({ message: 'No se ha podido guardar la canción.' })
      } else {
        res.status(200).send({ song: songStored })
      }
    }
  })
}

function updateSong(req, res) {
  var songId = req.params.id
  var update = req.body

  Song.findByIdAndUpdate(songId, update, (err, songUpdated) => {
    if (err) {
      res.status(500).send({ message: 'Error en el request al servidor.' })
    } else {
      if (!songUpdated) {
        res
          .status(404)
          .send({
            message:
              'No se actualizado la canción. Verifique que la canción exista o vuelva a intentarlo.',
          })
      } else {
        res.status(200).send({
          song: songUpdated,
          actualizado: update,
        })
      }
    }
  })
}

function deleteSong(req, res) {
  var songId = req.params.id
  Song.findByIdAndDelete(songId, (err, songRemoved) => {
    if (err) {
      res.status(500).send({ message: 'Error en el request al servidor.' })
    } else {
      if (!songRemoved) {
        res
          .status(404)
          .send({
            message:
              'No se borrado la canción. Verifique que la canción exista o vuelva a intentarlo.',
          })
      } else {
        res.status(200).send({ song: songRemoved })
      }
    }
  })
}

function uploadSongFile(req, res) {
  var songId = req.params.id
  var file_name = 'No subido...'

  if (req.files) {
    var file_path = req.files.file.path
    var file_split = file_path.split('/')
    var file_name = file_split[2]
    var ext_split = file_name.split('.')
    var file_ext = ext_split[1]

    if (file_ext == 'mp3' || file_ext == 'wav' || file_ext == 'aiff') {
      Song.findByIdAndUpdate(
        songId,
        { file: file_name },
        (err, songUpdated) => {
          if (!songUpdated) {
            res.status(404).send({ message: 'Error al actualizar la canción.' })
          } else {
            res.status(200).send({
              message: 'Canción actualizada con éxito.',
              canción: songUpdated,
              file: file_name,
            })
          }
        }
      )
    } else {
      res.status(200).send({
        message: 'Extensión de archivo no válida.',
      })
    }
  } else {
    res.status(200).send({
      message: 'No se ha subido ninguna canción..',
    })
  }
}

function getSongFile(req, res) {
  var songFile = req.params.songFile
  var path_file = './uploads/songs/' + songFile

  fs.exists(path_file, function (exists) {
    if (exists) {
      res.sendFile(path.resolve(path_file))
    } else {
      res.status(200).send({
        message: 'No existe la canción.',
      })
    }
  })
}

module.exports = {
  getSong,
  getSongs,
  saveSong,
  updateSong,
  deleteSong,
  uploadSongFile,
  getSongFile,
}
