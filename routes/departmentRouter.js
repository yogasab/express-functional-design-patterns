const express = require("express");
const {
	createDepartmentRoute,
	deleteDepartmentRoute,
	getDepartmentsRoute,
	getDepartmentRoute,
	updateDepartmentRoute,
} = require("../controllers/departmentController");
const basicAuth = require("../middlewares/basicAuth");
const bodyParser = require("../middlewares/bodyParser");
const checkSlugParam = require("../middlewares/checkSlugParam");
const requireAuth = require("../middlewares/requireAuth");
const tokenAuth = require("../middlewares/tokenAuth");
const Department = require("../models").Department;
const departmentRouter = express.Router();

departmentRouter.use(tokenAuth);
departmentRouter.use(basicAuth);

departmentRouter
	.route("/")
	.post(bodyParser, createDepartmentRoute)
	.get(getDepartmentsRoute);

departmentRouter.param("slug", checkSlugParam(Department));
departmentRouter.use(basicAuth);
departmentRouter.use(requireAuth);
departmentRouter
	.route("/:slug")
	.post(bodyParser, createDepartmentRoute)
	.delete(checkSlugParam(Department), deleteDepartmentRoute)
	.patch(checkSlugParam(Department), updateDepartmentRoute)
	.get(checkSlugParam(Department), getDepartmentRoute);

module.exports = departmentRouter;
