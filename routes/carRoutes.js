const express = require("express");
const router = express.Router();
const {getAllCars,getCars,createCars,getCarByid,updateCars,deleteCars} = require("../controllers/carController");
const validateToken = require("../middleware/validateTokenHandler");
const multer = require("multer");
const upload = multer({ dest: 'uploads/' });

router.get("/getAll",getAllCars);
router.get("/",validateToken,getCars);
router.post("/",validateToken, upload.single("testImg"),createCars);
router.get("/:id",validateToken,getCarByid);
router.put("/:id",validateToken,updateCars);
router.delete("/:id",validateToken,deleteCars);

module.exports = router;

//user based access using access token
//router.use(validateToken);

/*// const Storage = multer.diskStorage({
//     destination: (req,file,cb) =>{
//         cb(null,"uploads");
//     },
//     filename:(req,file,cb) =>{
//         cb(null,file.originalname);
//     },
// });

// const upload = multer({
//     storage:Storage
// }).single('testImg')*/