const express = require("express");
const router = express.Router();
const {getAllCars,getCars,createCars,getCarByid,updateCars,deleteCars} = require("../controllers/carController");
const validateToken = require("../middleware/validateTokenHandler");
const multer = require("multer");
const Cars = require("../models/carModels");
const fs = require('fs');

//user based access using access token
//router.use(validateToken);
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
        cloud_name: 'dph227bch', 
        api_key: '671337158813626', 
        api_secret: 'ItaSlE_wJILfAnc6855VfZil09g',
        secure: true
      });

// const Storage = multer.diskStorage({
//     destination: (req,file,cb) =>{
//         cb(null,"uploads");
//     },
//     filename:(req,file,cb) =>{
//         cb(null,file.originalname);
//     },
// });

const upload = multer({ dest: 'uploads/' });
// const upload = multer({
//     storage:Storage
// }).single('testImg');

router.get("/getAll",getAllCars);
router.get("/",validateToken,getCars);
//upload for image uploading
router.post("/", upload.single("testImg"),createCars);
router.get("/:id",validateToken,getCarByid);
router.put("/:id",validateToken,updateCars);
router.delete("/:id",validateToken,deleteCars);

module.exports = router;