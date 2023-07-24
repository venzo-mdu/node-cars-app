// const multer= require("multer")
// const asyncHandler = require("express-async-handler");

// const uploadImageHandler = asyncHandler(async(req,res)=>{
// //upload image
// const Storage = multer.diskStorage({
//     destination: "uploads",
//     filename:(req,file,cb) =>{
//         cb(null,file.originalname);
//     },
// });

// const upload = multer({
//     storage:Storage
// }).single('testImg')
// });
// module.exports = {uploadImageHandler}