const express = require("express");
const router = express.Router();
const {getAllCars,getCars,createCars,getCarByid,updateCars,deleteCars} = require("../controllers/carController");
const validateToken = require("../middleware/validateTokenHandler");
const multer = require("multer");
const Cars = require("../models/carModels");

//user based access using access token
//router.use(validateToken);

const Storage = multer.diskStorage({
    destination: "uploads",
    filename:(req,file,cb) =>{
        cb(null,file.originalname);
    },
});

const upload = multer({
    storage:Storage
}).single('testImg');

router.get("/getAll",getAllCars);
router.get("/",validateToken,getCars);
//upload for image uploading
router.post("/",upload,validateToken,createCars);
router.get("/:id",validateToken,getCarByid);
router.put("/:id",validateToken,updateCars);
router.delete("/:id",validateToken,deleteCars);

module.exports = router;