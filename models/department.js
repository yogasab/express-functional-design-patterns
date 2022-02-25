"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Department extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Department.hasMany(models.User, {
				foreignKey: "department_id",
				as: "users",
			});
			Department.belongsToMany(models.Project, {
				through: "DepartmentProject",
				as: "projects",
				foreignKey: "department_id",
			});
		}
	}
	Department.init(
		{
			department_head: DataTypes.STRING,
			department_name: DataTypes.STRING,
			department_description: DataTypes.STRING,
			slug: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Department",
		}
	);

	Department.beforeCreate("addSlugToDepartment", (department, options) => {
		department.slug = department.department_name
			.replace(/\s/g, "-")
			.toLowerCase();
	});
	Department.beforeUpdate("changeSlugToDepartment", (department, options) => {
		department.slug = department.department_name
			.replace(/\s/g, "-")
			.toLowerCase();
	});
	return Department;
};
