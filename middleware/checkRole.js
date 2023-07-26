const user = require("../models/userModels")
const checkRole = (req,res,next)=>{
    console.log("inside check user")
    console.log((req.user),"The req is")
    console.log((req.user.role),"The req is")
    if(req.user && req.user.role === 'admin'){
        next();
    }
    return res.status(401).json({
        message:"Unauthorized",
        success: false
    });
}
// const checkRole = roles => (req, res, next) =>
//   !roles.includes(req.user.role)
//     ? res.status(401).json("Unauthorized")
//     : next();

// const checkRole=(req,res,next)=>{
//     if(req.user && req.user.role ==='admin'){
//         return next();
//     }else{
//         res.status(401).json({
//                     message:"Unauthorized",
//                     success: false
//                 });
// }

// }
// const adminMiddleware = (req, res, next) => {
//     // Check if the user is an admin
//     if (req.user && req.user.role === 'admin') {
//        next();
//     }else{
//       console.log("not auth");
//     }
// };

module.exports = checkRole;