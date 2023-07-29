const express = require("express");
const router = express.Router();
const {registerUser,currentUser,loginUser,usersList} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
// const checkRole = require("../middleware/checkRole");

router.post("/register",registerUser);
router.post("/login",loginUser);
// router.post("/signout",signOut);
router.get("/usersList",usersList);
router.get("/current",validateToken,currentUser); 

module.exports = router;