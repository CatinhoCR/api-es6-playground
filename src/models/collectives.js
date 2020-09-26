'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var CollectiveSchema = Schema({
    name: String,
		description: String,
		country: String,
		description: String,
    image: String
})

module.exports = mongoose.model('Collective', CollectiveSchema)