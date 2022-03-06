const User = require("../models").User;
const jwt = require("jsonwebtoken");
const { sendResponseResponse, sendErrorResponse } = require("../lib/response");
const generateToken = require("../lib/token");

exports.registerRoute = async (req, res) => {
	try {
		const { body } = req;
		const { username } = req.body;

		const isUserRegistered = await User.findOne({ where: { username } });
		if (isUserRegistered) {
			sendErrorResponse(res, 422, "failed", "User already registered");
		}

		const user = await User.create(body);
		const token = generateToken(user);

		sendResponseResponse(res, 201, "success", "User registered successfully", {
			user,
			token,
		});
	} catch (error) {
		res.status(400).json({ status: "success", message: error.message });
	}
};

exports.loginRoute = async (req, res) => {
	try {
		const { username, password } = req.body;
		const attributes = [
			"id",
			"name",
			"slug",
			"nik",
			"department_id",
			"username",
			"password",
		];
		if (!username || !password) {
			sendErrorResponse(
				res,
				400,
				"failed",
				"Please fill up the username and password"
			);
		}
		const user = await User.findOne({ where: { username }, attributes });
		if (!user || !(await user.isPasswordMatched(password))) {
			sendErrorResponse(res, 401, "failed", "Invalid credentials");
		}
		const token = generateToken(user);
		sendResponseResponse(res, 200, "success", "User found", { user, token });
	} catch (error) {
		sendErrorResponse(res, 400, "failed", error.message);
	}
};
