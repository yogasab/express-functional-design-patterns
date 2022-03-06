const jwt = require("jsonwebtoken");
const findUserByToken = require("../lib/findUserByToken");
const { sendErrorResponse } = require("../lib/response");

const tokenAuth = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	const [type, jwtToken] = authHeader.split(" ");
	if (type === "Bearer") {
		try {
			const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
			const user = await findUserByToken(payload.id);
			req.user = user;
		} catch (error) {
			sendErrorResponse(res, 401, "failed", error.message);
		}
	}
	next();
};

module.exports = tokenAuth;
