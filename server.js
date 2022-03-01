const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const departmentRouter = require("./routes/departmentRouter");
const userRouter = require("./routes/userRouter");
const computerRouter = require("./routes/computerRouter");
const projectRouter = require("./routes/projectRouter");
const departmentProjectRouter = require("./routes/departmentProjectRouter");

let app = express();

app.use(morgan("tiny"));
app.use(compression());
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: false, limit: "100kb" }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/departments", departmentRouter);
app.use("/api/v1/computers", computerRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/department-projects", departmentProjectRouter);

app.listen(5000);
