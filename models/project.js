"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Project extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Project.belongsToMany(models.Department, {
				through: "DepartmentProject",
				as: "departments",
				foreignKey: "project_id",
			});
		}
	}
	Project.init(
		{
			project_head: DataTypes.STRING,
			project_description: DataTypes.STRING,
			slug: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Project",
		}
	);
	return Project;
};
