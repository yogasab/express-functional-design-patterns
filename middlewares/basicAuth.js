const User = require("../models").User;
const bcrypt = require("bcryptjs");

const findUserByCredentials = async ({ username, password }) => {
	try {
		const user = await User.findOne({ where: { username } });
		if (!user) {
			return false;
		}
		const isPasswordMatched = await bcrypt.compare(password, user.password);
		if (!isPasswordMatched) {
			return false;
		}
		return user;
	} catch (error) {
		console.log(error);
		return false;
	}
};

const basicAuth = async (req, res, next) => {
	const header = req.headers.authorization || "";
	const [type, payload] = header.split(" ");
	if (type === "Basic") {
		const credentails = Buffer.from(payload, "base64").toString("ascii");
		const [username, password] = credentails.split(":");
		const user = await findUserByCredentials({ username, password });
		req.user = user;
	}
	next();
};

module.exports = basicAuth;
