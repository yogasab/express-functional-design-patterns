const express = require("express");
const {
	createComputerRoute,
	getComputersRoute,
	getComputerRoute,
	updateComputerRoute,
	deleteComputerRoute,
} = require("../controllers/computerController");
const bodyParser = require("../middlewares/bodyParser");
const checkSlugParam = require("../middlewares/checkSlugParam");
const Computer = require("../models").Computer;
const basicAuth = require("../middlewares/basicAuth");
const requireAuth = require("../middlewares/requireAuth");
const tokenAuth = require("../middlewares/tokenAuth");
const authorizeRoute = require("../middlewares/authorizeRoute");
const computerRouter = express.Router();

computerRouter.use(tokenAuth);
computerRouter.use(basicAuth);

computerRouter
	.route("/")
	.post(bodyParser, createComputerRoute)
	.get(getComputersRoute);

computerRouter.param("slug", checkSlugParam(Computer));
// computerRouter.use(requireAuth);
computerRouter
	.route("/:slug")
	.get(getComputerRoute)
	.patch(checkSlugParam(Computer), authorizeRoute, updateComputerRoute)
	.delete(checkSlugParam(Computer), authorizeRoute, deleteComputerRoute);
module.exports = computerRouter;
