"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("DepartmentProjects", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			department_id: {
				type: Sequelize.INTEGER,
			},
			project_id: {
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("DepartmentProjects");
	},
};
