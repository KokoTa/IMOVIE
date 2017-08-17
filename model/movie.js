let mongoose = require('mongoose');
let MovieSchema = require('../schema/movie');
let movie = mongoose.model('movie', MovieSchema);

module.exports = movie;