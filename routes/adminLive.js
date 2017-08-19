module.exports = {
	check: function(req, res, next) {
		let user = req.session.user;
		if(!user) return res.redirect('/');
		next();
	}
}