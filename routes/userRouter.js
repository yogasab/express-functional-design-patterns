const express = require("express");
const {
	createUserRoute,
	getUsersRoute,
	getUserRoute,
	updateUserRoute,
	deleteUserRoute,
} = require("../controllers/userController");
const bodyParser = require("../middlewares/bodyParser");
const checkSlugParam = require("../middlewares/checkSlugParam");
const basicAuth = require("../middlewares/basicAuth");
const requireAuth = require("../middlewares/requireAuth");
const User = require("../models").User;
const userRouter = express.Router();

userRouter.route("/").post(bodyParser, createUserRoute).get(getUsersRoute);

userRouter.param("slug", checkSlugParam(User));
userRouter.use(basicAuth);
userRouter.use(requireAuth);
userRouter
	.route("/:slug")
	.get(getUserRoute)
	.patch(checkSlugParam(User), bodyParser, updateUserRoute)
	.delete(checkSlugParam(User), deleteUserRoute);

module.exports = userRouter;
