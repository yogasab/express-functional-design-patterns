"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			User.hasOne(models.Computer, {
				foreignKey: "user_id",
				as: "computer",
			});
			User.belongsTo(models.Department, {
				foreignKey: "department_id",
				as: "department",
			});
		}
	}
	User.init(
		{
			name: DataTypes.STRING,
			slug: DataTypes.STRING,
			nik: DataTypes.STRING,
			department_id: DataTypes.INTEGER,
			username: DataTypes.STRING,
			password: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "User",
		}
	);

	User.beforeCreate("addSlugToUsersTable", (user, options) => {
		user.slug = user.name.replace(/\s/g, "-").toLowerCase();
	});

	User.beforeUpdate("updateSlugToUsersTable", (user, options) => {
		user.slug = user.name.replace(/\s/g, "-").toLowerCase();
	});

	return User;
};
