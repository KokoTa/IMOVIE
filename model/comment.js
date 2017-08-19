let mongoose = require('mongoose');
let CommentSchema = require('../schema/comment');
let comment = mongoose.model('comment', CommentSchema);

module.exports = comment;