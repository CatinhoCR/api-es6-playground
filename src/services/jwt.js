// TODO: https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/
'use strict'

// var jwt = require('express-jwt')
const secret = 'clave_secreta'
const refreshTokenSecret = 'clave_hiper_secreta';
const now = Math.floor(Date.now() / 1000)

const jwt = require('jsonwebtoken')
exports.createToken = function(user) {
  const payload = {
    sub: user._id,
    username: user.username,
    role: user.role,
    iat: now,
    exp: now + 60 * 1440
  }
  return jwt.sign(payload, secret)
}

// const jwt = require('jwt-simple')
// const moment = require('moment')
// exports.createToken = function(user) {
//   const payload = {
//     sub: user._id,
//     username: user.username,
//     fullname: user.fullname,
//     email: user.email,
//     role: user.role,
//     image: user.image,
//     iat: moment().unix(),
//     exp: moment().add(30, 'days').unix
//   }

//   return jwt.encode(payload, secret)
// }
