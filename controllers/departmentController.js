const User = require("../models").User;
const Department = require("../models").Department;
const Project = require("../models").Project;

exports.createDepartmentRoute = async (req, res) => {
	try {
		const { formBody } = req;
		const department = await Department.create(formBody);
		res.status(201).json({
			status: "success",
			message: "Department created successfully",
			data: {
				department,
			},
		});
	} catch (error) {
		res.status(400).json({ status: "success", message: error.message });
	}
};

exports.getDepartmentsRoute = async (req, res) => {
	try {
		const departments = await Department.findAll({
			// include: [
			// 	{
			// 		model: User,
			// 		as: "users",
			// 	},
			// ],
			order: [["createdAt", "DESC"]],
		});
		res.status(200).json({
			status: "success",
			message: "Departments fetched successfully",
			results: departments.length,
			data: {
				departments,
			},
		});
	} catch (error) {
		res.status(400).json({ status: "success", message: error.message });
	}
};

exports.getDepartmentRoute = async (req, res) => {
	try {
		const { slug } = req;
		const department = await Department.findOne({
			where: { slug },
			include: [
				{
					model: User,
					as: "users",
				},
				{
					model: Project,
					as: "projects",
				},
			],
			order: [["createdAt", "DESC"]],
		});
		res.status(200).json({
			status: "success",
			message: "Department fetched successfully",
			data: {
				department,
			},
		});
	} catch (error) {
		res.status(400).json({ status: "success", message: error.message });
	}
};

exports.deleteDepartmentRoute = async (req, res) => {
	try {
		const { slug } = req;
		console.log(slug);
		const department = await Department.destroy({ where: { slug } });
		res.status(204).send();
	} catch (error) {
		res.status(400).json({ status: "success", message: error.message });
	}
};

exports.updateDepartmentRoute = async (req, res) => {
	try {
		const { slug, body } = req;
		const department = await Department.findOne({ where: { slug } });
		await department.update(body);
		res.status(200).json({
			status: "success",
			message: "Department updated successfully",
			data: {
				department,
			},
		});
	} catch (error) {
		res.status(400).json({ status: "success", message: error.message });
	}
};
