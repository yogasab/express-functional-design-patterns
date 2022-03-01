const DepartmentProject = require("../models").DepartmentProject;

exports.createDepartmentProjectRoute = async (req, res) => {
	try {
		const { formBody } = req;
		const departmentProject = await DepartmentProject.create(formBody);
		res.status(201).json({
			status: "success",
			message: "Department Project created successfully",
			data: {
				departmentProject,
			},
		});
	} catch (error) {
		res.status(400).json({ status: "failed", message: error.message });
	}
};

exports.getDepartmenProjectsRuote = async (req, res) => {
	try {
		const departmentProjects = await DepartmentProject.findAll({
			order: [["createdAt", "DESC"]],
		});
		res.status(200).json({
			status: "success",
			message: "Department Projects fetched successfully",
			results: departmentProjects.length,
			data: {
				departmentProjects,
			},
		});
	} catch (error) {
		res.status(400).json({ status: "failed", message: error.message });
	}
};

exports.getDepartmenProjectRuote = async (req, res) => {
	try {
		const { id } = req;
		const departmentProject = await DepartmentProject.findOne({
			where: { id },
		});
		res.status(200).json({
			status: "success",
			message: "Department Project fetched successfully",
			data: {
				departmentProject,
			},
		});
	} catch (error) {
		res.status(400).json({ status: "failed", message: error.message });
	}
};

exports.updateDepartmentProject = async (req, res) => {
	try {
		const { id } = req;
		const departmentProject = await DepartmentProject.update(req.body, {
			where: { id },
		});
		res.status(200).json({
			status: "success",
			message: "Department Project updated successfully",
		});
	} catch (error) {
		res.status(400).json({
			status: "failed",
			message: error.message,
		});
	}
};

exports.deleteDepartmentProject = async (req, res) => {
	try {
		const { id } = req;
		const departmentProject = await DepartmentProject.destroy({
			where: { id },
		});
		res.status(204).send();
	} catch (error) {
		res.status(400).json({ status: "failed", message: error.message });
	}
};
