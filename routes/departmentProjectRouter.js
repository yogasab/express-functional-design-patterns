const bodyParser = require("../middlewares/bodyParser");
const express = require("express");
const {
	createDepartmentProjectRoute,
	getDepartmenProjectsRuote,
	getDepartmenProjectRuote,
	updateDepartmentProject,
	deleteDepartmentProject,
} = require("../controllers/departmentProjectController");
const checkIDParam = require("../middlewares/checkIDParam");
const DepartmentProject = require("../models").DepartmentProject;
const basicAuth = require("../middlewares/basicAuth");
// const requireAuth = require("../middlewares/requireAuth");
const tokenAuth = require("../middlewares/tokenAuth");
const departmentProjectRouter = express.Router();

departmentProjectRouter.use(tokenAuth);
departmentProjectRouter.use(basicAuth);

departmentProjectRouter
	.route("/")
	.post(bodyParser, createDepartmentProjectRoute)
	.get(getDepartmenProjectsRuote);

departmentProjectRouter.param("id", checkIDParam(DepartmentProject));
departmentProjectRouter
	.route("/:id")
	.get(getDepartmenProjectRuote)
	.put(updateDepartmentProject)
	.delete(deleteDepartmentProject);

module.exports = departmentProjectRouter;
