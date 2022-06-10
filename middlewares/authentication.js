const jwt = require("jsonwebtoken");
const BadRequestError = require("../errors/bad-request-error");
const UnAuthenticatedError = require("../errors/unauthenticated");
const User = require("../model/user");

const auth = async (req,res,next)=>{
    const header = req.headers.authorization;

    if(!header || !header.startsWith("Bearer ")){
        throw new BadRequestError("Invalid Header");
    }

    const jwtToken = header.split(" ")[1];

    try {
        const payLoad = jwt.verify(jwtToken,"secret");
        req.user = await User.findById(payLoad.userId);
        next();
    } catch (error) {
        throw new UnAuthenticatedError("Unable To Verify JWT from header")
    }

}

module.exports = auth