const express = require("express");
const router = express.Router();
const {registerUser,currentUser,loginUser,usersList} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const checkRole = require("../middleware/checkRole");
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const upload = multer({ dest: 'uploads/' });
const Test = require("../models/testModel");

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/usersList",validateToken,checkRole,usersList);
router.get("/current",validateToken,currentUser); 

cloudinary.config({ 
    cloud_name: 'dph227bch', 
    api_key: '671337158813626', 
    api_secret: 'ItaSlE_wJILfAnc6855VfZil09g',
    secure: true
  });

router.post("/test",upload.single("image"),async (req,res,next)=>{
    const result = await cloudinary.uploader.upload(req.file.path);
    const imageUrl = result.secure_url;
    console.log(req.body);
    console.log(req.file);
    await Test.create({
    image:imageUrl,

}).then((res)=>{
    console.log("image and details saved success")
}).catch((err)=>{
    console.log(err,"error has occured")
});
res.send('Image and details saved successfully');
});

module.exports = router;