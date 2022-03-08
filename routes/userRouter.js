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
const tokenAuth = require("../middlewares/tokenAuth");
const authorizeRoute = require("../middlewares/authorizeRoute");
const User = require("../models").User;
const userRouter = express.Router();

userRouter.use(tokenAuth);
userRouter.use(basicAuth);

userRouter.route("/").post(bodyParser, createUserRoute).get(getUsersRoute);

userRouter.param("slug", checkSlugParam(User));
userRouter
	.route("/:slug")
	.get(getUserRoute)
	.patch(checkSlugParam(User), authorizeRoute, bodyParser, updateUserRoute)
	.delete(checkSlugParam(User), authorizeRoute, deleteUserRoute);

module.exports = userRouter;
