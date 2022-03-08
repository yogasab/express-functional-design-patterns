const { sendErrorResponse } = require("../lib/response");

const authorizeRoute = (req, res, next) => {
	if (req.user.id !== req.id) {
		sendErrorResponse(res, 403, "failed", "You cannot perform this route");
	}
	next();
};

module.exports = authorizeRoute;
