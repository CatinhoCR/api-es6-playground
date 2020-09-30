'use strict'

var fs = require('fs')
var path = require('path')
var bcrypt = require('bcrypt-nodejs')
const User = require('../models/user')
var jwt = require('../services/jwt')

function getUser(req, res) {
  var userId = req.params.id

  User.findOne({ _id: userId }, (err, user) => {
    if (err) {
      res.status(500).send({ message: 'Error en la petición al server.' })
    } else {
      if (!user) {
        res.status(404).send({ message: 'El usuario no existe.' })
      } else {
        res.status(200).send({ user: user })
      }
    }
  })
}

function getAllUsers(req, res) {
  /*
  var userId = req.params.id;
  User.findOne({ _id: userId }, (err, user) => {
      if(err) {
          res.status(500).send({message: 'Error en la petición al server.'});
      } else {
          if(!user) {
              res.status(404).send({ message: 'El usuario no existe.' });
          } else {
              res.status(200).send({user: user});
          }
      }
  });
  */
  User.find(function (err, users) {
    if (err) {
      res.status(500).send({ message: 'Error en la petición' })
    } else {
      res.status(200).send({ users })
    }
  })
}

function saveUser(req, res) {
  const user = new User()
  let params = req.body

  console.log(params)
  user.username = params.username
  user.fullname = params.fullname
  user.email = params.email
  user.image = 'null'
  user.isActive = params.isActive
  // Get user role, if set
  if (params.role) {
    user.role = params.role
  } else {
    user.role = 'USER_ROLE'
  }

  if (params.password) {
    // Encriptar password
    bcrypt.hash(params.password, null, null, function (err, hash) {
      user.password = hash
      if (
        user.username != null &&
        user.fullname != null &&
        user.email != null
      ) {
        // Guardar usuario
        user.save((err, userStored) => {
          if (err) {
            res.status(500).send({ message: 'Error al guardar el usuario.' })
          } else {
            if (!userStored) {
              res.status(404).send({ message: 'No se ha registrado pues..' })
            } else {
              res.status(200).send({
                message: 'Se ha guardado el usuario.',
                user: userStored,
              })
            }
          }
        })
      } else {
        res.status(200).send({
          message: 'Introduce todos los campos',
        })
      }
    })
  } else {
    res.status(200).send({
      message: 'Introduce la contraseña',
    })
  }
}

function loginUser(req, res) {
  // 1. Recolectar datos enviados en el POST req
  var params = req.body
  var email = params.email
  var password = params.password

  // 2. Find email a ver si usuario existe con el email
  User.findOne({ email: email.toLowerCase() }, (err, user) => {
    if (err) {
      res.status(500).send({ message: 'Error en la petición' })
    } else {
      if (!user) {
        res.status(404).send({ message: 'El usuario no existe.' })
      } else {
        // 3. encriptar pw y comparar con la BD
        bcrypt.compare(password, user.password, function (err, check) {
          if (check) {
            // Devolver datos del usuario logged in
            if (params.getHash) {
              // devolver token de jwt
              res.status(200).send({
                token: jwt.createToken(user),
              })
            } else {
              // NOTE: This is only for testing purposes ofc.. not production smart EVER
              res.status(200).send({ user })
            }
          } else {
            // wrong password
            res.status(404).send({ error: err, message: 'Usuario y/o contraseña incorrectos.' })
          }
        })
      }
    }
  })
}

function updateUser(req, res) {
  var userId = req.params.id
  var update = req.body
  // var password = req.body.password

  /*
  if (update.password) {
      /*
      hashPw = async function() {
          console.log(bcrypt.hash(update.password,10));
          hashPwd = await bcrypt.hash(password,10);
          console.log(hashPwd);
      }

      /* bcrypt.hash(update.password, 10, function(err, hash) {
          update.password = hash;
      }); * /
      hashPw();
      * /
      bcrypt.hash(update.password, null, null, function (err, hash) {
          update.password = hash;
          if (err) {
              throw err;
          }
              hashedPassword = update.password;


      });
  } */

  // Need to check if password did change, if it did then need to hash it and wrap this code below in a bcrypt.hash function somehow oNLY if it changed. See: https://stackoverflow.com/questions/34326162/nodejs-updating-user-bcrypt-password-doesnt-get-hashed
  User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
    if (err) {
      res.status(500).send({ message: 'No se pudo actualizar el usuario.' })
    } else {
      if (!userUpdated) {
        res.status(404).send({ message: 'Error al actualizar usuario.' })
      } else {
        res.status(200).send({
          message: 'Usuario actualizado con éxito.',
          user: userUpdated,
          actualizado: update,
        })
      }
    }
  })
}

function uploadImage(req, res) {
  var userId = req.params.id
  var file_name = 'No subido...'

  if (req.files) {
    var file_path = req.files.image.path
    var file_split = file_path.split('/')
    file_name = file_split[2]
    var ext_split = file_name.split('.')
    var file_ext = ext_split[1]

    if (file_ext == 'jpg' || file_ext == 'png' || file_ext == 'gif') {
      User.findByIdAndUpdate(
        userId,
        { image: file_name },
        (err, userUpdated) => {
          if (!userUpdated) {
            res
              .status(404)
              .send({ message: 'Error al actualizar usuario. Error: ' + err })
          } else {
            res.status(200).send({
              message: 'Usuario actualizado con éxito.',
              user: userUpdated,
              image: file_name,
            })
          }
        }
      )
    } else {
      res
        .status(200)
        .send({ message: 'La extensión de la imagen no es correcta.' })
    }
  } else {
    res.status(200).send({ message: 'No has subido ninguna imagen..' })
  }
}

function getImageFile(req, res) {
  var imageFile = req.params.imageFile
  var path_file = './uploads/users/' + imageFile

  fs.exists(path_file, function (exists) {
    if (exists) {
      res.sendFile(path.resolve(path_file))
    } else {
      res.status(200).send({ message: 'Ups! La imagen no existe..' })
    }
  })
}

module.exports = {
  getUser,
  getAllUsers,
  saveUser,
  loginUser,
  updateUser,
  uploadImage,
  getImageFile
}
