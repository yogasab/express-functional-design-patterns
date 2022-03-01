const User = require("../models").User;
const Computer = require("../models").Computer;

exports.createUserRoute = async (req, res) => {
	try {
		const { formBody } = req;
		const user = await User.create(formBody);

		res.status(201).json({
			status: "success",
			message: "User created successfully",
			data: {
				user,
			},
		});
	} catch (error) {
		res.status(400).json({ status: "success", message: error.message });
	}
};

exports.getUsersRoute = async (req, res) => {
	try {
		const users = await User.findAll({
			include: [],
			order: [["createdAt", "DESC"]],
		});
		res.status(200).json({
			status: "success",
			message: "User fecthed successfully",
			results: users.length,
			data: {
				users,
			},
		});
	} catch (error) {
		res.status(400).json({ status: "success", message: error.message });
	}
};

exports.getUserRoute = async (req, res) => {
	const { slug } = req;
	const attributes = ["name", "slug", "nik", "department_id", "createdAt"];
	const user = await User.findOne({
		where: { slug },
		include: [
			{
				model: Computer,
				as: "computer",
			},
		],
		attributes,
	});
	res.status(200).json({
		status: "success",
		message: "User fecthed successfully",
		data: {
			user,
		},
	});
};

exports.updateUserRoute = async (req, res) => {
	try {
		const { slug, body } = req;
		const user = await User.findOne({ where: { slug } });
		console.log(user);
		await user.update(body);
		res.status(200).json({
			status: "success",
			message: "User updated successfully",
			data: {
				user,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: "success",
			message: error.message,
		});
	}
};

exports.deleteUserRoute = async (req, res) => {
	try {
		const { slug } = req;
		const user = await User.destroy({ where: { slug } });
		res.status(204).send("OK");
	} catch (error) {
		res.status(400).json({
			status: "success",
			message: error.message,
		});
	}
};
