const User = require("../model/user");
const BadRequestError = require("../errors/bad-request-error");
const UnAuthenticatedError = require("../errors/unauthenticated");
const bcrypt = require("bcryptjs");

//Register Function
const register = async (req, res) => {
  const user = await User.create(req.body);

  const token = user.createJWT();
  res.status(200).json({ user: user.name, token });
};

//Login Function
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Enter Email Or Password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnAuthenticatedError("User does not exist");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  
  if (!isPasswordCorrect) {
    console.log("Its incorrect");
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();

  res.status(200).json({ name: user.name, token });
};

module.exports = { register, login };
