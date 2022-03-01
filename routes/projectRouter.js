const express = require("express");
const bodyParser = require("../middlewares/bodyParser");
const Project = require("../models").Project;
const checkSlugParam = require("../middlewares/checkSlugParam");
const {
	createProjectRoute,
	getProjectsRoute,
	getProjectRoute,
	updateProjectRoute,
	deleteProjectRoute,
} = require("../controllers/projectController");
const projectRouter = express.Router();

projectRouter
	.route("/")
	.post(bodyParser, createProjectRoute)
	.get(getProjectsRoute);

projectRouter.param("slug", checkSlugParam(Project));
projectRouter
	.route("/:slug")
	.get(checkSlugParam(Project), getProjectRoute)
	.patch(checkSlugParam(Project), updateProjectRoute)
	.delete(checkSlugParam(Project), deleteProjectRoute);

module.exports = projectRouter;
