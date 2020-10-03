require('dotenv').config()
const now = Math.floor(Date.now() / 1000)
const jwt = require('jsonwebtoken')
const secret = process.env.ACCESS_TOKEN_SECRET
// const refreshTokenSecret = 'clave_hiper_secreta'
// const refTokens = []

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

// TODO:
// exports.refreshToken = () => {
//   return 'refresh'
// }
