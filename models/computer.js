"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Computer extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Computer.belongsTo(models.User, {
				foreignKey: "user_id",
				as: "user",
			});
		}
	}
	Computer.init(
		{
			motherboard: DataTypes.STRING,
			processor: DataTypes.STRING,
			memory: DataTypes.INTEGER,
			hardisk: DataTypes.INTEGER,
			os: DataTypes.STRING,
			user_id: DataTypes.INTEGER,
			name: DataTypes.STRING,
			slug: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Computer",
		}
	);

	Computer.beforeCreate("addSlugToComputer", (computer, options) => {
		computer.slug = computer.name.replace(/\s/g, "-").toLowerCase();
	});

	Computer.beforeUpdate("updateSlugToComputer", (computer, options) => {
		computer.slug = computer.name.replace(/\s/g, "-").toLowerCase();
	});

	return Computer;
};
