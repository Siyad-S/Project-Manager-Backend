const express = require("express");
const app = express();
const port = 5151;
const cors = require("cors");
const connectDb = require("./configs/connectionDb");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");

connectDb();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/tasks", require("./router/task"));
app.use("/status", require("./router/stage"));
app.use("/project", require("./router/project"));
app.use("/user-admin", require("./router/userAdmin"));
app.use("/shared-tasks", require("./router/shared"));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
