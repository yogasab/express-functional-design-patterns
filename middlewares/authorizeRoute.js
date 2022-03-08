const { sendErrorResponse } = require("../lib/response");

// To check if the one who made changes is the one whose logged in
const modifyPolicy = (req) => {
	if (req.user.id !== req.id) {
		return false;
	}
	return req.user.id === req.id;
};

const authorizeRoute = (req, res, next) => {
	if (!modifyPolicy(req)) {
		sendErrorResponse(res, 403, "failed", "You cannot perform this route");
	}
	next();
};

module.exports = authorizeRoute;
