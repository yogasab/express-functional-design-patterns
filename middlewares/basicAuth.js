const User = require("../models").User;
const findUserByCredentials = async ({ username, password }) => {
	try {
		const res = await User.findOne({ where: { username, password } });
		if (!res) {
			console.log("User not found");
			return false;
		}
		return res;
	} catch (error) {
		console.log(error);
		return false;
	}
};

const basicAuth = (findUserByCredentials) => async (req, res, next) => {
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
