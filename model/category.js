let mongoose = require('mongoose');
let CategorySchema = require('../schema/category');
let category = mongoose.model('category', CategorySchema);

module.exports = category;