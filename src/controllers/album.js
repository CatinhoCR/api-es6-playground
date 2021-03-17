'use strict'

var fs = require('fs')
var path = require('path')
var mongoosePaginate = require('mongoose-pagination')
var Artist = require('../models/artist')
var Album = require('../models/album')
var Song = require('../models/song')

function getAlbum(req, res) {
  var albumId = req.params.id

  Album.findById(albumId)
    .populate({ path: 'Artist' })
    .exec((err, album) => {
      if (err) {
        res.status(500).send({ message: 'Error en la petición.' })
      } else {
        if (!album) {
          res.status(404).send({ message: 'No se ha encontrado album.' })
        } else {
          return res.status(200).send({
            album: album,
          })
        }
      }
    })
}

function getAlbums(req, res) {
  var artistId = req.params.artist

  if (!artistId) {
    // sacar todos
    var find = Album.find({}).sort('title')
  } else {
    // sacar todos solo de un artista
    var find = Album.find({ artist: artistId }).sort('year')
  }

  find
    .populate({
      path: 'Artist',
      model: 'Artist',
    })
    .exec((err, albums) => {
      if (err) {
        res.status(500).send({ message: 'Error en la petición.' })
      } else {
        if (!albums) {
          res.status(404).send({ message: 'No se han encontrado albums.' })
        } else {
          return res.status(200).send({
            albums,
          })
        }
      }
    })
}

function saveAlbum(req, res) {
  var album = new Album()

  var params = req.body
  album.title = params.title
  album.year = params.year
  album.genre = params.genre
  album.label = params.label
  album.description = params.description
  album.image = 'null'
  album.artist = params.artist

  album.save((err, albumStored) => {
    if (err) {
      res.status(500).send({ message: 'Error al guardar el albuma.' })
    } else {
      if (!albumStored) {
        res.status(404).send({ message: 'No se ha registrado pues..' })
      } else {
        res.status(200).send({
          message: 'Se ha guardado albuma.',
          album: albumStored,
        })
      }
    }
  })
}

function updateAlbum(req, res) {
  var albumId = req.params.id
  var update = req.body

  Album.findByIdAndUpdate(albumId, update, (err, albumUpdated) => {
    if (err) {
      res.status(500).send({ message: 'No se pudo actualizar el album.' })
    } else {
      if (!albumUpdated) {
        res.status(404).send({ message: 'Error al actualizar albuma.' })
      } else {
        res.status(200).send({
          message: 'Album actualizado con éxito.',
          album: albumUpdated,
          actualizado: update,
        })
      }
    }
  })
}

function deleteAlbum(req, res) {
  var albumId = req.params.id
  Album.findByIdAndRemove(albumId, (err, albumRemoved) => {
    if (err) {
      res
        .status(500)
        .send({ message: 'No se pudo borrar el album del artista.' })
    } else {
      if (!albumRemoved) {
        res.status(404).send({ message: 'Error al borrar album del artista.' })
      } else {
        Song.find({ album: albumRemoved._id }).remove((err, songRemoved) => {
          if (err) {
            res
              .status(500)
              .send({ message: 'No se pudo borrar canción del album.' })
          } else {
            if (!songRemoved) {
              res
                .status(404)
                .send({ message: 'Error al borrar canción del album.' })
            } else {
              res.status(200).send({
                message: 'éxito se borró',
                album: albumRemoved,
              })
            }
          }
        })
      }
    }
  })
}

function uploadAImage(req, res) {
  var albumId = req.params.id
  var file_name = 'No subido...'

  if (req.files) {
    var file_path = req.files.image.path
    var file_split = file_path.split('/')
    var file_name = file_split[2]

    var ext_split = file_name.split('.')
    var file_ext = ext_split[1]

    if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
      Album.findByIdAndUpdate(
        albumId,
        { image: file_name },
        (err, albumUpdated) => {
          if (!albumUpdated) {
            res.status(404).send({ message: 'Error al actualizar album.' })
          } else {
            res.status(200).send({
              message: 'Album actualizado con éxito.',
              album: albumUpdated,
              image: file_name,
            })
          }
        }
      )
    } else {
      res.status(200).send({
        message: 'Extensión no válida.',
      })
    }

    console.log(ext_split)
  } else {
    res.status(200).send({
      message: 'No se ha subido ninguna imagen..',
    })
  }
}

function getAImageFile(req, res) {
  var imageFile = req.params.imageFile
  var path_file = './uploads/albums/' + imageFile

  fs.exists(path_file, function (exists) {
    if (exists) {
      res.sendFile(path.resolve(path_file))
    } else {
      res.status(200).send({
        message: 'No existe la imagen.',
      })
    }
  })
}

module.exports = {
  getAlbum,
  saveAlbum,
  getAlbums,
  updateAlbum,
  deleteAlbum,
  uploadAImage,
  getAImageFile,
}
