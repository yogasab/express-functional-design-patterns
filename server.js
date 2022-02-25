const express = require("express");
const morgan = require("morgan");
const departmentRouter = require("./routes/departmentRouter");
const userRouter = require("./routes/userRouter");

let app = express();

app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: false, limit: "100kb" }));

app.use(morgan("tiny"));
app.use("/api/v1/users", userRouter);
app.use("/api/v1/departments", departmentRouter);

app.listen(5000);
