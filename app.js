const express = require("express");
require("dotenv").config();
require("express-async-errors")
const jobsRouter = require("./routes/jobs");
const authRouter = require("./routes/auth");
const notFound = require("./middlewares/not-found");
const errorHandler = require("./middlewares/error-handler");
const connectDB = require("./db/connection");
const jwtAuthentication = require("./middlewares/authentication");

const app = express();

app.use(express.json());

app.use("/api/v1/jobs",jwtAuthentication, jobsRouter);
app.use("/api/v1/auth", authRouter);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.SERVER_PORT || 5000;
const URL = process.env.MONGO_URI;

const start = async () => {
  await connectDB(URL);
  app.listen(PORT, () => console.log(`App Listening To ${PORT}...`));
};

start();
