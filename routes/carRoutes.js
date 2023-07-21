const express = require("express");
const router = express.Router();
const {getCars,createCars,getCarByid,updateCars,deleteCars} = require("../controllers/carController");

router.route("/").get(getCars).post(createCars);
router.route("/:id").get(getCarByid).put(updateCars).delete(deleteCars);

module.exports = router;