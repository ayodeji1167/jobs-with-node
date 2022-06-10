const {login,register} = require("../controllers/auth");
const authRouter = require("express").Router();



authRouter.route("/register").post(register);
authRouter.route("/login").post(login);

module.exports = authRouter;