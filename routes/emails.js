const express = require("express");
const emails = require("../fixtures/fixtures/emails.json");
const emailsRouter = express.Router();

const getEmailsRoute = (req, res) => {
	res.send(emails);
};

const getEmailRoute = (req, res) => {
	const email = emails.find((email) => email.id === req.params.id);
	res.send(email);
};

emailsRouter.get("/", getEmailsRoute);
emailsRouter.get("/:id", getEmailRoute);

module.exports = emailsRouter;
