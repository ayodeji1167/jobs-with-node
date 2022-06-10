const jobsRouter = require("express").Router();
const {getAllJobs,createJob,updateJob,deleteJob} = require("../controllers/jobs")

jobsRouter.route("/").get(getAllJobs);
jobsRouter.route("/").post(createJob);
jobsRouter.route("/:id").put(updateJob);
jobsRouter.route("/:id").delete(deleteJob);



module.exports = jobsRouter;