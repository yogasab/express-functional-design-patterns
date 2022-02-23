const express = require("express");
const usersRouter = express.Router();
const users = require("../fixtures/fixtures/users.json");

const getUsersRoute = (req, res) => {
	res.send(users);
};

const getUserRoute = (req, res) => {
	const user = users.find((user) => user.id === req.params.id);
	res.send(user);
};

usersRouter.get("/", getUsersRoute);
usersRouter.get("/:id", getUserRoute);

module.exports = usersRouter;
