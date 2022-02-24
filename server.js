const express = require("express");
const logger = require("./middlewares/logger");
const userRouter = require("./routes/userRouter");

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger);
app.use("/api/v1/users", userRouter);

app.listen(5000);
