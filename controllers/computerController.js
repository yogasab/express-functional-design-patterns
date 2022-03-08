const Computer = require("../models").Computer;
const User = require("../models").User;
const { sendResponseResponse, sendErrorResponse } = require("../lib/response");
const attributes = [
	"name",
	"motherboard",
	"processor",
	"memory",
	"hardisk",
	"os",
	"user_id",
	"createdAt",
	"slug",
];

exports.createComputerRoute = async (req, res) => {
	try {
		const { formBody } = req;
		const computer = await Computer.create(formBody);
		sendResponseResponse(
			res,
			201,
			"success",
			"Computer created successfully",
			computer
		);
	} catch (error) {
		res.status(400).json({ status: "Failed", message: error.message });
	}
};

exports.getComputersRoute = async (req, res) => {
	try {
		const computers = await Computer.findAll({
			order: [["createdAt", "DESC"]],
			attributes,
		});
		res.status(200).json({
			status: "success",
			message: "Computers fetched successfully",
			results: computers.length,
			data: {
				computers,
			},
		});
	} catch (error) {
		res.status(400).json({ status: "Failed", message: error.message });
	}
};

exports.getComputerRoute = async (req, res) => {
	try {
		const { slug } = req;
		const computer = await Computer.findOne({
			where: { slug },
			include: [
				{
					model: User,
					as: "user",
				},
			],
			attributes,
		});
		res.status(200).json({
			status: "success",
			message: `Computer ${computer.name} fetched successfully`,
			data: {
				computer,
			},
		});
	} catch (error) {
		res.status(400).json({ status: "Failed", message: error.message });
	}
};

exports.updateComputerRoute = async (req, res) => {
	try {
		const { body, slug, user } = req;
		const computer = await Computer.findOne({ where: { slug } });
		await computer.update(body);
		sendResponseResponse(
			res,
			200,
			"success",
			"Computer updated successfully",
			computer
		);
	} catch (error) {
		res.status(400).json({ status: "Failed", message: error.message });
	}
};

exports.deleteComputerRoute = async (req, res) => {
	try {
		const { slug, user } = req;
		const computer = await Computer.findOne({ where: { slug } });
		await computer.destroy();
		sendResponseResponse(
			res,
			204,
			"success",
			"Computer deleted successfully",
			computer
		);
	} catch (error) {
		res.status(400).json({ status: "Failed", message: error.message });
	}
};
