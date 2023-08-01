const express = require("express");
const router = express.Router();

const {getAllCars,getCars,createCars,getCarByid,updateCars,deleteCars} = require("../controllers/carController");
const validateToken = require("../middleware/validateTokenHandler");

router.get("/getAll",getAllCars);
router.get("/",validateToken,getCars);
router.post("/",validateToken,createCars);
router.get("/:id",validateToken,getCarByid);
router.put("/:id",validateToken,updateCars);
router.delete("/:id",validateToken,deleteCars);

module.exports = router;