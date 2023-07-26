const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req,res,next) =>{
    console.log("inside vallidate token");
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    console.log("inside vallidate token 2");
    if(authHeader && authHeader.startsWith("Bearer")){
        //console.log("indide if");
        token = authHeader.split(" ")[1];
        //console.log(token)
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,decoded)=>{
            if(err){
                res.status(401);
                throw new Error("User is not authorized");
            }
            console.log(decoded);
            req.user = decoded.user;
            next();
        });

        if(!token){
            res.status(401);
            throw new Error("User is not authorized or token is missing");
        }
    }
});

module.exports = validateToken;