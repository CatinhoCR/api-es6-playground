'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
  username: String,
  fullname: String,
  email: String,
  password: String,
  role: String,
  image: String,
  isActive: Boolean,
})

module.exports = mongoose.model('User', UserSchema)
