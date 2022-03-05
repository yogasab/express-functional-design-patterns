const jwt = require("jsonwebtoken");

const generateToken = (user) => {
	const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_TIME,
	});
	return token;
};

module.exports = generateToken;
