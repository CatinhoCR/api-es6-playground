'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var SongSchema = Schema({
    name: String,
    duration: String,
    genre: String,
    number: String,
    releaseYear: Number,
    bpm: Number,
    file: String,
    album: { type: Schema.ObjectId, ref: 'Album'}
})

module.exports = mongoose.model('Song', SongSchema)