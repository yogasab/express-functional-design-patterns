const express = require("express");
const { registerRoute, loginRoute } = require("../controllers/authController");
const authRouter = express.Router();

authRouter.route("/register").post(registerRoute);
authRouter.route("/login").post(loginRoute);

module.exports = authRouter;
