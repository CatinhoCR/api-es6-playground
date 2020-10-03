require('dotenv').config()
const jwt = require('jsonwebtoken')
var secret = process.env.ACCESS_TOKEN_SECRET

exports.ensureAuth = function (req, res, next) {
  const authHeadr = req.headers.authorization

  if (!authHeadr) {
    return res.status(403).send({
      message: 'La cabecera de autenticación no existe.',
    })
  }

  var token = authHeadr.replace(/['"]+/g, '')
  const now = Math.floor(Date.now() / 1000)

  try {
    var payload = jwt.decode(token, secret)
    if (payload.exp <= now) {
      return res.status(401).send({
        message: 'El token ha expirado.',
      })
    }
  } catch {
    return res.status(404).send({ message: 'El token no es válido.' })
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(404).send({ message: 'El token no es válido.' })
    }
    req.user = user
    next()
  })
}
