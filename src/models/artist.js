'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ArtistSchema = Schema({
    name: String,
    description: String,
		image: String,
		collective: { type: Schema.ObjectId, ref: 'Collective'}
})

module.exports = mongoose.model('Artist', ArtistSchema)