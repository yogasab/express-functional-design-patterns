const express = require("express");
const emails = require("./fixtures/fixtures/emails.json");
const users = require("./fixtures/fixtures/users.json");

let app = express();

app.use((req, res) => {
	let route = req.method + " " + req.url;
	if (route == "GET /emails") {
		res.send(emails);
	} else if (route == "GET /users") {
		res.send(users);
	} else {
		res.end("You asked for " + route);
	}
});

app.listen(5000);
