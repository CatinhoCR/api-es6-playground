// TODO: https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/
'use strict'

// var jwt = require('express-jwt')
const now = Math.floor(Date.now() / 1000)
const jwt = require('jsonwebtoken')
const secret = 'clave_secreta'
const refreshTokenSecret = 'clave_hiper_secreta'
const refTokens = []

exports.createToken = (user) => {
  const payload = {
    sub: user._id,
    username: user.username,
    role: user.role,
    iat: now,
    exp: now + (60 * 60)
  }
  const accessToken = jwt.sign(payload, secret)
  return accessToken
}
// exports.createToken = function(user) {

  //
//   const refreshToken = jwt.sign({sub: user._id, username: user.username, role: user.role}, refreshTokenSecret)
//   refTokens.push(refreshToken)
//   return {
//     accessToken,
//     refreshToken
//   }
  // return jwt.sign(payload, secret)
// }

exports.refreshToken = () => {
  return 'refresh'
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
