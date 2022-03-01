const Project = require("../models").Project;
const Department = require("../models").Department;
const handleAsync = require("../utils/handleAsync");
const attributes = ["project_head", "project_description", "slug", "createdAt"];

exports.createProjectRoute = async (req, res) => {
	try {
		const { formBody } = req;
		const project = await Project.create(formBody);
		res.status(200).json({
			status: "success",
			message: "Project created successfully",
			data: {
				project,
			},
		});
	} catch (error) {
		res.status(400).json({ status: "failed", message: error.message });
	}
};

exports.getProjectsRoute = async (req, res) => {
	try {
		const projects = await Project.findAll({
			order: [["createdAt", "DESC"]],
		});
		res.status(200).json({
			status: "success",
			message: "Project fetched successfully",
			results: projects.length,
			data: {
				projects,
			},
		});
	} catch (error) {
		res.status(400).json({ status: "failed", message: error.message });
	}
};

exports.getProjectRoute = async (req, res) => {
	try {
		const { slug } = req;
		const project = await Project.findOne({
			where: { slug },
			include: [
				{
					model: Department,
					as: "departments",
				},
			],
			attributes,
		});
		res.status(200).json({
			status: "success",
			message: "Project fetched successfully",
			data: { project },
		});
	} catch (error) {
		res.status(400).json({ status: "failed", message: error.message });
	}
};

exports.updateProjectRoute = async (req, res) => {
	try {
		const { slug, body } = req;

		const project = await Project.findOne({
			where: { slug },
		});
		await project.update(body);

		res.status(200).json({
			status: "success",
			message: "Project updated successfully",
			data: { project },
		});
	} catch (error) {
		res.status(400).json({ status: "failed", message: error.message });
	}
};

exports.deleteProjectRoute = async (req, res) => {
	try {
		const { slug } = req;
		const project = await Project.destroy({
			where: { slug },
		});
		res.status(204).json({
			status: "success",
			message: "Project deleted successfully",
		});
	} catch (error) {
		res.status(400).json({ status: "failed", message: error.message });
	}
};
