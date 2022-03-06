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
const computerRouter = express.Router();

computerRouter.use(tokenAuth);
computerRouter.use(basicAuth);

computerRouter
	.route("/")
	.post(bodyParser, createComputerRoute)
	.get(getComputersRoute);

computerRouter.param("slug", checkSlugParam(Computer));
computerRouter.use(requireAuth);
computerRouter
	.route("/:slug")
	.get(getComputerRoute)
	.patch(checkSlugParam(Computer), updateComputerRoute)
	.delete(checkSlugParam(Computer), deleteComputerRoute);
module.exports = computerRouter;
