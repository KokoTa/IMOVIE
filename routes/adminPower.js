module.exports = {
	check: function(req, res, next) {
		let user = req.session.user;
		if(user.role < 10) return res.redirect('/');
		next();
	}
}