const express = require("express");
const router = express.Router();

const {getAllCars,getCars,createCars,getCarByid,updateCars,deleteCars} = require("../controllers/carController");
const validateToken = require("../middleware/validateTokenHandler");
// const upload = multer({ dest: 'uploads/' });

router.get("/getAll",getAllCars);
router.get("/",validateToken,getCars);
router.post("/",createCars);
router.get("/:id",getCarByid);
router.put("/:id",updateCars);
router.delete("/:id",deleteCars);

module.exports = router;