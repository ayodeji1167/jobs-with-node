const BadRequestError = require("../errors/bad-request-error");
const UnAuthenticatedError = require("../errors/unauthenticated");
const Job = require("../model/job");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({}).sort("createdAt")
  res.status(200).json(jobs);
};
const createJob = async (req, res) => {
    req.body.createdBy = req.user._id;
    const job = await Job.create(req.body);
    res.status(200). json(job)
};
const updateJob = (req, res) => {
  res.send("This is where to get all jobs");
};
const deleteJob = (req, res) => {
  res.send("This is where to get all jobs");
};

module.exports = { getAllJobs,createJob,updateJob,deleteJob };
