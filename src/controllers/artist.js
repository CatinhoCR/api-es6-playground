'use strict'

const fs = require('fs')
const path = require('path')
const mongoosePaginate = require('mongoose-pagination')
const Artist = require('../models/artist')
const Album = require('../models/album')
const Song = require('../models/song')

function getArtist(req, res) {
  const artistId = req.params.id
  console.log('Z0')
  Artist.findById(artistId, (err, artist) => {
    if (err) {
      res.status(500).send({ message: 'Error en la petición.' })
    } else {
      if (!artist) {
        res.status(404).send({ message: 'No se ha encontrado ese artista.' })
      } else {
        res.status(200).send({ artist })
      }
    }
  })
}

function getArtists(req, res) {
  const page = req.params.page ? req.params.page : 1;
  // if (req.params.page) {
  //   page = req.params.page
  // } else {
  //   page = 1
  // }

  const itemsPerPage = Number(req.body.perPage)

  Artist.find()
    .sort('name')
    .paginate(page, itemsPerPage, function (err, artists, total) {
      if (err) {
        res.status(500).send({ message: 'Error en la petición.' })
      } else {
        if (!artists) {
          res.status(404).send({ message: 'No se han encontrado artistas.' })
        } else {
          return res.status(200).send({
            total_items: total,
            artists: artists,
          })
        }
      }
    })
}

function saveArtist(req, res) {
  const artist = new Artist()

  const params = req.body
  artist.name = params.name
  artist.description = params.description
  artist.collective = params.collective
  artist.image = 'null'

  artist.save((err, artistStored) => {
    if (err) {
      res.status(500).send({ message: 'Error al guardar el artista.' })
    } else {
      if (!artistStored) {
        res.status(404).send({ message: 'No se ha registrado pues..' })
      } else {
        res.status(200).send({
          message: 'Se ha guardado artista.',
          artist: artistStored,
        })
      }
    }
  })
}

function updateArtist(req, res) {
  const artistId = req.params.id
  const update = req.body

  Artist.findByIdAndUpdate(artistId, update, (err, artistUpdated) => {
    if (err) {
      res.status(500).send({ message: 'No se pudo actualizar el artista.' })
    } else {
      if (!artistUpdated) {
        res.status(404).send({ message: 'Error al actualizar artista.' })
      } else {
        res.status(200).send({
          message: 'Artista actualizado con éxito.',
          artist: artistUpdated,
          actualizado: update,
        })
      }
    }
  })
}

// Deletes artist, and their albums and songs too
function deleteArtist(req, res) {
  const artistId = req.params.id

  Artist.findByIdAndRemove(artistId, (err, artistRemoved) => {
    if (err) {
      res.status(500).send({ message: 'No se pudo borrar el artista.' })
    } else {
      if (!artistRemoved) {
        res.status(404).send({ message: 'Error al borrar artista.' })
      } else {
        Album.find({ artist: artistRemoved._id }).remove(
          (err, albumRemoved) => {
            if (err) {
              res
                .status(500)
                .send({ message: 'No se pudo borrar el album del artista.' })
            } else {
              if (!albumRemoved) {
                res
                  .status(404)
                  .send({ message: 'Error al borrar album del artista.' })
              } else {
                Song.find({ album: albumRemoved._id }).remove(
                  (err, songRemoved) => {
                    if (err) {
                      res
                        .status(500)
                        .send({
                          message: 'No se pudo borrar canción del album.',
                        })
                    } else {
                      if (!songRemoved) {
                        res
                          .status(404)
                          .send({
                            message: 'Error al borrar canción del album.',
                          })
                      } else {
                        res.status(200).send({
                          message: 'éxito se borró',
                          artist: artistRemoved,
                        })
                      }
                    }
                  }
                )
              }
            }
          }
        )
      }
    }
  })
}

function uploadAImage(req, res) {
  const artistId = req.params.id
  const file_name = 'No subido...'

  if (req.files) {
    const file_path = req.files.image.path
    const file_split = file_path.split('/')
    const file_name = file_split[2]

    const ext_split = file_name.split('.')
    const file_ext = ext_split[1]

    if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
      Artist.findByIdAndUpdate(
        artistId,
        { image: file_name },
        (err, artistUpdated) => {
          if (!artistUpdated) {
            res.status(404).send({ message: 'Error al actualizar artista.' })
          } else {
            res.status(200).send({
              message: 'artista actualizado con éxito.',
              artist: artistUpdated,
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
  const imageFile = req.params.imageFile
  const path_file = './uploads/artists/' + imageFile

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
  getArtist,
  saveArtist,
  getArtists,
  updateArtist,
  deleteArtist,
  uploadAImage,
  getAImageFile,
}
