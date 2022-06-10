const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    company: {
        type:String,
        required:[true, "Please provide Company"],
        maxlength:50
    },
    position: {
        type:String,
        required:[true, "Please provide Position"],
        maxlength:256
    },
    status:{
        type:String,
        enum:["pending", "declined", "interviewed"],
        default:"pending"
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "please provide user"]
    }

}, {timestamps:true})

module.exports = mongoose.model("Job", JobSchema)