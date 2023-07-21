const express = require("express");
const router = express.Router();
const {registerUser,currentUser,loginUser,usersList} = require("../controllers/userController");
//const validateToken = require("../middleware/validateHandler");

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/usersList",usersList);
router.get("/current",currentUser); 

module.exports = router;