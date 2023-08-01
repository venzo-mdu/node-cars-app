const express = require("express");
const router = express.Router();
const{bookCars,bookedList,deleteBookedCars,myCarIsBooked} = require("../controllers/bookingController")
const validateToken = require("../middleware/validateTokenHandler");

router.post("/:id",validateToken,bookCars);
router.get("/:id",validateToken,bookedList);
router.delete("/:id",validateToken,deleteBookedCars);
router.get("/check/:id",validateToken,myCarIsBooked);

module.exports = router;