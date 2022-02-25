const express = require("express");
const {
	createDepartmentRoute,
	deleteDepartmentRoute,
	getDepartmentsRoute,
	getDepartmentRoute,
	updateDepartmentRoute,
} = require("../controllers/departmentController");
const bodyParser = require("../middlewares/bodyParser");
const checkSlugParam = require("../middlewares/checkSlugParam");
const Department = require("../models").Department;
const departmentRouter = express.Router();

departmentRouter
	.route("/")
	.post(bodyParser, createDepartmentRoute)
	.get(getDepartmentsRoute);

departmentRouter.param("slug", checkSlugParam(Department));
departmentRouter
	.route("/:slug")
	.post(bodyParser, createDepartmentRoute)
	.delete(checkSlugParam(Department), deleteDepartmentRoute)
	.patch(checkSlugParam(Department), updateDepartmentRoute)
	.get(checkSlugParam(Department), getDepartmentRoute);

module.exports = departmentRouter;
