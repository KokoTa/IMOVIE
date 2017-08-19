let Comment = require('../model/comment');

module.exports ={
	submit: function(req, res, next) {
		var _comment = req.body;
		var movieId = _comment.id;

		if(_comment.cid) { //  提交中含有cid的就是回复
			Comment.findById(_comment.cid, function(err, comment) {
				var reply = {
					from: _comment.from,
					to: _comment.tid,
					content: _comment.content
				}

				comment.reply.push(reply);

				comment.save(function(err, comment) {
					if(err) return err;
					res.redirect('/movie/' + movieId);
				});
			});
		} else { // 否则就是评论
			var comment = new Comment({
				movie: movieId,
				from: _comment.from,
				content: _comment.content
			});

			comment.save(function(err, comment) {
				console.log('评论成功');
				if(err) return err;
				res.redirect('/movie/' + movieId)
			})
		}
	}
}