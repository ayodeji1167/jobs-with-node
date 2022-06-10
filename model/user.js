const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema ({

    name:{
        type:String,
        required:[true, "Please Provide Valid Name"],
        minlength:3,
        maxlength:50
    },

    email:{
        type:String,
        required:[true, "Please Provide Valid Email"],
        minlength:3,
        maxlength:50,
        unique:true
    },

    password:{
        type:String,
        required:[true, "Please Provide Valid password"],
        minlength:4,
    },

})


//A middleware that hashes the password (There seems to be a reason why i used function and not arrow function...think its related to "this" keyword)

userSchema.pre("save" , async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password , salt);
    next()
})

userSchema.methods.createJWT = function(){
  return  jwt.sign({userId: this._id, name:this.name }, "secret", {expiresIn: "30d"})
}

userSchema.methods.comparePassword = async function (candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}
module.exports = mongoose.model("User" , userSchema);