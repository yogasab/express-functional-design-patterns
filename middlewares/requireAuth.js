const requireAuth = (req, res, next) => {
	const { user } = req;
	if (user) {
		next();
	} else {
		res
			.status(401)
			.json({ status: "failed", message: "Unauthorized please login" });
	}
};

module.exports = requireAuth;
