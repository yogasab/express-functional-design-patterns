"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Computers", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			slug: {
				type: Sequelize.STRING,
			},
			motherboard: {
				type: Sequelize.STRING,
			},
			processor: {
				type: Sequelize.STRING,
			},
			memory: {
				type: Sequelize.INTEGER,
			},
			harddisk: {
				type: Sequelize.INTEGER,
			},
			os: {
				type: Sequelize.STRING,
			},
			user_id: {
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
		await queryInterface.dropTable("Computers");
	},
};
