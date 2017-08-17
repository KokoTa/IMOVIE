let mongoose = require('mongoose');
let UserSchema = require('../schema/user');
let user = mongoose.model('user', UserSchema);

module.exports = user;